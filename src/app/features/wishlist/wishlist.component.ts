import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/interfaces/product.interface';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wishlist.component.html'
})
export class WishlistComponent {
  wishlistItems = signal<Product[]>([]);

  removeFromWishlist(productId: number): void {
    this.wishlistItems.update(items => 
      items.filter(item => item.id !== productId)
    );
  }
}