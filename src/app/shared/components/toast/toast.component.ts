import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);

  getToastClasses(type: string): string {
    const baseClasses = 'px-4 py-3 rounded-xl shadow-xl backdrop-blur-lg border max-w-sm';
    
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-50/90 dark:bg-green-900/90 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200`;
      case 'error':
        return `${baseClasses} bg-red-50/90 dark:bg-red-900/90 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200`;
      case 'warning':
        return `${baseClasses} bg-yellow-50/90 dark:bg-yellow-900/90 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200`;
      default:
        return `${baseClasses} bg-blue-50/90 dark:bg-blue-900/90 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200`;
    }
  }
}