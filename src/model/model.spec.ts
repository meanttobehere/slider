import { SliderState, SliderStateDefault } from '../plugin/sliderTypes';
import Model from './Model';

function isItNumberMultiplier(num: number, multiplier: number): boolean {
  const reminder = num % multiplier;
  return (
    reminder <= multiplier / 1000
    || multiplier - reminder <= multiplier / 1000
  );
}

describe('Model', () => {
  let model: Model;
  let spy: jasmine.Spy<Model['notify']>;

  beforeEach(() => {
    model = new Model(SliderStateDefault);
    spy = spyOn(model, 'notify');
  });

  it('SliderStateDefault should be correct state of model', () => {
    const state = SliderStateDefault;
    [
      state.minValue < state.maxValue,
      state.step > 0,
      state.pointerPosition >= state.minValue,
      state.secondPointerPosition <= state.maxValue,
      state.pointerPosition <= state.secondPointerPosition,
      isItNumberMultiplier(state.pointerPosition, state.step),
      isItNumberMultiplier(state.secondPointerPosition, state.step),
    ].forEach((condition) => expect(condition).toBeTrue());
  });

  it('If you set model state, which is different from the current state, model should notify observer', () => {
    model.setState({ isInversion: !SliderStateDefault.isInversion });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('If you try to set min value, that is more than max value, it will set the min value equal to the given value and set the max value equal to the min value + 1', () => {
    const minValue = SliderStateDefault.maxValue + 100;
    const state: SliderState = {
      ...SliderStateDefault,
      minValue,
    };
    model.setState(state);
    expect(model.getState().minValue).toEqual(minValue);
    expect(model.getState().maxValue).toEqual(minValue + 1);
  });

  it('If you try to set max value, that is less than min value, it will set max value equal to the given value and set the min value equal max value - 1', () => {
    const maxValue = SliderStateDefault.minValue - 100;
    const state: SliderState = {
      ...SliderStateDefault,
      maxValue,
    };
    model.setState(state);
    expect(model.getState().minValue).toEqual(maxValue - 1);
    expect(model.getState().maxValue).toEqual(maxValue);
  });

  it('If you try to set pointerPosition outside min-max interval, pointerPosition should stay inside min-max interval', () => {
    const state1: SliderState = {
      ...SliderStateDefault,
      isRange: false,
      pointerPosition: SliderStateDefault.minValue - 1,
    };
    model.setState(state1);
    const pos = model.getState().pointerPosition;
    expect(pos).toEqual(SliderStateDefault.minValue);

    const state2: SliderState = {
      ...state1,
      pointerPosition: SliderStateDefault.maxValue + 1,
    };
    model.setState(state2);
    const nextPos = model.getState().pointerPosition;
    expect(nextPos).toEqual(SliderStateDefault.maxValue);
  });

  it('If you try to set secondPointerPosition outside min-max interval, secondPointerPosition should stay inside min-max interval', () => {
    const state1: SliderState = {
      ...SliderStateDefault,
      isRange: true,
      secondPointerPosition: SliderStateDefault.maxValue + 1,
    };
    model.setState(state1);
    expect(model.getState().secondPointerPosition)
      .toEqual(SliderStateDefault.maxValue);
  });

  it('If you set max value less or min value more than pointerPosition, pointerPosition will be cut to min-max interval', () => {
    const state1: SliderState = {
      ...SliderStateDefault,
      isRange: false,
      minValue: 0,
      maxValue: 100,
      step: 10,
      pointerPosition: 50,
    };
    model.setState(state1);

    const state2: SliderState = {
      ...state1,
      minValue: 80,
    };
    model.setState(state2);
    expect(model.getState().pointerPosition).toEqual(80);

    model.setState(state1);
    const state3: SliderState = {
      ...state1,
      maxValue: 30,
    };
    model.setState(state3);
    expect(model.getState().pointerPosition).toEqual(30);
  });

  it('If you set max value less or min value more than secondPointerPosition, secondPointerPosition will be cut to min-max interval', () => {
    const state1: SliderState = {
      ...SliderStateDefault,
      isRange: true,
      minValue: 0,
      maxValue: 100,
      step: 10,
      pointerPosition: 40,
      secondPointerPosition: 50,
    };
    model.setState(state1);

    const state2: SliderState = {
      ...state1,
      minValue: 80,
    };
    model.setState(state2);
    expect(model.getState().secondPointerPosition).toEqual(80);

    model.setState(state1);
    const state3: SliderState = {
      ...state1,
      maxValue: 30,
    };
    model.setState(state3);
    expect(model.getState().secondPointerPosition).toEqual(30);
  });

  it('When you set pointers positions, they will be set to multiples of the step', () => {
    const state: SliderState = {
      ...SliderStateDefault,
      isRange: true,
      minValue: 0,
      maxValue: 100,
      step: 1.78565,
      pointerPosition: 25,
      secondPointerPosition: 75,
    };
    model.setState(state);
    const modelState = model.getState();

    expect(isItNumberMultiplier(
      modelState.pointerPosition,
      modelState.step,
    )).toBeTrue();

    expect(isItNumberMultiplier(
      modelState.secondPointerPosition,
      modelState.step,
    )).toBeTrue();
  });

  it('If you try to set step less than 0 or more than length of max-min interval, it will set step equal to 1 or length of max-min interval', () => {
    const state1: SliderState = {
      ...SliderStateDefault,
      isRange: true,
      minValue: 0,
      maxValue: 100,
      step: -1,
    };
    model.setState(state1);
    expect(model.getState().step).toEqual(1);

    const state2: SliderState = {
      ...state1,
      step: 120,
    };
    model.setState(state2);
    expect(model.getState().step).toEqual(100);
  });

  it('When you set step, pointers positions should be updated, to be multiples of step', () => {
    const state1: SliderState = {
      ...SliderStateDefault,
      isRange: true,
      minValue: 0,
      maxValue: 100,
      step: 1,
      pointerPosition: 20,
      secondPointerPosition: 50,
    };
    model.setState(state1);

    const state2: SliderState = {
      ...state1,
      step: 1.76,
    };
    model.setState(state2);

    const pos = model.getState().pointerPosition;
    const secondPos = model.getState().secondPointerPosition;

    expect(isItNumberMultiplier(pos, 1.76)).toBeTrue();
    expect(isItNumberMultiplier(secondPos, 1.76)).toBeTrue();
  });
});
