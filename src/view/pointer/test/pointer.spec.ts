import { ViewObserver, ViewProps } from '../../main/viewInterface';
import Pointer from '../Pointer';

describe('Pointer', () => {
  let pointer: Pointer;
  let $pointer: JQuery;
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
    pointerPosition: 11,
    secondPointerPosition: 67,
    pointerPosPercentage: 11,
    secondPointerPosPercentage: 67,
    tipValue: '11',
    secondTipValue: '67',
    scaleLabels: [],
  };

  beforeEach(() => {
    $parent = $('<div>', { class: 'slider__bar-container' });
    pointer = new Pointer($parent, observer, true);
    $pointer = $parent.children().first();
  });

  it("Constructor should create element $pointer with class 'slider__pointer' on parent node", () => {
    expect($pointer).toHaveClass('slider__pointer');
  });

  it('Method render should update pointer state correctly', () => {
    pointer.render(props);
    expect($pointer.css('display')).toEqual('');
    expect($pointer.css('left')).toEqual('67%');
    expect($pointer.css('top')).toEqual('');

    const props1: ViewProps = {
      ...props,
      isVertical: true,
      secondPointerPosPercentage: 83,
    };
    pointer.render(props1);
    expect($pointer.css('display')).toEqual('');
    expect($pointer.css('left')).toEqual('');
    expect($pointer.css('top')).toEqual('83%');

    const props2: ViewProps = {
      ...props,
      isRange: false,
    };
    pointer.render(props2);
    expect($pointer.css('display')).toEqual('none');
  });
});
