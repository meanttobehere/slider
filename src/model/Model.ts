import {
  ModelInterface,
  ModelObserver,
  ModelState,
  ModelStateDefault,
  ModelStatePartial,
} from './modelInterface';

class Model implements ModelInterface {
  private state = ModelStateDefault;

  private nextState: ModelState;

  private observer: ModelObserver;

  constructor(state: ModelStatePartial, observer: ModelObserver) {
    this.observer = observer;
    this.state = this.getNextState(state);
  }

  public setState(state: ModelStatePartial) {
    this.state = this.getNextState(state);
    this.observer.update();
  }

  public getState(): ModelState {
    return this.state;
  }

  private getNextState(state: ModelStatePartial): ModelState {
    this.nextState = { ...this.state, ...state };

    this.normalizeNextStateInterval();
    this.normalizeNextStateStep();
    this.normalizeNextStatePositions();

    return this.nextState;
  }

  private normalizeNextStateInterval(): void {
    const isIntervalCorrect = this.nextState.maxValue > this.nextState.minValue;
    if (isIntervalCorrect) {
      return;
    }

    const isMaxChanged = this.state.maxValue !== this.nextState.maxValue;
    const isMinChanged = this.state.minValue !== this.nextState.minValue;

    if (isMaxChanged && isMinChanged) {
      this.nextState = { ...this.state };
    } else if (isMaxChanged) {
      this.nextState.minValue = this.nextState.maxValue - 1;
    } else {
      this.nextState.maxValue = this.nextState.minValue + 1;
    }
  }

  private normalizeNextStateStep(): void {
    const intervalLength = this.nextState.maxValue - this.nextState.minValue;

    if (this.nextState.step <= 0) {
      this.nextState.step = 1;
    }
    if (this.nextState.step > intervalLength) {
      this.nextState.step = intervalLength;
    }
  }

  private normalizeNextStatePositions(): void {
    const {
      step,
      minValue,
      maxValue,
      pointerPosition,
      secondPointerPosition,
    } = this.nextState;

    const [
      pointerPosBoundedToStep,
      secondPointerPosBoundedToStep,
    ] = [pointerPosition, secondPointerPosition].map((pos) => {
      const boundedPos = Math.round((pos - minValue) / step) * step + minValue;
      if (boundedPos < minValue) {
        return minValue;
      }
      if (boundedPos > maxValue || maxValue - pos < pos - boundedPos) {
        return maxValue;
      }
      return boundedPos;
    });

    this.nextState.pointerPosition = pointerPosBoundedToStep;
    this.nextState.secondPointerPosition = secondPointerPosBoundedToStep;
  }
}

export default Model;
