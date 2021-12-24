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
    const isPosChanged = this.state.pointerPosition
      !== this.nextState.pointerPosition;
    const isSecondPosChanged = this.state.secondPointerPosition
      !== this.nextState.secondPointerPosition;
    const isEachPosCorrect = !this.nextState.isRange
      || this.nextState.secondPointerPosition >= this.nextState.pointerPosition;

    const getPosBoundedToStep = (pos: number): number => {
      const { step, minValue, maxValue } = this.nextState;
      const newPos = Math.round((pos - minValue) / step) * step + minValue;
      if (newPos < minValue) {
        return minValue;
      }
      if (newPos > maxValue) {
        return maxValue;
      }
      return newPos;
    };

    this.nextState.pointerPosition = getPosBoundedToStep(
      this.nextState.pointerPosition,
    );
    this.nextState.secondPointerPosition = getPosBoundedToStep(
      this.nextState.secondPointerPosition,
    );

    if (isEachPosCorrect) {
      return;
    }

    if (isPosChanged && isSecondPosChanged) {
      this.nextState = { ...this.state };
    } else if (isPosChanged) {
      this.nextState.pointerPosition = this.nextState.secondPointerPosition;
    } else {
      this.nextState.secondPointerPosition = this.nextState.pointerPosition;
    }
  }
}

export default Model;
