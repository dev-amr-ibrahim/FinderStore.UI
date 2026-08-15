import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent)
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./features/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent)
      },
      {
        path: 'categories/:id',
        loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: 'checkout',
        loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
        canActivate: [authGuard]
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent),
        canActivate: [authGuard]
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/account/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/account/settings/settings.component').then(m => m.SettingsComponent),
        canActivate: [authGuard]
      },
      {
        path: 'search',
        loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./features/information/about.component').then(m => m.AboutComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/information/contact.component').then(m => m.ContactComponent)
      },
      {
        path: 'careers',
        loadComponent: () => import('./features/information/information-page.component').then(m => m.InformationPageComponent),
        data: { page: 'careers' }
      },
      {
        path: 'press',
        loadComponent: () => import('./features/information/information-page.component').then(m => m.InformationPageComponent),
        data: { page: 'press' }
      },
      {
        path: 'help-center',
        loadComponent: () => import('./features/information/information-page.component').then(m => m.InformationPageComponent),
        data: { page: 'help-center' }
      },
      {
        path: 'shipping-info',
        loadComponent: () => import('./features/information/information-page.component').then(m => m.InformationPageComponent),
        data: { page: 'shipping-info' }
      },
      {
        path: 'returns-exchanges',
        loadComponent: () => import('./features/information/information-page.component').then(m => m.InformationPageComponent),
        data: { page: 'returns-exchanges' }
      },
      {
        path: 'size-guide',
        loadComponent: () => import('./features/information/information-page.component').then(m => m.InformationPageComponent),
        data: { page: 'size-guide' }
      },
      {
        path: 'privacy-policy',
        loadComponent: () => import('./features/information/information-page.component').then(m => m.InformationPageComponent),
        data: { page: 'privacy-policy' }
      },
      {
        path: 'terms-of-service',
        loadComponent: () => import('./features/information/information-page.component').then(m => m.InformationPageComponent),
        data: { page: 'terms-of-service' }
      },
      {
        path: 'cookie-policy',
        loadComponent: () => import('./features/information/information-page.component').then(m => m.InformationPageComponent),
        data: { page: 'cookie-policy' }
      }
    ]
  },
  {
    path: 'account',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
