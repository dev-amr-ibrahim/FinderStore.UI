import { Component, signal, effect, OnDestroy, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

interface Slide {
  id: number;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  mobileImage: string;
  ctaText: string;
  ctaTextAr: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaTextAr: string;
  secondaryCtaLink: string;
  gradient: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="relative w-full h-screen overflow-hidden">
      <!-- Slides Container -->
      <div class="relative w-full h-full">
        @for (slide of slides; track slide.id) {
          <div class="absolute inset-0 transition-all duration-1000 ease-in-out"
               [class.opacity-100]="currentSlide() === $index"
               [class.opacity-0]="currentSlide() !== $index"
               [class.scale-100]="currentSlide() === $index"
               [class.scale-110]="currentSlide() !== $index">
            
            <!-- Background Image - Desktop -->
            <div class="absolute inset-0 hidden md:block">
              <img [src]="slide.image" 
                   [alt]="getLocalizedText(slide.title, slide.titleAr)"
                   class="w-full h-full object-cover transition-all duration-[2s]"
                   [class.scale-110]="currentSlide() === $index"
                   [class.scale-100]="currentSlide() !== $index"
                   loading="eager">
            </div>

            <!-- Background Image - Mobile -->
            <div class="absolute inset-0 md:hidden">
              <img [src]="slide.mobileImage || slide.image" 
                   [alt]="getLocalizedText(slide.title, slide.titleAr)"
                   class="w-full h-full object-cover transition-all duration-[2s]"
                   [class.scale-110]="currentSlide() === $index"
                   [class.scale-100]="currentSlide() !== $index"
                   loading="eager">
            </div>

            <!-- Gradient Overlay -->
            <div [class]="slide.gradient" class="absolute inset-0 transition-opacity duration-1000"></div>

            <!-- Content Overlay -->
            <div class="relative h-full">
              <div class="absolute inset-0 flex items-center"
                   [class.justify-start]="direction() === 'ltr'"
                   [class.justify-end]="direction() === 'rtl'">
                
                <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                     [class.text-left]="direction() === 'ltr'"
                     [class.text-right]="direction() === 'rtl'">
                  
                  <div class="max-w-2xl"
                       [class.ml-0]="direction() === 'ltr'"
                       [class.mr-0]="direction() === 'rtl'"
                       [class.mr-auto]="direction() === 'ltr'"
                       [class.ml-auto]="direction() === 'rtl'">
                    
                    <!-- Animated Content Container -->
                    <div class="space-y-4 sm:space-y-6 md:space-y-8"
                         [class.translate-y-0]="currentSlide() === $index"
                         [class.translate-y-10]="currentSlide() !== $index"
                         [class.opacity-100]="currentSlide() === $index"
                         [class.opacity-0]="currentSlide() !== $index"
                         style="transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1)">
                      
                      <!-- Badge -->
                      <div class="inline-block">
                        <span class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white text-xs sm:text-sm font-medium border border-white/20 shadow-lg">
                          <span class="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
                          {{ getLocalizedText(slide.subtitle, slide.subtitleAr) }}
                        </span>
                      </div>

                      <!-- Title -->
                      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-tight md:leading-tight lg:leading-tight"
                          [class.text-left]="direction() === 'ltr'"
                          [class.text-right]="direction() === 'rtl'">
                        {{ getLocalizedText(slide.title, slide.titleAr) }}
                      </h1>

                      <!-- Description -->
                      <p class="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-lg"
                         [class.text-left]="direction() === 'ltr'"
                         [class.text-right]="direction() === 'rtl'"
                         [class.mr-auto]="direction() === 'ltr'"
                         [class.ml-auto]="direction() === 'rtl'">
                        {{ getLocalizedText(slide.description, slide.descriptionAr) }}
                      </p>

                      <!-- CTA Buttons -->
                      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
                           [class.justify-start]="direction() === 'ltr'"
                           [class.justify-end]="direction() === 'rtl'">
                        
                        <!-- Primary CTA -->
                        <a [routerLink]="slide.ctaLink"
                           class="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/20 text-sm sm:text-base"
                           [class.flex-row]="direction() === 'ltr'"
                           [class.flex-row-reverse]="direction() === 'rtl'">
                          <span>{{ getLocalizedText(slide.ctaText, slide.ctaTextAr) }}</span>
                          <svg class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300"
                               [class.ml-2]="direction() === 'ltr'"
                               [class.mr-2]="direction() === 'rtl'"
                               [class.group-hover:translate-x-1]="direction() === 'ltr'"
                               [class.group-hover:-translate-x-1]="direction() === 'rtl'"
                               fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  [attr.d]="direction() === 'ltr' ? 'M17 8l4 4m0 0l-4 4m4-4H3' : 'M7 8l-4 4m0 0l4 4m-4-4h14'"/>
                          </svg>
                        </a>

                        <!-- Secondary CTA -->
                        <a [routerLink]="slide.secondaryCtaLink"
                           class="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                           [class.flex-row]="direction() === 'ltr'"
                           [class.flex-row-reverse]="direction() === 'rtl'">
                          <span>{{ getLocalizedText(slide.secondaryCtaText, slide.secondaryCtaTextAr) }}</span>
                          <svg class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300"
                               [class.ml-2]="direction() === 'ltr'"
                               [class.mr-2]="direction() === 'rtl'"
                               [class.group-hover:translate-x-1]="direction() === 'ltr'"
                               [class.group-hover:-translate-x-1]="direction() === 'rtl'"
                               fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  [attr.d]="direction() === 'ltr' ? 'M17 8l4 4m0 0l-4 4m4-4H3' : 'M7 8l-4 4m0 0l4 4m-4-4h14'"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Navigation Arrows -->
      <button (click)="previousSlide()"
              [class.left-3]="direction() === 'ltr'"
              [class.right-3]="direction() === 'rtl'"
              [class.sm:left-6]="direction() === 'ltr'"
              [class.sm:right-6]="direction() === 'rtl'"
              [class.md:left-8]="direction() === 'ltr'"
              [class.md:right-8]="direction() === 'rtl'"
              class="absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/20 hover:scale-110 shadow-lg">
        <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                [attr.d]="direction() === 'ltr' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'"/>
        </svg>
      </button>

      <button (click)="nextSlide()"
              [class.right-3]="direction() === 'ltr'"
              [class.left-3]="direction() === 'rtl'"
              [class.sm:right-6]="direction() === 'ltr'"
              [class.sm:left-6]="direction() === 'rtl'"
              [class.md:right-8]="direction() === 'ltr'"
              [class.md:left-8]="direction() === 'rtl'"
              class="absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/20 hover:scale-110 shadow-lg">
        <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                [attr.d]="direction() === 'ltr' ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'"/>
        </svg>
      </button>

      <!-- Progress Indicators - Bottom -->
      <div class="absolute bottom-8 sm:bottom-10 md:bottom-12 left-0 right-0 z-20 px-4 sm:px-6 md:px-8">
        <div class="max-w-7xl mx-auto">
          <!-- Progress Bars -->
          <div class="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
            @for (slide of slides; track slide.id) {
              <button (click)="goToSlide($index)"
                      class="flex-1 h-1 sm:h-1.5 rounded-full transition-all duration-300 overflow-hidden"
                      [class.bg-white/30]="$index !== currentSlide()"
                      [class.bg-white]="$index === currentSlide()">
                @if ($index === currentSlide()) {
                  <div class="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full animate-[progress_5s_linear]"></div>
                }
              </button>
            }
          </div>

          <!-- Dots & Slide Info - Mobile -->
          <div class="flex items-center justify-between md:hidden">
            <div class="flex gap-2">
              @for (slide of slides; track slide.id) {
                <button (click)="goToSlide($index)"
                        class="w-2 h-2 rounded-full transition-all duration-300"
                        [class.w-6]="$index === currentSlide()"
                        [class.bg-white]="$index === currentSlide()"
                        [class.bg-white/50]="$index !== currentSlide()">
                </button>
              }
            </div>
            <span class="text-white/70 text-xs font-medium">
              {{ currentSlide() + 1 }} / {{ slides.length }}
            </span>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
        <div class="w-6 h-10 sm:w-8 sm:h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5 sm:p-2">
          <div class="w-1.5 h-2 sm:h-3 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute top-20 right-10 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div class="absolute bottom-20 left-10 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse pointer-events-none" style="animation-delay: 2s;"></div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    @keyframes progress {
      from {
        width: 0%;
      }
      to {
        width: 100%;
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 0.5;
      }
      50% {
        opacity: 1;
      }
    }

    /* Mobile Optimizations */
    @media (max-width: 640px) {
      :host {
        height: 100vh;
        height: 100dvh; /* Dynamic viewport height for mobile browsers */
      }
    }

    /* Touch-friendly buttons */
    button {
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }

    /* Ensure text readability on all backgrounds */
    .text-shadow {
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  `]
})
export class SliderComponent implements OnDestroy {
  private themeService = inject(ThemeService);
  
  currentSlide = signal(0);
  direction = signal<'ltr' | 'rtl'>('ltr');
  private intervalId: any;
  private isTransitioning = false;
  private touchStartX = 0;
  private touchEndX = 0;

  slides: Slide[] = [
    {
      id: 1,
      title: 'Discover Premium Lifestyle',
      titleAr: 'اكتشف نمط الحياة الفاخر',
      subtitle: '✨ New Collection 2026',
      subtitleAr: '✨ مجموعة جديدة 2026',
      description: 'Experience the epitome of luxury with our curated collection of premium products.',
      descriptionAr: 'استمتع بأرقى مستويات الفخامة مع مجموعتنا المختارة من المنتجات المتميزة.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      ctaText: 'Shop Now',
      ctaTextAr: 'تسوق الآن',
      ctaLink: '/products',
      secondaryCtaText: 'View Collections',
      secondaryCtaTextAr: 'عرض المجموعات',
      secondaryCtaLink: '/categories',
      gradient: 'bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent'
    },
    {
      id: 2,
      title: 'Summer Sale Up to 40% Off',
      titleAr: 'خصومات الصيف تصل إلى 40%',
      subtitle: '🔥 Limited Time Offer',
      subtitleAr: '🔥 عرض لفترة محدودة',
      description: 'Amazing deals on premium fashion, electronics, and home decor.',
      descriptionAr: 'عروض مذهلة على الأزياء الفاخرة والإلكترونيات والديكور المنزلي.',
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1920&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80',
      ctaText: 'Shop Sale',
      ctaTextAr: 'تسوق التخفيضات',
      ctaLink: '/products?filter=sale',
      secondaryCtaText: 'Learn More',
      secondaryCtaTextAr: 'اعرف المزيد',
      secondaryCtaLink: '/about',
      gradient: 'bg-gradient-to-r from-primary-900/80 via-primary-800/50 to-transparent'
    },
    {
      id: 3,
      title: 'Tech Innovation 2026',
      titleAr: 'تكنولوجيا مبتكرة 2026',
      subtitle: '🚀 Latest Gadgets',
      subtitleAr: '🚀 أحدث الأجهزة',
      description: 'Cutting-edge technology with our latest collection of smart devices.',
      descriptionAr: 'أحدث التقنيات مع مجموعتنا الجديدة من الأجهزة الذكية.',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1920&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80',
      ctaText: 'Explore Tech',
      ctaTextAr: 'استكشف التقنية',
      ctaLink: '/categories/1',
      secondaryCtaText: 'View Details',
      secondaryCtaTextAr: 'عرض التفاصيل',
      secondaryCtaLink: '/products',
      gradient: 'bg-gradient-to-r from-blue-900/80 via-blue-800/50 to-transparent'
    },
    {
      id: 4,
      title: 'Elegant Timepieces',
      titleAr: 'ساعات أنيقة',
      subtitle: '⌚ Timeless Collection',
      subtitleAr: '⌚ مجموعة خالدة',
      description: 'Discover our exclusive collection of premium watches crafted with precision.',
      descriptionAr: 'اكتشف مجموعتنا الحصرية من الساعات الفاخرة المصنوعة بدقة.',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1920&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
      ctaText: 'View Watches',
      ctaTextAr: 'شاهد الساعات',
      ctaLink: '/products',
      secondaryCtaText: 'Explore',
      secondaryCtaTextAr: 'استكشف',
      secondaryCtaLink: '/categories',
      gradient: 'bg-gradient-to-r from-amber-900/80 via-amber-800/50 to-transparent'
    }
  ];

  constructor() {
    // Detect RTL/LTR
    this.direction.set(this.themeService.direction());
    
    effect(() => {
      this.direction.set(this.themeService.direction());
    });

    this.startAutoPlay();
  }

  // Touch Events for Mobile Swipe
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  // Keyboard Navigation
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.direction() === 'ltr' ? this.previousSlide() : this.nextSlide();
    } else if (event.key === 'ArrowRight') {
      this.direction() === 'ltr' ? this.nextSlide() : this.previousSlide();
    }
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (this.direction() === 'ltr') {
        diff > 0 ? this.nextSlide() : this.previousSlide();
      } else {
        diff > 0 ? this.previousSlide() : this.nextSlide();
      }
    }
  }

  getLocalizedText(en: string, ar: string): string {
    return this.direction() === 'rtl' ? ar : en;
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    this.currentSlide.update(current => 
      current === this.slides.length - 1 ? 0 : current + 1
    );
    
    this.resetAutoPlay();
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 1000);
  }

  previousSlide(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    this.currentSlide.update(current => 
      current === 0 ? this.slides.length - 1 : current - 1
    );
    
    this.resetAutoPlay();
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 1000);
  }

  goToSlide(index: number): void {
    if (this.isTransitioning || index === this.currentSlide()) return;
    this.isTransitioning = true;
    
    this.currentSlide.set(index);
    this.resetAutoPlay();
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 1000);
  }

  private resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }
}