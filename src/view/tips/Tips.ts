import MoveableObject from '../moveableObject/MoveableObject';
import { ViewObserver, ViewProps } from '../main/viewTypes';
import setElementPositions from '../helpers/helpers';

class Tips {
  private tip = document.createElement('div');

  private secondTip = document.createElement('div');

  private parent: HTMLElement;

  private moveableObjects: MoveableObject[];

  constructor(node: HTMLElement, observer: ViewObserver) {
    this.parent = node;
    this.configureDomElements();
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

    const {
      tipPos,
      secondTipPos,
      isConnected,
      isTipCloserToStart,
    } = this.getTipsPositions(props);

    if (props.isVertical && props.isInversion) {
      setElementPositions(this.tip, { top: 100 - tipPos });
      setElementPositions(this.secondTip, { top: 100 - secondTipPos });
    } else if (props.isVertical) {
      setElementPositions(this.tip, { top: tipPos });
      setElementPositions(this.secondTip, { top: secondTipPos });
    } else if (props.isInversion) {
      setElementPositions(this.tip, { left: 100 - tipPos });
      setElementPositions(this.secondTip, { left: 100 - secondTipPos });
    } else {
      setElementPositions(this.tip, { left: tipPos });
      setElementPositions(this.secondTip, { left: secondTipPos });
    }

    if (!isConnected || !props.isRange) {
      this.tip.classList.remove(Tips.TIP_CLASS_CONNECTED);
      this.secondTip.classList.remove(Tips.TIP_CLASS_CONNECTED);
    } else if (isTipCloserToStart) {
      this.tip.classList.add(Tips.TIP_CLASS_CONNECTED);
      this.secondTip.classList.remove(Tips.TIP_CLASS_CONNECTED);
    } else {
      this.tip.classList.remove(Tips.TIP_CLASS_CONNECTED);
      this.secondTip.classList.add(Tips.TIP_CLASS_CONNECTED);
    }
  }

  private configureDomElements() {
    this.tip.classList.add('slider__tip');
    this.secondTip.classList.add('slider__tip');
    this.parent.appendChild(this.tip);
    this.parent.appendChild(this.secondTip);
  }

  private getTipsPositions(
    props: ViewProps,
  ): {
      tipPos: number,
      secondTipPos: number,
      isConnected: boolean,
      isTipCloserToStart?: boolean,
    } {
    const pointerPos = props.pointerPosPercentage;
    const secondPointerPos = props.secondPointerPosPercentage;
    const { tipSize, secondTipSize } = this.getTipsSizeInPercent(props);

    const rangeSize = Math.abs(pointerPos - secondPointerPos);
    const isIntersection = rangeSize < (tipSize + secondTipSize) / 2;
    const isCommonValue = props.tipValue === props.secondTipValue;
    const isPosLessSecondPos = pointerPos < secondPointerPos;

    if (isIntersection && !isCommonValue && props.isRange) {
      const offset = ((tipSize + secondTipSize) / 2 - rangeSize) / 2;
      const [tipPos, secondTipPos] = isPosLessSecondPos
        ? [pointerPos - offset, secondPointerPos + offset]
        : [pointerPos + offset, secondPointerPos - offset];
      const isTipCloserToStart = isPosLessSecondPos !== props.isInversion;

      return {
        tipPos,
        secondTipPos,
        isConnected: true,
        isTipCloserToStart,
      };
    }

    return {
      tipPos: pointerPos,
      secondTipPos: secondPointerPos,
      isConnected: false,
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

  private static TIP_CLASS_CONNECTED = 'slider__tip_connected';
}

export default Tips;
