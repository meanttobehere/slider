import { SuperSlider } from '../../../src/plugin/slider';
import CustomInput from '../input/input';
import CustomToggle from '../toggle/toggle';
import './panel.css';

export default class Panel {
  private slider: SuperSlider;

  private $panelContainer: JQuery;

  private $togglesContainer: JQuery;

  private $inputsContainer: JQuery;

  private minInput: CustomInput;

  private maxInput: CustomInput;

  private stepInput: CustomInput;

  private fromInput: CustomInput;

  private labelsInput: CustomInput;

  private toInput: CustomInput;

  private verticalToggle: CustomToggle;

  private rangeToggle: CustomToggle;

  private tipToggle: CustomToggle;

  private scaleToggle: CustomToggle;

  private barToggle: CustomToggle;

  constructor($node: JQuery, $slider: JQuery) {
    this.slider = $slider.superSlider.bind($slider);
    this.createDomElements($node);
    this.initElements();
    this.update();
    $slider.on('sliderupdate', this.handleSliderUpdate.bind(this));
  }

  private createDomElements($node: JQuery) {
    this.$panelContainer = $('<div>', { class: 'panel__container' });
    this.$togglesContainer = $('<div>', { class: 'panel__toggels-container' });
    this.$inputsContainer = $('<div>', { class: 'panel__inputs-container' });
    this.$panelContainer
      .append(this.$inputsContainer)
      .append(this.$togglesContainer);
    $node.append(this.$panelContainer);
  }

  private initElements() {
    this.labelsInput = new CustomInput({
      node: this.$inputsContainer,
      title: 'max labels',
      callback: (value: number) => {
        this.slider('maxNumberLabels', value);
      },
    });
    this.minInput = new CustomInput({
      node: this.$inputsContainer,
      title: 'min',
      callback: (value: number) => {
        this.slider('minValue', value);
      },
    });
    this.maxInput = new CustomInput({
      node: this.$inputsContainer,
      title: 'max',
      callback: (value: number) => {
        this.slider('maxValue', value);
      },
    });
    this.stepInput = new CustomInput({
      node: this.$inputsContainer,
      title: 'step',
      callback: (value: number) => {
        this.slider('step', value);
      },
    });
    this.fromInput = new CustomInput({
      node: this.$inputsContainer,
      title: 'from',
      callback: (value: number) => {
        this.slider('pointerPosition', value);
      },
    });
    this.toInput = new CustomInput({
      node: this.$inputsContainer,
      title: 'to',
      callback: (value: number) => {
        this.slider('secondPointerPosition', value);
      },
    });
    this.verticalToggle = new CustomToggle({
      node: this.$togglesContainer,
      title: 'vertical',
      callback: (checked: boolean) => {
        this.slider('isVertical', checked);
      },
    });
    this.rangeToggle = new CustomToggle({
      node: this.$togglesContainer,
      title: 'range',
      callback: (checked: boolean) => {
        this.slider('isRange', checked);
      },
    });
    this.tipToggle = new CustomToggle({
      node: this.$togglesContainer,
      title: 'tip',
      callback: (checked: boolean) => {
        this.slider('shouldDisplayTips', checked);
      },
    });
    this.barToggle = new CustomToggle({
      node: this.$togglesContainer,
      title: 'bar',
      callback: (checked: boolean) => {
        this.slider('shouldDisplayProgressBar', checked);
      },
    });
    this.scaleToggle = new CustomToggle({
      node: this.$togglesContainer,
      title: 'scale',
      callback: (checked: boolean) => {
        this.slider('shouldDisplayScale', checked);
      },
    });
  }

  private update() {
    this.labelsInput.update({
      value: <number> this.slider('maxNumberLabels'),
    });
    this.maxInput.update({
      value: <number> this.slider('maxValue'),
      step: <number> this.slider('step'),
    });
    this.minInput.update({
      value: <number> this.slider('minValue'),
      step: <number> this.slider('step'),
    });
    this.stepInput.update({
      value: <number> this.slider('step'),
    });
    this.fromInput.update({
      value: <number> this.slider('pointerPosition'),
      step: <number> this.slider('step'),
      min: <number> this.slider('minValue'),
    });
    this.toInput.update({
      value: <number> this.slider('secondPointerPosition'),
      step: <number> this.slider('step'),
      min: <number> this.slider('minValue'),
      blocked: !this.slider('isRange'),
    });
    this.verticalToggle.update(<boolean> this.slider('isVertical'));
    this.rangeToggle.update(<boolean> this.slider('isRange'));
    this.tipToggle.update(<boolean> this.slider('shouldDisplayTips'));
    this.scaleToggle.update(<boolean> this.slider('shouldDisplayScale'));
    this.barToggle.update(<boolean> this.slider('shouldDisplayProgressBar'));
  }

  private handleSliderUpdate() {
    this.update();
  }
}
