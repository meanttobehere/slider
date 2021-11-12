import { PointerObserver } from '../../pointer/pointerInterface';
import { ScaleObserver } from '../../scale/scaleInterface';
import View from '../view';
import { ViewObserver, ViewProps } from '../viewInterface';

describe('View', () => {
  let $parent: JQuery;
  let view: View;
  let $view: JQuery;

  beforeEach(() => {
    $parent = $('<div>', { class: 'parent' });
    view = new View($parent);
    $view = $parent.children().first();
  });

  it("constructor should create element $view on parent node with class 'slider__container'", () => {
    expect($view).toHaveClass('slider__container');
  });

  it('view should contain $bar, $scale, 2 $pointer and 2 $tip elements', () => {
    expect($view.find('.slider__pointer').length).toEqual(2);
    expect($view.find('.slider__tip').length).toEqual(2);
    expect($view.find('.slider__bar').length).toEqual(1);
    expect($view.find('.slider__scale').length).toEqual(1);
  });

  it("method 'render' should call method 'render' on children with correct args", () => {
    const { bar } = view as any;
    const { pointer } = view as any;
    const { secondPointer } = view as any;
    const { tip } = view as any;
    const { secondTip } = view as any;
    const { scale } = view as any;

    const barSpy = spyOn(bar, 'render');
    const pointerSpy = spyOn(pointer, 'render');
    const secondPointerSpy = spyOn(secondPointer, 'render');
    const tipSpy = spyOn(tip, 'render');
    const secondTipSpy = spyOn(secondTip, 'render');
    const scaleSpy = spyOn(scale, 'render');

    const props: ViewProps = {
      typeVertical: false,
      typeRange: true,
      displayTips: true,
      displayProgressBar: true,
      displayScale: true,
      scaleLabels: [{ val: '0', pos: 0 }, { val: '100', pos: 100 }],
      pointerPosition: 30,
      secondPointerPosition: 70,
      tipValue: '30',
      secondTipValue: '70',
    };

    view.render(props);

    expect(barSpy).toHaveBeenCalledOnceWith({
      progressbar: true,
      vertical: false,
      intervalStartPos: 30,
      intervalLength: 40,
    });

    expect(pointerSpy).toHaveBeenCalledOnceWith({
      display: true,
      vertical: false,
      position: 30,
      zIndex: 3,
    });

    expect(secondPointerSpy).toHaveBeenCalledOnceWith({
      display: true,
      vertical: false,
      position: 70,
      zIndex: 2,
    });

    expect(tipSpy).toHaveBeenCalledOnceWith({
      display: true,
      vertical: false,
      position: 30,
      value: '30',
    });

    expect(secondTipSpy).toHaveBeenCalledOnceWith({
      display: true,
      vertical: false,
      position: 70,
      value: '70',
    });

    expect(scaleSpy).toHaveBeenCalledOnceWith({
      display: true,
      vertical: false,
      labels: props.scaleLabels,
    });
  });

  it('view should raise up events from children', () => {
    const viewObserver = jasmine.createSpyObj<ViewObserver>('spy', ['clickOnScale', 'pointerStartMove', 'pointerMove', 'pointerEndMove']);
    view.setObserver(viewObserver);

    const pointerObserver: PointerObserver = (view as any).pointer.observer;
    pointerObserver.startMove(true);
    expect(viewObserver.pointerStartMove).toHaveBeenCalledOnceWith(true);
    pointerObserver.move(25, false);
    expect(viewObserver.pointerMove).toHaveBeenCalledOnceWith(25, false);
    pointerObserver.endMove(false);
    expect(viewObserver.pointerEndMove).toHaveBeenCalledOnceWith(false);

    const scaleObserver: ScaleObserver = (view as any).scale.observer;
    scaleObserver.click(55);
    expect(viewObserver.clickOnScale).toHaveBeenCalledOnceWith(55);
  });
});
