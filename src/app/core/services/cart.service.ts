import { Injectable, signal, computed, inject } from '@angular/core';
import { CartItem } from '../interfaces/order.interface';
import { ToastService } from '../../shared/components/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private toastService = inject(ToastService);
  
  private cartItems = signal<CartItem[]>([]);
  
  readonly items = this.cartItems.asReadonly();
  
  readonly itemCount = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  
  readonly subtotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );
  
  readonly tax = computed(() => this.subtotal() * 0.1);
  
  readonly total = computed(() => this.subtotal() + this.tax());

  addItem(item: CartItem): void {
    this.cartItems.update(items => {
      const existing = items.find(i => i.productId === item.productId && i.variant === item.variant);
      if (existing) {
        if (existing.quantity < existing.maxQuantity) {
          return items.map(i => 
            i.productId === item.productId && i.variant === item.variant
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return items;
      }
      return [...items, { ...item, quantity: 1 }];
    });
    this.toastService.show('Item added to cart', 'success');
  }

  removeItem(productId: number, variant?: string): void {
    this.cartItems.update(items => 
      items.filter(i => !(i.productId === productId && i.variant === variant))
    );
  }

  updateQuantity(productId: number, quantity: number, variant?: string): void {
    if (quantity < 1) {
      this.removeItem(productId, variant);
      return;
    }
    this.cartItems.update(items =>
      items.map(i =>
        i.productId === productId && i.variant === variant
          ? { ...i, quantity }
          : i
      )
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}