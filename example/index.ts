import './panel/panel';

const $slider1 = $('#slider1').superSlider(
  {
    pointerPosition: 20,
    secondPointerPosition: 80,
    minValue: 0,
    maxValue: 100,
    step: 10,
    typeVertical: false,
    typeRange: true,
    displayScale: true,
    displayTips: true,
    displayProgressBar: true,
  },
);
$('#panel1').superSliderPanel($slider1);

const $slider2 = $('#slider2').superSlider(
  {
    pointerPosition: -10,
    secondPointerPosition: 10,
    minValue: -20,
    maxValue: 40,
    step: 7,
    typeVertical: false,
    typeRange: true,
    displayScale: true,
    displayTips: true,
    displayProgressBar: true,
  },
);
$('#panel2').superSliderPanel($slider2);

const $slider3 = $('#slider3').superSlider(
  {
    pointerPosition: 280,
    secondPointerPosition: 500,
    minValue: 20,
    maxValue: 800,
    step: 140,
    typeVertical: false,
    typeRange: true,
    displayScale: true,
    displayTips: true,
    displayProgressBar: true,
  },
);
$('#panel3').superSliderPanel($slider3);

[$slider1, $slider2, $slider3].forEach(($slider) => {
  $slider.on('sliderupdate', function sliderSizeUpdate() {
    const $this = $(this);
    const sliderIsVertical = $this.superSlider('typeVertical');

    if (sliderIsVertical) {
      $this.css('height', '400px');
      $this.css('max-width', 'max-content');
    } else {
      $this.css('height', 'auto');
      $this.css('max-width', '');
    }
  });
});
