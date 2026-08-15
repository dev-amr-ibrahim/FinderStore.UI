import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';
import {
    catchError,
    filter,
    finalize,
    switchMap,
    take,
    throwError
} from 'rxjs';
import { StorageService } from '../services/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService);
    const storageService = inject(StorageService);

    const token = authService.getAccessToken();

    if (!token) {
        return next(req);
    }

    const clonedRequest = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(clonedRequest).pipe(

        catchError(error => {

            if (error.status !== 401) {
                return throwError(() => error);
            }

            // لو فيه Refresh شغال بالفعل
            if (authService.IsRefreshing) {

                return authService.RefreshTokenSubject.pipe(

                    filter(token => token !== null),

                    take(1),

                    switchMap(token => {

                        const retryRequest = clonedRequest.clone({
                            setHeaders: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        return next(retryRequest);
                    })
                );
            }

            // أول Request وصل 401
            authService.IsRefreshing = true;

            authService.RefreshTokenSubject.next(null);

            return authService.refreshToken().pipe(
                switchMap(response => {
                    storageService.set('authToken', response.accessToken);
                    storageService.set('refreshToken', response.refreshToken);
                    storageService.set('expires_at', response.expiresAt.toString());
                    
                    authService.RefreshTokenSubject.next(response.accessToken);

                    const retryRequest = clonedRequest.clone({
                        setHeaders: {
                            Authorization: `Bearer ${response.accessToken}`
                        }
                    });

                    return next(retryRequest);
                }), finalize(() => {
                    authService.IsRefreshing = false;
                }), catchError(err => {
                    authService.logout();
                    return throwError(() => err);
                })
            );
        })
    );
};