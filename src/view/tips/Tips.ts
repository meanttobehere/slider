import MoveableObject from '../moveableObject/MoveableObject';
import { ViewObserver, ViewProps } from '../main/viewTypes';

class Tips {
  private tip: HTMLElement;

  private secondTip: HTMLElement;

  private parent: HTMLElement;

  private moveableObjects: MoveableObject[];

  constructor(node: HTMLElement, observer: ViewObserver) {
    this.createDomElements(node);
    this.moveableObjects = [
      new MoveableObject(this.tip, observer),
      new MoveableObject(this.secondTip, observer, true),
    ];
  }

  render(props: ViewProps) {
    if (!props.shouldDisplayTips) {
      this.tip.style.display = 'none';
      this.secondTip.style.display = 'none';
      return;
    }
    this.tip.style.display = 'block';
    this.secondTip.style.display = props.isRange ? 'block' : 'none';

    this.tip.textContent = props.tipValue;
    this.secondTip.textContent = props.secondTipValue;

    this.moveableObjects.forEach((item) => item.update(props));

    const { tipPos, secondTipPos } = this.getTipsPositions(props);

    if (props.isVertical) {
      this.tip.style.top = `${tipPos}%`;
      this.secondTip.style.top = `${secondTipPos}%`;
      this.tip.style.left = '';
      this.secondTip.style.left = '';
    } else {
      this.tip.style.top = '';
      this.secondTip.style.top = '';
      this.tip.style.left = `${tipPos}%`;
      this.secondTip.style.left = `${secondTipPos}%`;
    }
  }

  private createDomElements(node: HTMLElement) {
    this.tip = document.createElement('div');
    this.tip.classList.add('slider__tip');

    this.secondTip = document.createElement('div');
    this.secondTip.classList.add('slider__tip');

    this.parent = node;
    this.parent.appendChild(this.tip);
    this.parent.appendChild(this.secondTip);
  }

  private getTipsPositions(
    props: ViewProps,
  ): { tipPos: number, secondTipPos: number } {
    const { tipSize, secondTipSize } = this.getTipsSizeInPercent(props);
    const rangeSize = Math.abs(props.pointerPosPercentage
      - props.secondPointerPosPercentage);
    const isIntersection = rangeSize < (tipSize + secondTipSize) / 2;
    const isCommonValue = props.tipValue === props.secondTipValue;

    if (isIntersection && !isCommonValue) {
      const offset = ((tipSize + secondTipSize) / 2 - rangeSize) / 2;
      if (props.pointerPosPercentage < props.secondPointerPosPercentage) {
        return {
          tipPos: props.pointerPosPercentage - offset,
          secondTipPos: props.secondPointerPosPercentage + offset,
        };
      }
      return {
        tipPos: props.pointerPosPercentage + offset,
        secondTipPos: props.secondPointerPosPercentage - offset,
      };
    }

    return {
      tipPos: props.pointerPosPercentage,
      secondTipPos: props.secondPointerPosPercentage,
    };
  }

  private getTipsSizeInPercent(
    props: ViewProps,
  ): { tipSize: number, secondTipSize: number } {
    if (props.isVertical) {
      const height = this.parent.clientHeight;
      return {
        tipSize: (this.tip.clientHeight / height) * 100,
        secondTipSize: (this.secondTip.clientHeight / height) * 100,
      };
    }
    const width = this.parent.clientWidth;
    return {
      tipSize: (this.tip.clientWidth / width) * 100,
      secondTipSize: (this.secondTip.clientWidth / width) * 100,
    };
  }
}

export default Tips;
