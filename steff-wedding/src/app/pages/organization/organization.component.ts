import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { StickService } from 'src/app/stick.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.sass']
})
export class OrganizationComponent implements AfterViewInit {

  @ViewChild('picture') pictureRef: ElementRef<HTMLElement> = undefined as unknown as ElementRef;

  // TODO: scrollIntoView center/nearest depending on window.matchMedia()
  // public email = 'simona.klimentova@steffwedding.com';
  public email = 'teodor.klimentov@gmail.com';

  constructor(
    private stickService: StickService
  ) { }

  /** @override */
  public ngAfterViewInit() {
    this.stickService.register(
      'organize-picture',
      this.pictureRef.nativeElement,
      [],
      '(min-width: 481px)'
    );
  }
}
