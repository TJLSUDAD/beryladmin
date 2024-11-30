import { toast } from 'sonner';

export interface ViewportPosition {
  top: number;
  left: number;
  bottom: number;
  right: number;
  inView: boolean;
}

export class LocationAwareness {
  private scrollThrottle: number = 100; // ms
  private lastScroll: number = 0;
  private observers: Set<(elements: Element[]) => void> = new Set();

  isElementInView(element: Element): ViewportPosition {
    const rect = element.getBoundingClientRect();
    const inView = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );

    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
      inView
    };
  }

  startTracking() {
    const handleScroll = () => {
      const now = Date.now();
      if (now - this.lastScroll >= this.scrollThrottle) {
        this.lastScroll = now;
        this.detectVisibleElements();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    this.detectVisibleElements(); // Initial detection
    
    toast.success('Location awareness tracking started');
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }

  private detectVisibleElements() {
    const visibleElements = Array.from(document.querySelectorAll('*'))
      .filter(element => this.isElementInView(element).inView);
    
    this.observers.forEach(callback => callback(visibleElements));
  }

  onVisibleElements(callback: (elements: Element[]) => void) {
    this.observers.add(callback);
    return () => {
      this.observers.delete(callback);
    };
  }

  getScrollProgress(): number {
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const viewHeight = window.innerHeight;
    const scrolled = window.scrollY;
    
    return Math.min((scrolled / (docHeight - viewHeight)) * 100, 100);
  }
}