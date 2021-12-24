import Model from '../../model/Model';
import {
  ModelObserver,
  ModelState,
  ModelStateDefault,
  ModelStatePartial,
} from '../../model/modelInterface';
import View from '../../view/main/View';
import { ViewObserver, ViewProps } from '../../view/main/viewInterface';
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

    model.setState({
      isVertical: false,
      isRange: true,
      shouldDisplayTips: true,
      shouldDisplayProgressBar: true,
      shouldDisplayScale: false,
      maxNumberLabels: 20,
      minValue: 0,
      maxValue: 100,
      step: 20,
      pointerPosition: 20,
      secondPointerPosition: 80,
    });
    const expectedProps1: ViewProps = {
      isVertical: false,
      isRange: true,
      shouldDisplayTips: true,
      shouldDisplayProgressBar: true,
      shouldDisplayScale: false,
      scaleLabels: [
        { val: '0', pos: 0 }, { val: '20', pos: 20 }, { val: '40', pos: 40 },
        { val: '60', pos: 60 }, { val: '80', pos: 80 }, { val: '100', pos: 100 },
      ],
      pointerPosition: 20,
      secondPointerPosition: 80,
      tipValue: '20',
      secondTipValue: '80',
    };
    expect(renderSpy.calls.mostRecent().args[0]).toEqual(expectedProps1);

    model.setState({
      isVertical: false,
      isRange: true,
      shouldDisplayTips: false,
      shouldDisplayProgressBar: false,
      shouldDisplayScale: false,
      maxNumberLabels: 20,
      minValue: -400,
      maxValue: 400,
      step: 200,
      pointerPosition: -200,
      secondPointerPosition: 200,
    });
    const expectedProps2: ViewProps = {
      isVertical: false,
      isRange: true,
      shouldDisplayTips: false,
      shouldDisplayProgressBar: false,
      shouldDisplayScale: false,
      scaleLabels: [
        { val: '-400', pos: 0 },
        { val: '-200', pos: 25 },
        { val: '0', pos: 50 },
        { val: '200', pos: 75 },
        { val: '400', pos: 100 },
      ],
      pointerPosition: 25,
      secondPointerPosition: 75,
      tipValue: '-200',
      secondTipValue: '200',
    };
    expect(renderSpy.calls.mostRecent().args[0]).toEqual(expectedProps2);

    model.setState({
      isVertical: false,
      isRange: true,
      shouldDisplayTips: true,
      shouldDisplayProgressBar: false,
      shouldDisplayScale: true,
      maxNumberLabels: 20,
      minValue: 0,
      maxValue: 50,
      step: 15,
      pointerPosition: 30,
      secondPointerPosition: 45,
    });
    const expectedProps3: ViewProps = {
      isVertical: false,
      isRange: true,
      shouldDisplayTips: true,
      shouldDisplayProgressBar: false,
      shouldDisplayScale: true,
      scaleLabels: [
        { val: '0', pos: 0 }, { val: '15', pos: 30 }, { val: '30', pos: 60 },
        { val: '45', pos: 90 }, { val: '50', pos: 100 }],
      pointerPosition: 60,
      secondPointerPosition: 90,
      tipValue: '30',
      secondTipValue: '45',
    };
    expect(renderSpy.calls.mostRecent().args[0]).toEqual(expectedProps3);
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
      ...state,
      pointerPosition: 20,
    });

    viewObserver.move(90, false);
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      ...state,
      pointerPosition: 80,
    });

    viewObserver.move(15, true);
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      ...state,
      secondPointerPosition: 95,
    });

    viewObserver.move(-80, true);
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      ...state,
      secondPointerPosition: 40,
    });

    viewObserver.click(20);
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      ...state,
      pointerPosition: 20,
    });

    viewObserver.click(60);
    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      ...state,
      secondPointerPosition: 60,
    });
  });

  it('Presenter setOptions method should update model state', () => {
    const state: ModelState = {
      isVertical: false,
      isRange: true,
      shouldDisplayTips: true,
      shouldDisplayProgressBar: true,
      shouldDisplayScale: true,
      maxNumberLabels: 20,
      minValue: 0,
      maxValue: 100,
      step: 20,
      pointerPosition: 40,
      secondPointerPosition: 80,
    };
    const options: ModelStatePartial = {
      minValue: -200,
      maxValue: 200,
      step: 50,
      pointerPosition: -100,
      secondPointerPosition: 100,
    };

    model.setState(state);
    const setStateSpy = spyOn(model, 'setState');
    presenter.setOptions(options);

    expect(setStateSpy.calls.mostRecent().args[0]).toEqual({
      ...state,
      ...options,
    });
  });

  it('Presenter getOptions method should return model state', () => {
    const state: ModelState = {
      isVertical: false,
      isRange: true,
      shouldDisplayTips: true,
      shouldDisplayProgressBar: true,
      shouldDisplayScale: true,
      maxNumberLabels: 20,
      minValue: 0,
      maxValue: 100,
      step: 20,
      pointerPosition: 40,
      secondPointerPosition: 80,
    };
    model.setState(state);

    expect(presenter.getOptions('pointerPosition'))
      .toEqual(state.pointerPosition);

    expect(presenter.getOptions('secondPointerPosition'))
      .toEqual(state.secondPointerPosition);

    expect(presenter.getOptions(['isVertical', 'isRange', 'minValue']))
      .toEqual({
        isVertical: state.isVertical,
        isRange: state.isRange,
        minValue: state.minValue,
      });

    expect(presenter.getOptions('nothing')).toEqual(undefined);

    expect(presenter.getOptions(['nothing'])).toEqual({});
  });
});
