/*import Model from '../Model';
import { ModelDataDefault, ModelObserver } from '../modelInterface';

function isItNumberMultiplier(num: number, multiplier: number): boolean {
  const reminder = num % multiplier;
  return (
    reminder <= multiplier / 1000
    || multiplier - reminder <= multiplier / 1000
  );
}

describe('Model constructor, setters and getters', () => {
  let model = new Model();
  beforeEach(() => {
    model = new Model();
  });

  it('Model constructor set model state equal to ModelDataDefault, getters work fine', () => {
    expect(model.getTypeVertical()).toBe(ModelDataDefault.typeVertical);
    expect(model.getTypeRange()).toBe(ModelDataDefault.typeRange);
    expect(model.getDisplayTips()).toBe(ModelDataDefault.displayTips);
    expect(model.getDisplayProgressBar())
      .toBe(ModelDataDefault.displayProgressBar);
    expect(model.getDisplayScale()).toBe(ModelDataDefault.displayScale);
    expect(model.getMinValue()).toBe(ModelDataDefault.minValue);
    expect(model.getMaxValue()).toBe(ModelDataDefault.maxValue);
    expect(model.getStep()).toBe(ModelDataDefault.step);
    expect(model.getPointerPosition()).toBe(ModelDataDefault.pointerPosition);
    expect(model.getSecondPointerPosition())
      .toBe(ModelDataDefault.secondPointerPosition);
    expect(model.getData()).toEqual(ModelDataDefault);
  });

  it('ModelDataDefault shoud be correct state of model', () => {
    let isCorrect: boolean = true;
    isCorrect = model.getMinValue() < model.getMaxValue();
    isCorrect = model.getStep() > 0;
    isCorrect = model.getPointerPosition() >= model.getMinValue();
    isCorrect = model.getPointerPosition() <= model.getMaxValue();
    isCorrect = isItNumberMultiplier(
      model.getPointerPosition(),
      model.getStep(),
    );
    if (model.getTypeRange() === true) {
      isCorrect = model.getSecondPointerPosition() >= model.getMinValue();
      isCorrect = model.getSecondPointerPosition() <= model.getMaxValue();
      isCorrect = model.getPointerPosition() <= model.getSecondPointerPosition();
      isCorrect = isItNumberMultiplier(
        model.getSecondPointerPosition(), model.getStep(),
      );
    }
    expect(isCorrect).toBeTrue();
  });

  it('Model setters set values and notify observer', () => {
    const observer: ModelObserver = { update: () => {} };
    model.setObserver(observer);
    const spy = spyOn(observer, 'update');

    model.setTypeRange(!ModelDataDefault.typeVertical);
    expect(model.getTypeRange()).toEqual(!ModelDataDefault.typeVertical);
    expect(spy).toHaveBeenCalledWith({ updatedOnlyPointersPositions: false });
    spy.calls.reset();

    model.setTypeRange(!ModelDataDefault.typeRange);
    expect(model.getTypeRange()).toEqual(!ModelDataDefault.typeRange);
    expect(spy).toHaveBeenCalledWith({ updatedOnlyPointersPositions: false });
    spy.calls.reset();

    model.setTypeRange(!ModelDataDefault.displayTips);
    expect(model.getTypeRange()).toEqual(!ModelDataDefault.displayTips);
    expect(spy).toHaveBeenCalledWith({ updatedOnlyPointersPositions: false });
    spy.calls.reset();

    model.setTypeRange(!ModelDataDefault.displayProgressBar);
    expect(model.getTypeRange()).toEqual(!ModelDataDefault.displayProgressBar);
    expect(spy).toHaveBeenCalledWith({ updatedOnlyPointersPositions: false });
    spy.calls.reset();

    model.setTypeRange(!ModelDataDefault.displayScale);
    expect(model.getTypeRange()).toEqual(!ModelDataDefault.displayScale);
    expect(spy).toHaveBeenCalledWith({ updatedOnlyPointersPositions: false });
    spy.calls.reset();

    model.setMinValue(0);
    expect(model.getMinValue()).toEqual(0);
    expect(spy).toHaveBeenCalledWith({ updatedOnlyPointersPositions: false });
    spy.calls.reset();

    model.setMaxValue(100);
    expect(model.getMaxValue()).toEqual(100);
    expect(spy).toHaveBeenCalledWith({ updatedOnlyPointersPositions: false });
    spy.calls.reset();

    model.setStep(5);
    expect(model.getStep()).toEqual(5);
    expect(spy).toHaveBeenCalledWith({ updatedOnlyPointersPositions: false });
    spy.calls.reset();

    model.setPointerPosition(20);
    expect(model.getPointerPosition()).toEqual(20);
    expect(spy).toHaveBeenCalledWith({ updatedOnlyPointersPositions: true });
    spy.calls.reset();

    model.setSecondPointerPosition(80);
    expect(model.getSecondPointerPosition()).toEqual(80);
    expect(spy).toHaveBeenCalledWith({ updatedOnlyPointersPositions: true });
    spy.calls.reset();

    model.setPointerPositionInPercent(25);
    expect(model.getPointerPositionInPercent()).toBeCloseTo(25);
    expect(spy).toHaveBeenCalledWith({ updatedOnlyPointersPositions: true });
    spy.calls.reset();

    model.setSecondPointerPositionInPercent(75);
    expect(model.getSecondPointerPositionInPercent()).toBeCloseTo(75);
    expect(spy).toHaveBeenCalledWith({ updatedOnlyPointersPositions: true });
    spy.calls.reset();
  });
});

describe('Minvalue shoud be stricly less than maxvalue', () => {
  let model: Model;
  beforeEach(() => {
    model = new Model();
  });

  it('If you try to set minvalue, that is more than maxvalue, it will set the minvalue equal to the given value and set the maxvalue equal to the minvalue + 1', () => {
    const newMinValue = ModelDataDefault.maxValue + 100;
    model.setMinValue(newMinValue);
    expect(model.getMinValue()).toEqual(newMinValue);
    expect(model.getMaxValue()).toEqual(newMinValue + 1);
  });

  it('If you try to set maxvalue, that is less than minvalue, it will set maxvalue equal to the given value and set the minvalue equal maxvalue - 1', () => {
    const newMaxValue = ModelDataDefault.minValue - 100;
    model.setMaxValue(newMaxValue);
    expect(model.getMaxValue()).toEqual(newMaxValue);
    expect(model.getMinValue()).toEqual(newMaxValue - 1);
  });
});

describe('Pointers position shoud be inside min-max interval, secondPointerPosition shoud be more or equal to pointerPosition', () => {
  let model: Model;
  beforeEach(() => {
    model = new Model();
  });

  it('If you try to set pointerPosition outside min-max interval, pointerPosition shoud stay inside min-max interval', () => {
    model.setTypeRange(false);
    model.setPointerPosition(ModelDataDefault.minValue - 1);
    expect(model.getPointerPosition()).toEqual(ModelDataDefault.minValue);
    model.setPointerPosition(ModelDataDefault.maxValue + 1);
    expect(model.getPointerPosition()).toEqual(ModelDataDefault.maxValue);
  });

  it('If you try to set pointerPosition more than secondPointerPosition, pointerPosition shoud be equal to secondPointerPosition', () => {
    model.setTypeRange(true);
    model.setPointerPosition(ModelDataDefault.secondPointerPosition + 1);
    expect(model.getPointerPosition())
      .toEqual(ModelDataDefault.secondPointerPosition);
  });

  it('If you try to set secondPointerPosition less than pointerPosition, secondPointerPosition shoud be equal to pointerPosition', () => {
    model.setTypeRange(true);
    model.setSecondPointerPosition(ModelDataDefault.pointerPosition - 1);
    expect(model.getSecondPointerPosition())
      .toEqual(ModelDataDefault.pointerPosition);
  });

  it('If you try to set secondPointerPosition outside min-max interval, secondPointerPosition shoud stay inside min-max interval', () => {
    model.setTypeRange(true);
    model.setSecondPointerPosition(ModelDataDefault.maxValue + 1);
    expect(model.getSecondPointerPosition()).toEqual(ModelDataDefault.maxValue);
    model.setPointerPosition(ModelDataDefault.minValue - 1);
    model.setSecondPointerPosition(ModelDataDefault.minValue - 1);
    expect(model.getSecondPointerPosition()).toEqual(ModelDataDefault.minValue);
  });

  it('If you set max value less or min value more than pointerPosition, pointerPosition will be cut to min-max interval', () => {
    model.setTypeRange(false);
    model.setMaxValue(100);
    model.setMinValue(0);
    model.setPointerPosition(50);
    model.setMaxValue(40);
    expect(model.getPointerPosition()).toEqual(40);
    model.setMaxValue(100);
    model.setMinValue(50);
    expect(model.getPointerPosition()).toEqual(50);
  });

  it('If you set max value less or min value more than secondPointerPosition, secondPointerPosition will be cut to min-max interval', () => {
    model.setTypeRange(false);
    model.setMaxValue(100);
    model.setMinValue(0);
    model.setPointerPosition(0);
    model.setSecondPointerPosition(50);
    model.setMaxValue(40);
    expect(model.getSecondPointerPosition()).toEqual(40);
    model.setMaxValue(100);
    model.setMinValue(50);
    expect(model.getSecondPointerPosition()).toEqual(50);
  });
});

describe('Pointers positions shoud be multiples of step, step shoud be stricly more than 0', () => {
  let model: Model;
  beforeEach(() => {
    model = new Model();
  });

  it('If you try to set step less or equal to 0, it will set step equal to 1', () => {
    model.setStep(-1);
    expect(model.getStep()).toEqual(1);
    model.setStep(0);
    expect(model.getStep()).toEqual(1);
  });

  it('When you set step, pointers positions shoud be updated, to be multiples of step', () => {
    model.setTypeRange(true);
    model.setMaxValue(100);
    model.setMinValue(-20);
    model.setPointerPosition(25);
    model.setSecondPointerPosition(75);
    model.setStep(1.784564575);
    const pointerOffset = model.getPointerPosition() - model.getMinValue();
    expect(isItNumberMultiplier(pointerOffset, model.getStep())).toBeTrue();
    const secondPointerOffset = model.getSecondPointerPosition()
      - model.getMinValue();
    expect(isItNumberMultiplier(
      secondPointerOffset,
      model.getStep(),
    )).toBeTrue();
  });

  it('When you set pointers positions, they will be set to multiples of the step', () => {
    model.setTypeRange(true);
    model.setMaxValue(100);
    model.setMinValue(0);
    model.setStep(1.784564575);
    model.setPointerPosition(25);
    model.setSecondPointerPosition(75);
    expect(isItNumberMultiplier(
      model.getPointerPosition(),
      model.getStep(),
    )).toBeTrue();
    expect(isItNumberMultiplier(
      model.getSecondPointerPosition(),
      model.getStep(),
    )).toBeTrue();
  });
});

describe('Functions operating in percent work correctly', () => {
  let model: Model;
  beforeEach(() => {
    model = new Model();
  });

  it('Getters shoud return what setters have set', () => {
    model.setMaxValue(100);
    model.setMinValue(0);
    model.setStep(0.34);
    model.setTypeRange(false);
    model.setPointerPositionInPercent(34);
    model.setTypeRange(true);
    model.setSecondPointerPositionInPercent(68);
    expect(model.getPointerPositionInPercent()).toBeCloseTo(34);
    expect(model.getPointerPosition()).toEqual(34);
    expect(model.getSecondPointerPositionInPercent()).toBeCloseTo(68);
    expect(model.getSecondPointerPosition()).toBeCloseTo(68);
    expect(model.getStepInPercent()).toBeCloseTo(0.34);
  });
});

describe('Set slider type range', () => {
  let model: Model;
  beforeEach(() => {
    model = new Model();
  });

  it('When you set typeRange true, secondPointerPosition will be updated', () => {
    model.setTypeRange(false);
    model.setMinValue(0);
    model.setMaxValue(100);
    model.setPointerPosition(40);
    model.setSecondPointerPosition(50);
    model.setPointerPosition(80);
    expect(model.getSecondPointerPosition()).toEqual(50);
    model.setTypeRange(true);
    expect(model.getSecondPointerPosition()).toEqual(80);
  });
});
*/