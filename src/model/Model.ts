import {
  ModelInterface,
  ModelData,
  ModelObserver,
  ModelUpdateEventOptions,
  ModelDataDefault,
} from './modelInterface';

class Model implements ModelInterface {
  private observer: ModelObserver;

  private typeVertical: boolean;

  private typeRange: boolean;

  private displayTips: boolean;

  private displayProgressBar: boolean;

  private displayScale: boolean;

  private minValue: number;

  private maxValue: number;

  private secondPointerPosition: number;

  private pointerPosition: number;

  private step: number;

  constructor() {
    this.loadDefaultModelData();
  }

  public setObserver(observer: ModelObserver) {
    this.observer = observer;
  }

  public setData(data: ModelData) {
    this.typeVertical = data.typeVertical;
    this.typeRange = data.typeRange;
    this.displayTips = data.displayTips;
    this.displayProgressBar = data.displayProgressBar;
    this.displayScale = data.displayScale;
    if (data.minValue < data.maxValue) {
      this.minValue = data.minValue;
      this.maxValue = data.maxValue;
    } else {
      this.maxValue = data.minValue;
      this.minValue = data.maxValue;
    }
    if (data.step > 0) {
      this.step = data.step;
    } else {
      this.step = 1;
    }
    if (data.pointerPosition < data.secondPointerPosition) {
      this.pointerPosition = this.normalizePosition(data.pointerPosition);
      this.secondPointerPosition = this
        .normalizePosition(data.secondPointerPosition);
    } else {
      this.secondPointerPosition = this.normalizePosition(data.pointerPosition);
      this.pointerPosition = this.normalizePosition(data.secondPointerPosition);
    }
    this.updateEvent();
  }

  public setTypeVertical(typeVertical: boolean) {
    this.typeVertical = typeVertical;
    this.updateEvent();
  }

  public setTypeRange(typeRange: boolean) {
    this.typeRange = typeRange;
    this.secondPointerPosition = this.normalizeSecondPointerPosition(
      this.secondPointerPosition,
    );
    this.updateEvent();
  }

  public setDisplayTips(displayTips: boolean) {
    this.displayTips = displayTips;
    this.updateEvent();
  }

  public setDisplayProgressBar(displayProgressBar: boolean) {
    this.displayProgressBar = displayProgressBar;
    this.updateEvent();
  }

  public setDisplayScale(displayScale: boolean) {
    this.displayScale = displayScale;
    this.updateEvent();
  }

  public setMinValue(minValue: number) {
    if (minValue >= this.maxValue) { this.maxValue = minValue + 1; }
    this.minValue = minValue;
    this.pointerPosition = this.normalizePointerPosition(this.pointerPosition);
    this.secondPointerPosition = this.normalizeSecondPointerPosition(
      this.secondPointerPosition,
    );
    this.updateEvent();
  }

  public setMaxValue(maxValue: number) {
    if (maxValue <= this.minValue) { this.minValue = maxValue - 1; }
    this.maxValue = maxValue;
    this.pointerPosition = this.normalizePointerPosition(this.pointerPosition);
    this.secondPointerPosition = this.normalizeSecondPointerPosition(
      this.secondPointerPosition,
    );
    this.updateEvent();
  }

  public setStep(step: number) {
    let newStep = step;
    if (newStep <= 0) { newStep = 1; }
    this.step = newStep;
    this.pointerPosition = this.normalizePosition(this.pointerPosition);
    this.secondPointerPosition = this.normalizePosition(
      this.secondPointerPosition,
    );
    this.updateEvent();
  }

  public setPointerPosition(position: number) {
    this.pointerPosition = this.normalizePointerPosition(position);
    this.updateEvent({ updatedOnlyPointersPositions: true });
  }

  public setSecondPointerPosition(position: number) {
    this.secondPointerPosition = this.normalizeSecondPointerPosition(position);
    this.updateEvent({ updatedOnlyPointersPositions: true });
  }

  public setPointerPositionInPercent(percent: number) {
    this.pointerPosition = this.normalizePointerPosition(
      this.percentToPos(percent),
    );
    this.updateEvent({ updatedOnlyPointersPositions: true });
  }

  public setSecondPointerPositionInPercent(percent: number) {
    this.secondPointerPosition = this.normalizeSecondPointerPosition(
      this.percentToPos(percent),
    );
    this.updateEvent({ updatedOnlyPointersPositions: true });
  }

  public getData(): ModelData {
    return {
      typeVertical: this.typeVertical,
      typeRange: this.typeRange,
      displayTips: this.displayTips,
      displayProgressBar: this.displayProgressBar,
      displayScale: this.displayScale,
      minValue: this.minValue,
      maxValue: this.maxValue,
      step: this.step,
      pointerPosition: this.pointerPosition,
      secondPointerPosition: this.secondPointerPosition,
    };
  }

  public getTypeVertical(): boolean {
    return this.typeVertical;
  }

  public getTypeRange(): boolean {
    return this.typeRange;
  }

  public getDisplayTips(): boolean {
    return this.displayTips;
  }

  public getDisplayProgressBar(): boolean {
    return this.displayProgressBar;
  }

  public getDisplayScale(): boolean {
    return this.displayScale;
  }

  public getMinValue(): number {
    return this.minValue;
  }

  public getMaxValue(): number {
    return this.maxValue;
  }

  public getStep(): number {
    return this.step;
  }

  public getPointerPosition(): number {
    return this.pointerPosition;
  }

  public getSecondPointerPosition(): number {
    return this.secondPointerPosition;
  }

  public getStepInPercent(): number {
    return this.valueToPercent(this.step);
  }

  public getPointerPositionInPercent(): number {
    return this.posToPercent(this.pointerPosition);
  }

  public getSecondPointerPositionInPercent(): number {
    return this.posToPercent(this.secondPointerPosition);
  }

  private posToPercent(position: number): number {
    return ((position - this.minValue) / (this.maxValue - this.minValue)) * 100;
  }

  private percentToPos(percent: number): number {
    return this.minValue + (this.maxValue - this.minValue) * (percent / 100);
  }

  private valueToPercent(value: number): number {
    return (value / (this.maxValue - this.minValue)) * 100;
  }

  private normalizePointerPosition(position: number) {
    let newPos = this.normalizePosition(position);
    if (this.typeRange && newPos > this.secondPointerPosition) {
      newPos = this.secondPointerPosition;
    }
    return newPos;
  }

  private normalizeSecondPointerPosition(position: number) {
    let newPos = this.normalizePosition(position);
    if (newPos < this.pointerPosition) { newPos = this.pointerPosition; }
    return newPos;
  }

  private normalizePosition(position: number): number {
    let newPos = Math.round((position - this.minValue) / this.step)
      * this.step + this.minValue;

    if (newPos < this.minValue) { newPos = this.minValue; }
    if (newPos > this.maxValue) { newPos = this.maxValue; }

    return newPos;
  }

  private updateEvent(options?: ModelUpdateEventOptions) {
    const updOpts = (options === undefined)
      ? { updatedOnlyPointersPositions: false }
      : options;
    this.observer?.update(updOpts);
  }

  private loadDefaultModelData() {
    this.typeVertical = ModelDataDefault.typeVertical;
    this.typeRange = ModelDataDefault.typeRange;
    this.displayTips = ModelDataDefault.displayTips;
    this.displayProgressBar = ModelDataDefault.displayProgressBar;
    this.displayScale = ModelDataDefault.displayScale;
    this.minValue = ModelDataDefault.minValue;
    this.maxValue = ModelDataDefault.maxValue;
    this.step = ModelDataDefault.step;
    this.pointerPosition = ModelDataDefault.pointerPosition;
    this.secondPointerPosition = ModelDataDefault.secondPointerPosition;
  }
}

export default Model;