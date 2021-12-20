import {
  ViewInterface, ViewProps, ViewObserver,
} from '../view/main/viewInterface';
import {
  ModelInterface, ModelData, ModelObserver, ModelUpdateEventOptions,
} from '../model/modelInterface';
import {
  PresenterInterface, PresenterEvents, PresenterOptions,
} from './presenterInterface';
import View from '../view/main/View';

class Presenter implements PresenterInterface {
  private model: ModelInterface;

  private view: ViewInterface;

  private viewProps: ViewProps;

  private events: PresenterEvents;

  constructor(
    model: ModelInterface,
    $node: JQuery,
    options: PresenterOptions,
    events: PresenterEvents,
  ) {
    this.model = model;
    this.view = new View($node, this.createViewObserver());
    this.events = events;
    this.viewProps = {} as ViewProps;

    this.updateModel(options);
    this.updateView();

    this.model.setObserver(this.createModelObserver());
  }

  public getUpdateFunction() {
    return ((options: PresenterOptions) => {
      this.updateModel(options);
    });
  }

  public getSetters() {
    return {
      typeVertical: this.model.setTypeVertical.bind(this.model),
      typeRange: this.model.setTypeRange.bind(this.model),
      displayTips: this.model.setDisplayTips.bind(this.model),
      displayProgressBar: this.model.setDisplayProgressBar.bind(this.model),
      displayScale: this.model.setDisplayScale.bind(this.model),
      minValue: this.model.setMinValue.bind(this.model),
      maxValue: this.model.setMaxValue.bind(this.model),
      step: this.model.setStep.bind(this.model),
      pointerPosition: this.model.setPointerPosition.bind(this.model),
      secondPointerPosition: this.model
        .setSecondPointerPosition.bind(this.model),
    };
  }

  public getGetters() {
    return {
      typeVertical: this.model.getTypeVertical.bind(this.model),
      typeRange: this.model.getTypeRange.bind(this.model),
      displayTips: this.model.getDisplayTips.bind(this.model),
      displayProgressBar: this.model.getDisplayProgressBar.bind(this.model),
      displayScale: this.model.getDisplayScale.bind(this.model),
      minValue: this.model.getMinValue.bind(this.model),
      maxValue: this.model.getMaxValue.bind(this.model),
      step: this.model.getStep.bind(this.model),
      pointerPosition: this.model.getPointerPosition.bind(this.model),
      secondPointerPosition: this.model
        .getSecondPointerPosition.bind(this.model),
    };
  }

  private createViewObserver() {
    const observer: ViewObserver = {
      move: this.handleViewMove.bind(this),
      startMove: this.handleViewStartMove.bind(this),
      endMove: this.handleViewEndMove.bind(this),
      click: this.handleViewClick.bind(this),
    };
    return observer;
  }

  private createModelObserver() {
    const observer: ModelObserver = {
      update: this.handleModelUpdate.bind(this),
    };
    return observer;
  }

  private handleModelUpdate(options: ModelUpdateEventOptions) {
    this.updateView(options.updatedOnlyPointersPositions);
    this.events.update();
  }

  private handleViewStartMove() {
    this.events.start();
  }

  private handleViewEndMove() {
    this.events.stop();
  }

  private handleViewMove(distance: number, isSecond: boolean) {
    const step = this.model.getStepInPercent();
    const pos1 = this.model.getPointerPositionInPercent();
    const pos2 = this.model.getSecondPointerPositionInPercent();

    if (Math.abs(distance) < step * 0.6 || Math.abs(distance) < 0.1) { return; }

    if (isSecond) {
      const newPos = pos2 + distance;
      this.model.setSecondPointerPositionInPercent(newPos);
    } else {
      const newPos = pos1 + distance;
      this.model.setPointerPositionInPercent(newPos);
    }
    this.events.slide();
  }

  private handleViewClick(position: number) {
    const sliderTypeIsNotRange = !this.model.getTypeRange();

    if (sliderTypeIsNotRange) {
      this.model.setPointerPositionInPercent(position);
    } else {
      const pos1 = this.model.getPointerPositionInPercent();
      const pos2 = this.model.getSecondPointerPositionInPercent();
      if (position < pos1) {
        this.model.setPointerPositionInPercent(position);
      } else if (position > pos2) {
        this.model.setSecondPointerPositionInPercent(position);
      } else if (position - pos1 < pos2 - position) {
        this.model.setPointerPositionInPercent(position);
      } else {
        this.model.setSecondPointerPositionInPercent(position);
      }
    }
    this.events.start();
    this.events.slide();
    this.events.stop();
  }

  private updateView(updatedOnlyPointersPositions?: boolean) {
    this.viewProps.pointerPosition = this.model.getPointerPositionInPercent();
    this.viewProps.secondPointerPosition = this.model
      .getSecondPointerPositionInPercent();
    this.viewProps.tipValue = Math
      .round(this.model.getPointerPosition()).toString();
    this.viewProps.secondTipValue = Math
      .round(this.model.getSecondPointerPosition()).toString();

    this.viewProps.isVertical = this.model.getTypeVertical();
    this.viewProps.isRange = this.model.getTypeRange();
    this.viewProps.shouldDisplayTips = this.model.getDisplayTips();
    this.viewProps.shouldDisplayProgressBar = this.model.getDisplayProgressBar();
    this.viewProps.shouldDisplayScale = this.model.getDisplayScale();
    this.viewProps.scaleLabels = this.createScaleLabels();

    this.view.render(this.viewProps);
  }

  private createScaleLabels(): Array<{ val: string, pos: number }> {
    const scaleLabels: Array<{ val: string, pos: number }> = [];

    let step = this.model.getStepInPercent();
    if (step < 1) { step = 1; }
    const max = this.model.getMaxValue();
    const min = this.model.getMinValue();

    for (let i = 0; i <= 100; i += step) {
      const val = min + (max - min) * (i / 100);
      scaleLabels.push({ val: Math.round(val).toString(), pos: i });
    }

    const lastLabelPos = scaleLabels[scaleLabels.length - 1].pos;
    if (Math.abs(lastLabelPos - 100) >= 0.5) {
      scaleLabels.push({ val: max.toString(), pos: 100 });
    }

    return scaleLabels;
  }

  private updateModel(options: PresenterOptions) {
    const data: ModelData = { ...this.model.getData(), ...options };
    this.model.setData(data);
  }
}

export default Presenter;
