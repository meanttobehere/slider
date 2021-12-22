import { PresenterParams } from '../../presenter/presenterInterface';

describe('function superSlider', () => {
  it('should update state correctly', () => {
    const $slider = <JQuery>$('<div>').superSlider();
    const slider = $slider.superSlider.bind($slider);

    const params: PresenterParams = {
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
    slider(params);
    expect(slider([
      'isVertical',
      'isRange',
      'shouldDisplayTips',
      'shouldDisplayProgressBar',
      'shouldDisplayScale',
      'minValue',
      'maxValue',
      'step',
      'pointerPosition',
      'secondPointerPosition',
    ])).toEqual(params);
  });
});
