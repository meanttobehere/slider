import {
  SliderParams,
  SliderState,
  SliderStateDefault,
  SliderStatePartial,
} from '../plugin/sliderTypes';
import ObservableSubject from '../ObservableSubject/ObservableSubject';
import { ModelObserverData } from './modelTypes';

class Model extends ObservableSubject<ModelObserverData> {
  private state = SliderStateDefault;

  private nextState = SliderStateDefault;

  constructor(state: SliderStatePartial) {
    super();
    this.state = this.getNextState(state);
  }

  public setState(state: SliderStatePartial) {
    const newState = this.getNextState(state);
    if (!this.isEqualStates(this.state, newState)) {
      this.state = newState;
      this.notify({
        eventType: 'update',
        params: this.getParams(),
      });
    }
  }

  public getState(): SliderState {
    return this.state;
  }

  public setPositionsPercentage(percentage: {
    pointer?: number,
    secondPointer?: number,
  }): void {
    const newState: SliderStatePartial = {};
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
    const pos = this.convertPercentageToPos(percentage);
    const distToPointer = Math.abs(pos - this.state.pointerPosition);
    const distToSecondPointer = Math.abs(pos - this.state.secondPointerPosition);
    const isPositionCloserToFirstPointer = distToPointer < distToSecondPointer;

    this.setState((!this.state.isRange || isPositionCloserToFirstPointer)
      ? { pointerPosition: pos }
      : { secondPointerPosition: pos });
  }

  public getParams(): SliderParams {
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
      return pos.toExponential(3);
    }
    return this.getRoundedValue(pos, this.state.step).toString();
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

  private getNextState(state: SliderStatePartial): SliderState {
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
      const roundedPos = this.getRoundedValue(boundedPos, step);
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

  private isEqualStates(state1: SliderState, state2: SliderState): boolean {
    return Object.keys(state1).every((key) => state1[key] === state2[key]);
  }

  private getRoundedValue(val: number, step: number): number {
    const numStepDecimals = step % 1 === 0
      ? 0
      : step.toString().split('.')[1].length;
    return Number.parseFloat(val.toFixed(numStepDecimals));
  }
}

export default Model;
