import { elementEventFullName } from "@angular/compiler/src/view_compiler/view_compiler";
import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

class State {
  constructor(
    public readonly offsetTop: number,
    public readonly offsetHeight: number,
    public readonly stylePosition: string,
    public readonly styleTop: string,
    public readonly styleLeft: string,
    public readonly styleZIndex: string,
    public readonly styleMarginTop: string
  ) { }
}

class StickyElement {

  public isStuck = false;
  public state = {} as State;
  public replacement = null as unknown as HTMLElement;

  constructor(
    public readonly id: string,
    public readonly original: HTMLElement,
    public readonly mediaQuery: string,
    public readonly stickClasses: string[]
  ) {
    this.updateState();
  }

  public updateState() {
    this.state = new State(
      this.original.offsetTop,
      this.original.offsetHeight,
      this.original.style.position,
      this.original.style.top,
      this.original.style.left,
      this.original.style.zIndex,
      this.original.style.marginTop
    );
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
    window.addEventListener('scroll', () => this.onChange());
    window.addEventListener('resize', () => this.onResize());
  }

  public register(id: string, element: HTMLElement, stickClasses: string[] = [], mediaQuery?: string) {
    element.style.willChange = 'position, top';
    const index = this.elements.findIndex(element => element.id === id);
    const sticky = new StickyElement(id, element, mediaQuery as string, stickClasses || []);
    if (index > -1) {
      this.elements[index] = sticky;
    } else {
      this.elements.push(sticky);
    }

    element.addEventListener('transitionend', () => this.onChange());
  }

  public unregister(id: string) {
    const index = this.elements.findIndex(element => element.id === id);
    if (index > -1) {
      this.elements.splice(index, 1);
    }
  }

  public onResize() {
    for (let element of [...this.elements].reverse()) {
      this.tryRelease(element);
    }

    // this.sortElements();
    this.onChange();
  }

  public onChange() {
    const scroll = window.pageYOffset;
    let offsetTop = 0;

    for (let element of this.elements) {
      if (scroll + offsetTop >= element.state.offsetTop) {
        this.tryStick(element, offsetTop);
        if (element.isStuck && offsetTop != element.original.clientTop) {
          element.original.style.top = offsetTop + 'px';
        }

        offsetTop += element.original.offsetHeight;
      }
    }

    for (let element of [...this.elements].reverse()) {
      if (scroll + offsetTop < element.state.offsetTop) {
        this.tryRelease(element);
      }
    }
  }

  private tryStick(element: StickyElement, offsetTop: number) {
    if (element.isStuck) {
      return false;
    }

    if(element.mediaQuery && !window.matchMedia(element.mediaQuery).matches) {
      return false;
    }

    element.updateState();
    element.isStuck = true;
    const original = element.original;
    const rect = original.getBoundingClientRect();

    const replacement = this.renderer.createElement('div') as HTMLElement;
    this.renderer.setStyle(replacement, 'width', rect.width + 'px');
    this.renderer.setStyle(replacement, 'height', rect.height + 'px');
    this.renderer.setStyle(replacement, 'marginTop', window.getComputedStyle(original).marginTop);
    this.renderer.setStyle(replacement, 'marginBottom', window.getComputedStyle(original).marginBottom);

    const offsetLeft = rect.left;
    this.renderer.setStyle(original, 'position', 'fixed');
    this.renderer.setStyle(original, 'top', offsetTop + 'px');
    this.renderer.setStyle(original, 'left', offsetLeft + 'px');
    this.renderer.setStyle(original, 'marginTop', '0px');
    this.renderer.setStyle(original, 'z-index', '100');
    element.stickClasses.forEach(clazz =>
      this.renderer.addClass(original, clazz)
    );

    element.replacement = replacement;
    this.renderer.insertBefore(
      original.parentNode,
      element.replacement,
      original);

    return true;
  }

  private tryRelease(element: StickyElement) {
    if (!element.isStuck) {
      return;
    }

    element.isStuck = false;
    const original = element.original;
    const state = element.state;

    this.renderer.setStyle(original, 'position', state.stylePosition);
    this.renderer.setStyle(original, 'top', state.styleTop);
    this.renderer.setStyle(original, 'left', state.styleLeft);
    this.renderer.setStyle(original, 'zIndex', state.styleZIndex);
    this.renderer.setStyle(original, 'marginTop', state.styleMarginTop);

    element.stickClasses.forEach(clazz =>
      this.renderer.removeClass(original, clazz)
    );

    this.renderer.removeChild(original.parentNode, element.replacement);
  }

  private sortElements() {
    for (let element of this.elements.reverse()) {
      if (!element.isStuck) {
        element.updateState();
      }
    }

    this.elements.sort((a, b) => a.state.offsetTop - b.state.offsetTop);
  }
}
