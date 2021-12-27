import { ModelState } from '../../model/modelInterface';
import Pointer from '../pointer/Pointer';
import Bar from '../bar/Bar';
import Scale from '../scale/Scale';
import Tip from '../tip/Tip';
import {
  ViewInterface,
  ViewObserver,
  ViewProps,
} from './viewInterface';
import './view.css';

class View implements ViewInterface {
  private $container: JQuery;

  private scale: Scale;

  private bar: Bar;

  private pointer: Pointer;

  private secondPointer: Pointer;

  private tip: Tip;

  private secondTip: Tip;

  private observer: ViewObserver;

  private state: ModelState;

  constructor($node: JQuery, observer: ViewObserver) {
    this.observer = observer;
    this.createViewElements($node, this.makeObserverProxy());
  }

  render(state: ModelState) {
    this.state = state;

    if (state.isVertical) {
      this.$container.addClass('slider__container_vertical');
    } else {
      this.$container.removeClass('slider__container_vertical');
    }

    const props: ViewProps = {
      ...state,
      pointerPositionInPercent: View.convertPosToPercent(
        state.pointerPosition,
        state,
      ),
      secondPointerPositionInPercent: View.convertPosToPercent(
        state.secondPointerPosition,
        state,
      ),
    };

    [
      this.scale,
      this.bar,
      this.pointer,
      this.secondPointer,
      this.tip,
      this.secondTip,
    ].forEach((element) => element.render(props));
  }

  private createViewElements($node: JQuery, observer: ViewObserver) {
    this.$container = $('<div>', { class: 'slider__container' });
    const $scaleContainer = $('<div>', { class: 'slider__scale-container' });
    const $barContainer = $('<div>', { class: 'slider__bar-container' });
    const $tipsContainer = $('<div>', { class: 'slider__tips-container' });
    this.$container.appendTo($node);
    this.$container
      .append($tipsContainer)
      .append($barContainer)
      .append($scaleContainer);

    this.scale = new Scale($scaleContainer, observer);
    this.bar = new Bar($barContainer, observer);
    this.pointer = new Pointer($barContainer, observer);
    this.secondPointer = new Pointer($barContainer, observer, true);
    this.tip = new Tip($tipsContainer, observer);
    this.secondTip = new Tip($tipsContainer, observer, true);
  }

  private makeObserverProxy(): ViewObserver {
    const startMoveHandler = (isSecond: boolean): void => {
      this.updateElementsLayerLevel(isSecond);
      this.observer.startMove(isSecond);
    };
    const clickHandler = (positionInPercent: number): void => {
      const position = View.convertPercentToPos(positionInPercent, this.state);
      this.observer.click(position);
    };
    const moveHandler = (distanceInPercent: number, isSecond: boolean): void => {
      const distance = View.convertPercentToValue(distanceInPercent, this.state);
      this.observer.move(distance, isSecond);
    };
    return ({
      ...this.observer,
      startMove: startMoveHandler,
      click: clickHandler,
      move: moveHandler,
    });
  }

  private updateElementsLayerLevel(isSecondOnTop: boolean) {
    const [
      elementIndex,
      secondElementIndex,
    ] = isSecondOnTop ? [3, 4] : [4, 3];
    [
      this.tip,
      this.pointer,
    ].forEach((element) => element.setLayerLevel(elementIndex));
    [
      this.secondTip,
      this.secondPointer,
    ].forEach((element) => element.setLayerLevel(secondElementIndex));
  }

  public static convertPosToPercent(
    pos: number,
    state: ModelState,
  ): number {
    return ((pos - state.minValue) / (state.maxValue - state.minValue)) * 100;
  }

  public static convertPercentToPos(
    percent: number,
    state: ModelState,
  ) : number {
    return state.minValue + (state.maxValue - state.minValue) * (percent / 100);
  }

  public static convertPercentToValue(
    percent: number,
    state: ModelState,
  ): number {
    return (state.maxValue - state.minValue) * (percent / 100);
  }

  public static getNumDecimals(num: number): number {
    return (num % 1 === 0
      ? 0
      : num.toString().split('.')[1].length);
  }
}

export default View;
