import './panel.css';
import CustomInput from './input/input';
import CustomToggle from './toggle/toggle';

declare global {
  interface JQuery {
    superSliderPanel: ($slider: JQuery) => JQuery;
  }
}

function createPanel(node: JQuery, $slider: JQuery) {
  const $panelContainer = $('<div>', { class: 'panel__container' });
  const $togglesContainer = $('<div>', { class: 'panel__toggels-container' });
  const $inputsContainer = $('<div>', { class: 'panel__inputs-container' });
  $panelContainer.append($inputsContainer).append($togglesContainer);
  node.append($panelContainer);

  const slider = $slider.superSlider.bind($slider);

  const minInput = new CustomInput({
    node: $inputsContainer,
    title: 'min',
    callback: (value: number) => {
      slider('minValue', value);
    },
  });
  const maxInput = new CustomInput({
    node: $inputsContainer,
    title: 'max',
    callback: (value: number) => {
      slider('maxValue', value);
    },
  });
  const stepInput = new CustomInput({
    node: $inputsContainer,
    title: 'step',
    callback: (value: number) => {
      slider('step', value);
    },
  });
  const fromInput = new CustomInput({
    node: $inputsContainer,
    title: 'from',
    callback: (value: number) => {      
      slider('pointerPosition', value);
    },
  });
  const toInput = new CustomInput({
    node: $inputsContainer,
    title: 'to',
    callback: (value: number) => {
      slider('secondPointerPosition', value);
    },
  });
  const verticalToggle = new CustomToggle({
    node: $togglesContainer,
    title: 'vertical',
    callback: (checked: boolean) => {
      slider('typeVertical', checked);
    },
  });
  const rangeToggle = new CustomToggle({
    node: $togglesContainer,
    title: 'range',
    callback: (checked: boolean) => {
      slider('typeRange', checked);
    },
  });
  const tipToggle = new CustomToggle({
    node: $togglesContainer,
    title: 'tip',
    callback: (checked: boolean) => {
      slider('displayTips', checked);
    },
  });
  const barToggle = new CustomToggle({
    node: $togglesContainer,
    title: 'bar',
    callback: (checked: boolean) => {
      slider('displayProgressBar', checked);
    },
  });
  const scaleToggle = new CustomToggle({
    node: $togglesContainer,
    title: 'scale',
    callback: (checked: boolean) => {
      slider('displayScale', checked);
    },
  });

  const updatePanel = () => {
    maxInput.update({
      value: slider('maxValue'),
      step: slider('step'),
    });
    minInput.update({
      value: slider('minValue'),
      step: slider('step'),
    });
    stepInput.update({
      value: slider('step'),
    });
    fromInput.update({
      value: slider('pointerPosition'),
      step: slider('step'),
      min: slider('minValue'),
    });
    toInput.update({
      value: slider('secondPointerPosition'),
      step: slider('step'),
      min: slider('minValue'),
      blocked: !slider('typeRange'),
    });
    verticalToggle.update(slider('typeVertical'));
    rangeToggle.update(slider('typeRange'));
    tipToggle.update(slider('displayTips'));
    scaleToggle.update(slider('displayScale'));
    barToggle.update(slider('displayProgressBar'));
  };

  updatePanel();
  $slider.on('sliderupdate', updatePanel);
}

$.fn.superSliderPanel = function superSliderPanel($slider: JQuery): JQuery {
  createPanel(this, $slider);
  return this;
};
