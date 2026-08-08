import { Component, inject } from '@angular/core';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    @if (loadingService.isLoading()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div class="flex flex-col items-center gap-4">
          <div class="spinner"></div>
          <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SpinnerComponent {
  loadingService = inject(LoadingService);
}
