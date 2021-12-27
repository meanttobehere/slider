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
    this.$togglesContainer = $('<div>', { class: 'panel__toggles-container' });
    this.$inputsContainer = $('<div>', { class: 'panel__inputs-container' });
    this.$panelContainer
      .append(this.$inputsContainer)
      .append(this.$togglesContainer);
    $node.append(this.$panelContainer);
  }

  private initElements() {
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
        this.setFromValue(value);
      },
    });
    this.toInput = new CustomInput({
      node: this.$inputsContainer,
      title: 'to',
      callback: (value: number) => {
        this.setToValue(value);
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
      value: this.getFromValue(),
      step: <number> this.slider('step'),
      min: <number> this.slider('minValue'),
    });
    this.toInput.update({
      value: this.getToValue(),
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

  private getFromValue(): number {
    if (!this.slider('isRange')) {
      return <number> this.slider('pointerPosition');
    }
    return Math.min(
      <number> this.slider('pointerPosition'),
      <number> this.slider('secondPointerPosition'),
    );
  }

  private setFromValue(value: number): void {
    if (!this.slider('isRange')) {
      this.slider('pointerPosition', value);
      return;
    }
    const pos1 = <number> this.slider('pointerPosition');
    const pos2 = <number> this.slider('secondPointerPosition');

    if (pos1 < pos2) {
      this.slider('pointerPosition', value);
      if (value > pos2) {
        this.slider('secondPointerPosition', value);
      }
    } else {
      this.slider('secondPointerPosition', value);
      if (value > pos1) {
        this.slider('pointerPosition', value);
      }
    }
  }

  private setToValue(value: number): void {
    const pos1 = <number> this.slider('pointerPosition');
    const pos2 = <number> this.slider('secondPointerPosition');

    if (pos2 > pos1) {
      this.slider('secondPointerPosition', value);
      if (value < pos1) {
        this.slider('pointerPosition', value);
      }
    } else {
      this.slider('pointerPosition', value);
      if (value < pos2) {
        this.slider('secondPointerPosition', value);
      }
    }
  }

  private getToValue(): number {
    return Math.max(
      <number> this.slider('pointerPosition'),
      <number> this.slider('secondPointerPosition'),
    );
  }
}
