import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly theme = signal<ThemeMode>(this.getInitialTheme());
  readonly language = signal<Language>(this.getInitialLanguage());
  readonly direction = signal<Direction>(this.language() === 'ar' ? 'rtl' : 'ltr');

  constructor() {
    effect(() => {
      this.applyTheme(this.theme());
    });

    effect(() => {
      this.direction.set(this.language() === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.dir = this.direction();
      document.documentElement.lang = this.language();
      localStorage.setItem('language', this.language());
    });
  }

  private getInitialTheme(): ThemeMode {
    const stored = localStorage.getItem('theme') as ThemeMode;
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private getInitialLanguage(): Language {
    return (localStorage.getItem('language') as Language) || 'en';
  }

  toggleTheme(): void {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }

  setLanguage(lang: Language): void {
    this.language.set(lang);
  }

  private applyTheme(theme: ThemeMode): void {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }
}