import Scale from '../scale/Scale';
import Bar from '../bar/Bar';
import Pointer from '../pointer/Pointer';
import Tips from '../tips/Tips';
import {
  ViewElements,
  ViewInterface,
  ViewObserver,
  ViewProps,
} from './viewTypes';
import './view.scss';

class View implements ViewInterface {
  private container = document.createElement('div');

  private tipsContainer = document.createElement('div');

  private barContainer = document.createElement('div');

  private scaleContainer = document.createElement('div');

  private elements: ViewElements;

  private props?: ViewProps;

  private isLoading = true;

  constructor(node: HTMLElement, observer: ViewObserver) {
    this.elements = this.createViewElements(observer);
    this.configureDomElements(node);
    this.attachEventHandlers();
  }

  public render(props: ViewProps) {
    this.props = { ...props };
    if (!this.isLoading) {
      this.updateView(props);
    }
  }

  private updateView(props: ViewProps) {
    if (props.isVertical) {
      this.container.classList.add('slider_vertical');
    } else {
      this.container.classList.remove('slider_vertical');
    }

    Object.values(this.elements).forEach((element) => {
      element.render(props);
    });
  }

  private handleWindowResize() {
    if (this.props) {
      this.updateView(this.props);
    }
  }

  private handleWindowLoad() {
    this.isLoading = false;
    if (this.props) {
      this.updateView(this.props);
    }
  }

  private attachEventHandlers() {
    window.addEventListener('resize', this.handleWindowResize.bind(this));
    window.addEventListener('load', this.handleWindowLoad.bind(this));
  }

  private configureDomElements(node: HTMLElement) {
    this.container.classList.add('slider');
    [
      this.tipsContainer,
      this.barContainer,
      this.scaleContainer,
    ].forEach((item) => {
      item.classList.add('slider__container');
      this.container.appendChild(item);
    });
    node.appendChild(this.container);
  }

  private createViewElements(observer: ViewObserver): ViewElements {
    const scale = new Scale(this.scaleContainer, observer);
    const bar = new Bar(this.barContainer, observer);
    const pointer = new Pointer(this.barContainer, observer);
    const secondPointer = new Pointer(this.barContainer, observer, true);
    const tips = new Tips(this.tipsContainer, observer);

    return {
      scale,
      bar,
      pointer,
      secondPointer,
      tips,
    };
  }
}

export default View;
