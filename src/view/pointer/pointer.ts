import './pointer.css';
import {
  PointerInterface,
  PointerObserver,
  PointerProps,
} from './pointerInterface';

export default class Pointer implements PointerInterface {
  private $pointer: JQuery;

  private observer: PointerObserver;

  private isSecond: boolean;

  private isVertical: boolean;

  private offsetX: number;

  private offsetY: number;

  constructor(node: JQuery, isSecond?: boolean) {
    this.isSecond = isSecond === undefined ? false : isSecond;
    this.createDomElements(node);
    this.initMouseEvents();
    this.initTouchEvents();
  }

  render(props: PointerProps) {
    if (props.display === false) {
      this.$pointer.hide();
      return;
    } this.$pointer.show();

    this.isVertical = props.vertical;
    if (props.zIndex !== undefined) { this.$pointer.css('zIndex', props.zIndex); }

    if (props.vertical) this.$pointer.css({ top: `${props.position}%`, left: '' });
    else this.$pointer.css({ left: `${props.position}%`, top: '' });
  }

  setObserver(observer: PointerObserver) {
    this.observer = observer;
  }

  private initMouseEvents() {
    const mouseMoveHandler = function handlePointerMouseMove(event: MouseEvent) {
      this.handlePointerMove(event.clientX, event.clientX);
    }.bind(this);

    const mouseUpHandler = function handlePointerMouseUp() {
      $(document).off('mousemove', mouseMoveHandler);
      this.handlePointerEndMove();
    }.bind(this);

    const mouseDownHandler = function handlePointerMouseDown(event: MouseEvent) {
      $(document).on('mousemove', mouseMoveHandler);
      $(document).one('mouseup', mouseUpHandler);
      this.handlePointerStartMove(event.offsetX, event.offsetY);
    }.bind(this);

    this.$pointer.on('mousedown', mouseDownHandler);
  }

  private initTouchEvents() {
    const touchMoveHandler = function handlePointerTouchMove(event: TouchEvent) {
      this.handlePointerMove(event.touches[0].clientX, event.touches[0].clientY);
      event.preventDefault();
      event.stopPropagation();
    }.bind(this);

    const touchEndHandler = function handlePointerTouchEnd() {
      document.removeEventListener('touchmove', touchMoveHandler);
      document.removeEventListener('touchend', touchEndHandler);
      this.handlePointerEndMove();
    }.bind(this);

    const touchStartHandler = function handlePointerTouchStart(event: TouchEvent) {
      document.addEventListener('touchmove', touchMoveHandler, { passive: false });
      document.addEventListener('touchend', touchEndHandler);
      this.handlePointerStartMove(0, 0);
      event.preventDefault();
      event.stopPropagation();
    }.bind(this);

    this.$pointer[0].addEventListener('touchstart', touchStartHandler, { passive: false });
  }

  private handlePointerStartMove(offsetX: number, offsetY: number) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.observer?.startMove(this.isSecond);
  }

  private handlePointerMove(clientX: number, clientY: number) {
    const posX = clientX - this.offsetX;
    const posY = clientY - this.offsetY;
    const distance = this.calcDistanceInPercent(posX, posY);
    this.observer?.move(distance, this.isSecond);
  }

  private handlePointerEndMove() {
    this.observer?.endMove(this.isSecond);
  }

  private calcDistanceInPercent(posX: number, posY: number): number {
    const distanceX = posX - this.$pointer[0].getBoundingClientRect().left;
    const distanceY = posY - this.$pointer[0].getBoundingClientRect().top;
    const distancePercentX = (distanceX / this.$pointer.parent().width()) * 100;
    const distancePercentY = (distanceY / this.$pointer.parent().height()) * 100;
    return (this.isVertical ? distancePercentY : distancePercentX);
  }

  private createDomElements(node: JQuery) {
    this.$pointer = $('<div>', { class: 'slider__pointer' });
    node.append(this.$pointer);
  }
}
