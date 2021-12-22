import {
  ModelInterface,
  ModelObserver,
  ModelState,
  ModelStateDefault,
} from './modelInterface';

class Model implements ModelInterface {
  private state = ModelStateDefault;

  private observer: ModelObserver;

  constructor(state: ModelState, observer: ModelObserver) {
    this.observer = observer;
    this.state = Model.getNormalizedState(state, this.state);
  }

  public setState(state: ModelState) {
    this.state = Model.getNormalizedState(state, this.state);
    this.observer.update();
  }

  public getState(): ModelState {
    return this.state;
  }

  private static getNormalizedState(
    newState: ModelState,
    prevState: ModelState,
  ): ModelState {
    const state1 = Model.getStateWithNormalizedMaxMin(newState, prevState);
    const state2 = Model.getStateWithNormalizedStep(state1);
    const state3 = Model.getStateWithNormalizedPositions(state2, prevState);
    const state4 = Model.getStateWithNormalizedNumLabels(state3);
    return state4;
  }

  private static getStateWithNormalizedMaxMin(
    newState: ModelState,
    prevState: ModelState,
  ): ModelState {
    const isMaxChanged = prevState.maxValue !== newState.maxValue;
    const isMinChanged = prevState.minValue !== newState.minValue;
    const isMaxMinCorrect = newState.maxValue > newState.minValue;

    if (!isMaxMinCorrect && isMaxChanged && isMinChanged) {
      return { ...prevState };
    }
    if (!isMaxMinCorrect && isMaxChanged) {
      return ({
        ...newState,
        minValue: newState.maxValue - 1,
      });
    }
    if (!isMaxMinCorrect && isMinChanged) {
      return ({
        ...newState,
        maxValue: newState.minValue + 1,
      });
    }
    return { ...newState };
  }

  private static getStateWithNormalizedStep(
    state: ModelState,
  ): ModelState {
    const normalizedStep = state.step <= 0 ? 1 : state.step;
    if (normalizedStep > state.maxValue - state.minValue) {
      return ({
        ...state,
        step: state.maxValue - state.minValue,
      });
    }
    return ({
      ...state,
      step: normalizedStep,
    });
  }

  private static getStateWithNormalizedPositions(
    newState: ModelState,
    prevState: ModelState,
  ): ModelState {
    const [pos1, pos2] = [
      newState.pointerPosition,
      newState.secondPointerPosition,
    ].map((pos) => {
      const normalizedPos = Math.round((pos - newState.minValue) / newState.step)
        * newState.step + newState.minValue;
      if (normalizedPos < newState.minValue) {
        return newState.minValue;
      }
      if (normalizedPos > newState.maxValue) {
        return newState.maxValue;
      }
      return normalizedPos;
    });

    const isPosChanged = prevState.pointerPosition !== newState.pointerPosition;
    const isSecondPosChanged = (prevState.secondPointerPosition
      !== newState.secondPointerPosition);
    const isEachPosCorrect = !newState.isRange || pos2 >= pos1;

    if (!isEachPosCorrect && isPosChanged && isSecondPosChanged) {
      return prevState;
    }
    if (!isEachPosCorrect && isSecondPosChanged) {
      return ({
        ...newState,
        pointerPosition: pos2,
        secondPointerPosition: pos2,
      });
    }
    if (!isEachPosCorrect) {
      return ({
        ...newState,
        pointerPosition: pos1,
        secondPointerPosition: pos1,
      });
    }
    return ({
      ...newState,
      pointerPosition: pos1,
      secondPointerPosition: pos2,
    });
  }

  private static getStateWithNormalizedNumLabels(
    state: ModelState,
  ): ModelState {
    const normalizedMaxNumberLabels = Math.max(
      Math.round(state.maxNumberLabels),
      2,
    );
    return ({
      ...state,
      maxNumberLabels: normalizedMaxNumberLabels,
    });
  }
}

export default Model;
