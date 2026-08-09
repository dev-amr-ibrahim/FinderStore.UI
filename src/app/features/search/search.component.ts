import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/interfaces/product.interface';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" (click)="onSearchAreaClick($event)">
      <!-- Search Input -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="relative">
          <input type="text" 
                 [(ngModel)]="searchQuery"
                 (ngModelChange)="onSearch($event)"
                 placeholder="Search products..." 
                 class="input-field text-lg pl-12 pr-4 py-4">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Results -->
      @if (searchQuery()) {
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{ results().length }} results for "{{ searchQuery() }}"
        </p>
        
        @if (results().length > 0) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            @for (product of results(); track product.id) {
              <app-product-card [product]="product" />
            }
          </div>
        } @else {
          <div class="text-center py-16">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Results Found</h3>
            <p class="text-gray-600 dark:text-gray-400">Try different keywords or browse categories.</p>
          </div>
        }
      } @else {
        <div class="text-center py-16">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Search Products</h3>
          <p class="text-gray-600 dark:text-gray-400">Type to find what you're looking for.</p>
        </div>
      }
    </div>
  `
})
export class SearchComponent {
  private productService = inject(ProductService);
  private searchSubject = new Subject<string>();
  
  searchQuery = signal('');
  results = signal<Product[]>([]);
  close = output<void>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      if (query) {
        this.productService.searchProducts(query).subscribe(products => {
          this.results.set(products);
        });
      } else {
        this.results.set([]);
      }
    });
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.searchSubject.next(query);
  }

  onSearchAreaClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (target?.closest('a[href]')) {
      this.close.emit();
    }
  }
}
