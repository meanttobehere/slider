import './view.css';
import { ViewInterface, ViewProps, ViewObserver } from './viewInterface';
import Pointer from '../pointer/pointer';
import { PointerObserver, PointerProps } from '../pointer/pointerInterface';
import Bar from '../bar/bar';
import { BarProps } from '../bar/barInterface';
import Scale from '../scale/scale';
import { ScaleObserver, ScaleProps } from '../scale/scaleInterface';
import Tip from '../tip/tip';
import { TipProps } from '../tip/tipInterface';

export default class View implements ViewInterface {
  private $container: JQuery;

  private $barContainer: JQuery;

  private $scaleContainer: JQuery;

  private $tipsContainer: JQuery;

  private bar: Bar;

  private scale: Scale;

  private pointer: Pointer;

  private secondPointer: Pointer;

  private tip: Tip;

  private secondTip: Tip;

  private observer: ViewObserver;

  private secondPointerOnTopLayer: boolean;

  constructor(node: JQuery) {
    this.$container = $('<div>', { class: 'slider__container' });
    this.$scaleContainer = $('<div>', { class: 'slider__scale-container' });
    this.$barContainer = $('<div>', { class: 'slider__bar-container' });
    this.$tipsContainer = $('<div>', { class: 'slider__tips-container' });

    node.append(this.$container);
    this.$container
      .append(this.$tipsContainer)
      .append(this.$barContainer)
      .append(this.$scaleContainer);

    this.scale = new Scale(this.$scaleContainer);
    this.bar = new Bar(this.$barContainer);
    this.pointer = new Pointer(this.$barContainer);
    this.secondPointer = new Pointer(this.$barContainer, true);
    this.tip = new Tip(this.$tipsContainer);
    this.secondTip = new Tip(this.$tipsContainer);

    [this.pointer, this.secondPointer].forEach((pointer) => {
      pointer.setObserver(this.createPointerObserver());
    });
    this.scale.setObserver(this.createScaleObserver());
  }

  render(props: ViewProps, renderOnlyPositionDependedElements?: boolean) {
    if (props.typeVertical) { this.$container.addClass('slider__container_vertical'); } else { this.$container.removeClass('slider__container_vertical'); }

    const barProps: BarProps = {
      progressbar: props.displayProgressBar,
      vertical: props.typeVertical,
      intervalStartPos: props.typeRange ? props.pointerPosition : 0,
      intervalLength: props.typeRange
        ? props.secondPointerPosition - props.pointerPosition
        : props.pointerPosition,
    };

    const scaleProps: ScaleProps = {
      display: props.displayScale,
      vertical: props.typeVertical,
      labels: props.scaleLabels,
    };

    const tipProps: TipProps = {
      display: props.displayTips,
      vertical: props.typeVertical,
      position: props.pointerPosition,
      value: props.tipValue,
    };

    const pointerProps: PointerProps = {
      display: true,
      vertical: props.typeVertical,
      position: props.pointerPosition,
      zIndex: this.secondPointerOnTopLayer ? 2 : 3, 
    };

    const secondTipProps: TipProps = {
      display: props.displayTips && props.typeRange,
      vertical: props.typeVertical,
      position: props.secondPointerPosition,
      value: props.secondTipValue,
    };

    const secondPointerProps: PointerProps = {
      display: props.typeRange,
      vertical: props.typeVertical,
      position: props.secondPointerPosition,
      zIndex: this.secondPointerOnTopLayer ? 3 : 2,    
    };

    if (renderOnlyPositionDependedElements === undefined
      || renderOnlyPositionDependedElements === false) {
      this.scale.render(scaleProps);
    }

    this.bar.render(barProps);
    this.tip.render(tipProps);
    this.secondTip.render(secondTipProps);
    this.pointer.render(pointerProps);
    this.secondPointer.render(secondPointerProps);
  }

  setObserver(viewObserver: ViewObserver) {
    this.observer = viewObserver;
  }

  private createPointerObserver(): PointerObserver {
    return {
      startMove: this.pointerStartMoveEventHandler.bind(this),
      move: (pos: number, isSecond: boolean) => (this.observer?.pointerMove(pos, isSecond)),
      endMove: (isSecond: boolean) => (this.observer?.pointerEndMove(isSecond)),
    };
  }

  private createScaleObserver(): ScaleObserver {
    return {
      click: (position: number) => (this.observer?.clickOnScale(position)),
    };
  }

  private pointerStartMoveEventHandler(isSecond: boolean){
    this.secondPointerOnTopLayer = isSecond;
    this.observer?.pointerStartMove(isSecond);
  }
}
