import { Product, Category } from '../core/interfaces/product.interface';

export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'
  },
  {
    id: 2,
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing and accessories',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'
  },
  {
    id: 3,
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Beautiful home decor',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400'
  },
  {
    id: 4,
    name: 'Beauty',
    slug: 'beauty',
    description: 'Premium beauty products',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400'
  },
  {
    id: 5,
    name: 'Sports',
    slug: 'sports',
    description: 'Sports equipment and gear',
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba220cf4?w=400'
  },
  {
    id: 6,
    name: 'Books',
    slug: 'books',
    description: 'Best-selling books',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400'
  }
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and premium comfort.',
    price: 299.99,
    compareAtPrice: 349.99,
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', alt: 'Wireless Headphones', isPrimary: true },
      { id: 2, url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600', alt: 'Headphones Side View', isPrimary: false }
    ],
    category: { id: 1, name: 'Electronics', slug: 'electronics', description: '', image: '' },
    tags: ['wireless', 'audio', 'premium'],
    variants: [
      {
        id: 1,
        name: 'Color',
        options: [
          { id: 1, value: 'Black', inStock: true },
          { id: 2, value: 'White', inStock: true },
          { id: 3, value: 'Rose Gold', inStock: false }
        ]
      }
    ],
    rating: 4.8,
    reviewCount: 2456,
    inStock: true,
    sku: 'WH-001',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'Minimalist Watch',
    description: 'Elegant minimalist watch with genuine leather strap, sapphire crystal glass, and Japanese quartz movement.',
    price: 199.99,
    compareAtPrice: 249.99,
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', alt: 'Minimalist Watch', isPrimary: true }
    ],
    category: { id: 2, name: 'Fashion', slug: 'fashion', description: '', image: '' },
    tags: ['watch', 'accessories', 'minimalist'],
    variants: [
      {
        id: 1,
        name: 'Strap Color',
        options: [
          { id: 1, value: 'Brown', inStock: true },
          { id: 2, value: 'Black', inStock: true }
        ]
      }
    ],
    rating: 4.9,
    reviewCount: 1234,
    inStock: true,
    sku: 'MW-002',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: 'Smart Home Speaker',
    description: 'Voice-controlled smart speaker with premium sound quality, smart home integration, and elegant design.',
    price: 149.99,
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600', alt: 'Smart Speaker', isPrimary: true }
    ],
    category: { id: 1, name: 'Electronics', slug: 'electronics', description: '', image: '' },
    tags: ['smart home', 'audio', 'voice control'],
    variants: [
      {
        id: 1,
        name: 'Color',
        options: [
          { id: 1, value: 'Charcoal', inStock: true },
          { id: 2, value: 'Glacier White', inStock: true }
        ]
      }
    ],
    rating: 4.7,
    reviewCount: 3421,
    inStock: true,
    sku: 'SS-003',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    name: 'Leather Backpack',
    description: 'Handcrafted Italian leather backpack with laptop compartment, perfect for daily commute and travel.',
    price: 249.99,
    compareAtPrice: 299.99,
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600', alt: 'Leather Backpack', isPrimary: true }
    ],
    category: { id: 2, name: 'Fashion', slug: 'fashion', description: '', image: '' },
    tags: ['leather', 'bag', 'travel'],
    variants: [
      {
        id: 1,
        name: 'Color',
        options: [
          { id: 1, value: 'Brown', inStock: true },
          { id: 2, value: 'Black', inStock: true },
          { id: 3, value: 'Tan', inStock: true }
        ]
      }
    ],
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    sku: 'LB-004',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    name: 'Silk Scarf Collection',
    description: '100% pure silk scarf with hand-painted designs. Each piece is unique and crafted by artisans.',
    price: 89.99,
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600', alt: 'Silk Scarf', isPrimary: true }
    ],
    category: { id: 2, name: 'Fashion', slug: 'fashion', description: '', image: '' },
    tags: ['silk', 'accessories', 'handmade'],
    variants: [
      {
        id: 1,
        name: 'Design',
        options: [
          { id: 1, value: 'Floral', inStock: true },
          { id: 2, value: 'Geometric', inStock: true },
          { id: 3, value: 'Abstract', inStock: true }
        ]
      }
    ],
    rating: 4.5,
    reviewCount: 456,
    inStock: true,
    sku: 'SC-005',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    name: 'Ceramic Tea Set',
    description: 'Hand-thrown ceramic tea set with 6 cups and teapot. Microwave and dishwasher safe.',
    price: 129.99,
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600', alt: 'Ceramic Tea Set', isPrimary: true }
    ],
    category: { id: 3, name: 'Home & Living', slug: 'home-living', description: '', image: '' },
    tags: ['ceramic', 'kitchen', 'handmade'],
    variants: [],
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    sku: 'CTS-006',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    name: 'Organic Face Serum',
    description: 'Vitamin C and hyaluronic acid serum for radiant, youthful skin. 100% organic ingredients.',
    price: 59.99,
    compareAtPrice: 79.99,
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee89d7?w=600', alt: 'Face Serum', isPrimary: true }
    ],
    category: { id: 4, name: 'Beauty', slug: 'beauty', description: '', image: '' },
    tags: ['organic', 'skincare', 'beauty'],
    variants: [],
    rating: 4.7,
    reviewCount: 1567,
    inStock: true,
    sku: 'OFS-007',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    name: 'Yoga Mat Premium',
    description: 'Extra thick, non-slip yoga mat with alignment lines. Eco-friendly TPE material.',
    price: 79.99,
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600', alt: 'Yoga Mat', isPrimary: true }
    ],
    category: { id: 5, name: 'Sports', slug: 'sports', description: '', image: '' },
    tags: ['yoga', 'fitness', 'eco-friendly'],
    variants: [
      {
        id: 1,
        name: 'Color',
        options: [
          { id: 1, value: 'Purple', inStock: true },
          { id: 2, value: 'Blue', inStock: true },
          { id: 3, value: 'Green', inStock: true }
        ]
      }
    ],
    rating: 4.6,
    reviewCount: 987,
    inStock: true,
    sku: 'YMP-008',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];