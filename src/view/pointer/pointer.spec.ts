import { SliderParams } from '../../plugin/sliderTypes';
import View from '../main/View';
import Pointer from './Pointer';

describe('Pointer', () => {
  let pointer: Pointer;
  let pointerElement: HTMLElement;
  let parent: HTMLElement;
  const viewSpy = jasmine.createSpyObj<View>('spy', ['notify']);
  const params: SliderParams = {
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
    pointer = new Pointer(parent, viewSpy, true);
    pointerElement = <HTMLElement>parent.children.item(0); // eslint-disable-line
  });

  it("Constructor should create element pointer with class 'slider__pointer' on parent node", () => {
    expect(pointerElement).toHaveClass('slider__pointer');
  });

  it('Method render should update pointer state correctly', () => {
    pointer.render(params);
    expect(pointerElement.style.display).toEqual('block');
    expect(pointerElement.style.left).toEqual('67%');
    expect(pointerElement.style.top).toEqual('');

    const params1: SliderParams = {
      ...params,
      isVertical: true,
      secondPointerPosPercentage: 83,
    };
    pointer.render(params1);
    expect(pointerElement.style.display).toEqual('block');
    expect(pointerElement.style.left).toEqual('');
    expect(pointerElement.style.top).toEqual('83%');

    const params2: SliderParams = {
      ...params,
      isRange: false,
    };
    pointer.render(params2);
    expect(pointerElement.style.display).toEqual('none');
  });
});
