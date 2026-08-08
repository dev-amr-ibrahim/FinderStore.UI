import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/interfaces/product.interface';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="card hover-lift group cursor-pointer">
      <a [routerLink]="['/products', product.id]" class="block">
        <div class="relative overflow-hidden rounded-t-2xl">
          <img [src]="product.images[0]?.url" [alt]="product.name" 
               class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500">
          
          @if (product.compareAtPrice) {
            <span class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              -{{ calculateDiscount() }}% OFF
            </span>
          }
          
          @if (!product.inStock) {
            <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span class="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          }
        </div>
      </a>
      
      <div class="p-5">
        <div class="flex items-center gap-2 mb-2">
          @for (star of [1,2,3,4,5]; track star) {
            <svg class="w-4 h-4" [class.text-yellow-400]="star <= product.rating" 
                 [class.text-gray-300]="star > product.rating" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          }
          <span class="text-sm text-gray-500 dark:text-gray-400">({{ product.reviewCount }})</span>
        </div>
        
        <a [routerLink]="['/products', product.id]">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
            {{ product.name }}
          </h3>
        </a>
        
        <div class="flex items-center justify-between mt-4">
          <div>
            <span class="text-xl font-bold text-primary-600 dark:text-primary-400">
              \${{ product.price.toFixed(2) }}
            </span>
            @if (product.compareAtPrice) {
              <span class="text-sm text-gray-400 line-through ml-2">
                \${{ product.compareAtPrice.toFixed(2) }}
              </span>
            }
          </div>
          
          <button (click)="addToCart($event)" 
                  [disabled]="!product.inStock"
                  class="p-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  private cartService = inject(CartService);

  calculateDiscount(): number {
    if (!this.product.compareAtPrice) return 0;
    return Math.round(((this.product.compareAtPrice - this.product.price) / this.product.compareAtPrice) * 100);
  }

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.cartService.addItem({
      productId: this.product.id,
      name: this.product.name,
      image: this.product.images[0]?.url || '',
      price: this.product.price,
      quantity: 1,
      maxQuantity: 10
    });
  }
}
