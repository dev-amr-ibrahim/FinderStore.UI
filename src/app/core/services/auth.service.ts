import { Injectable, computed, signal } from '@angular/core';
import { LoginCredentials, RegisterData, User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUser = signal<User | null>(null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null || !!localStorage.getItem('token'));

  user(): User | null {
    return this.currentUser();
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('token');
  }
  login(_credentials: LoginCredentials): void {
    localStorage.setItem('token', 'your-token-here');
  }

  register(_data: RegisterData): void {
    localStorage.setItem('token', 'your-token-here');
  }
}
