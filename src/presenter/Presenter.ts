import View from '../view/main/View';
import Model from '../model/Model';
import {
  ViewProps,
  ViewObserver,
} from '../view/main/viewInterface';
import {
  ModelStateDefault,
  ModelObserver,
  ModelState,
} from '../model/modelInterface';
import {
  PresenterInterface,
  PresenterObserver,
  PresenterParams,
} from './presenterInterface';

class Presenter implements PresenterInterface {
  private model: Model;

  private view: View;

  private observer: PresenterObserver;

  constructor(
    $node: JQuery,
    params: PresenterParams,
    observer: PresenterObserver,
  ) {
    this.observer = observer;
    this.model = new Model(
      { ...ModelStateDefault, ...params },
      this.createModelObserver(),
    );
    this.view = new View($node, this.createViewObserver());
    this.updateView();
  }

  public getOptions(
    params: string | string[],
  ): PresenterParams | number | boolean | undefined {
    const state = this.model.getState() as PresenterParams;
    if (typeof params === 'string') {
      return state[params];
    }
    return (params.filter((key) => key in state)
      .reduce((acc, key) => ({
        ...acc,
        [key]: state[key],
      }), {})
    );
  }

  public setOptions(params: PresenterParams) {
    const state = this.model.getState();
    this.model.setState({
      ...state,
      ...params,
    });
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
    this.updateView();
    this.observer.update();
  }

  private handleViewStartMove() {
    this.observer.start();
  }

  private handleViewEndMove() {
    this.observer.stop();
  }

  private handleViewMove(distanceInPercent: number, isSecond: boolean) {
    const state = this.model.getState();
    const distance = Presenter.convertPercentToValue(distanceInPercent, state);

    const newPos = isSecond
      ? state.secondPointerPosition + distance
      : state.pointerPosition + distance;

    if (!state.isRange) {
      this.model.setState({
        ...state,
        pointerPosition: newPos,
      });
    } else if (!isSecond) {
      this.model.setState({
        ...state,
        pointerPosition: Math.min(newPos, state.secondPointerPosition),
      });
    } else {
      this.model.setState({
        ...state,
        secondPointerPosition: Math.max(newPos, state.pointerPosition),
      });
    }

    this.observer.slide();
  }

  private handleViewClick(positionInPercent: number) {
    const state = this.model.getState();
    const position = Presenter.convertPercentToPos(positionInPercent, state);

    if (!state.isRange || Presenter.isPosCloserToFirstPointer(position, state)) {
      this.model.setState({
        ...state,
        pointerPosition: position,
      });
    } else {
      this.model.setState({
        ...state,
        secondPointerPosition: position,
      });
    }

    this.observer.start();
    this.observer.slide();
    this.observer.stop();
  }

  private updateView() {
    this.view.render(Presenter.getViewProps(this.model.getState()));
  }

  private static getViewProps(state: ModelState): ViewProps {
    const [
      pointerPosition,
      secondPointerPosition,
    ] = [state.pointerPosition, state.secondPointerPosition].map((pos) => (
      Presenter.convertPosToPercent(pos, state)
    ));
    const [
      tipValue,
      secondTipValue,
    ] = [state.pointerPosition, state.secondPointerPosition].map((pos) => (
      pos.toFixed(Presenter.getNumDecimals(state.step))
    ));
    const scaleLabels = Presenter.getScaleLabels(state);

    return ({
      isVertical: state.isVertical,
      isRange: state.isRange,
      shouldDisplayTips: state.shouldDisplayTips,
      shouldDisplayProgressBar: state.shouldDisplayProgressBar,
      shouldDisplayScale: state.shouldDisplayScale,
      pointerPosition,
      secondPointerPosition,
      tipValue,
      secondTipValue,
      scaleLabels,
    });
  }

  private static getScaleLabels(
    state: ModelState,
  ): Array<{ val: string, pos: number }> {
    const scaleLabels: Array<{ val: string, pos: number }> = [];
    const minStep = (state.maxValue - state.minValue) / state.maxNumberLabels;
    const labelStep = Math.max(minStep, state.step);

    for (let i = state.minValue; i <= state.maxValue; i += labelStep) {
      scaleLabels.push({
        val: i.toFixed(Presenter.getNumDecimals(state.step)),
        pos: Presenter.convertPosToPercent(i, state),
      });
    }

    const lastLabelPos = scaleLabels[scaleLabels.length - 1].pos;
    if (Math.abs(lastLabelPos - 100) >= 0.5) {
      scaleLabels.push({
        val: state.maxValue.toString(),
        pos: 100,
      });
    }

    return scaleLabels;
  }

  private static convertPosToPercent(
    pos: number,
    state: ModelState,
  ): number {
    return ((pos - state.minValue) / (state.maxValue - state.minValue)) * 100;
  }

  private static convertPercentToPos(
    percent: number,
    state: ModelState,
  ) : number {
    return state.minValue + (state.maxValue - state.minValue) * (percent / 100);
  }

  private static convertPercentToValue(
    percent: number,
    state: ModelState,
  ): number {
    return (state.maxValue - state.minValue) * (percent / 100);
  }

  private static isPosCloserToFirstPointer(
    pos: number,
    state: ModelState,
  ): boolean {
    return (pos - state.pointerPosition < state.secondPointerPosition - pos);
  }

  private static getNumDecimals(num: number): number {
    return (num % 1 === 0
      ? 0
      : num.toString().split('.')[1].length);
  }
}

export default Presenter;
