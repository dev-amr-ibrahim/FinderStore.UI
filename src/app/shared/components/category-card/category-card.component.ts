import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../../core/interfaces/product.interface';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="['/categories', category.id]" 
       class="card block text-center p-6 hover-lift cursor-pointer group">
      <div class="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden">
        <img [src]="category.image" [alt]="category.name" 
             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
      </div>
      <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
        {{ category.name }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ category.description }}
      </p>
    </a>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CategoryCardComponent {
  @Input({ required: true }) category!: Category;
}