import { ViewObserver, ViewProps } from '../main/viewTypes';
import Pointer from './Pointer';

describe('Pointer', () => {
  let pointer: Pointer;
  let pointerElement: HTMLElement;
  let parent: HTMLElement;
  const observer = jasmine
    .createSpyObj<ViewObserver>('spy', ['startMove', 'move', 'endMove']);
  const props: ViewProps = {
    minValue: 0,
    maxValue: 100,
    step: 10,
    isVertical: false,
    isRange: true,
    isInversion: false,
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
    parent = document.createElement('div');
    pointer = new Pointer(parent, observer, true);
    pointerElement = <HTMLElement>parent.children.item(0); // eslint-disable-line
  });

  it("Constructor should create element pointer with class 'slider__pointer' on parent node", () => {
    expect(pointerElement).toHaveClass('slider__pointer');
  });

  it('Method render should update pointer state correctly', () => {
    pointer.render(props);
    expect(pointerElement.style.display).toEqual('block');
    expect(pointerElement.style.left).toEqual('67%');
    expect(pointerElement.style.top).toEqual('');

    const props1: ViewProps = {
      ...props,
      isVertical: true,
      secondPointerPosPercentage: 83,
    };
    pointer.render(props1);
    expect(pointerElement.style.display).toEqual('block');
    expect(pointerElement.style.left).toEqual('');
    expect(pointerElement.style.top).toEqual('83%');

    const props2: ViewProps = {
      ...props,
      isRange: false,
    };
    pointer.render(props2);
    expect(pointerElement.style.display).toEqual('none');
  });
});
