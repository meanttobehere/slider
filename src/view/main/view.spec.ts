import { SliderParams } from '../../plugin/sliderTypes';
import View from './View';

describe('View', () => {
  let view: View;
  let node: HTMLElement;
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
    const parent = document.createElement('div');
    view = new View(parent);
    node = <HTMLElement>parent.children.item(0); // eslint-disable-line
  });

  it("Constructor should create element view on parent node with class 'slider'", () => {
    expect(node).toHaveClass('slider');
  });

  it('View should contain bar, scale, 2 pointer and 2 tip elements', () => {
    expect(node.querySelectorAll('.slider__pointer').length).toEqual(2);
    expect(node.querySelectorAll('.slider__tip').length).toEqual(2);
    expect(node.querySelectorAll('.slider__bar').length).toEqual(1);
    expect(node.querySelectorAll('.slider__scale').length).toEqual(1);
  });
});
