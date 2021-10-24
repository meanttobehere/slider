import Model from '../../model/model';
import { ModelData, ModelObserver } from '../../model/modelInterface';
import View from '../../view/main/view';
import { ViewObserver, ViewProps } from '../../view/main/viewInterface';
import { PresenterEvents } from '../preesenterInterface';
import Presenter from '../presenter';

describe('Presenter', () => {
  let model: Model;
  let modelSpy: jasmine.Spy;
  let view: jasmine.SpyObj<View>;
  let events: jasmine.SpyObj<PresenterEvents>;
  let presenter: Presenter;
  let viewObserver: ViewObserver;
  let modelObserver: ModelObserver;

  beforeEach(() => {
    model = new Model();
    view = jasmine.createSpyObj<View>('spy', ['setObserver', 'render']);
    events = jasmine.createSpyObj<PresenterEvents>('spy', ['update', 'start', 'slide', 'stop']);
    modelSpy = spyOn(model, 'setObserver').and.callThrough();
    presenter = new Presenter(model, view, {}, events);
    [viewObserver] = view.setObserver.calls.argsFor(0);
    [modelObserver] = modelSpy.calls.argsFor(0);
  });

  it('Presenter should emit events, when view and model notify him', () => {
    viewObserver.pointerStartMove(false);
    expect(events.start).toHaveBeenCalled();
    events.start.calls.reset();

    viewObserver.pointerEndMove(false);
    expect(events.stop).toHaveBeenCalled();
    events.stop.calls.reset();

    viewObserver.pointerMove(40, false);
    expect(events.slide).toHaveBeenCalled();
    expect(events.update).toHaveBeenCalled();
    events.slide.calls.reset();
    events.update.calls.reset();

    viewObserver.clickOnScale(20);
    expect(events.slide).toHaveBeenCalled();
    expect(events.update).toHaveBeenCalled();
    events.slide.calls.reset();
    events.update.calls.reset();

    modelObserver.update({ updatedOnlyPointersPositions: false });
    expect(events.update).toHaveBeenCalled();
    events.update.calls.reset();
  });

  it('Presenter should re-render view after model has been updated, renders props shoud be correct', () => {
    model.setData({
      typeVertical: false,
      typeRange: true,
      displayTips: true,
      displayProgressBar: true,
      displayScale: false,
      minValue: 0,
      maxValue: 100,
      step: 20,
      pointerPosition: 20,
      secondPointerPosition: 80,
    });
    let props: ViewProps = {
      typeVertical: false,
      typeRange: true,
      displayTips: true,
      displayProgressBar: true,
      displayScale: false,
      scaleLabels: [{ val: '0', pos: 0 }, { val: '20', pos: 20 }, { val: '40', pos: 40 }, { val: '60', pos: 60 }, { val: '80', pos: 80 }, { val: '100', pos: 100 }],
      pointerPosition: 20,
      secondPointerPosition: 80,
      tipValue: '20',
      secondTipValue: '80',
    };
    expect(view.render.calls.mostRecent().args[0]).toEqual(props);

    model.setData({
      typeVertical: false,
      typeRange: true,
      displayTips: false,
      displayProgressBar: false,
      displayScale: false,
      minValue: -400,
      maxValue: 400,
      step: 200,
      pointerPosition: -200,
      secondPointerPosition: 200,
    });
    props = {
      typeVertical: false,
      typeRange: true,
      displayTips: false,
      displayProgressBar: false,
      displayScale: false,
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
    expect(view.render.calls.mostRecent().args[0]).toEqual(props);

    model.setData({
      typeVertical: false,
      typeRange: true,
      displayTips: true,
      displayProgressBar: false,
      displayScale: true,
      minValue: 0,
      maxValue: 50,
      step: 15,
      pointerPosition: 30,
      secondPointerPosition: 45,
    });
    props = {
      typeVertical: false,
      typeRange: true,
      displayTips: true,
      displayProgressBar: false,
      displayScale: true,
      scaleLabels: [{ val: '0', pos: 0 }, { val: '15', pos: 30 }, { val: '30', pos: 60 }, { val: '45', pos: 90 }, { val: '50', pos: 100 }],
      pointerPosition: 60,
      secondPointerPosition: 90,
      tipValue: '30',
      secondTipValue: '45',
    };
    expect(view.render.calls.mostRecent().args[0]).toEqual(props);
  });

  it('Presenter should update model, when view notify him', () => {
    const modelData: ModelData = {
      typeVertical: false,
      typeRange: true,
      displayTips: true,
      displayProgressBar: true,
      displayScale: true,
      minValue: 0,
      maxValue: 100,
      step: 20,
      pointerPosition: 40,
      secondPointerPosition: 80,
    };

    model.setData(modelData);
    viewObserver.pointerMove(-20, false);
    expect(model.getData()).toEqual({ ...modelData, ...{ pointerPosition: 20 } });

    model.setData(modelData);
    viewObserver.pointerMove(90, false);
    expect(model.getData()).toEqual({ ...modelData, ...{ pointerPosition: 80 } });

    model.setData(modelData);
    viewObserver.pointerMove(-50, false);
    expect(model.getData()).toEqual({ ...modelData, ...{ pointerPosition: 0 } });

    model.setData(modelData);
    viewObserver.pointerMove(15, true);
    expect(model.getData()).toEqual({ ...modelData, ...{ secondPointerPosition: 100 } });

    model.setData(modelData);
    viewObserver.pointerMove(-80, true);
    expect(model.getData()).toEqual({ ...modelData, ...{ secondPointerPosition: 40 } });

    model.setData(modelData);
    viewObserver.pointerMove(29.5, true);
    expect(model.getData()).toEqual({ ...modelData, ...{ secondPointerPosition: 100 } });

    model.setData(modelData);
    viewObserver.clickOnScale(20);
    expect(model.getData()).toEqual({ ...modelData, ...{ pointerPosition: 20 } });

    model.setData(modelData);
    viewObserver.clickOnScale(60);
    expect(model.getData()).toEqual({ ...modelData, ...{ secondPointerPosition: 60 } });
  });

  it('Presenter getUpdateFunction method returns a function to update model', () => {
    const update = presenter.getUpdateFunction();
    const modelData: ModelData = {
      typeVertical: false,
      typeRange: false,
      displayTips: false,
      displayProgressBar: false,
      displayScale: false,
      minValue: 0,
      maxValue: 20,
      step: 1,
      pointerPosition: 0,
      secondPointerPosition: 20,
    };
    update(modelData);
    expect(model.getData()).toEqual(modelData);

    update({
      pointerPosition: -10, minValue: -20, secondPointerPosition: 30, maxValue: 50,
    });
    expect(model.getData()).toEqual({
      ...modelData,
      ...{
        pointerPosition: -10, minValue: -20, secondPointerPosition: 30, maxValue: 50,
      },
    });
  });

  it('Presenter getSetters add getGetters methods work correctly', () => {
    const set = presenter.getSetters();
    const get = presenter.getGetters();

    set.minValue(-90);
    expect(get.minValue()).toEqual(-90);

    set.maxValue(300);
    expect(get.maxValue()).toEqual(300);

    set.step(15);
    expect(get.step()).toEqual(15);

    set.pointerPosition(-45);
    expect(get.pointerPosition()).toEqual(-45);

    set.secondPointerPosition(105);
    expect(get.secondPointerPosition()).toEqual(105);

    set.displayScale(false);
    expect(get.displayScale()).toEqual(false);
    set.displayScale(true);
    expect(get.displayScale()).toEqual(true);

    set.displayProgressBar(false);
    expect(get.displayProgressBar()).toEqual(false);
    set.displayProgressBar(true);
    expect(get.displayProgressBar()).toEqual(true);

    set.displayTips(false);
    expect(get.displayTips()).toEqual(false);
    set.displayTips(true);
    expect(get.displayTips()).toEqual(true);

    set.typeVertical(false);
    expect(get.typeVertical()).toEqual(false);
    set.typeVertical(true);
    expect(get.typeVertical()).toEqual(true);

    set.typeRange(false);
    expect(get.typeRange()).toEqual(false);
    set.typeRange(true);
    expect(get.typeRange()).toEqual(true);
  });
});
