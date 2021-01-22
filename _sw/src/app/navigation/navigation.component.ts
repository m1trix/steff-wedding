import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { StickService } from '../stick.service';

@Component({
  selector: 'header',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements AfterViewInit, OnDestroy {

  @ViewChild('color') colorRef: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('nav') navRef: ElementRef<HTMLElement> | undefined;
  @ViewChild('swogan') swoganRef: ElementRef<HTMLElement> | undefined;

  public active = '';

  constructor(
    private stickService: StickService,
    private detector: ChangeDetectorRef,
    router: Router
  ) {
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        this.active = event.url.split('/')[1];
        detector.markForCheck();
      }
    });
  }

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

  public onScroll() {
    const color = this.colorRef?.nativeElement;
    const nav = this.navRef?.nativeElement;
    const swogan = this.swoganRef?.nativeElement;
    if (color && nav && swogan) {
      color.style.opacity = Math.min(window.pageYOffset / nav.offsetTop, 1).toString();
    }
  }
}
