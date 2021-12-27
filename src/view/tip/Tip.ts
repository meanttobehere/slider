import MoveableObject from '../moveableObject/MoveableObject';
import View from '../main/View';
import { ViewObserver, ViewProps } from '../main/viewInterface';
import './tip.css';

class Tip {
  private $tip: JQuery;

  private moveableObject: MoveableObject;

  private isSecond: boolean;

  private context: CanvasRenderingContext2D;

  constructor($node: JQuery, observer: ViewObserver, isSecond?: boolean) {
    this.isSecond = Boolean(isSecond);
    this.createDomElements($node);
    this.moveableObject = new MoveableObject(this.$tip, observer, isSecond);
  }

  render(props: ViewProps) {
    if (!this.shouldBeDisplayed(props)) {
      this.$tip.hide();
      return;
    } this.$tip.show();

    const tipData = this.getTipData(
      (this.isSecond ? props.secondPointerPosition : props.pointerPosition),
      props,
    );

    if (props.isVertical) {
      this.$tip.css({ top: `${tipData.pos}%`, left: '' });
    } else {
      this.$tip.css({ left: `${tipData.pos}%`, top: '' });
    }
    this.$tip.text(tipData.val);

    this.moveableObject.update(props);
  }

  setLayerLevel(zIndex: number) {
    this.$tip.css('zIndex', zIndex);
  }

  private createDomElements($node: JQuery) {
    this.$tip = $('<div>', { class: 'slider__tip' });
    $node.append(this.$tip);
  }

  private shouldBeDisplayed(props: ViewProps) {
    return (props.shouldDisplayTips && (!this.isSecond || props.isRange));
  }

  private getTipData(
    position: number,
    props: ViewProps,
  ): { pos: number, val: string } {
    const positionInPercent = View.convertPosToPercent(position, props);
    const value = position > 10000000
      ? position.toExponential(5)
      : position.toFixed(Math.min(View.getNumDecimals(position), 4));
    const size = this.getTipSizeInPercent(value, props);
    const start = positionInPercent - size / 2;
    const end = positionInPercent + size / 2;

    const tipData = {
      pos: positionInPercent,
      val: value,
    };

    const [minStart, maxEnd] = [-1, 101];

    if (start < minStart) {
      tipData.pos = minStart + (size / 2);
    } else if (end > maxEnd) {
      tipData.pos = maxEnd - (size / 2);
    }

    return tipData;
  }

  private getTipSizeInPercent(text: string, props: ViewProps): number {
    if (!this.context) {
      const context = document.createElement('canvas').getContext('2d');
      if (context) {
        context.font = this.getTipFont();
        this.context = context;
      }
    }
    if (this.context) {
      if (!props.isVertical) {
        const width = this.$tip.parent()[0].clientWidth;
        const metrics = this.context.measureText(text);
        return (metrics.width / width) * 100;
      }
      const height = this.$tip.parent()[0].clientHeight;
      return (18 / height) * 100;
    }
    return 100;
  }

  private getTipFont(): string {
    const fontWeight = this.$tip.css('font-weight') || 'normal';
    const fontSize = this.$tip.css('font-size') || '16px';
    const fontFamily = this.$tip.css('font-family') || 'Times New Roman';

    return `${fontWeight} ${fontSize} ${fontFamily}`;
  }
}

export default Tip;
