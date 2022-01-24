import Presenter from '../../../src/presenter/Presenter';
import CustomInput from '../input/input';
import CustomToggle from '../toggle/toggle';
import './panel.scss';

interface PanelElements {
  minInput: CustomInput;
  maxInput: CustomInput;
  stepInput: CustomInput;
  fromInput: CustomInput;
  toInput: CustomInput;
  verticalToggle: CustomToggle;
  rangeToggle: CustomToggle;
  tipToggle: CustomToggle;
  scaleToggle: CustomToggle;
  barToggle: CustomToggle;
}

export default class Panel {
  private slider: Presenter;

  private panelContainer = document.createElement('div');

  private togglesContainer = document.createElement('div');

  private inputsContainer = document.createElement('div');

  private elements: PanelElements;

  constructor(node: HTMLElement, $slider: JQuery) {
    this.slider = $slider.data('sliderInterface');
    this.elements = this.createPanelElements();
    this.configureDomElements(node);
    this.update();
    $slider.on('sliderupdate', this.handleSliderUpdate.bind(this));
  }

  private configureDomElements(node: HTMLElement) {
    this.panelContainer.classList.add('panel');
    this.togglesContainer.classList.add('panel__toggles-container');
    this.inputsContainer.classList.add('panel__inputs-container');

    this.panelContainer.appendChild(this.inputsContainer);
    this.panelContainer.appendChild(this.togglesContainer);
    node.appendChild(this.panelContainer);
  }

  private createPanelElements(): PanelElements {
    const minInput = new CustomInput({
      node: this.inputsContainer,
      title: 'min',
      callback: (value: number) => {
        this.slider.setOptions({ minValue: value });
      },
    });
    const maxInput = new CustomInput({
      node: this.inputsContainer,
      title: 'max',
      callback: (value: number) => {
        this.slider.setOptions({ maxValue: value });
      },
    });
    const stepInput = new CustomInput({
      node: this.inputsContainer,
      title: 'step',
      callback: (value: number) => {
        this.slider.setOptions({ step: value });
      },
    });
    const fromInput = new CustomInput({
      node: this.inputsContainer,
      title: 'from',
      callback: (value: number) => {
        this.setFromValue(value);
      },
    });
    const toInput = new CustomInput({
      node: this.inputsContainer,
      title: 'to',
      callback: (value: number) => {
        this.setToValue(value);
      },
    });
    const verticalToggle = new CustomToggle({
      node: this.togglesContainer,
      title: 'vertical',
      callback: (checked: boolean) => {
        this.slider.setOptions({ isVertical: checked });
      },
    });
    const rangeToggle = new CustomToggle({
      node: this.togglesContainer,
      title: 'range',
      callback: (checked: boolean) => {
        this.slider.setOptions({ isRange: checked });
      },
    });
    const tipToggle = new CustomToggle({
      node: this.togglesContainer,
      title: 'tip',
      callback: (checked: boolean) => {
        this.slider.setOptions({ shouldDisplayTips: checked });
      },
    });
    const barToggle = new CustomToggle({
      node: this.togglesContainer,
      title: 'bar',
      callback: (checked: boolean) => {
        this.slider.setOptions({ shouldDisplayProgressBar: checked });
      },
    });
    const scaleToggle = new CustomToggle({
      node: this.togglesContainer,
      title: 'scale',
      callback: (checked: boolean) => {
        this.slider.setOptions({ shouldDisplayScale: checked });
      },
    });
    return {
      minInput,
      maxInput,
      stepInput,
      fromInput,
      toInput,
      verticalToggle,
      rangeToggle,
      tipToggle,
      scaleToggle,
      barToggle,
    };
  }

  private update() {
    const options = this.slider.getOptions();
    this.elements.maxInput.update({
      value: options.maxValue,
      step: options.step,
    });
    this.elements.minInput.update({
      value: options.minValue,
      step: options.step,
    });
    this.elements.stepInput.update({
      value: options.step,
    });
    this.elements.fromInput.update({
      value: this.getFromValue(),
      step: options.step,
      min: options.minValue,
    });
    this.elements.toInput.update({
      value: this.getToValue(),
      step: options.step,
      min: options.minValue,
      blocked: !options.isRange,
    });
    this.elements.verticalToggle.update(options.isVertical);
    this.elements.rangeToggle.update(options.isRange);
    this.elements.tipToggle.update(options.shouldDisplayTips);
    this.elements.scaleToggle.update(options.shouldDisplayScale);
    this.elements.barToggle.update(options.shouldDisplayProgressBar);
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
