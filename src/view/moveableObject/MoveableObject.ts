import { SliderParams } from '../../plugin/sliderTypes';
import View from '../main/View';

class MoveableObject {
  private object: HTMLElement;

  private view: View;

  private isSecond: boolean;

  private startOffset = 0;

  private offsetX = 0;

  private offsetY = 0;

  private isVertical = false;

  private isInversion = false;

  private position = 0;

  constructor(object: HTMLElement, view: View, isSecond?: boolean) {
    this.object = object;
    this.view = view;
    this.isSecond = Boolean(isSecond);
    this.initMouseEvents();
    this.initTouchEvents();
  }

  update(params: SliderParams) {
    this.isVertical = params.isVertical;
    this.isInversion = params.isInversion;
    this.position = this.isSecond
      ? params.secondPointerPosPercentage
      : params.pointerPosPercentage;
  }

  private handleObjectMouseMove = (event: MouseEvent) => {
    const position = this.calcPositionInPercent(
      event.clientX - this.offsetX,
      event.clientY - this.offsetY,
    );
    this.view.notify({
      eventType: 'move',
      isSecond: this.isSecond,
      posPercentage: position - this.startOffset,
    });
  };

  private handleObjectMouseUp = () => {
    document.removeEventListener('mousemove', this.handleObjectMouseMove);
    this.view.notify({ eventType: 'endMove', isSecond: this.isSecond });
  };

  private handleObjectMouseDown = (event: MouseEvent) => {
    document.addEventListener('mousemove', this.handleObjectMouseMove);
    document.addEventListener('mouseup', this.handleObjectMouseUp, { once: true });
    this.offsetX = event.offsetX - this.object.clientWidth / 2;
    this.offsetY = event.offsetY - this.object.clientHeight / 2;
    this.startOffset = this.calcPositionInPercent(
      event.clientX - this.offsetX,
      event.clientY - this.offsetY,
    ) - this.position;
    this.view.notify({ eventType: 'startMove', isSecond: this.isSecond });
  };

  private initMouseEvents() {
    this.object.addEventListener('mousedown', this.handleObjectMouseDown);
  }

  private handleObjectTouchMove = (event: TouchEvent) => {
    const position = this.calcPositionInPercent(
      event.touches[0].clientX,
      event.touches[0].clientY,
    );
    this.view.notify({
      eventType: 'move',
      isSecond: this.isSecond,
      posPercentage: position - this.startOffset,
    });
    event.preventDefault();
    event.stopPropagation();
  };

  private handleObjectTouchEnd = () => {
    document.removeEventListener('touchmove', this.handleObjectTouchMove);
    this.view.notify({ eventType: 'endMove', isSecond: this.isSecond });
  };

  private handleObjectTouchStart = (event: TouchEvent) => {
    document.addEventListener(
      'touchmove', this.handleObjectTouchMove, { passive: false },
    );
    document.addEventListener(
      'touchend', this.handleObjectTouchEnd, { once: true },
    );
    this.startOffset = this.calcPositionInPercent(
      event.touches[0].clientX,
      event.touches[0].clientY,
    ) - this.position;
    event.preventDefault();
    event.stopPropagation();
    this.view.notify({ eventType: 'startMove', isSecond: this.isSecond });
  };

  private initTouchEvents() {
    this.object.addEventListener(
      'touchstart', this.handleObjectTouchStart, { passive: false },
    );
  }

  private calcPositionInPercent(posX: number, posY: number): number {
    const parent = this.object.parentElement;
    if (!parent) {
      return 0;
    }
    const { top, left } = parent.getBoundingClientRect();

    if (this.isVertical && this.isInversion) {
      return ((top - posY) / parent.offsetHeight) * 100;
    }
    if (this.isVertical) {
      return ((posY - top) / parent.offsetHeight) * 100;
    }
    if (this.isInversion) {
      return ((left - posX) / parent.offsetWidth) * 100;
    }
    return ((posX - left) / parent.offsetWidth) * 100;
  }
}

export default MoveableObject;
