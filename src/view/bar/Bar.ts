import { ViewObserver, ViewProps } from '../main/viewInterface';
import './bar.css';

class Bar {
  private $bar: JQuery;

  private $progressBar: JQuery;

  private observer: ViewObserver;

  private isVertical: boolean;

  constructor($node: JQuery, observer: ViewObserver) {
    this.observer = observer;
    this.createDomElements($node);
    this.attachEvents();
  }

  render(props: ViewProps) {
    this.isVertical = props.isVertical;

    if (!props.shouldDisplayProgressBar) {
      this.$progressBar.hide();
      return;
    } this.$progressBar.show();

    const [startPosition, length] = props.isRange
      ? [
        Math.min(
          props.pointerPositionInPercent,
          props.secondPointerPositionInPercent,
        ),
        Math.abs(
          props.pointerPositionInPercent - props.secondPointerPositionInPercent,
        ),
      ]
      : [0, props.pointerPositionInPercent];

    if (props.isVertical) {
      this.$progressBar.css({ height: `${length}%`, width: '' });
      this.$progressBar.css({ top: `${startPosition}%`, left: '' });
    } else {
      this.$progressBar.css({ width: `${length}%`, height: '' });
      this.$progressBar.css({ left: `${startPosition}%`, top: '' });
    }
  }

  private createDomElements($node: JQuery) {
    this.$bar = $('<div>', { class: 'slider__bar' });
    this.$progressBar = $('<div>', { class: 'slider__progress-bar' });
    $node.append(this.$bar);
    this.$bar.append(this.$progressBar);
  }

  private attachEvents() {
    this.$bar.on('click', this.handleBarClick.bind(this));
  }

  private handleBarClick(event: JQuery.ClickEvent) {
    const bar = this.$bar[0];
    const positionInPercent = this.isVertical
      ? ((event.clientY - bar.getBoundingClientRect().top)
        / bar.offsetHeight) * 100
      : ((event.clientX - bar.getBoundingClientRect().left)
        / bar.offsetWidth) * 100;
    this.observer.click(positionInPercent);
  }
}

export default Bar;
