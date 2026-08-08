import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { ProductCarouselComponent } from '../../shared/components/product-carousel/product-carousel.component';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { ProductService } from '../../core/services/product.service';
import { Product, Category } from '../../core/interfaces/product.interface';
import { SliderComponent } from '../../shared/components/slider/slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCarouselComponent, CategoryCardComponent, SliderComponent],
  template: `
    <div class="animate-fade-in">
      <!-- Hero Slideshow -->
        <app-slider />
      
      <!-- Trust Badges -->
      <section class="bg-gray-50 border-t border-gray-200 dark:bg-gray-800 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="text-4xl mb-3">✨</div>
              <h3 class="font-semibold text-gray-900 dark:text-white">Premium Quality</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Curated products</p>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-3">🚚</div>
              <h3 class="font-semibold text-gray-900 dark:text-white">Free Shipping</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Orders over $50</p>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-3">🔒</div>
              <h3 class="font-semibold text-gray-900 dark:text-white">Secure Payment</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">256-bit SSL</p>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-3">↩️</div>
              <h3 class="font-semibold text-gray-900 dark:text-white">Easy Returns</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">30-day policy</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center mb-8">
          <h2 class="w-full text-center text-3xl font-display font-bold text-gray-900 dark:text-white">
            Featured Products
          </h2>
        </div>
      <app-product-carousel [products]="featuredProducts()" />
      </section>

      <!-- Categories -->
      <section class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 text-center">
            Shop by Category
          </h2>
          
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            @for (category of categories(); track category.id) {
              <app-category-card [category]="category" />
            }
          </div>
        </div>
      </section>

      <!-- New Arrivals Carousel -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-display font-bold text-gray-900 dark:text-white">
            New Arrivals
          </h2>
          <a routerLink="/products" class="text-primary-600 hover:text-primary-700 font-medium">
            View All →
          </a>
        </div>
        
        <app-product-carousel [products]="newArrivals()" />
      </section>

    </div>
  `
})
export class HomeComponent {
  private productService = inject(ProductService);

  featuredProducts = signal<Product[]>([]);
  newArrivals = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts.set(products);
    });

    this.productService.getNewArrivals().subscribe(products => {
      this.newArrivals.set(products);
    });

    this.productService.getCategories().subscribe(categories => {
      this.categories.set(categories);
    });
  }
}
