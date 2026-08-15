import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { ApiConstants } from '../constants/api.constants';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { UserInfo } from '../models/user-info';
import { RefreshRequest } from '../models/refresh-request';
import { RegisterRequest } from '../models/register-request';
import { UpdateProfileRequest } from '../models/update-profile-request';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly storageService = inject(StorageService);
    readonly currentUser = signal<UserInfo | null>(null);
    readonly isAuthenticated = signal(false);

    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<string | null>(null);

    constructor() {
        this.restoreSession();
    }

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${ApiConstants.BaseUrl}${ApiConstants.Login}`,
            request).pipe(
                tap((response: LoginResponse) => {
                    this.saveSession(response);
                })
            );
    }

    register(request: RegisterRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${ApiConstants.BaseUrl}${ApiConstants.Register}`,
            request
        ).pipe(
            tap((response: LoginResponse) => this.saveSession(response))
        );
    }

    updateProfile(request: UpdateProfileRequest): Observable<UserInfo> {
        return this.http.post<UserInfo>(
            `${ApiConstants.BaseUrl}${ApiConstants.UpdateProfile}`,
            request
        ).pipe(
            tap(user => this.updateStoredUser(user))
        );
    }

    private saveSession(response: LoginResponse): void {
        this.storageService.set('authToken', response.accessToken);
        this.storageService.set('refreshToken', response.refreshToken);
        this.storageService.set('expires_at', response.expiresAt.toString());
        this.storageService.set('currentUser', JSON.stringify(response.user));
        console.log('User info saved to storage:', response.user);
        this.currentUser.set(response.user);
        this.isAuthenticated.set(true);

    }

    private restoreSession(): void {
        if (!this.isLoggedIn()) {
            return;
        }

        const storedUser = this.storageService.get('currentUser');
        if (!storedUser) {
            return;
        }

        try {
            this.currentUser.set(JSON.parse(storedUser) as UserInfo);
            this.isAuthenticated.set(true);
        } catch {
            this.storageService.remove('currentUser');
        }
    }

    private updateStoredUser(user: UserInfo): void {
        this.storageService.set('currentUser', JSON.stringify(user));
        this.currentUser.set(user);
    }

    getAccessToken(): string | null {
        return this.storageService.get('authToken');
    }
    getExpiresAt(): string | null {
        return this.storageService.get('expires_at');
    }

    get IsRefreshing(): boolean {
        return this.isRefreshing;
    }

    set IsRefreshing(value: boolean) {
        this.isRefreshing = value;
    }

    get RefreshTokenSubject(): BehaviorSubject<string | null> {
        return this.refreshTokenSubject;
    }

    refreshToken(): Observable<LoginResponse> {
        const request: RefreshRequest = {
            accessToken: this.storageService.get('authToken')!,
            refreshToken: this.storageService.get('refreshToken')!
        };

        return this.http.post<LoginResponse>(
            `${ApiConstants.BaseUrl}${ApiConstants.Refresh}`,
            request
        );
    }

    isLoggedIn(): boolean {
        const token = this.getAccessToken();
        const expiresAt = this.getExpiresAt();
        if (!token || !expiresAt) {
            return false;
        }
        return new Date(expiresAt) > new Date();
    }

    logout(): void {
        this.storageService.remove('authToken');
        this.storageService.remove('refreshToken');
        this.storageService.remove('expires_at');
        this.storageService.remove('currentUser');
        this.currentUser.set(null);
        this.isAuthenticated.set(false);
    }
}
