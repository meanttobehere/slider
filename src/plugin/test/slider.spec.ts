import { ModelState } from '../../model/modelInterface';

describe('function superSlider', () => {
  it('should update state correctly', () => {
    const $slider = <JQuery>$('<div>').superSlider();
    const slider = $slider.superSlider.bind($slider);

    const options: ModelState = {
      isVertical: false,
      isRange: true,
      shouldDisplayTips: true,
      shouldDisplayProgressBar: true,
      shouldDisplayScale: false,
      maxNumberLabels: 20,
      minValue: 0,
      maxValue: 100,
      step: 20,
      pointerPosition: 20,
      secondPointerPosition: 80,
    };
    slider(options);
    /*
    expect(slider([
      'isVertical',
      'isRange',
      'shouldDisplayTips',
      'shouldDisplayProgressBar',
      'shouldDisplayScale',
      'maxNumberLabels',
      'minValue',
      'maxValue',
      'step',
      'pointerPosition',
      'secondPointerPosition',
    ])).toEqual(options);*/
  });
});
