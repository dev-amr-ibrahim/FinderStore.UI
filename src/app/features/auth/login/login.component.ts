import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">Sign in to your account</p>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input type="email" formControlName="email" 
                 class="input-field" placeholder="you@example.com">
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input type="password" formControlName="password" 
                 class="input-field" placeholder="••••••••">
        </div>

        <!-- Remember Me -->
        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <input type="checkbox" formControlName="rememberMe"
                   class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
            Remember me
          </label>
          <a routerLink="/account/forgot-password" 
             class="text-sm text-primary-600 hover:text-primary-700">
            Forgot password?
          </a>
        </div>

        <!-- Submit -->
        <button type="submit" 
                class="btn-primary w-full py-3"
                [disabled]="loginForm.invalid || isLoading()">
          @if (isLoading()) {
            <span class="flex items-center justify-center gap-2">
              <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Signing in...
            </span>
          } @else {
            Sign In
          }
        </button>

        @if (errorMessage()) {
          <div class="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {{ errorMessage() }}
          </div>
        }
      </form>

      <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?
        <a routerLink="/account/register" class="text-primary-600 hover:text-primary-700 font-medium">
          Sign up
        </a>
      </p>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.loginForm.value);
    this.router.navigate(['/']);
  }
}
