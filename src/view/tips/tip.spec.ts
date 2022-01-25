import { ViewObserver, ViewProps } from '../main/viewTypes';
import Tip from './Tips';

describe('Tip', () => {
  let tip: Tip;
  let tipElement: HTMLElement;
  let secondTipElement: HTMLElement;
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
    pointerPosition: 10,
    secondPointerPosition: 70,
    pointerPosPercentage: 10,
    secondPointerPosPercentage: 70,
    tipValue: '10',
    secondTipValue: '70',
    scaleLabels: [],
  };

  beforeEach(() => {
    parent = document.createElement('div');
    parent.style.width = '1000px';
    parent.style.height = '1000px';
    tip = new Tip(parent, observer);
    tipElement = <HTMLElement>parent.children.item(0); // eslint-disable-line
    secondTipElement = <HTMLElement>parent.children.item(1); // eslint-disable-line
    document.body.appendChild(parent);
  });

  it("Constructor should create elements with class 'slider__tip' on parent node", () => {
    expect(tipElement).toHaveClass('slider__tip');
    expect(secondTipElement).toHaveClass('slider__tip');
  });

  it('Method render should update tips state correctly', () => {
    tip.render(props);
    expect(tipElement.style.display).toEqual('block');

    const props1: ViewProps = {
      ...props,
      shouldDisplayTips: false,
    };
    tip.render(props1);
    expect(tipElement.style.display).toEqual('none');
  });
});
