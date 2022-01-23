import Pointer from '../pointer/Pointer';
import Bar from '../bar/Bar';
import Scale from '../scale/Scale';
import Tips from '../tips/Tips';
import {
  ViewInterface,
  ViewObserver,
  ViewProps,
} from './viewTypes';
import './view.scss';

class View implements ViewInterface {
  private container: HTMLElement;

  private scale: Scale;

  private bar: Bar;

  private pointer: Pointer;

  private secondPointer: Pointer;

  private tips: Tips;

  private props: ViewProps;

  constructor(node: HTMLElement, observer: ViewObserver) {
    this.createViewElements(node, observer);
    this.attachEventHandlers();
  }

  public render(props: ViewProps) {
    this.props = { ...props };
    this.updateView();
  }

  private updateView() {
    if (this.props.isVertical) {
      this.container.classList.add('slider_vertical');
    } else {
      this.container.classList.remove('slider_vertical');
    }

    [
      this.scale,
      this.bar,
      this.pointer,
      this.secondPointer,
      this.tips,
    ].forEach((element) => element.render(this.props));
  }

  private handleWindowResize() {
    this.updateView();
  }

  private attachEventHandlers() {
    window.addEventListener('resize', this.handleWindowResize.bind(this));
  }

  private createViewElements(node: HTMLElement, observer: ViewObserver) {
    this.container = document.createElement('div');
    this.container.classList.add('slider');

    const scaleContainer = document.createElement('div');
    scaleContainer.classList.add('slider__container');

    const barContainer = document.createElement('div');
    barContainer.classList.add('slider__container');

    const tipsContainer = document.createElement('div');
    tipsContainer.classList.add('slider__container');

    [tipsContainer, barContainer, scaleContainer].forEach((item) => {
      this.container.appendChild(item);
    });
    node.appendChild(this.container);

    this.scale = new Scale(scaleContainer, observer);
    this.bar = new Bar(barContainer, observer);
    this.pointer = new Pointer(barContainer, observer);
    this.secondPointer = new Pointer(barContainer, observer, true);
    this.tips = new Tips(tipsContainer, observer);
  }
}

export default View;
