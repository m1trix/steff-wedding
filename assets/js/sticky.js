'use strict';

class State {
  constructor(offsetTop, offsetHeight, stylePosition, styleTop, styleLeft, styleZIndex, styleMarginTop) {
    this.offsetTop = offsetTop;
    this.offsetHeight = offsetHeight;
    this.stylePosition = stylePosition;
    this.styleTop = styleTop;
    this.styleLeft = styleLeft;
    this.styleZIndex = styleZIndex;
    this.styleMarginTop = styleMarginTop;
  }
}

class StickyElement {
  constructor(id, original, query, classes) {
    this.id = id;
    this.original = original;
    this.query = query;
    this.classes = classes;
    this.updateState();

    this.isStuck = false;
    this.state = {};
    this.replacement = undefined;
  }

  updateState() {
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

class StickService {

  constructor() {
    this._aElements = [];
    window.addEventListener('scroll', () => this._onChange());
    window.addEventListener('resize', () => this._onResize());
  }

  register(oElement, sClasses, sQuery) {
    oElement.style.willChange = 'position, top';
    // const nIndex = this._aElements.findIndex(oElement => oElement.sId === sId);
    const oSticky = new StickyElement(undefined, oElement, sQuery, sClasses || []);
    // if (nIndex > -1) {
      // this._aElements[nIndex] = oSticky;
    // } else {
    this._aElements.push(oSticky);
    // }

    oElement.addEventListener('transitionend', () => this._onChange());
  }

  _onResize() {
    for (let oElement of [...this._aElements].reverse()) {
      this._tryRelease(oElement);
    }

    // this.sortElements();
    this._onChange();
  }

  _onChange() {
    const nScroll = window.pageYOffset;
    let nOffsetTop = 0;

    for (let oElement of this._aElements) {
      if (nScroll + nOffsetTop >= oElement.state.offsetTop) {
        this._tryStick(oElement, nOffsetTop);
        if (oElement.isStuck && nOffsetTop != oElement.original.clientTop) {
          oElement.original.style.top = nOffsetTop + 'px';
        }

        nOffsetTop += oElement.original.offsetHeight;
      }
    }

    for (let oElement of [...this._aElements].reverse()) {
      if (nScroll + nOffsetTop < oElement.state.offsetTop) {
        this._tryRelease(oElement);
      }
    }
  }

  _tryStick(oElement, nOffsetLeft) {
    if (oElement.isStuck) {
      return false;
    }

    if (oElement.query && !window.matchMedia(oElement.query).matches) {
      return false;
    }

    oElement.updateState();
    oElement.isStuck = true;
    const oOriginal = oElement.original;
    const oRect = oOriginal.getBoundingClientRect();

    const replacement = document.createElement('div');
    replacement.style.width = oRect.width + 'px';
    replacement.style.height = oRect.height + 'px';
    replacement.style.marginTop = window.getComputedStyle(oOriginal).marginTop;
    replacement.style.marginBottom = window.getComputedStyle(oOriginal).marginBottom;

    const offsetLeft = oRect.left;
    oOriginal.style.position = 'fixed';
    oOriginal.style.top = nOffsetLeft + 'px';
    oOriginal.style.left = offsetLeft + 'px';
    oOriginal.style.marginTop = '0px';
    oOriginal.style.zIndex = '100';
    oElement.classes.forEach(clazz =>
      oOriginal.classList.add(clazz)
    );

    oElement.replacement = replacement;
    oOriginal.parentNode.insertBefore(oElement.replacement, oOriginal);
    return true;
  }

  _tryRelease(oElement) {
    if (!oElement.isStuck) {
      return;
    }

    oElement.isStuck = false;
    const oOriginal = oElement.original;
    const oState = oElement.state;

    oOriginal.style.position = oState.stylePosition;
    oOriginal.style.top = oState.styleTop;
    oOriginal.style.left = oState.styleLeft;
    oOriginal.style.zIndex = oState.styleZIndex;
    oOriginal.style.marginTop = oState.styleMarginTop;

    oElement.classes.forEach(clazz =>
      oOriginal.classList.remove(clazz)
    );

    oOriginal.parentNode.removeChild(oElement.replacement);
  }

  _sortElements() {
    for (let element of this.elements.reverse()) {
      if (!element.isStuck) {
        element.updateState();
      }
    }

    this.elements.sort((a, b) => a.state.offsetTop - b.state.offsetTop);
  }
}

window.StickService = new StickService();
