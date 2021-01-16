import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public showFooter = true;

  @ViewChild('background') backgroundRef: ElementRef<HTMLElement> | undefined;

  constructor(private router: Router) {
    this.shouldShowFooter();
    router.events.forEach(() => this.shouldShowFooter());
  }

  private shouldShowFooter() {
    this.showFooter = this.router.url !== '/';
  }

  public onScroll() {
    const background = this.backgroundRef?.nativeElement;
    const y = (window.scrollY / 8);
    if (background) {
      background.style.transform = `translateY(-${y}px)`;
    }
  }
}
