import MoveableObject from '../moveableObject/MoveableObject';
import { ViewObserver, ViewProps } from '../main/viewInterface';
import './pointer.css';

class Pointer {
  private $pointer: JQuery;

  private moveableObject: MoveableObject;

  private isSecond: boolean;

  constructor($node: JQuery, observer: ViewObserver, isSecond?: boolean) {
    this.isSecond = Boolean(isSecond);
    this.createDomElements($node);
    this.moveableObject = new MoveableObject(this.$pointer, observer, isSecond);
  }

  render(props: ViewProps) {
    if (!this.shouldBeDisplayed(props)) {
      this.$pointer.hide();
      return;
    } this.$pointer.show();

    const position = this.isSecond
      ? props.secondPointerPositionInPercent
      : props.pointerPositionInPercent;

    if (props.isVertical) {
      this.$pointer.css({ top: `${position}%`, left: '' });
    } else {
      this.$pointer.css({ left: `${position}%`, top: '' });
    }

    this.moveableObject.update(props);
  }

  setLayerLevel(zIndex: number) {
    this.$pointer.css('zIndex', zIndex);
  }

  private createDomElements($node: JQuery) {
    this.$pointer = $('<div>', { class: 'slider__pointer' });
    $node.append(this.$pointer);
  }

  private shouldBeDisplayed(props: ViewProps) {
    return (!this.isSecond || props.isRange);
  }
}

export default Pointer;
