import { Component, inject, signal } from '@angular/core';
import { FormArray, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { CustomerService } from '../../../core/services/customer.service';
import { ProfileAddressRequest, UpdateProfileRequest } from '../../../core/models/update-profile-request';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { AddressType } from '../../../core/interfaces/user.interface';

type Address = {
  label: string;
  recipient: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styles: [`.field { margin-top: .375rem; width: 100%; border-radius: .5rem; border: 1px solid #d1d5db; background: white; padding: .625rem .75rem; color: #111827; outline: none; } .field:focus { border-color: #f97316; box-shadow: 0 0 0 2px #ffedd5; } :host-context(.dark) .field { border-color: #4b5563; background: #111827; color: white; }`]
})
export class ProfileComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly customerService = inject(CustomerService);
  private readonly toast = inject(ToastService);
  readonly saved = signal(false);
  readonly submitting = signal(false);
  readonly submitError = signal<string | null>(null);

  readonly profileForm = this.fb.group({
    name: [this.authService.currentUser()?.fullname ?? '', [Validators.required, Validators.minLength(2)]],
    email: [this.authService.currentUser()?.email ?? '', [Validators.required, Validators.email]],
    phone1: ['', [Validators.required, Validators.pattern(/^\+?[0-9][0-9\s()-]{6,19}$/)]],
    phone2: [''],
    addresses: this.fb.array<any>([])
  });

   constructor() {
    // const user = this.authService.currentUser();
    // if (user?.phone) this.profileForm.controls.phone1.setValue(user.phone);
    // if (user?.bakedUpPhone) this.profileForm.controls.phone2.setValue(user.bakedUpPhone);
    // user?.addresses?.forEach(address => this.addAddress({
    //   label: address.type === AddressType.BILLING ? 'Billing' : 'Home',
    //   recipient: `${address.firstName} ${address.lastName}`.trim(),
    //   line1: address.address1,
    //   line2: address.address2,
    //   city: address.city,
    //   region: address.state,
    //   postalCode: address.zipCode,
    //   country: address.country
    // }));
    // if (!this.addresses.length) this.addAddress();

     this.GetUserProfile();
  }

  get addresses(): FormArray {
    return this.profileForm.controls.addresses;
  }

  addAddress(address?: Partial<Address>): void {
    this.addresses.push(this.fb.group({
      label: [address?.label ?? 'Home', Validators.required],
      recipient: [address?.recipient ?? this.profileForm.controls.name.value ?? '', Validators.required],
      line1: [address?.line1 ?? '', Validators.required],
      line2: [address?.line2 ?? ''],
      city: [address?.city ?? '', Validators.required],
      region: [address?.region ?? ''],
      postalCode: [address?.postalCode ?? ''],
      country: [address?.country ?? '', Validators.required]
    }));
  }

  removeAddress(index: number): void {
    if (this.addresses.length > 1) this.addresses.removeAt(index);
  }

  save(): void {
    this.saved.set(false);
    this.submitError.set(null);
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.submitError.set('Please correct the highlighted fields and try again.');
      return;
    }

    const value = this.profileForm.getRawValue();
    const request: UpdateProfileRequest = {
      fullName: value.name.trim(),
      email: value.email.trim(),
      phone: value.phone1.trim(),
      backupPhone: value.phone2.trim() || undefined,
      addresses: (value.addresses as Address[]).map(address => this.toAddressRequest(address))
    };

    this.submitting.set(true);
    this.authService.updateProfile(request).pipe(
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.saved.set(true);
        this.profileForm.markAsPristine();
        this.toast.show('Your profile has been updated.', 'success');
      },
      error: error => {
        const message = error?.error?.message ?? 'We could not update your profile. Please try again.';
        this.submitError.set(message);
        this.toast.show(message, 'error');
      }
    });
  }

  hasError(controlName: 'name' | 'email' | 'phone1', error: string): boolean {
    const control = this.profileForm.controls[controlName];
    return control.touched && control.hasError(error);
  }

  private toAddressRequest(address: Address): ProfileAddressRequest {
    return {
      label: address.label.trim(),
      recipient: address.recipient.trim(),
      line1: address.line1.trim(),
      line2: address.line2?.trim() || undefined,
      city: address.city.trim(),
      region: address.region.trim() || undefined,
      postalCode: address.postalCode.trim() || undefined,
      country: address.country.trim()
    };
  }

  private GetUserProfile(): void {
    this.customerService.getUserProfile().subscribe({
      next: (profile) => {
        this.profileForm.patchValue({
          name: profile.fullName,
          email: profile.email,
          phone1: profile.phone,
          phone2: profile.backupPhone
        });

        profile.addresses.forEach(address => {
          this.addAddress(address);
        });
      },
      error: (error) => {
        const message = error?.error?.message ?? 'Unable to fetch user profile. Please try again.';
        this.toast.show(message, 'error');
      }
    });
  }

}
