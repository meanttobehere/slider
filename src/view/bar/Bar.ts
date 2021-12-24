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
        props.pointerPosition,
        props.secondPointerPosition - props.pointerPosition,
      ]
      : [0, props.pointerPosition];

    if (props.isVertical) {
      this.$progressBar.css({ height: `${length}%`, width: '' });
      this.$progressBar.css({ top: `${startPosition}%`, left: '' });
    } else {
      this.$progressBar.css({ width: `${length}%`, height: '' });
      this.$progressBar.css({ left: `${startPosition}%`, top: '' });
    }
  }

  private createDomElements(node: JQuery) {
    this.$bar = $('<div>', { class: 'slider__bar' });
    this.$progressBar = $('<div>', { class: 'slider__progress-bar' });
    node.append(this.$bar);
    this.$bar.append(this.$progressBar);
  }

  private attachEvents() {
    this.$bar.on('click', this.handleBarClick.bind(this));
  }

  private handleBarClick(event: JQuery.TriggeredEvent) {
    const pos = this.isVertical
      ? ((<number>event.clientY - this.$bar[0].getBoundingClientRect().top)
        / <number> this.$bar.height()) * 100
      : ((<number>event.clientX - this.$bar[0].getBoundingClientRect().left)
        / <number> this.$bar.width()) * 100;
    this.observer.click(pos);
  }
}

export default Bar;
