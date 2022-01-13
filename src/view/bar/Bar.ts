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

    const pos1 = props.pointerPosPercentage;
    const pos2 = props.secondPointerPosPercentage;

    const [start, length] = props.isRange
      ? [Math.min(pos1, pos2), Math.abs(pos1 - pos2)]
      : [0, pos1];

    if (props.isVertical) {
      this.$progressBar.css({ height: `${length}%`, width: '' });
      this.$progressBar.css({ top: `${start}%`, left: '' });
    } else {
      this.$progressBar.css({ width: `${length}%`, height: '' });
      this.$progressBar.css({ left: `${start}%`, top: '' });
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
