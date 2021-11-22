import {
  BarInterface,
  BarObserver,
  BarProps,
} from './barInterface';
import './bar.css';

class Bar implements BarInterface {
  private $bar: JQuery;

  private $progressSegment: JQuery;

  private observer: BarObserver;

  private isVertical: boolean;

  constructor(node: JQuery) {
    this.createDomElements(node);
    this.atachEvents();
  }

  render(props: BarProps) {
    if (props.progressbar === false) {
      this.$progressSegment.hide();
      return;
    } this.$progressSegment.show();

    this.isVertical = props.vertical;
    if (props.vertical) {
      this.$progressSegment.css({ height: `${props.intervalLength}%`, width: '' });
      this.$progressSegment.css({ top: `${props.intervalStartPos}%`, left: '' });
    } else {
      this.$progressSegment.css({ width: `${props.intervalLength}%`, height: '' });
      this.$progressSegment.css({ left: `${props.intervalStartPos}%`, top: '' });
    }
  }

  setObserver(observer: BarObserver) {
    this.observer = observer;
  }

  private createDomElements(node: JQuery) {
    this.$bar = $('<div>', { class: 'slider__bar' });
    this.$progressSegment = $('<div>', { class: 'slider__progress-segment' });
    node.append(this.$bar);
    this.$bar.append(this.$progressSegment);
  }

  private atachEvents() {
    this.$bar.on('click', this.handleBarClick.bind(this));
  }

  private handleBarClick(event: MouseEvent) {
    let pos;
    if (this.isVertical) {
      pos = ((event.clientY - this.$bar[0].getBoundingClientRect().top)
        / this.$bar.height()) * 100;
    } else {
      pos = ((event.clientX - this.$bar[0].getBoundingClientRect().left)
        / this.$bar.width()) * 100;
    }
    this.observer?.click(pos);
  }
}

export default Bar;
