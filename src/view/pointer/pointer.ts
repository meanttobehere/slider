import './pointer.css';
import { PointerInterface, PointerObserver, PointerProps } from './pointerInterface';

export default class Pointer implements PointerInterface {
  private $pointer: JQuery;

  private observer: PointerObserver;

  private isSecond: boolean;

  private isVertical: boolean;

  constructor(node: JQuery, isSecond?: boolean) {
    this.$pointer = $('<div>', { class: 'slider__pointer' });
    node.append(this.$pointer);
    this.isSecond = isSecond === undefined ? false : isSecond;
    this.initMouseEvents();
    this.initTouchEvents();
  }

  render(props: PointerProps) {
    if (props.display === false) {
      this.$pointer.hide();
      return;
    } this.$pointer.show();

    this.isVertical = props.vertical;
    if (props.zIndex !== undefined) { this.$pointer.css('zIndex', props.zIndex) };

    if (props.vertical) this.$pointer.css({ top: `${props.position}%`, left: '' });
    else this.$pointer.css({ left: `${props.position}%`, top: '' });
  }

  setObserver(observer: PointerObserver) {
    this.observer = observer;
  }

  private initMouseEvents() {
    let offsetX: number;
    let offsetY: number;

    const mouseMoveEventHandler = (function mouseMoveEvent(event: MouseEvent) {
      const posX = event.clientX - offsetX;
      const posY = event.clientY - offsetY;
      const distance = this.calcDistanceInPercent(posX, posY);
      this.observer?.move(distance, this.isSecond);
    }).bind(this);

    const mouseUpEventHandler = (function mouseUp() {
      $(document).off('mousemove', mouseMoveEventHandler);
      this.observer?.endMove(this.isSecond);
    }).bind(this);

    const mouseDownEventHandler = (function mouseDown(event: MouseEvent) {
      $(document).on('mousemove', mouseMoveEventHandler);
      $(document).one('mouseup', mouseUpEventHandler);
      offsetX = event.offsetX;
      offsetY = event.offsetY;
      this.observer?.startMove(this.isSecond);
    }).bind(this);

    this.$pointer.on('mousedown', mouseDownEventHandler);
  }

  private initTouchEvents() {
    const touchMoveEventHandler = (function touchMove(event: TouchEvent) {
      const posX = event.touches[0].clientX;
      const posY = event.touches[0].clientY;
      const distance = this.calcDistanceInPercent(posX, posY);
      this.observer?.move(distance, this.isSecond);
      event.preventDefault();
      event.stopPropagation();
    }).bind(this);

    const touchEndEventHandler = (function touchEnd() {
      document.removeEventListener('touchmove', touchMoveEventHandler);
      document.removeEventListener('touchend', touchEndEventHandler);
      this.observer?.endMove(this.isSecond);
    }).bind(this);

    const touchStartEventHandler = (function touchStart(event: TouchEvent) {
      document.addEventListener('touchmove', touchMoveEventHandler, { passive: false });
      document.addEventListener('touchend', touchEndEventHandler);
      this.observer?.startMove(this.isSecond);
      event.preventDefault();
      event.stopPropagation();
    }).bind(this);

    this.$pointer[0].addEventListener('touchstart', touchStartEventHandler, { passive: false });
  }

  private calcDistanceInPercent(posX: number, posY: number): number {
    const distanceX = posX - this.$pointer[0].getBoundingClientRect().left;
    const distanceY = posY - this.$pointer[0].getBoundingClientRect().top;
    const distancePercentX = (distanceX / this.$pointer.parent().width()) * 100;
    const distancePercentY = (distanceY / this.$pointer.parent().height()) * 100;
    return (this.isVertical ? distancePercentY : distancePercentX);
  }
}
