import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          @if (categoryId()) {
            {{ categoryName() }}
          } @else {
            All Products
          }
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ products().length }} products found
        </p>
      </div>

      <!-- Filters Bar -->
      <div class="flex flex-wrap items-center gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <select class="input-field w-auto" (change)="sortProducts($event)">
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
        
        <select class="input-field w-auto" (change)="filterByCategory($event)">
          <option value="">All Categories</option>
          <option value="1">Electronics</option>
          <option value="2">Fashion</option>
          <option value="3">Home & Living</option>
          <option value="4">Beauty</option>
          <option value="5">Sports</option>
          <option value="6">Books</option>
        </select>
      </div>

      <!-- Products Grid -->
      @if (products().length > 0) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          @for (product of products(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      } @else {
        <div class="text-center py-16">
          <div class="text-6xl mb-4">📦</div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Products Found</h3>
          <p class="text-gray-600 dark:text-gray-400">Try adjusting your filters or search criteria.</p>
        </div>
      }
    </div>
  `
})
export class ProductListComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  
  products = signal<Product[]>([]);
  categoryId = signal<string | null>(null);
  categoryName = signal<string>('All Products');

  constructor() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.categoryId.set(params['id']);
        this.loadProductsByCategory(Number(params['id']));
      } else {
        this.loadAllProducts();
      }
    });

    // If no category param, load all
    if (!this.categoryId()) {
      this.loadAllProducts();
    }
  }

  private loadAllProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products.set(products);
    });
  }

  private loadProductsByCategory(categoryId: number): void {
    this.productService.getProducts().subscribe(products => {
      const filtered = products.filter(p => p.category.id === categoryId);
      this.products.set(filtered);
      if (filtered.length > 0) {
        this.categoryName.set(filtered[0].category.name);
      }
    });
  }

  sortProducts(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const currentProducts = [...this.products()];
    
    switch (value) {
      case 'price-low':
        currentProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        currentProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        currentProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        currentProducts.sort((a, b) => b.id - a.id);
    }
    
    this.products.set(currentProducts);
  }

  filterByCategory(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value) {
      this.loadProductsByCategory(Number(value));
    } else {
      this.loadAllProducts();
    }
  }
}