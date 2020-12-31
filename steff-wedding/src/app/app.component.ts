import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public showFooter = true;

  constructor(private router: Router) {
    this.shouldShowFooter();
    router.events.forEach(() => this.shouldShowFooter());
  }

  private shouldShowFooter() {
    this.showFooter = this.router.url !== '/';
  }
}
