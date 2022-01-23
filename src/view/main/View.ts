import Pointer from '../pointer/Pointer';
import Bar from '../bar/Bar';
import Scale from '../scale/Scale';
import Tip from '../tip/Tip';
import {
  ViewInterface,
  ViewObserver,
  ViewProps,
} from './viewInterface';
import './view.css';

class View implements ViewInterface {
  private container: HTMLElement;

  private scale: Scale;

  private bar: Bar;

  private pointer: Pointer;

  private secondPointer: Pointer;

  private tip: Tip;

  private secondTip: Tip;

  private observer: ViewObserver;

  private props: ViewProps;

  constructor(node: HTMLElement, observer: ViewObserver) {
    this.observer = observer;
    this.createViewElements(node, this.makeObserverProxy());
    this.attachEvents();
  }

  public render(props: ViewProps) {
    this.props = { ...props };
    this.updateView();
  }

  private updateView() {
    if (this.props.isVertical) {
      this.container.classList.add('slider__container_vertical');
    } else {
      this.container.classList.remove('slider__container_vertical');
    }

    [
      this.scale,
      this.bar,
      this.pointer,
      this.secondPointer,
      this.tip,
      this.secondTip,
    ].forEach((element) => element.render(this.props));
  }

  private handleWindowResize() {
    this.updateView();
  }

  private attachEvents() {
    window.addEventListener('resize', this.handleWindowResize.bind(this));
  }

  private createViewElements(node: HTMLElement, observer: ViewObserver) {
    this.container = document.createElement('div');
    this.container.classList.add('slider__container');

    const scaleContainer = document.createElement('div');
    scaleContainer.classList.add('slider__scale-container');

    const barContainer = document.createElement('div');
    barContainer.classList.add('slider__bar-container');

    const tipsContainer = document.createElement('div');
    tipsContainer.classList.add('slider__tips-container');

    [tipsContainer, barContainer, scaleContainer].forEach((item) => {
      this.container.appendChild(item);
    });
    node.append(this.container);

    this.scale = new Scale(scaleContainer, observer);
    this.bar = new Bar(barContainer, observer);
    this.pointer = new Pointer(barContainer, observer);
    this.secondPointer = new Pointer(barContainer, observer, true);
    this.tip = new Tip(tipsContainer, observer);
    this.secondTip = new Tip(tipsContainer, observer, true);
  }

  private makeObserverProxy(): ViewObserver {
    const startMoveHandler = (isSecond: boolean): void => {
      this.updateElementsLayerLevel(isSecond);
      this.observer.startMove(isSecond);
    };
    return ({
      ...this.observer,
      startMove: startMoveHandler,
    });
  }

  private updateElementsLayerLevel(isSecondOnTop: boolean) {
    const [
      elementIndex,
      secondElementIndex,
    ] = isSecondOnTop ? [3, 4] : [4, 3];
    [
      this.tip,
      this.pointer,
    ].forEach((element) => element.setLayerLevel(elementIndex));
    [
      this.secondTip,
      this.secondPointer,
    ].forEach((element) => element.setLayerLevel(secondElementIndex));
  }
}

export default View;
