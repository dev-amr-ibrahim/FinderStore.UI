import { Component, Input, signal } from '@angular/core';
import { Product } from '../../../core/interfaces/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <div class="relative">
      
      <!-- Navigation Buttons -->
      <button (click)="previous()" 
              class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <button (click)="next()" 
              class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      
      <!-- Carousel -->
      <div class="overflow-hidden">
        <div class="flex transition-transform duration-500 ease-in-out" 
             [style.transform]="'translateX(-' + currentSlide() * 100 + '%)'">
          @for (product of products; track product.id) {
            <div class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 p-3">
              <app-product-card [product]="product" />
            </div>
          }
        </div>
      </div>
      
      <!-- Dots -->
      <div class="flex justify-center gap-2 mt-6">
        @for (dot of [].constructor(totalSlides()); track $index) {
          <button (click)="goToSlide($index)"
                  class="w-2 h-2 rounded-full transition-all duration-300"
                  [class.w-6]="$index === currentSlide()"
                  [class.bg-primary-600]="$index === currentSlide()"
                  [class.bg-gray-300]="$index !== currentSlide()">
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProductCarouselComponent {
  @Input({ required: true }) products!: Product[];
  
  currentSlide = signal(0);
  
  itemsPerSlide(): number {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1280) return 3;
    return 4;
  }

  totalSlides(): number {
    return Math.ceil(this.products.length / this.itemsPerSlide());
  }

  next(): void {
    if (this.currentSlide() < this.totalSlides() - 1) {
      this.currentSlide.update(v => v + 1);
    }
  }

  previous(): void {
    if (this.currentSlide() > 0) {
      this.currentSlide.update(v => v - 1);
    }
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }
}