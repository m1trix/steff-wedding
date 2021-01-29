import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { StickService } from 'src/app/stick.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.sass']
})
export class AboutUsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('picture') pictureRef: ElementRef<HTMLPictureElement> | undefined;
  @ViewChild('title') titleRef: ElementRef<HTMLHeadingElement> | undefined;

  constructor(
    private stickService: StickService
  ) { }

  /** @override */
  public ngAfterViewInit() {
    if (this.pictureRef?.nativeElement) {
      this.stickService.register( //
        'picture',
        this.pictureRef.nativeElement,
        [],
        'screen and (min-width: 481px)'
      );
    }
  }

  /** @override */
  public ngOnDestroy() {
    this.stickService.unregister('picture');
  }
}
