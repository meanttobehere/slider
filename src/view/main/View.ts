import Pointer from '../pointer/Pointer';
import { PointerObserver, PointerProps } from '../pointer/pointerInterface';
import Bar from '../bar/Bar';
import { BarObserver, BarProps } from '../bar/barInterface';
import Scale from '../scale/Scale';
import { ScaleObserver, ScaleProps } from '../scale/scaleInterface';
import Tip from '../tip/Tip';
import { TipObserver, TipProps } from '../tip/tipInterface';
import { ViewInterface, ViewProps, ViewObserver } from './viewInterface';
import './view.css';

class View implements ViewInterface {
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

  private secondElementsOnTopLayer: boolean;

  constructor(node: JQuery) {
    this.createDomElements(node);
    this.setObserversOnChild();
  }

  render(props: ViewProps, renderOnlyPositionDependedElements?: boolean) {
    if (props.typeVertical) {
      this.$container.addClass('slider__container_vertical');
    } else {
      this.$container.removeClass('slider__container_vertical');
    }

    if (props.typeRange
      && props.pointerPosition === 0
      && props.secondPointerPosition === 0) {
      this.secondElementsOnTopLayer = true;
    } else if (props.typeRange
      && props.pointerPosition === 100
      && props.secondPointerPosition === 100) {
      this.secondElementsOnTopLayer = false;
    }

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
      zIndex: this.secondElementsOnTopLayer ? 2 : 3,
    };

    const pointerProps: PointerProps = {
      display: true,
      vertical: props.typeVertical,
      position: props.pointerPosition,
      zIndex: this.secondElementsOnTopLayer ? 2 : 3,
    };

    const secondTipProps: TipProps = {
      display: props.displayTips && props.typeRange,
      vertical: props.typeVertical,
      position: props.secondPointerPosition,
      value: props.secondTipValue,
      zIndex: this.secondElementsOnTopLayer ? 3 : 2,
    };

    const secondPointerProps: PointerProps = {
      display: props.typeRange,
      vertical: props.typeVertical,
      position: props.secondPointerPosition,
      zIndex: this.secondElementsOnTopLayer ? 3 : 2,
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

  private createDomElements(node: JQuery) {
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
    this.secondTip = new Tip(this.$tipsContainer, true);
  }

  private setObserversOnChild() {
    [
      this.pointer,
      this.secondPointer,
      this.tip,
      this.secondTip,
    ].forEach((obj) => {
      obj.setObserver(this.createMoveObserver());
    });
    this.scale.setObserver(this.createClickObserver());
    this.bar.setObserver(this.createClickObserver());
  }

  private createMoveObserver(): PointerObserver & TipObserver {
    return {
      startMove: this.handleStartMove.bind(this),
      move: this.handleMove.bind(this),
      endMove: this.handleEndMove.bind(this),
    };
  }

  private createClickObserver(): ScaleObserver & BarObserver {
    return {
      click: this.handleClick.bind(this),
    };
  }

  private handleStartMove(isSecond: boolean) {
    this.secondElementsOnTopLayer = isSecond;
    this.observer?.startMove(isSecond);
  }

  private handleMove(pos: number, isSecond: boolean) {
    this.observer?.move(pos, isSecond);
  }

  private handleEndMove(isSecond: boolean) {
    this.observer?.endMove(isSecond);
  }

  private handleClick(pos: number) {
    this.observer?.click(pos);
  }
}

export default View;
