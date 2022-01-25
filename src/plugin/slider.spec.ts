import { ModelState } from '../model/modelTypes';
import Presenter from '../presenter/Presenter';

describe('function superSlider', () => {
  it('should update state correctly', () => {
    const $slider = $('<div>').superSlider();
    const slider: Presenter = $slider.data('sliderInterface');

    const options: ModelState = {
      isVertical: false,
      isRange: true,
      isInversion: true,
      shouldDisplayTips: true,
      shouldDisplayProgressBar: true,
      shouldDisplayScale: false,
      minValue: 0,
      maxValue: 100,
      step: 20,
      pointerPosition: 20,
      secondPointerPosition: 80,
    };

    slider.setOptions(options);
    expect(slider.getOptions()).toEqual(options);
  });
});
