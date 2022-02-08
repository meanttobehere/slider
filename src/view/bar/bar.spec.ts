import { SliderParams } from '../../plugin/sliderTypes';
import View from '../main/View';
import Bar from './Bar';

describe('Bar', () => {
  const viewSpy = jasmine.createSpyObj<View>('spy', ['notify']);
  let bar: Bar;
  let barElement: HTMLElement;
  let progressBarElement: HTMLElement;
  let parent: HTMLElement;
  const params: SliderParams = {
    maxValue: 100,
    minValue: 0,
    step: 1,
    isVertical: false,
    isRange: true,
    isInversion: false,
    shouldDisplayTips: false,
    shouldDisplayProgressBar: true,
    shouldDisplayScale: false,
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
    bar = new Bar(parent, viewSpy);
    barElement = <HTMLElement>parent.children.item(0); // eslint-disable-line
    progressBarElement = <HTMLElement>barElement.children.item(0);  // eslint-disable-line
  });

  it("Constructor should create element $bar with class 'slider__bar' on parent node", () => {
    expect(barElement).toHaveClass('slider__bar');
  });

  it("Element $bar should contain element $progressBar with class 'slider__progress-bar'", () => {
    expect(progressBarElement).toHaveClass('slider__progress-bar');
  });

  it('Method render should update bar state correctly', () => {
    bar.render(params);
    expect(progressBarElement.style.display).toEqual('block');
    expect(progressBarElement.style.left).toEqual('11%');
    expect(progressBarElement.style.width).toEqual('56%');
    expect(progressBarElement.style.top).toEqual('');
    expect(progressBarElement.style.height).toEqual('');

    const params1: SliderParams = {
      ...params,
      isVertical: true,
      pointerPosPercentage: 43.2,
      secondPointerPosPercentage: 60,
    };
    bar.render(params1);
    expect(progressBarElement.style.display).toEqual('block');
    expect(progressBarElement.style.left).toEqual('');
    expect(progressBarElement.style.width).toEqual('');
    expect(progressBarElement.style.top).toEqual('43.2%');
    expect(progressBarElement.style.height).toEqual('16.8%');

    const props2 = {
      ...params,
      shouldDisplayProgressBar: false,
    };
    bar.render(props2);
    expect(progressBarElement.style.display).toEqual('none');
  });

  it('When click event occurs, bar should notify view observer', () => {
    bar.render(params);
    barElement.dispatchEvent(new Event('click'));
    expect(viewSpy.notify).toHaveBeenCalledTimes(1);
  });
});
