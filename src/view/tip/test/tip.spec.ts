import { ViewObserver, ViewProps } from '../../main/viewInterface';
import Tip from '../Tip';

describe('Tip', () => {
  let tip: Tip;
  let $tip: JQuery;
  let $parent: JQuery;
  const observer = jasmine
    .createSpyObj<ViewObserver>('spy', ['startMove', 'move', 'endMove']);
  const props: ViewProps = {
    minValue: 0,
    maxValue: 100,
    step: 10,
    isVertical: false,
    isRange: true,
    shouldDisplayTips: true,
    shouldDisplayProgressBar: true,
    shouldDisplayScale: true,
    pointerPosition: 10,
    secondPointerPosition: 70,
    pointerPositionInPercent: 10,
    secondPointerPositionInPercent: 70,
  };

  beforeEach(() => {
    $parent = $('<div>', {
      class: 'slider__tips-container',
      width: '1000px',
      height: '1000px',
    });
    tip = new Tip($parent, observer);
    $tip = $parent.children().first();
    $(document.body).append($parent);
  });

  it("Constructor should create element with class 'slider__tip' on parent node", () => {
    expect($tip).toHaveClass('slider__tip');
  });

  it('Method render should update tip state correctly', () => {
    tip.render(props);
    expect($tip.css('display')).toEqual('block');
    expect($tip.text()).toEqual('10');
    expect($tip.css('left')).toEqual('10%');
    expect($tip.css('top')).toEqual('auto');

    const props1: ViewProps = {
      ...props,
      isVertical: true,
      pointerPosition: 40,
    };
    tip.render(props1);
    expect($tip.css('display')).toEqual('block');
    expect($tip.text()).toEqual('40');
    expect($tip.css('left')).toEqual('auto');
    expect($tip.css('top')).toEqual('40%');

    const props2: ViewProps = {
      ...props,
      shouldDisplayTips: false,
    };
    tip.render(props2);
    expect($tip.css('display')).toEqual('none');
  });
});
