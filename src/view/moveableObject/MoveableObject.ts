import { ViewObserver, ViewProps } from '../main/viewTypes';

class MoveableObject {
  private object: HTMLElement;

  private observer: ViewObserver;

  private isSecond: boolean;

  private offsetX: number;

  private offsetY: number;

  private props: ViewProps;

  private startOffset: number;

  constructor(object: HTMLElement, observer: ViewObserver, isSecond?: boolean) {
    this.object = object;
    this.observer = observer;
    this.isSecond = Boolean(isSecond);
    this.initMouseEvents();
    this.initTouchEvents();
  }

  update(props: ViewProps) {
    this.props = props;
  }

  private handleObjectMouseMove = (event: MouseEvent) => {
    const position = this.calcPositionInPercent(
      event.clientX - this.offsetX,
      event.clientY - this.offsetY,
    );
    this.observer.move(position - this.startOffset, this.isSecond);
  };

  private handleObjectMouseUp = () => {
    document.removeEventListener('mousemove', this.handleObjectMouseMove);
    this.observer.endMove(this.isSecond);
  };

  private handleObjectMouseDown = (event: MouseEvent) => {
    document.addEventListener('mousemove', this.handleObjectMouseMove);
    document.addEventListener('mouseup', this.handleObjectMouseUp, { once: true });
    this.offsetX = event.offsetX - this.object.clientWidth / 2;
    this.offsetY = event.offsetY - this.object.clientHeight / 2;
    const pos = this.isSecond
      ? this.props.secondPointerPosPercentage
      : this.props.pointerPosPercentage;
    this.startOffset = this.calcPositionInPercent(
      event.clientX - this.offsetX,
      event.clientY - this.offsetY,
    ) - pos;
    this.observer.startMove(this.isSecond);
  };

  private initMouseEvents() {
    this.object.addEventListener('mousedown', this.handleObjectMouseDown);
  }

  private handleObjectTouchMove = (event: TouchEvent) => {
    const position = this.calcPositionInPercent(
      event.touches[0].clientX,
      event.touches[0].clientY,
    );
    this.observer.move(position, this.isSecond);
    event.preventDefault();
    event.stopPropagation();
  };

  private handleObjectTouchEnd = () => {
    document.removeEventListener('touchmove', this.handleObjectTouchMove);
    this.observer.endMove(this.isSecond);
  };

  private handleObjectTouchStart = (event: TouchEvent) => {
    document.addEventListener(
      'touchmove', this.handleObjectTouchMove, { passive: false },
    );
    document.addEventListener(
      'touchend', this.handleObjectTouchEnd, { once: true },
    );
    event.preventDefault();
    event.stopPropagation();
    this.observer.startMove(this.isSecond);
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
    const distance = this.props.isVertical
      ? ((posY - parent.getBoundingClientRect().top)
        / parent.offsetHeight) * 100
      : ((posX - parent.getBoundingClientRect().left)
        / parent.offsetWidth) * 100;
    return distance;
  }
}

export default MoveableObject;
