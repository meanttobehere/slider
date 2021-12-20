import { ViewObserver, ViewProps } from '../../main/viewInterface';
import Tip from '../Tip';

describe('Tip', () => {
  let tip: Tip;
  let $tip: JQuery;
  let $parent: JQuery;
  const observer = jasmine
    .createSpyObj<ViewObserver>('spy', ['startMove', 'move', 'endMove']);
  const props: ViewProps = {
    isVertical: false,
    isRange: true,
    shouldDisplayTips: true,
    shouldDisplayProgressBar: true,
    shouldDisplayScale: true,
    scaleLabels: [],
    pointerPosition: 11,
    secondPointerPosition: 67,
    tipValue: 'tipValue',
    secondTipValue: '',
  };

  beforeEach(() => {
    $parent = $('<div>', { class: 'slider__tips-container' });
    tip = new Tip($parent, observer);
    $tip = $parent.children().first();
  });

  it("constructor should create element with class 'slider__tip' on parent node", () => {
    expect($tip).toHaveClass('slider__tip');
  });

  it("method 'render' should update tip state correctly", () => {
    tip.render(props);
    expect($tip.css('display')).toEqual('');
    expect($tip.text()).toEqual('tipValue');
    expect($tip.css('left')).toEqual('11%');
    expect($tip.css('top')).toEqual('');

    const props1: ViewProps = {
      ...props,
      isVertical: true,
      pointerPosition: 37,
      tipValue: 'newTipValue',
    };
    tip.render(props1);
    expect($tip.css('display')).toEqual('');
    expect($tip.text()).toEqual('newTipValue');
    expect($tip.css('left')).toEqual('');
    expect($tip.css('top')).toEqual('37%');

    const props2: ViewProps = {
      ...props,
      shouldDisplayTips: false,
    };
    tip.render(props2);
    expect($tip.css('display')).toEqual('none');
  });
});
