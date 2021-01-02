import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { StickService } from '../stick.service';

const SWOGAN_H = 9 * 16;

@Component({
  selector: 'header',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass'],
})
export class NavigationComponent implements AfterViewInit, OnDestroy {

  @ViewChild('color') colorRef: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('nav') navRef: ElementRef<HTMLElement> | undefined;
  @ViewChild('swogan') swoganRef: ElementRef<HTMLElement> | undefined;

  constructor(
    private stickService: StickService
  ) { }

  /** @override */
  public ngAfterViewInit() {
    if (this.navRef?.nativeElement) {
      this.stickService.register(
        'nav',
        this.navRef.nativeElement,
        ['nav-bar-link-sticky']
      );
    }
  }

  /** @override */
  public ngOnDestroy() {
    this.stickService.unregister('nav');
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll(event: MouseEvent) {
    const color = this.colorRef?.nativeElement;
    const nav = this.navRef?.nativeElement;
    const swogan = this.swoganRef?.nativeElement;
    if (color && nav && swogan) {
      color.style.opacity = Math.min(window.pageYOffset / nav.offsetTop, 1).toString();
    }
  }
}
