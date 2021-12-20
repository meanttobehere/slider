import MoveableObject from '../moveableObject/MoveableObject';
import { ViewObserver, ViewProps } from '../main/viewInterface';
import './tip.css';

class Tip {
  private $tip: JQuery;

  private moveableObject: MoveableObject;

  private isSecond: boolean;

  constructor(node: JQuery, observer: ViewObserver, isSecond?: boolean) {
    this.isSecond = Boolean(isSecond);
    this.createDomElements(node);
    this.moveableObject = new MoveableObject(this.$tip, observer, isSecond);
  }

  render(props: ViewProps) {
    if (!this.shouldBeDisplayed(props)) {
      this.$tip.hide();
      return;
    } this.$tip.show();

    const position = this.isSecond
      ? props.secondPointerPosition
      : props.pointerPosition;

    if (props.isVertical) {
      this.$tip.css({ top: `${position}%`, left: '' });
    } else {
      this.$tip.css({ left: `${position}%`, top: '' });
    }

    const text = this.isSecond ? props.secondTipValue : props.tipValue;
    this.$tip.text(text);

    this.moveableObject.update(props);
  }

  setLayerLevel(zIndex: number) {
    this.$tip.css('zIndex', zIndex);
  }

  private createDomElements(node: JQuery) {
    this.$tip = $('<div>', { class: 'slider__tip' });
    node.append(this.$tip);
  }

  private shouldBeDisplayed(props: ViewProps) {
    return (props.shouldDisplayTips && (!this.isSecond || props.isRange));
  }
}

export default Tip;
