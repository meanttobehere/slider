import {
  MoveableObjectInterface,
  MoveableObjectObserver,
} from './moveableObjectInterface';

export default class MoveableObject implements MoveableObjectInterface {
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

  private initMouseEvents() {
    const mouseMoveHandler = function handleObjectMouseMove(event: MouseEvent) {
      const distance = this.calcDistanceInPercent(
        event.clientX - this.offsetX,
        event.clientY - this.offsetY,
      );
      this.observer?.move(distance.x, distance.y);
    }.bind(this);

    const mouseUpHandler = function handleObjectMouseUp() {
      $(document).off('mousemove', mouseMoveHandler);
      this.observer?.endMove();
    }.bind(this);

    const mouseDownHandler = function handleObjectMouseDown(event: MouseEvent) {
      $(document).on('mousemove', mouseMoveHandler);
      $(document).one('mouseup', mouseUpHandler);
      this.offsetX = event.offsetX;
      this.offsetY = event.offsetY;
      this.observer?.startMove();
    }.bind(this);

    this.$object.on('mousedown', mouseDownHandler);
  }

  private initTouchEvents() {
    const touchMoveHandler = function handleObjectTouchMove(event: TouchEvent) {
      const distance = this.calcDistanceInPercent(
        event.touches[0].clientX,
        event.touches[0].clientY,
      );
      this.observer?.move(distance.x, distance.y);
      event.preventDefault();
      event.stopPropagation();
    }.bind(this);

    const touchEndHandler = function handleObjectTouchEnd() {
      document.removeEventListener('touchmove', touchMoveHandler);
      document.removeEventListener('touchend', touchEndHandler);
      this.observer?.endMove();
    }.bind(this);

    const touchStartHandler = function handleObjectTouchStart(event: TouchEvent) {
      document.addEventListener('touchmove', touchMoveHandler, { passive: false });
      document.addEventListener('touchend', touchEndHandler);
      event.preventDefault();
      event.stopPropagation();
      this.observer?.startMove();
    }.bind(this);

    this.$object[0].addEventListener(
      'touchstart',
      touchStartHandler,
      { passive: false }
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
