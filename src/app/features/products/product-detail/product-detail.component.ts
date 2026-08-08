import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      @if (product(); as productData) {
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Product Images -->
          <div class="space-y-4">
            <div class="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
              <img [src]="selectedImage()" 
                   [alt]="productData.name"
                   class="w-full h-[500px] object-cover">
              
              @if (productData.compareAtPrice) {
                <span class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  -{{ discountPercentage() }}% OFF
                </span>
              }
            </div>
            
            <!-- Thumbnail Gallery -->
            @if (productData.images.length > 1) {
              <div class="grid grid-cols-4 gap-2">
                @for (image of productData.images; track image.id) {
                  <button (click)="selectedImage.set(image.url)"
                          class="relative overflow-hidden rounded-lg border-2 transition-all"
                          [class.border-primary-500]="selectedImage() === image.url"
                          [class.border-transparent]="selectedImage() !== image.url">
                    <img [src]="image.url" [alt]="image.alt" 
                         class="w-full h-24 object-cover hover:opacity-75 transition-opacity">
                  </button>
                }
              </div>
            }
          </div>

          <!-- Product Info -->
          <div class="space-y-6">
            <!-- Breadcrumb -->
            <nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <a routerLink="/" class="hover:text-primary-600 transition-colors">Home</a>
              <span>/</span>
              <a routerLink="/products" class="hover:text-primary-600 transition-colors">Products</a>
              <span>/</span>
              <a [routerLink]="['/categories', productData.category.id]" 
                 class="hover:text-primary-600 transition-colors">{{ productData.category.name }}</a>
              <span>/</span>
              <span class="text-gray-900 dark:text-white">{{ productData.name }}</span>
            </nav>

            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {{ productData.name }}
            </h1>

            <!-- Rating -->
            <div class="flex items-center gap-2">
              <div class="flex">
                @for (star of [1,2,3,4,5]; track star) {
                  <svg class="w-5 h-5" 
                       [class.text-yellow-400]="star <= productData.rating"
                       [class.text-gray-300]="star > productData.rating"
                       fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                }
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                ({{ productData.reviewCount }} reviews)
              </span>
            </div>

            <!-- Price -->
            <div class="flex items-baseline gap-3">
              <span class="text-4xl font-bold text-primary-600 dark:text-primary-400">
                \${{ productData.price.toFixed(2) }}
              </span>
              @if (productData.compareAtPrice) {
                <span class="text-xl text-gray-400 line-through">
                  \${{ productData.compareAtPrice.toFixed(2) }}
                </span>
                <span class="text-sm font-semibold text-green-500">
                  Save \${{ savingsAmount().toFixed(2) }}
                </span>
              }
            </div>

            <!-- Description -->
            <div class="prose dark:prose-invert">
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ productData.description }}
              </p>
            </div>

            <!-- Variants -->
            @if (productData.variants.length > 0) {
              <div class="space-y-4">
                @for (variant of productData.variants; track variant.id) {
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {{ variant.name }}
                    </label>
                    <div class="flex flex-wrap gap-2">
                      @for (option of variant.options; track option.id) {
                        <button (click)="selectVariant(variant.id, option.id)"
                                class="px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium"
                                [class.border-primary-500]="getSelectedVariant(variant.id) === option.id"
                                [class.bg-primary-50]="getSelectedVariant(variant.id) === option.id"
                                [class.text-primary-700]="getSelectedVariant(variant.id) === option.id"
                                [class.border-gray-200]="getSelectedVariant(variant.id) !== option.id"
                                [class.text-gray-700]="getSelectedVariant(variant.id) !== option.id"
                                [class.opacity-50]="!option.inStock"
                                [class.cursor-not-allowed]="!option.inStock"
                                [disabled]="!option.inStock">
                          {{ option.value }}
                          @if (!option.inStock) {
                            <span class="text-xs block">Out of Stock</span>
                          }
                        </button>
                      }
                    </div>
                  </div>
                }
              </div>
            }

            <!-- Quantity -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quantity
              </label>
              <div class="flex items-center gap-3">
                <button (click)="decrementQuantity()"
                        class="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        [disabled]="quantity() <= 1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
                <span class="w-16 text-center text-lg font-semibold">{{ quantity() }}</span>
                <button (click)="incrementQuantity()"
                        class="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Add to Cart -->
            <button (click)="addToCart()" 
                    class="w-full btn-primary text-lg py-4"
                    [disabled]="!productData.inStock">
              @if (productData.inStock) {
                Add to Cart - \${{ totalPrice().toFixed(2) }}
              } @else {
                Out of Stock
              }
            </button>

            <!-- SKU & Tags -->
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                SKU: {{ productData.sku }}
              </p>
              @if (productData.tags.length > 0) {
                <div class="flex flex-wrap gap-2">
                  @for (tag of productData.tags; track tag) {
                    <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      {{ tag }}
                    </span>
                  }
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="mt-16">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Customer Reviews
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Review Summary -->
            <div class="card p-6 text-center">
              <div class="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {{ productData.rating }}
              </div>
              <div class="flex justify-center mb-2">
                @for (star of [1,2,3,4,5]; track star) {
                  <svg class="w-5 h-5" 
                       [class.text-yellow-400]="star <= productData.rating"
                       [class.text-gray-300]="star > productData.rating"
                       fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                }
              </div>
              <p class="text-sm text-gray-500">{{ productData.reviewCount }} reviews</p>
            </div>

            <!-- Review List -->
            <div class="md:col-span-2 space-y-4">
              <div class="card p-6">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span class="text-primary-600 font-semibold">JD</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">John Doe</p>
                    <p class="text-sm text-gray-500">Verified Purchase</p>
                  </div>
                </div>
                <div class="flex mb-2">
                  @for (star of [1,2,3,4,5]; track star) {
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  }
                </div>
                <p class="text-gray-600 dark:text-gray-400">
                  Amazing product! The quality exceeded my expectations. Would definitely recommend.
                </p>
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="flex items-center justify-center py-32">
          <div class="text-center">
            <div class="spinner mx-auto mb-4"></div>
            <p class="text-gray-600 dark:text-gray-400">Loading product details...</p>
          </div>
        </div>
      }
    </div>
  `
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product = signal<Product | undefined>(undefined);
  selectedImage = signal<string>('');
  quantity = signal(1);
  selectedVariants = signal<Record<number, number>>({});

  // استخدام computed signals بدل الحساب المباشر في template
  discountPercentage = computed(() => {
    const p = this.product();
    if (!p?.compareAtPrice) return 0;
    return Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
  });

  savingsAmount = computed(() => {
    const p = this.product();
    if (!p?.compareAtPrice) return 0;
    return p.compareAtPrice - p.price;
  });

  totalPrice = computed(() => {
    const p = this.product();
    if (!p) return 0;
    return p.price * this.quantity();
  });

  constructor() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.loadProduct(id);
    });
  }

  private loadProduct(id: number): void {
    this.product.set(undefined); // Reset product
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        if (product) {
          this.product.set(product);
          if (product.images.length > 0) {
            this.selectedImage.set(product.images[0].url);
          }
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        // Handle error - show error state
      }
    });
  }

  getSelectedVariant(variantId: number): number | undefined {
    return this.selectedVariants()[variantId];
  }

  selectVariant(variantId: number, optionId: number): void {
    this.selectedVariants.update(variants => ({
      ...variants,
      [variantId]: optionId
    }));
  }

  incrementQuantity(): void {
    this.quantity.update(q => Math.min(q + 1, 10)); // Max 10 items
  }

  decrementQuantity(): void {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  addToCart(): void {
    const productData = this.product();
    if (!productData) return;
    
    this.cartService.addItem({
      productId: productData.id,
      name: productData.name,
      image: productData.images[0]?.url || '',
      price: productData.price,
      quantity: this.quantity(),
      maxQuantity: 10
    });

    // Reset quantity after adding to cart
    this.quantity.set(1);
  }
}