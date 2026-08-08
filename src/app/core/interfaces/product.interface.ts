export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  category: Category;
  tags: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sku: string;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: number;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: number;
  name: string;
  options: VariantOption[];
}

export interface VariantOption {
  id: number;
  value: string;
  price?: number;
  inStock: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId?: number;
  children?: Category[];
}

export interface ProductReview {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: Date;
  helpful: number;
  verified: boolean;
}