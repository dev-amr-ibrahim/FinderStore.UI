import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './settings.component.html',
  styles: [`.toggle-row { display:flex; gap: .75rem; align-items:flex-start; cursor:pointer; color:#374151; } .toggle-row input { margin-top:.2rem; height:1rem; width:1rem; accent-color:#ea580c; } .toggle-row b { display:block; font-size:.875rem; font-weight:600; } .toggle-row small { display:block; margin-top:.15rem; color:#6b7280; } :host-context(.dark) .toggle-row { color:#e5e7eb; } :host-context(.dark) .toggle-row small { color:#9ca3af; }`]
})
export class SettingsComponent {
  private readonly fb = inject(FormBuilder);
  readonly saved = signal(false);
  readonly settingsForm = this.fb.group({
    orderUpdates: [true],
    deliveryUpdates: [true],
    promotions: [false],
    emailReceipts: [true],
    personalisedRecommendations: [true]
  });

  constructor() {
    const saved = localStorage.getItem('account-settings');
    if (saved) {
      try { this.settingsForm.patchValue(JSON.parse(saved)); } catch { localStorage.removeItem('account-settings'); }
    }
  }

  save(): void {
    localStorage.setItem('account-settings', JSON.stringify(this.settingsForm.getRawValue()));
    this.saved.set(true);
  }
}
