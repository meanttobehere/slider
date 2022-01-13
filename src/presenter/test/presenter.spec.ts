import Model from '../../model/Model';
import {
  ModelObserver,
  ModelState,
  ModelStateDefault,
  ModelStatePartial,
} from '../../model/modelInterface';
import View from '../../view/main/View';
import { ViewObserver } from '../../view/main/viewInterface';
import Presenter from '../Presenter';
import { PresenterObserver } from '../presenterInterface';

describe('Presenter', () => {
  let presenter: Presenter;
  let model: Model;
  let view: View;
  const observer = jasmine.createSpyObj<PresenterObserver>(
    'spy',
    ['update', 'start', 'slide', 'stop'],
  );
  let viewObserver: ViewObserver;
  let modelObserver: ModelObserver;

  beforeEach(() => {
    presenter = new Presenter($('<div>'), {}, observer);

    /* eslint-disable */
    model = presenter['model'];
    view = presenter['view'];
    modelObserver = model['observer'];
    viewObserver = view['observer'];
    /* eslint-enable */
  });

  it('Presenter should emit events, when view and model notify him', () => {
    viewObserver.startMove(false);
    expect(observer.start).toHaveBeenCalled();
    observer.start.calls.reset();

    viewObserver.endMove(false);
    expect(observer.stop).toHaveBeenCalled();
    observer.stop.calls.reset();

    viewObserver.move(40, false);
    expect(observer.slide).toHaveBeenCalled();
    expect(observer.update).toHaveBeenCalled();
    observer.slide.calls.reset();
    observer.update.calls.reset();

    viewObserver.click(20);
    expect(observer.slide).toHaveBeenCalled();
    expect(observer.update).toHaveBeenCalled();
    observer.slide.calls.reset();
    observer.update.calls.reset();

    modelObserver.update();
    expect(observer.update).toHaveBeenCalled();
    observer.update.calls.reset();
  });

  it('Presenter should update view, when model notify him', () => {
    const renderSpy = spyOn(view, 'render');

    model.setState(ModelStateDefault);
    expect(renderSpy).toHaveBeenCalledOnceWith(ModelStateDefault);
  });

  it('Presenter should update model, when view notify him', () => {
    const state: ModelState = {
      ...ModelStateDefault,
      isRange: true,
      minValue: 0,
      maxValue: 100,
      step: 20,
      pointerPosition: 40,
      secondPointerPosition: 80,
    };
    model.setState(state);

    const setStateSpy = spyOn(model, 'setState');

    viewObserver.move(-20, false);
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      pointerPosition: -20,
    });

    viewObserver.move(90, false);
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      pointerPosition: 90,
    });

    viewObserver.move(15, true);
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      secondPointerPosition: 15,
    });

    viewObserver.move(-80, true);
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      secondPointerPosition: -80,
    });

    viewObserver.click(20);
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      pointerPosition: 20,
    });

    viewObserver.click(70);
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      secondPointerPosition: 70,
    });
  });

  it('setOptions method should update model state', () => {
    const options: ModelStatePartial = {
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
    const state: ModelState = {
      isVertical: false,
      isRange: true,
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
