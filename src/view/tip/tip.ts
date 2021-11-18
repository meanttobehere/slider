import MoveableObject from '../moveableObject/moveableObject';
import { TipInterface, TipObserver, TipProps } from './tipInterface';
import './tip.css';

export default class Tip implements TipInterface {
  private $tip: JQuery;

  private moveableObject: MoveableObject;

  private observer: TipObserver;

  private isSecond: boolean;

  private isVertical: boolean;

  constructor(node: JQuery, isSecond?: boolean) {
    this.isSecond = isSecond === undefined ? false : isSecond;
    this.createDomElements(node);
    this.atachEvents();
  }

  render(props: TipProps) {
    if (props.display === false) {
      this.$tip.hide();
      return;
    } this.$tip.show();

    this.isVertical = props.vertical;
    if (props.zIndex !== undefined) { this.$tip.css('zIndex', props.zIndex); }
    if (props.vertical) { this.$tip.css({ top: `${props.position}%`, left: '' }); }
    else { this.$tip.css({ left: `${props.position}%`, top: '' }); }
    this.$tip.text(props.value);
  }

  setObserver(observer: TipObserver) {
    this.observer = observer;
  }

  private createDomElements(node: JQuery) {
    this.$tip = $('<div>', { class: 'slider__tip' });
    node.append(this.$tip);
  }

  private atachEvents() {
    this.moveableObject = new MoveableObject(this.$tip);
    this.moveableObject.setObserver(this.createMovableObjectObserver());
  }

  private createMovableObjectObserver() {
    return {
      startMove: this.handleTipStartMove.bind(this),
      move: this.handleTipMove.bind(this),
      endMove: this.handleTipEndMove.bind(this),
    };
  }

  private handleTipStartMove() {
    this.observer?.startMove(this.isSecond);
  }

  private handleTipMove(distanceX: number, distanceY: number) {
    const distance = this.isVertical ? distanceY : distanceX;
    this.observer?.move(distance, this.isSecond);
  }

  private handleTipEndMove() {
    this.observer?.endMove(this.isSecond);
  }
}
