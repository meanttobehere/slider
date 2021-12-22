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

  private handleObjectMouseMove = (event: JQuery.Event) => {
    const distance = this.calcDistanceInPercent(
      <number>event.clientX - this.offsetX,
      <number>event.clientY - this.offsetY,
    );
    this.observer.move(distance, this.isSecond);
  };

  private handleObjectMouseUp = () => {
    $(document).off('mousemove', this.handleObjectMouseMove);
    this.observer.endMove(this.isSecond);
  };

  private handleObjectMouseDown = (event: JQuery.Event) => {
    $(document).on('mousemove', this.handleObjectMouseMove);
    $(document).one('mouseup', this.handleObjectMouseUp);
    this.offsetX = <number>event.offsetX;
    this.offsetY = <number>event.offsetY;
    this.observer.startMove(this.isSecond);
  };

  private initMouseEvents() {
    this.$object.on('mousedown', this.handleObjectMouseDown);
  }

  private handleObjectTouchMove = (event: TouchEvent) => {
    const distance = this.calcDistanceInPercent(
      event.touches[0].clientX,
      event.touches[0].clientY,
    );
    this.observer.move(distance, this.isSecond);
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

  private calcDistanceInPercent(posX: number, posY: number): number {
    const distance = this.isVertical
      ? ((posY - this.$object[0].getBoundingClientRect().top)
        / <number> this.$object.parent().height()) * 100
      : ((posX - this.$object[0].getBoundingClientRect().left)
        / <number> this.$object.parent().width()) * 100;
    return distance;
  }
}

export default MoveableObject;
