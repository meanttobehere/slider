import Model from '../model/Model';
import {
  SliderCallbacks,
  SliderState,
  SliderStateDefault,
  SliderStatePartial,
} from '../plugin/sliderTypes';
import View from '../view/main/View';
import Presenter from './Presenter';

describe('Presenter', () => {
  let presenter: Presenter;
  let model: Model;
  let view: View;
  const presenterSpy = jasmine.createSpyObj<SliderCallbacks>(
    'spy',
    ['update', 'start', 'slide', 'stop'],
  );

  beforeEach(() => {
    const node = document.createElement('div');
    presenter = new Presenter(node, {}, presenterSpy);
    /* eslint-disable */
    model = presenter['model'];
    view = presenter['view'];
    /* eslint-enable */
  });

  it('Presenter should emit events, when view and model notify him', () => {
    view.notify({ eventType: 'startMove' });
    expect(presenterSpy.start).toHaveBeenCalled();
    presenterSpy.start.calls.reset();

    view.notify({ eventType: 'endMove' });
    expect(presenterSpy.stop).toHaveBeenCalled();
    presenterSpy.stop.calls.reset();

    view.notify({ eventType: 'move' });
    expect(presenterSpy.slide).toHaveBeenCalled();
    presenterSpy.slide.calls.reset();

    view.notify({ eventType: 'click' });
    expect(presenterSpy.slide).toHaveBeenCalled();
    presenterSpy.slide.calls.reset();

    model.notify({ eventType: 'update', params: model.getParams() });
    expect(presenterSpy.update).toHaveBeenCalled();
    presenterSpy.update.calls.reset();
  });

  it('Presenter should update view, when model notify him', () => {
    const renderSpy = spyOn(view, 'render');
    model.notify({ eventType: 'update', params: model.getParams() });
    expect(renderSpy).toHaveBeenCalledTimes(1);
  });

  it('Presenter should update model, when view notify him', () => {
    const state: SliderState = {
      ...SliderStateDefault,
      isRange: true,
      minValue: 0,
      maxValue: 100,
      step: 20,
      pointerPosition: 40,
      secondPointerPosition: 80,
    };
    model.setState(state);

    const setStateSpy = spyOn(model, 'setState');

    view.notify({ eventType: 'move', posPercentage: -20 });
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      pointerPosition: -20,
    });

    view.notify({ eventType: 'move', posPercentage: 90 });
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      pointerPosition: 90,
    });

    view.notify({ eventType: 'move', posPercentage: 15, isSecond: true });
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      secondPointerPosition: 15,
    });

    view.notify({ eventType: 'move', posPercentage: -80, isSecond: true });
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      secondPointerPosition: -80,
    });

    view.notify({ eventType: 'click', posPercentage: 20 });
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      pointerPosition: 20,
    });

    view.notify({ eventType: 'click', posPercentage: 70 });
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      secondPointerPosition: 70,
    });
  });

  it('setOptions method should update model state', () => {
    const options: SliderStatePartial = {
      minValue: -200,
      maxValue: 200,
      step: 50,
      pointerPosition: -100,
      secondPointerPosition: 100,
    };
    const setStateSpy = spyOn(model, 'setState');
    presenter.setOptions(options);
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual(options);
  });

  it('getOptions method should return model state', () => {
    const state: SliderState = {
      isVertical: false,
      isRange: true,
      isInversion: true,
      shouldDisplayTips: true,
      shouldDisplayProgressBar: true,
      shouldDisplayScale: true,
      minValue: 0,
      maxValue: 100,
      step: 20,
      pointerPosition: 40,
      secondPointerPosition: 80,
    };
    model.setState(state);

    const options = presenter.getOptions();

    expect(options).toEqual(state);
  });
});
