import { SliderParams } from '../../plugin/sliderTypes';
import MoveableObject from '../moveableObject/MoveableObject';
import { ViewElement } from '../main/viewTypes';
import setElementPositions from '../helpers/helpers';
import View from '../main/View';

class Pointer implements ViewElement {
  private pointer = document.createElement('div');

  private moveableObject: MoveableObject;

  private isSecond: boolean;

  constructor(node: HTMLElement, view: View, isSecond?: boolean) {
    this.isSecond = Boolean(isSecond);
    this.configureDomElements(node);
    this.moveableObject = new MoveableObject(this.pointer, view, isSecond);
  }

  render(params: SliderParams) {
    if (!this.shouldBeDisplayed(params)) {
      this.pointer.style.display = 'none';
      return;
    } this.pointer.style.display = 'block';

    const pos = this.isSecond
      ? params.secondPointerPosPercentage
      : params.pointerPosPercentage;

    if (params.isVertical && params.isInversion) {
      setElementPositions(this.pointer, { top: 100 - pos });
    } else if (params.isVertical) {
      setElementPositions(this.pointer, { top: pos });
    } else if (params.isInversion) {
      setElementPositions(this.pointer, { left: 100 - pos });
    } else {
      setElementPositions(this.pointer, { left: pos });
    }

    this.moveableObject.update(params);
  }

  private configureDomElements(node: HTMLElement) {
    this.pointer.classList.add('slider__pointer');
    node.appendChild(this.pointer);
  }

  private shouldBeDisplayed(params: SliderParams) {
    return (!this.isSecond || params.isRange);
  }
}

export default Pointer;
