import { SliderParams } from '../../plugin/sliderTypes';
import ObservableSubject from '../../ObservableSubject/ObservableSubject';
import Scale from '../scale/Scale';
import Bar from '../bar/Bar';
import Pointer from '../pointer/Pointer';
import Tips from '../tips/Tips';
import { ViewElement, ViewObserverData } from './viewTypes';
import './view.scss';

class View extends ObservableSubject<ViewObserverData> {
  private container = document.createElement('div');

  private tipsContainer = document.createElement('div');

  private barContainer = document.createElement('div');

  private scaleContainer = document.createElement('div');

  private elements: ViewElement[] = [];

  private params?: SliderParams;

  private isLoading = true;

  constructor(node: HTMLElement) {
    super();
    this.createViewElements();
    this.configureDomElements(node);
    this.attachEventHandlers();
  }

  public render(params: SliderParams) {
    this.params = params;
    if (!this.isLoading) {
      this.updateView(params);
    }
  }

  private updateView(params: SliderParams) {
    if (params.isVertical) {
      this.container.classList.add('slider_vertical');
    } else {
      this.container.classList.remove('slider_vertical');
    }

    this.elements.forEach((element) => { element.render(params); });
  }

  private handleWindowResize(): void {
    if (this.params) {
      this.updateView(this.params);
    }
  }

  private handleWindowLoad(): void {
    this.isLoading = false;
    if (this.params) {
      this.updateView(this.params);
    }
  }

  private attachEventHandlers(): void {
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

  private createViewElements(): void {
    this.elements.push(
      new Scale(this.scaleContainer, this),
      new Bar(this.barContainer, this),
      new Pointer(this.barContainer, this),
      new Pointer(this.barContainer, this, true),
      new Tips(this.tipsContainer, this),
    );
  }
}

export default View;
