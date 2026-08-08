import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product, Category } from '../interfaces/product.interface';
import { mockProducts, mockCategories } from '../../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts(params?: any): Observable<Product[]> {
    // Simulate API call
    return of(mockProducts).pipe(delay(500));
  }

  getProduct(id: number): Observable<Product | undefined> {
    return of(mockProducts.find(p => p.id === id)).pipe(delay(300));
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(mockProducts.filter(p => p.featured)).pipe(delay(300));
  }

  getNewArrivals(): Observable<Product[]> {
    return of(mockProducts.slice(-4)).pipe(delay(300));
  }

  getCategories(): Observable<Category[]> {
    return of(mockCategories).pipe(delay(200));
  }

  searchProducts(query: string): Observable<Product[]> {
    const filtered = mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    return of(filtered).pipe(delay(500));
  }
}