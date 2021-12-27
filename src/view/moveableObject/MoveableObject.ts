import { ViewObserver, ViewProps } from '../main/viewInterface';

class MoveableObject {
  private $object: JQuery;

  private observer: ViewObserver;

  private isSecond: boolean;

  private isVertical: boolean;

  private offsetX: number;

  private offsetY: number;

  constructor($object: JQuery, observer: ViewObserver, isSecond?: boolean) {
    this.$object = $object;
    this.observer = observer;
    this.isSecond = Boolean(isSecond);
    this.initMouseEvents();
    this.initTouchEvents();
  }

  update(props: ViewProps) {
    this.isVertical = props.isVertical;
  }

  private handleObjectMouseMove = (event: JQuery.MouseMoveEvent) => {
    const position = this.calcPositionInPercent(
      event.clientX - this.offsetX,
      event.clientY, // - this.offsetY,
    );
    this.observer.move(position, this.isSecond);
  };

  private handleObjectMouseUp = () => {
    $(document).off('mousemove', this.handleObjectMouseMove);
    this.observer.endMove(this.isSecond);
  };

  private handleObjectMouseDown = (event: JQuery.MouseDownEvent) => {
    $(document).on('mousemove', this.handleObjectMouseMove);
    $(document).one('mouseup', this.handleObjectMouseUp);
    this.offsetX = event.offsetX - this.$object[0].clientWidth / 2;
    this.offsetY = event.offsetY;
    this.observer.startMove(this.isSecond);
  };

  private initMouseEvents() {
    this.$object.on('mousedown', this.handleObjectMouseDown);
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
    this.$object[0].addEventListener(
      'touchstart', this.handleObjectTouchStart, { passive: false },
    );
  }

  private calcPositionInPercent(posX: number, posY: number): number {
    const parent = this.$object.parent()[0];
    const distance = this.isVertical
      ? ((posY - parent.getBoundingClientRect().top)
        / parent.offsetHeight) * 100
      : ((posX - parent.getBoundingClientRect().left)
        / parent.offsetWidth) * 100;
    return distance;
  }
}

export default MoveableObject;
