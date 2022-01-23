import MoveableObject from '../moveableObject/MoveableObject';
import { ViewObserver, ViewProps } from '../main/viewInterface';

class Pointer {
  private pointer: HTMLElement;

  private moveableObject: MoveableObject;

  private isSecond: boolean;

  constructor(node: HTMLElement, observer: ViewObserver, isSecond?: boolean) {
    this.isSecond = Boolean(isSecond);
    this.createDomElements(node);
    this.moveableObject = new MoveableObject(this.pointer, observer, isSecond);
  }

  render(props: ViewProps) {
    if (!this.shouldBeDisplayed(props)) {
      this.pointer.style.display = 'none';
      return;
    } this.pointer.style.display = 'block';

    const pos = this.isSecond
      ? props.secondPointerPosPercentage
      : props.pointerPosPercentage;

    if (props.isVertical) {
      this.pointer.style.top = `${pos}%`;
      this.pointer.style.left = '';
    } else {
      this.pointer.style.top = '';
      this.pointer.style.left = `${pos}%`;
    }

    this.moveableObject.update(props);
  }

  setLayerLevel(zIndex: number) {
    this.pointer.style.zIndex = zIndex.toString();
  }

  private createDomElements(node: HTMLElement) {
    this.pointer = document.createElement('div');
    this.pointer.classList.add('slider__pointer');
    node.appendChild(this.pointer);
  }

  private shouldBeDisplayed(props: ViewProps) {
    return (!this.isSecond || props.isRange);
  }
}

export default Pointer;
