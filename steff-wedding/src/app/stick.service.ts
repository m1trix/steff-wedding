import { HostListener, Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { readFile } from "fs";

class StickyElement {

  public fixed = false;
  public readonly offset: number;
  public readonly height: number;
  public readonly top: string;
  public readonly position: string;
  public readonly marginTop: string;

  constructor(
    public readonly id: string,
    public readonly original: HTMLElement,
    public readonly replacement: HTMLElement,
    public readonly onStick: any,
    public readonly onUnstick: any
  ) {
    replacement.style.width = original.offsetWidth + 'px';
    replacement.style.height = original.offsetHeight + 'px';
    replacement.style.marginTop = original.style.marginTop;
    replacement.style.marginBottom = original.style.marginBottom;
    this.offset = original.offsetTop;
    this.top = original.style.top;
    this.position = original.style.position;
    this.height = original.offsetHeight;
    this.marginTop = original.style.marginTop;
  }
}

@Injectable({
  providedIn: 'root'
})
export class StickService {

  private renderer: Renderer2;
  private elements: StickyElement[] = [];

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    window.addEventListener('scroll', event => this.onScroll(event as MouseEvent));
  }

  public register(id: string, element: HTMLElement, onStick: any, onUnstick: any) {
    element.style.willChange = 'position, top';
    this.elements.splice(
      this.elements.findIndex(element => element.id === id),
      0,
      new StickyElement(id, element, this.renderer.createElement('div'), onStick, onUnstick)
    );
    this.elements.sort((a, b) => a.offset - b.offset);
  }

  public unregister(id: string) {
    this.elements.splice(
      this.elements.findIndex(element => element.id === id),
      1
    );
  }

  public onScroll(event: MouseEvent) {
    const scroll = window.pageYOffset;
    let y = 0;
    for (let element of this.elements) {
      if (scroll >= element.offset) {
        if (!element.fixed) {
          element.fixed = true;
          element.original.style.position = 'fixed';
          element.original.style.top = '0px';
          element.original.style.marginTop = '0px';
          this.renderer.appendChild(element.original.parentNode, element.replacement);
          element.onStick(element.original);
        }

        y += element.height;
      } else if (element.fixed) {
        element.fixed = false;
        element.original.style.position = element.position;
        element.original.style.top = element.top;
        element.original.style.marginTop = element.marginTop;
        this.renderer.removeChild(element.original.parentNode, element.replacement);
        element.onUnstick(element.original);
      }
    }
  }
}
