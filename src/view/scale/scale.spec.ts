import { SliderParams } from '../../plugin/sliderTypes';
import View from '../main/View';
import Scale from './Scale';

describe('Scale', () => {
  let scale: Scale;
  let scaleElement: HTMLElement;
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
    pointerPosition: 10,
    secondPointerPosition: 70,
    pointerPosPercentage: 10,
    secondPointerPosPercentage: 70,
    tipValue: '10',
    secondTipValue: '70',
    scaleLabels: [
      { val: '10', posPercentage: 10 },
      { val: '55', posPercentage: 55 },
    ],
  };

  beforeAll(() => {
    parent = document.createElement('div');
    parent.style.width = '1000px';
    scale = new Scale(parent, viewSpy);
    scaleElement = <HTMLElement>parent.children.item(0); // eslint-disable-line
    document.body.appendChild(parent);
  });

  it("Constructor should create element scale with class 'slider__scale' on parent node", () => {
    expect(scaleElement).toHaveClass('slider__scale');
  });

  it("Method render should create elements label with class 'slider__scale-label' on scale element", () => {
    scale.render(params);
    expect(scaleElement.children).toHaveClass('slider__scale-label');
  });

  it('Method render should update the number of label elements', () => {
    scale.render(params);
    expect(scaleElement.children.length).toEqual(2);
  });

  it('Method render should update scale state correctly', () => {
    scale.render(params);
    expect(scaleElement.style.display).toEqual('block');
    const params2 = {
      ...params,
      shouldDisplayScale: false,
    };
    scale.render(params2);
    expect(scaleElement.style.display).toEqual('none');
  });

  it('When clicking on label, scale should notify view observer', () => {
    scale.render(params);
    (Array.from(scaleElement.children)).forEach((label) => {  // eslint-disable-line
      label.dispatchEvent(new MouseEvent('click'));
      expect(viewSpy.notify).toHaveBeenCalled();
      viewSpy.notify.calls.reset();
    });
  });
});
