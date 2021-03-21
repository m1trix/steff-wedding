import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CookieService]
})
export class AppComponent {
  public showCookiesConsent = false;

  @ViewChild('background') backgroundRef: ElementRef<HTMLElement> | undefined;

  constructor(
    private detector: ChangeDetectorRef,
    private cookies: CookieService
  ) {
    setTimeout(() => {
      this.showCookiesConsent = cookies.get('cookies_consent') !== 'true';
      this.detector.markForCheck();
    }, 2100);
  }

  public onAcceptCookies() {
    this.showCookiesConsent = false;
    this.cookies.set('cookies_consent', 'true');
    this.detector.markForCheck();
  }

  public onScroll() {
    const background = this.backgroundRef?.nativeElement;
    const y = (window.scrollY / 8);
    if (background) {
      background.style.transform = `translateY(-${y}px)`;
    }
  }
}
