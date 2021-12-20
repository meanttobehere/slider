import Pointer from '../pointer/Pointer';
import Bar from '../bar/Bar';
import Scale from '../scale/Scale';
import Tip from '../tip/Tip';
import {
  ViewInterface,
  ViewProps,
  ViewObserver,
} from './viewInterface';
import './view.css';

class View implements ViewInterface {
  private $container: JQuery<HTMLElement>;

  private scale: Scale;

  private bar: Bar;

  private pointer: Pointer;

  private secondPointer: Pointer;

  private tip: Tip;

  private secondTip: Tip;

  constructor(node: JQuery, observer: ViewObserver) {
    this.createViewElements(node, this.makeObserverProxy(observer));
  }

  render(props: ViewProps) {
    if (props.isVertical) {
      this.$container.addClass('slider__container_vertical');
    } else {
      this.$container.removeClass('slider__container_vertical');
    }

    if (View.isEachPointerAtStart(props)) {
      this.updateElementsLayerLevel(true);
    } else if (View.isEachPointerAtEnd(props)) {
      this.updateElementsLayerLevel(false);
    }

    [
      this.scale,
      this.bar,
      this.pointer,
      this.secondPointer,
      this.tip,
      this.secondTip,
    ].forEach((element) => element.render(props));
  }

  private createViewElements(node: JQuery, observer: ViewObserver) {
    this.$container = $('<div>', { class: 'slider__container' });
    const $scaleContainer = $('<div>', { class: 'slider__scale-container' });
    const $barContainer = $('<div>', { class: 'slider__bar-container' });
    const $tipsContainer = $('<div>', { class: 'slider__tips-container' });
    node.append(this.$container);
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

  private makeObserverProxy(observer: ViewObserver): ViewObserver {
    const startMoveHandler = (isSecond: boolean) => {
      this.updateElementsLayerLevel(isSecond);
      observer.startMove(isSecond);
    };
    return ({ ...observer, startMove: startMoveHandler });
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

  private static isEachPointerAtStart(props: ViewProps) {
    return (props.isRange
      && props.pointerPosition === 0
      && props.secondPointerPosition === 0
    );
  }

  private static isEachPointerAtEnd(props: ViewProps) {
    return (props.isRange
      && props.pointerPosition === 100
      && props.secondPointerPosition === 100
    );
  }
}

export default View;
