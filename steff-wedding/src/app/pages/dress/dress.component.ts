import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Dress, DressService } from 'src/app/dress.service';
import { mergeMap } from 'rxjs/operators';
import { StickService } from 'src/app/stick.service';

const RATIO = 16 / 9;

type ImagesList = QueryList<ElementRef<HTMLElement>>;

@Component({
  selector: 'app-dress',
  templateUrl: './dress.component.html',
  styleUrls: ['./dress.component.sass']
})
export class DressComponent implements AfterViewInit, OnDestroy {

  public dress$: Observable<Dress | undefined>;
  @ViewChildren('images') imagesRef: ImagesList = new QueryList();

  constructor(
    private route: ActivatedRoute,
    private dessService: DressService,
    private stickService: StickService
  ) {
    this.dress$ = route.params.pipe(
      mergeMap(params => dessService.getDress(+params.id))
    );
  }

  /** @override */
  public ngAfterViewInit() {
    this.imagesRef.changes.forEach((images: ImagesList) => {
      this.registerForStick(images);
    });

    this.registerForStick(this.imagesRef);
  }

  private registerForStick(images: ImagesList) {
    this.stickService.register(
      'images',
      images.first.nativeElement,
      [],
      '(min-width: 481px)'
    );
  }

  /** @override */
  public ngOnDestroy() {
    this.stickService.unregister('images');
  }
}
