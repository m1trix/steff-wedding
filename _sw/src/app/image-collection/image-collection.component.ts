import { Component, ElementRef, Host, HostListener, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

function isInRange(value: number, left: number, right: number) {
  return left < value && value <= right;
}

function fitInRange(value: number, left: number, right: number) {
  return value < left ? left : (value > right ? right : value);
}

const DISPLAY_W = 1125;
const DISPALY_H = 2000;

@Component({
  selector: 'app-image-collection',
  templateUrl: './image-collection.component.html',
  styleUrls: ['./image-collection.component.sass']
})
export class ImageCollectionComponent implements OnChanges {

  @Input() public urls: string[] = [];
  public activeUrl$ = new BehaviorSubject<string>("");
  public activeIndex: number = 0;
  public displayX = 0;
  public displayY = 0;
  public zoomDisplay = false;

  @ViewChild('display') display: ElementRef<HTMLElement> | undefined;
  @ViewChild('popover') popover: ElementRef<HTMLElement> | undefined;
  @ViewChildren('preview') previews: QueryList<ElementRef<HTMLElement>> | undefined;

  public onSelectImage(event: MouseEvent, index: number) {
    this.activeIndex = index;
    this.activeUrl$.next(this.urls[index]);
    (event.target as HTMLElement).scrollIntoView({
      block: window.matchMedia("(max-width: 600px)") ? 'center' : 'nearest',
      inline: window.matchMedia("(max-width: 600px)") ? 'nearest' : 'center'
    });
  }

  /** @override */
  public ngOnChanges(changes: SimpleChanges) {
    if (changes.urls) {
      this.activeIndex = 0;
      this.activeUrl$.next(this.urls[0]);
    }
  }

  public identify(index: number) {
    return index;
  }

  public onZoomDisplay(event: MouseEvent) {
    if (!('ontouchstart' in window)) {
      this.zoomDisplay = !this.zoomDisplay;
      this.onMouseMove(event);
    }
  }

  public onMouseMove(event: MouseEvent) {
    if (!this.zoomDisplay) {
      return;
    }

    const display = event.target as HTMLElement;
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    const width = display.getBoundingClientRect().width;
    const height = display.getBoundingClientRect().height;
    const offsetX = DISPLAY_W - width;
    const offsetY = DISPALY_H - height;

    this.displayX = fitInRange(offsetX * mouseX / width, 0, offsetX);
    this.displayY = fitInRange(offsetY * mouseY / height, 0, offsetY);
  }

  @HostListener('window:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    if (event.key == 'Escape' && this.popover) {
      this.popover.nativeElement.style.display = 'none';
    }

    if (event.key == 'Enter') {
      this.previews?.find(preview => preview.nativeElement === document.activeElement)?.nativeElement.click();
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      this.selectNextPreview(1);
      event.preventDefault();
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      this.selectNextPreview(-1);
      event.preventDefault();
    }
  }

  private selectNextPreview(move: number) {
    const elements = this.previews?.toArray() || [];
    const index = elements.findIndex(preview => preview.nativeElement === document.activeElement);
    let nextIndex = index + move;

    if (nextIndex >= elements.length) {
      nextIndex = 0;
    }

    if (nextIndex < 0) {
      nextIndex = elements.length - 1;
    }

    elements[nextIndex].nativeElement.focus();
  }
}
