import View from './View';
import { ViewObserver, ViewProps } from './viewTypes';

describe('View', () => {
  let view: View;
  let viewElement: HTMLElement;
  const observer = jasmine.createSpyObj<ViewObserver>(
    'spy',
    ['click', 'startMove', 'move', 'endMove'],
  );
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
    const parent = document.createElement('div');
    view = new View(parent, observer);
    viewElement = <HTMLElement>parent.children.item(0); // eslint-disable-line
  });

  it("Constructor should create element view on parent node with class 'slider'", () => {
    expect(viewElement).toHaveClass('slider');
  });

  it('view should contain bar, scale, 2 pointer and 2 tip elements', () => {
    expect(viewElement.querySelectorAll('.slider__pointer').length).toEqual(2);
    expect(viewElement.querySelectorAll('.slider__tip').length).toEqual(2);
    expect(viewElement.querySelectorAll('.slider__bar').length).toEqual(1);
    expect(viewElement.querySelectorAll('.slider__scale').length).toEqual(1);
  });
});
