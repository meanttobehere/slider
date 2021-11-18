import './panel/superSliderPanel';

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
    pointerPosition: 5000,
    secondPointerPosition: 10000,
    minValue: 0,
    maxValue: 16000,
    step: 100,
  },
);
$('#panel3').superSliderPanel($slider3);

function handleSliderUpdate(){
  const $this = $(this);
  const sliderIsVertical = $this.superSlider('typeVertical');

  if (sliderIsVertical) {
    $this.css('height', '400px');
    $this.css('max-width', 'max-content');
  } else {
    $this.css('height', 'auto');
    $this.css('max-width', '');
  }
}

[$slider1, $slider2, $slider3].forEach(($slider) => {
  $slider.on('sliderupdate', handleSliderUpdate)
});
