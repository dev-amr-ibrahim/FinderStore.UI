import { Component, inject, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { SearchComponent } from '../../../features/search/search.component';
import { MegaMenuComponent } from '../mega-menu/mega-menu.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, SearchComponent, MegaMenuComponent],
  templateUrl: './navbar.component.html',
  styles: [`
    .glass-nav {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .dark .glass-nav {
      background: rgba(17, 24, 39, 0.8);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .scrolled {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class NavbarComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);
  searchOpen = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 0);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  toggleSearch(): void {
    this.searchOpen.update(v => !v);
  }

  toggleLanguage(): void {
    const newLang = this.themeService.language() === 'en' ? 'ar' : 'en';
    this.themeService.setLanguage(newLang);
  }
}
