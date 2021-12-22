import View from '../View';
import { ViewObserver, ViewProps } from '../viewInterface';

describe('View', () => {
  let view: View;
  let $view: JQuery;
  const observer = jasmine.createSpyObj<ViewObserver>(
    'spy',
    ['click', 'startMove', 'move', 'endMove'],
  );
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
    const $parent = $('<div>');
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
    /* eslint-disable */
    const bar = view['bar'];
    const pointer = view['pointer'];
    const secondPointer = view['secondPointer'];
    const tip = view['tip'];
    const secondTip = view['secondTip'];
    const scale = view['scale'];
    /* eslint-enable */

    const renderSpies = [bar, pointer, secondPointer, tip, secondTip, scale]
      .map((element) => spyOn(element, 'render'));

    view.render(props);

    renderSpies.forEach((spy) => expect(spy).toHaveBeenCalledOnceWith(props));
  });
});
