import { Component, inject, signal, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
    
    :host-context(.dark) .glass-nav {
      background: rgba(17, 24, 39, 0.8);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .scrolled {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .user-dropdown {
      background-color: #ffffff;
      color: #374151;
    }

    :host-context(.dark) .user-dropdown {
      background-color: #1f2937;
      border-color: #374151;
      color: #e5e7eb;
    }

    :host-context(.dark) .user-dropdown .user-menu-item:hover {
      background-color: #374151;
      color: #ffffff;
    }
  `]
})
export class NavbarComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  private router = inject(Router);
  
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);
  searchOpen = signal(false);
  userMenuOpen = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 0);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (this.searchOpen() && !target?.closest('app-search, [data-search-trigger]')) {
      this.searchOpen.set(false);
    }

    if (this.userMenuOpen() && !target?.closest('[data-user-menu]')) {
      this.userMenuOpen.set(false);
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  toggleSearch(): void {
    this.searchOpen.update(v => !v);
  }

  toggleUserMenu(): void {
    this.userMenuOpen.update(v => !v);
  }

  closeUserMenu(): void {
    this.userMenuOpen.set(false);
  }

  signOut(): void {
    this.authService.logout();
    this.closeUserMenu();
    this.router.navigate(['/']);
  }

  userName(): string {
    const user = this.authService.currentUser() as { name?: string; fullname?: string } | null;
    return user?.name || user?.fullname || 'Account';
  }

  toggleLanguage(): void {
    const newLang = this.themeService.language() === 'en' ? 'ar' : 'en';
    this.themeService.setLanguage(newLang);
  }
}
