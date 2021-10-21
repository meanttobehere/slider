import './bar.css';
import { BarInterface, BarProps } from './barInterface';

export default class Bar implements BarInterface {
  private $bar: JQuery;

  private $progressSegment: JQuery;

  constructor(node: JQuery) {
    this.$bar = $('<div>', { class: 'slider__bar' });
    this.$progressSegment = $('<div>', { class: 'slider__progressSegment' });

    node.append(this.$bar);
    this.$bar.append(this.$progressSegment);
  }

  render(props: BarProps) {
    if (props.progressbar === false) {
      this.$progressSegment.hide();
      return;
    } this.$progressSegment.show();

    if (props.vertical) {
      this.$progressSegment.css({ height: `${props.intervalLength}%`, width: '' });
      this.$progressSegment.css({ top: `${props.intervalStartPos}%`, left: '' });
    } else {
      this.$progressSegment.css({ width: `${props.intervalLength}%`, height: '' });
      this.$progressSegment.css({ left: `${props.intervalStartPos}%`, top: '' });
    }
  }
}
