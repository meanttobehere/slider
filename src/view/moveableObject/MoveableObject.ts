import {
  MoveableObjectInterface,
  MoveableObjectObserver,
} from './moveableObjectInterface';

class MoveableObject implements MoveableObjectInterface {
  private $object: JQuery;

  private observer: MoveableObjectObserver;

  private offsetX: number;

  private offsetY: number;

  constructor($object: JQuery) {
    this.$object = $object;
    this.initMouseEvents();
    this.initTouchEvents();
  }

  setObserver(observer: MoveableObjectObserver) {
    this.observer = observer;
  }

  private handleObjectMouseMove = (event: JQuery.Event) => {
    const distance = this.calcDistanceInPercent(
      event.clientX - this.offsetX,
      event.clientY - this.offsetY,
    );
    this.observer?.move(distance.x, distance.y);
  };

  private handleObjectMouseUp = () => {
    $(document).off('mousemove', this.handleObjectMouseMove);
    this.observer?.endMove();
  };

  private handleObjectMouseDown = (event: JQuery.Event) => {
    $(document).on('mousemove', this.handleObjectMouseMove);
    $(document).one('mouseup', this.handleObjectMouseUp);
    this.offsetX = event.offsetX;
    this.offsetY = event.offsetY;
    this.observer?.startMove();
  };

  private initMouseEvents() {
    this.$object.on('mousedown', this.handleObjectMouseDown);
  }

  private handleObjectTouchMove = (event: TouchEvent) => {
    const distance = this.calcDistanceInPercent(
      event.touches[0].clientX,
      event.touches[0].clientY,
    );
    this.observer?.move(distance.x, distance.y);
    event.preventDefault();
    event.stopPropagation();
  };

  private handleObjectTouchEnd = () => {
    document.removeEventListener('touchmove', this.handleObjectTouchMove);
    this.observer?.endMove();
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
    this.observer?.startMove();
  };

  private initTouchEvents() {
    this.$object[0].addEventListener(
      'touchstart', this.handleObjectTouchStart, { passive: false },
    );
  }

  private calcDistanceInPercent(posX: number, posY: number): any {
    const distanceX = posX - this.$object[0].getBoundingClientRect().left;
    const distanceY = posY - this.$object[0].getBoundingClientRect().top;
    const distancePercentX = (distanceX / this.$object.parent().width()) * 100;
    const distancePercentY = (distanceY / this.$object.parent().height()) * 100;
    return ({ x: distancePercentX, y: distancePercentY });
  }
}

export default MoveableObject;
