import { ViewObserver, ViewProps } from '../main/viewInterface';
import './bar.css';

class Bar {
  private $bar: JQuery;

  private $progressBar: JQuery;

  private observer: ViewObserver;

  private isVertical: boolean;

  constructor(node: JQuery, observer: ViewObserver) {
    this.observer = observer;
    this.createDomElements(node);
    this.atachEvents();
  }

  render(props: ViewProps) {
    this.isVertical = props.isVertical;

    if (!Bar.shouldProgressBarBeDisplayed(props)) {
      this.$progressBar.hide();
      return;
    } this.$progressBar.show();

    const intervalLength = props.secondPointerPosition - props.pointerPosition;
    const intervalStartPosition = props.pointerPosition;

    if (props.isVertical) {
      this.$progressBar.css({ height: `${intervalLength}%`, width: '' });
      this.$progressBar.css({ top: `${intervalStartPosition}%`, left: '' });
    } else {
      this.$progressBar.css({ width: `${intervalLength}%`, height: '' });
      this.$progressBar.css({ left: `${intervalStartPosition}%`, top: '' });
    }
  }

  private createDomElements(node: JQuery) {
    this.$bar = $('<div>', { class: 'slider__bar' });
    this.$progressBar = $('<div>', { class: 'slider__progress-bar' });
    node.append(this.$bar);
    this.$bar.append(this.$progressBar);
  }

  private atachEvents() {
    this.$bar.on('click', this.handleBarClick.bind(this));
  }

  private handleBarClick(event: MouseEvent) {
    const pos = this.isVertical
      ? ((event.clientY - this.$bar[0].getBoundingClientRect().top)
        / this.$bar.height()) * 100
      : ((event.clientX - this.$bar[0].getBoundingClientRect().left)
        / this.$bar.width()) * 100;
    this.observer.click(pos);
  }

  private static shouldProgressBarBeDisplayed(props: ViewProps) {
    return (props.shouldDisplayProgressBar && props.isRange);
  }
}

export default Bar;
