import MoveableObject from '../moveableObject/MoveableObject';
import { ViewObserver, ViewProps } from '../main/viewTypes';

class Tip {
  private tip: HTMLElement;

  private parent: HTMLElement;

  private moveableObject: MoveableObject;

  private isSecond: boolean;

  private context?: CanvasRenderingContext2D;

  constructor(node: HTMLElement, observer: ViewObserver, isSecond?: boolean) {
    this.isSecond = Boolean(isSecond);
    this.createDomElements(node);
    this.moveableObject = new MoveableObject(this.tip, observer, isSecond);
  }

  render(props: ViewProps) {
    if (!this.shouldBeDisplayed(props)) {
      this.tip.style.display = 'hide';
      return;
    } this.tip.style.display = 'block';

    const tipData = this.getTipData(props);

    if (props.isVertical) {
      this.tip.style.top = `${tipData.pos}%`;
      this.tip.style.left = '';
    } else {
      this.tip.style.top = '';
      this.tip.style.left = `${tipData.pos}%`;
    }

    this.tip.textContent = tipData.val;

    this.moveableObject.update(props);
  }

  setLayerLevel(zIndex: number) {
    this.tip.style.zIndex = zIndex.toString();
  }

  private createDomElements(node: HTMLElement) {
    this.tip = document.createElement('div');
    this.tip.classList.add('slider__tip');
    this.parent = node;
    this.parent.appendChild(this.tip);
  }

  private shouldBeDisplayed(props: ViewProps) {
    return (props.shouldDisplayTips && (!this.isSecond || props.isRange));
  }

  private getTipData(props: ViewProps): { pos: number, val: string } {
    const tipData = this.isSecond
      ? { pos: props.secondPointerPosPercentage, val: props.secondTipValue }
      : { pos: props.pointerPosPercentage, val: props.tipValue };

    const size = this.getTipSizeInPercent(tipData.val, props);
    const start = tipData.pos - size / 2;
    const end = tipData.pos + size / 2;
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
        const width = this.parent.clientWidth;
        const metrics = this.context.measureText(text);
        return (metrics.width / width) * 100;
      }
      const height = this.parent.clientHeight;
      return (18 / height) * 100;
    }
    return 100;
  }

  private getTipFont(): string {
    const fontWeight = this.tip.style.fontWeight || 'normal';
    const fontSize = this.tip.style.fontSize || '16px';
    const fontFamily = this.tip.style.fontFamily || 'Times New Roman';

    return `${fontWeight} ${fontSize} ${fontFamily}`;
  }
}

export default Tip;
