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
      minValue: 0,
      maxValue: 100,
      step: 20,
      pointerPosition: 20,
      secondPointerPosition: 80,
    };
    const keys = Object.keys(options);

    slider(options);
    expect(slider(keys)).toEqual(options);
  });
});
