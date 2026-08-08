import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">Join LUXE for premium shopping</p>

      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <!-- Name -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
            <input type="text" formControlName="firstName" class="input-field" placeholder="John">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
            <input type="text" formControlName="lastName" class="input-field" placeholder="Doe">
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input type="email" formControlName="email" class="input-field" placeholder="you@example.com">
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input type="password" formControlName="password" class="input-field" placeholder="••••••••">
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
          <input type="password" formControlName="confirmPassword" class="input-field" placeholder="••••••••">
        </div>

        <!-- Terms -->
        <label class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input type="checkbox" formControlName="acceptTerms"
                 class="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500">
          <span>I agree to the <a href="#" class="text-primary-600 hover:text-primary-700">Terms of Service</a> and <a href="#" class="text-primary-600 hover:text-primary-700">Privacy Policy</a></span>
        </label>

        <!-- Submit -->
        <button type="submit" 
                class="btn-primary w-full py-3"
                [disabled]="registerForm.invalid || isLoading()">
          @if (isLoading()) {
            <span class="flex items-center justify-center gap-2">
              <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Creating account...
            </span>
          } @else {
            Create Account
          }
        </button>

        @if (errorMessage()) {
          <div class="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {{ errorMessage() }}
          </div>
        }
      </form>

      <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?
        <a routerLink="/account/login" class="text-primary-600 hover:text-primary-700 font-medium">
          Sign in
        </a>
      </p>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');

  constructor() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.register(this.registerForm.value);
    this.router.navigate(['/']);
  }
}
