import View from '../view/main/View';
import Model from '../model/Model';
import {
  ViewObserver,
} from '../view/main/viewInterface';
import {
  ModelObserver,
  ModelStatePartial,
} from '../model/modelInterface';
import {
  PresenterInterface,
  PresenterObserver,
} from './presenterInterface';

class Presenter implements PresenterInterface {
  private model: Model;

  private view: View;

  private observer: PresenterObserver;

  constructor(
    $node: JQuery,
    options: ModelStatePartial,
    observer: PresenterObserver,
  ) {
    this.observer = observer;
    this.model = new Model(options, this.createModelObserver());
    this.view = new View($node, this.createViewObserver());
    this.updateView();
  }

  public getOptions(
    options: string | string[],
  ): ModelStatePartial | number | boolean | undefined {
    const state = this.model.getState();
    if (typeof options === 'string') {
      return state[options];
    }
    return (options.filter((key) => key in state)
      .reduce((acc, key) => ({
        ...acc,
        [key]: state[key],
      }), {})
    );
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

  private handleModelUpdate() {
    this.observer.update();
    this.updateView();
  }

  private handleViewStartMove() {
    this.observer.start();
  }

  private handleViewEndMove() {
    this.observer.stop();
  }

  private handleViewMove(distance: number, isSecond: boolean) {
    const state = this.model.getState();

    const newState = isSecond
      ? { secondPointerPosition: state.secondPointerPosition + distance }
      : { pointerPosition: state.pointerPosition + distance };

    this.model.setState(newState);
    this.observer.slide();
  }

  private handleViewClick(position: number) {
    const state = this.model.getState();
    const isPositionCloserToFirstPointer = position - state.pointerPosition
      < state.secondPointerPosition - position;

    const newState = (!state.isRange || isPositionCloserToFirstPointer)
      ? { pointerPosition: position }
      : { secondPointerPosition: position };

    this.model.setState(newState);
    this.observer.start();
    this.observer.slide();
    this.observer.stop();
  }

  private updateView() {
    this.view.render(this.model.getState());
  }
}

export default Presenter;
