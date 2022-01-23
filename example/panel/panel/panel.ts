import Presenter from '../../../src/presenter/Presenter';
import CustomInput from '../input/input';
import CustomToggle from '../toggle/toggle';
import './panel.css';

export default class Panel {
  private slider: Presenter;

  private panelContainer: HTMLElement;

  private togglesContainer: HTMLElement;

  private inputsContainer: HTMLElement;

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

  constructor(node: HTMLElement, $slider: JQuery) {
    this.slider = $slider.data('sliderInterface');
    this.createDomElements(node);
    this.initElements();
    this.update();
    $slider.on('sliderupdate', this.handleSliderUpdate.bind(this));
  }

  private createDomElements(node: HTMLElement) {
    this.panelContainer = document.createElement('div');
    this.panelContainer.classList.add('panel__container');

    this.togglesContainer = document.createElement('div');
    this.togglesContainer.classList.add('panel__toggles-container');

    this.inputsContainer = document.createElement('div');
    this.inputsContainer.classList.add('panel__inputs-container');

    this.panelContainer.appendChild(this.inputsContainer);
    this.panelContainer.appendChild(this.togglesContainer);
    node.appendChild(this.panelContainer);
  }

  private initElements() {
    this.minInput = new CustomInput({
      node: this.inputsContainer,
      title: 'min',
      callback: (value: number) => {
        this.slider.setOptions({ minValue: value });
      },
    });
    this.maxInput = new CustomInput({
      node: this.inputsContainer,
      title: 'max',
      callback: (value: number) => {
        this.slider.setOptions({ maxValue: value });
      },
    });
    this.stepInput = new CustomInput({
      node: this.inputsContainer,
      title: 'step',
      callback: (value: number) => {
        this.slider.setOptions({ step: value });
      },
    });
    this.fromInput = new CustomInput({
      node: this.inputsContainer,
      title: 'from',
      callback: (value: number) => {
        this.setFromValue(value);
      },
    });
    this.toInput = new CustomInput({
      node: this.inputsContainer,
      title: 'to',
      callback: (value: number) => {
        this.setToValue(value);
      },
    });
    this.verticalToggle = new CustomToggle({
      node: this.togglesContainer,
      title: 'vertical',
      callback: (checked: boolean) => {
        this.slider.setOptions({ isVertical: checked });
      },
    });
    this.rangeToggle = new CustomToggle({
      node: this.togglesContainer,
      title: 'range',
      callback: (checked: boolean) => {
        this.slider.setOptions({ isRange: checked });
      },
    });
    this.tipToggle = new CustomToggle({
      node: this.togglesContainer,
      title: 'tip',
      callback: (checked: boolean) => {
        this.slider.setOptions({ shouldDisplayTips: checked });
      },
    });
    this.barToggle = new CustomToggle({
      node: this.togglesContainer,
      title: 'bar',
      callback: (checked: boolean) => {
        this.slider.setOptions({ shouldDisplayProgressBar: checked });
      },
    });
    this.scaleToggle = new CustomToggle({
      node: this.togglesContainer,
      title: 'scale',
      callback: (checked: boolean) => {
        this.slider.setOptions({ shouldDisplayScale: checked });
      },
    });
  }

  private update() {
    const options = this.slider.getOptions();
    this.maxInput.update({
      value: options.maxValue,
      step: options.step,
    });
    this.minInput.update({
      value: options.minValue,
      step: options.step,
    });
    this.stepInput.update({
      value: options.step,
    });
    this.fromInput.update({
      value: this.getFromValue(),
      step: options.step,
      min: options.minValue,
    });
    this.toInput.update({
      value: this.getToValue(),
      step: options.step,
      min: options.minValue,
      blocked: !options.isRange,
    });
    this.verticalToggle.update(options.isVertical);
    this.rangeToggle.update(options.isRange);
    this.tipToggle.update(options.shouldDisplayTips);
    this.scaleToggle.update(options.shouldDisplayScale);
    this.barToggle.update(options.shouldDisplayProgressBar);
  }

  private handleSliderUpdate() {
    this.update();
  }

  private getFromValue(): number {
    const options = this.slider.getOptions();
    if (!options.isRange) {
      return options.pointerPosition;
    }
    return Math.min(options.pointerPosition, options.secondPointerPosition);
  }

  private setFromValue(value: number): void {
    const options = this.slider.getOptions();
    if (!options.isRange) {
      this.slider.setOptions({ pointerPosition: value });
      return;
    }
    const pos1 = options.pointerPosition;
    const pos2 = options.secondPointerPosition;

    if (pos1 < pos2) {
      this.slider.setOptions({ pointerPosition: value });
      if (value > pos2) {
        this.slider.setOptions({ secondPointerPosition: value });
      }
    } else {
      this.slider.setOptions({ secondPointerPosition: value });
      if (value > pos1) {
        this.slider.setOptions({ pointerPosition: value });
      }
    }
  }

  private setToValue(value: number): void {
    const options = this.slider.getOptions();
    const pos1 = options.pointerPosition;
    const pos2 = options.secondPointerPosition;

    if (pos2 > pos1) {
      this.slider.setOptions({ secondPointerPosition: value });
      if (value < pos1) {
        this.slider.setOptions({ pointerPosition: value });
      }
    } else {
      this.slider.setOptions({ pointerPosition: value });
      if (value < pos2) {
        this.slider.setOptions({ secondPointerPosition: value });
      }
    }
  }

  private getToValue(): number {
    const options = this.slider.getOptions();
    return Math.max(
      options.pointerPosition,
      options.secondPointerPosition,
    );
  }
}
