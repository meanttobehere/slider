import View from '../view/main/View';
import Model from '../model/Model';
import {
  ViewObserver, ViewProps,
} from '../view/main/viewTypes';
import {
  ModelObserver,
  ModelState,
  ModelStatePartial,
} from '../model/modelTypes';
import {
  PresenterInterface,
  PresenterObserver,
} from './presenterTypes';

class Presenter implements PresenterInterface {
  private model: Model;

  private view: View;

  private observer: PresenterObserver;

  constructor(
    node: HTMLElement,
    options: ModelStatePartial,
    observer: PresenterObserver,
  ) {
    this.observer = observer;
    this.model = new Model(options, this.createModelObserver());
    this.view = new View(node, this.createViewObserver());
    this.model.setState({});
  }

  public getOptions(): ModelState {
    return this.model.getState();
  }

  public setOptions(options: ModelStatePartial) {
    this.model.setState(options);
  }

  private createViewObserver(): ViewObserver {
    return ({
      move: this.handleViewMove.bind(this),
      startMove: this.handleViewStartMove.bind(this),
      endMove: this.handleViewEndMove.bind(this),
      click: this.handleViewClick.bind(this),
    });
  }

  private createModelObserver(): ModelObserver {
    return ({
      update: this.handleModelUpdate.bind(this),
    });
  }

  private handleModelUpdate(props: ViewProps) {
    this.observer.update();
    this.view.render(props);
  }

  private handleViewStartMove() {
    this.observer.start();
  }

  private handleViewEndMove() {
    this.observer.stop();
  }

  private handleViewMove(posPercentage: number, isSecond: boolean) {
    const percentage = isSecond
      ? { secondPointer: posPercentage }
      : { pointer: posPercentage };

    this.model.setPositionsPercentage(percentage);
    this.observer.slide();
  }

  private handleViewClick(posPercentage: number) {
    this.model.setPositionPercentage(posPercentage);
    this.observer.start();
    this.observer.slide();
    this.observer.stop();
  }
}

export default Presenter;
