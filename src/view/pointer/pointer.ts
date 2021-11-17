import MoveableObject from '../moveableObject/moveableObject';
import {
  PointerInterface,
  PointerObserver,
  PointerProps,
} from './pointerInterface';
import './pointer.css';

export default class Pointer implements PointerInterface {
  private $pointer: JQuery;

  private observer: PointerObserver;

  private isSecond: boolean;

  private isVertical: boolean;

  constructor(node: JQuery, isSecond?: boolean) {
    this.isSecond = isSecond === undefined ? false : isSecond;
    this.createDomElements(node);
    this.atachEvents();
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

  private createDomElements(node: JQuery) {
    this.$pointer = $('<div>', { class: 'slider__pointer' });
    node.append(this.$pointer);
  }

  private atachEvents() {
    const moveableObject = new MoveableObject(this.$pointer);
    moveableObject.setObserver(this.createMovableObjectObserver());
  }

  private createMovableObjectObserver() {
    return {
      startMove: this.handlePointerStartMove.bind(this),
      move: this.handlePointerMove.bind(this),
      endMove: this.handlePointerEndMove.bind(this),
    };
  }

  private handlePointerStartMove() {
    this.observer?.startMove(this.isSecond);
  }

  private handlePointerMove(distanceX: number, distanceY: number) {
    const distance = this.isVertical ? distanceY : distanceX;
    this.observer?.move(distance, this.isSecond);
  }

  private handlePointerEndMove() {
    this.observer?.endMove(this.isSecond);
  }
}
