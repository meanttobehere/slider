import CustomInput from '../input/input';
import CustomToggle from '../toggle/toggle';
import './panel.css';

export default class Panel {
  private slider: any;

  private $panelContainer: JQuery;

  private $togglesContainer: JQuery;

  private $inputsContainer: JQuery;

  private minInput: CustomInput;

  private maxInput: CustomInput;

  private stepInput: CustomInput;

  private fromInput: CustomInput;

  private toInput: CustomInput;

  private verticalToggle: CustomToggle;

  private rangeToggle: CustomToggle;

  private tipToggle: CustomToggle;

  private scaleToggle: CustomToggle;

  private barToggle: CustomToggle;

  constructor(node: JQuery, $slider: JQuery) {
    this.slider = $slider.superSlider.bind($slider);
    this.createDomElements(node);
    this.initTogglesAndInputs();
    this.update();
    $slider.on('sliderupdate', this.handleSliderUpdate.bind(this));
  }

  private createDomElements(node: JQuery) {
    this.$panelContainer = $('<div>', { class: 'panel__container' });
    this.$togglesContainer = $('<div>', { class: 'panel__toggels-container' });
    this.$inputsContainer = $('<div>', { class: 'panel__inputs-container' });
    this.$panelContainer
      .append(this.$inputsContainer)
      .append(this.$togglesContainer);
    node.append(this.$panelContainer);
  }

  private initTogglesAndInputs() {
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
    this.maxInput.update({
      value: this.slider('maxValue'),
      step: this.slider('step'),
    });
    this.minInput.update({
      value: this.slider('minValue'),
      step: this.slider('step'),
    });
    this.stepInput.update({
      value: this.slider('step'),
    });
    this.fromInput.update({
      value: this.slider('pointerPosition'),
      step: this.slider('step'),
      min: this.slider('minValue'),
    });
    this.toInput.update({
      value: this.slider('secondPointerPosition'),
      step: this.slider('step'),
      min: this.slider('minValue'),
      blocked: !this.slider('isRange'),
    });
    this.verticalToggle.update(this.slider('isVertical'));
    this.rangeToggle.update(this.slider('isRange'));
    this.tipToggle.update(this.slider('shouldDisplayTips'));
    this.scaleToggle.update(this.slider('shouldDisplayScale'));
    this.barToggle.update(this.slider('shouldDisplayProgressBar'));
  }

  private handleSliderUpdate() {
    this.update();
  }
}
