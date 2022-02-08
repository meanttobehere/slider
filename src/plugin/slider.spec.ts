import Presenter from '../presenter/Presenter';
import { SliderState } from './sliderTypes';

describe('function superSlider', () => {
  it('should update state correctly', () => {
    const $slider = $('<div>').superSlider();
    const slider: Presenter = $slider.data('sliderInterface');

    const options: SliderState = {
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
