import './panel/superSliderPanel';

const $slider1 = <JQuery>$('#slider1').superSlider(
  {
    pointerPosition: 20,
    secondPointerPosition: 80,
    minValue: 0,
    maxValue: 100,
    step: 10,
    shouldDisplayScale: true,
  },
);

$('#panel1').superSliderPanel($slider1);

const $slider2 = <JQuery>$('#slider2').superSlider(
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
$('#panel2').superSliderPanel($slider2);

const $slider3 = <JQuery>$('#slider3').superSlider(
  {
    pointerPosition: 5000,
    secondPointerPosition: 100000,
    minValue: 0,
    maxValue: 100000000,
    step: 1,
  },
);
$('#panel3').superSliderPanel($slider3);

function handleSliderUpdate(this: HTMLElement) {
  const $this = $(this);
  const sliderIsVertical = $this.superSlider('isVertical');

  if (sliderIsVertical) {
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
