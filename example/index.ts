import './panel/superSliderPanel';
import './index.scss';

const $slider1 = $('#slider0').superSlider(
  {
    pointerPosition: 20,
    secondPointerPosition: 80,
    minValue: 0,
    maxValue: 100,
    step: 10,
    shouldDisplayScale: true,
  },
);

$('#panel0').superSliderPanel($slider1);

const $slider2 = $('#slider1').superSlider(
  {
    pointerPosition: -10,
    secondPointerPosition: 10,
    minValue: -20,
    maxValue: 40,
    step: 7,
    isVertical: false,
    isRange: true,
    shouldDisplayScale: true,
    shouldDisplayTips: true,
    shouldDisplayProgressBar: true,
  },
);
$('#panel1').superSliderPanel($slider2);

const $slider3 = $('#slider2').superSlider(
  {
    pointerPosition: 5000,
    secondPointerPosition: 100000,
    minValue: 0,
    maxValue: 100000000,
    step: 1,
  },
);
$('#panel2').superSliderPanel($slider3);

function handleSliderUpdate(this: HTMLElement) {
  const $this = $(this);
  const options = $this.data('sliderInterface').getOptions();

  if (options.isVertical) {
    $this.css('height', '400px');
    $this.css('max-width', 'max-content');
  } else {
    $this.css('height', 'auto');
    $this.css('max-width', '');
  }
}

[$slider1, $slider2, $slider3].forEach(($slider) => {
  $slider.on('sliderupdate', handleSliderUpdate);
});
