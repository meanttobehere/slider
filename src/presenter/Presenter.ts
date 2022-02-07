import View from '../view/main/View';
import Model from '../model/Model';
import { ViewObserverData } from '../view/main/viewTypes';
import { ModelObserverData } from '../model/modelTypes';
import {
  SliderCallbacks,
  SliderState,
  SliderStatePartial,
} from '../plugin/sliderTypes';

class Presenter {
  private model: Model;

  private view: View;

  private callbacks: SliderCallbacks;

  constructor(
    node: HTMLElement,
    state: SliderStatePartial,
    callbacks: SliderCallbacks,
  ) {
    this.callbacks = callbacks;
    this.model = new Model(state);
    this.model.attach(this.createModelObserver());
    this.view = new View(node);
    this.view.attach(this.createViewObserver());
    this.view.render(this.model.getParams());
  }

  public setOptions(state: SliderStatePartial): void {
    this.model.setState(state);
  }

  public getOptions(): SliderState {
    return this.model.getState();
  }

  private createViewObserver(): (data: ViewObserverData) => void {
    const observer = (data: ViewObserverData) => {
      switch (data.eventType) {
        case 'move':
          this.model.setPositionsPercentage(data.isSecond
            ? { secondPointer: data.posPercentage }
            : { pointer: data.posPercentage });
          this.callbacks.slide();
          break;
        case 'startMove':
          this.callbacks.start();
          break;
        case 'endMove':
          this.callbacks.stop();
          break;
        case 'click':
          if (data.posPercentage) {
            this.model.setPositionPercentage(data.posPercentage);
          }
          this.callbacks.start();
          this.callbacks.slide();
          this.callbacks.stop();
          break;
        default:
          break;
      }
    };
    return observer;
  }

  private createModelObserver(): (data: ModelObserverData) => void {
    const observer = (data: ModelObserverData) => {
      this.callbacks.update();
      this.view.render(data.params);
    };
    return observer;
  }
}

export default Presenter;
