import { ViewProps } from '../view/main/viewInterface';
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
    this.observer.update(this.mapStateToProps());
  }

  public getState(): ModelState {
    return this.state;
  }

  public setPositionsPercentage(percentage: {
    pointer?: number,
    secondPointer?: number,
  }): void {
    const newState: ModelStatePartial = {};
    if (percentage.pointer) {
      newState.pointerPosition = this.convertPercentageToPos(percentage.pointer);
    }
    if (percentage.secondPointer) {
      newState.secondPointerPosition = this
        .convertPercentageToPos(percentage.secondPointer);
    }
    this.setState(newState);
  }

  public setPositionPercentage(percentage: number): void {
    const position = this.convertPercentageToPos(percentage);
    const isPositionCloserToFirstPointer = position - this.state.pointerPosition
      < this.state.secondPointerPosition - position;

    this.setState((!this.state.isRange || isPositionCloserToFirstPointer)
      ? { pointerPosition: position }
      : { secondPointerPosition: position });
  }

  private mapStateToProps(): ViewProps {
    return ({
      ...this.state,
      pointerPosPercentage: this
        .convertPosToPercentage(this.state.pointerPosition),
      secondPointerPosPercentage: this
        .convertPosToPercentage(this.state.secondPointerPosition),
      tipValue: this.convertPosToString(this.state.pointerPosition),
      secondTipValue: this.convertPosToString(this.state.secondPointerPosition),
      scaleLabels: this.createScaleLabels(),
    });
  }

  private convertPosToPercentage(pos: number): number {
    const { maxValue, minValue } = this.state;
    return ((pos - minValue) / (maxValue - minValue)) * 100;
  }

  private convertPercentageToPos(percentage: number): number {
    const { maxValue, minValue } = this.state;
    return minValue + (maxValue - minValue) * (percentage / 100);
  }

  private convertPosToString(pos: number): string {
    if (pos > 1000000) {
      return pos.toExponential(5);
    }
    return this.getRoundedValue(pos).toString();
  }

  private createScaleLabels(): Array<{ val: string, posPercentage: number }> {
    const { maxValue, minValue, step } = this.state;
    const maxLabels = 25;
    const sparsity = Math.ceil((maxValue - minValue) / (step * maxLabels));
    const labelStep = sparsity * step;
    const scaleLabels: Array<{ val: string, posPercentage: number }> = [];

    for (let pos = minValue; pos <= maxValue; pos += labelStep) {
      scaleLabels.push({
        posPercentage: this.convertPosToPercentage(pos),
        val: this.convertPosToString(pos),
      });
    }

    return scaleLabels;
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
      const roundedPos = this.getRoundedValue(boundedPos);
      if (boundedPos < minValue) {
        return minValue;
      }
      if (boundedPos > maxValue || maxValue - pos < pos - boundedPos) {
        return maxValue;
      }
      return roundedPos;
    });

    this.nextState.pointerPosition = pointerPosBoundedToStep;
    this.nextState.secondPointerPosition = secondPointerPosBoundedToStep;
  }

  private getRoundedValue(val: number): number {
    const numStepDecimals = this.state.step % 1 === 0
      ? 0
      : this.state.step.toString().split('.')[1].length;
    return Number.parseFloat(val.toFixed(numStepDecimals));
  }
}

export default Model;
