import View from '../View';
import { ViewObserver, ViewProps } from '../viewInterface';

describe('View', () => {
  let $parent: JQuery;
  let view: View;
  let $view: JQuery;
  let observer: ViewObserver;
  const props: ViewProps = {
    isVertical: false,
    isRange: true,
    shouldDisplayTips: false,
    shouldDisplayProgressBar: true,
    shouldDisplayScale: false,
    scaleLabels: [],
    pointerPosition: 11,
    secondPointerPosition: 67,
    tipValue: '',
    secondTipValue: '',
  };

  beforeEach(() => {
    $parent = $('<div>', { class: 'parent' });
    observer = jasmine.createSpyObj<ViewObserver>(
      'spy',
      ['click', 'startMove', 'move', 'endMove'],
    );
    view = new View($parent, observer);
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
    const {
      bar,
      pointer,
      secondPointer,
      tip,
      secondTip,
      scale,
    } = view as any;

    const renderSpies = [bar, pointer, secondPointer, tip, secondTip, scale]
      .map((element) => spyOn(element, 'render'));

    view.render(props);

    renderSpies.forEach((spy) => expect(spy).toHaveBeenCalledOnceWith(props));
  });

  it('view should raise up events from children', () => {
    /*
    const pointerObserver: PointerObserver = (view as any).pointer.observer;
    pointerObserver.startMove(true);
    expect(viewObserver.startMove).toHaveBeenCalledOnceWith(true);
    pointerObserver.move(25, false);
    expect(viewObserver.move).toHaveBeenCalledOnceWith(25, false);
    pointerObserver.endMove(false);
    expect(viewObserver.endMove).toHaveBeenCalledOnceWith(false);
    viewObserver.move.calls.reset();
    viewObserver.startMove.calls.reset();
    viewObserver.endMove.calls.reset();

    const tipObserver: TipObserver = (view as any).tip.observer;
    tipObserver.startMove(true);
    expect(viewObserver.startMove).toHaveBeenCalledOnceWith(true);
    tipObserver.move(44, false);
    expect(viewObserver.move).toHaveBeenCalledOnceWith(44, false);
    tipObserver.endMove(false);
    expect(viewObserver.endMove).toHaveBeenCalledOnceWith(false);

    const scaleObserver: ScaleObserver = (view as any).scale.observer;
    scaleObserver.click(55);
    expect(viewObserver.click).toHaveBeenCalledOnceWith(55);
    viewObserver.click.calls.reset();

    const barObserver: BarObserver = (view as any).bar.observer;
    barObserver.click(77);
    expect(viewObserver.click).toHaveBeenCalledOnceWith(77);
    */
  });
});
