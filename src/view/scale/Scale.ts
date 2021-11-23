import {
  ScaleInterface,
  ScaleObserver,
  ScaleProps,
} from './scaleInterface';
import './scale.css';

class Scale implements ScaleInterface {
  private $scale: JQuery;

  private observer: ScaleObserver;

  constructor(node: JQuery) {
    this.createDomElements(node);
  }

  render(props: ScaleProps) {
    if (props.display === false) {
      this.$scale.hide();
      return;
    } this.$scale.show();

    this.updateNumOfLabels(props.labels.length);

    this.$labels.each(function update(idx) {
      const $label = $(this);
      const label = props.labels[idx];
      $label.data('pos', label.pos);
      $label.text(label.val);
      if (props.vertical) {
        $label.css({ top: `${label.pos}%`, left: '' });
      } else {
        $label.css({ left: `${label.pos}%`, top: '' });
      }
    });
  }

  setObserver(observer: ScaleObserver) {
    this.observer = observer;
  }

  private get $labels() {
    return this.$scale.children();
  }

  private createDomElements(node: JQuery) {
    this.$scale = $('<div>', { class: 'slider__scale' });
    node.append(this.$scale);
  }

  private updateNumOfLabels(num: number) {
    while (this.$labels.length !== num) {
      if (this.$labels.length < num) {
        const $label = $('<div>', { class: 'slider__scale-label' });
        $label.on('click', this.handleLableClick.bind(this));
        this.$scale.append($label);
      } else {
        this.$labels.last().remove();
      }
    }
  }

  private handleLableClick(event: JQuery.TriggeredEvent) {
    const pos = $(event.currentTarget).data('pos');
    this.observer?.click(pos);
  }
}

export default Scale;
