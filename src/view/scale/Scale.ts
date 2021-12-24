import { ViewObserver, ViewProps } from '../main/viewInterface';
import './scale.css';

class Scale {
  private $scale: JQuery;

  private observer: ViewObserver;

  constructor(node: JQuery, observer: ViewObserver) {
    this.observer = observer;
    this.createDomElements(node);
  }

  render(props: ViewProps) {
    if (!props.shouldDisplayScale) {
      this.$scale.hide();
      return;
    } this.$scale.show();

    this.updateNumOfLabels(props.scaleLabels.length);

    this.$labels.each(function update(idx) {
      const $label = $(this);
      const label = props.scaleLabels[idx];
      $label.data('pos', label.pos);
      $label.text(label.val);
      if (props.isVertical) {
        $label.css({ top: `${label.pos}%`, left: '' });
      } else {
        $label.css({ left: `${label.pos}%`, top: '' });
      }
    });
  }

  private createDomElements(node: JQuery) {
    this.$scale = $('<div>', { class: 'slider__scale' });
    node.append(this.$scale);
  }

  private handleLabelClick(event: JQuery.TriggeredEvent) {
    const pos = $(event.currentTarget).data('pos');
    this.observer?.click(pos);
  }

  private updateNumOfLabels(num: number) {
    while (this.$labels.length !== num) {
      if (this.$labels.length < num) {
        this.$scale.append(this.createLabel());
      } else {
        this.$labels.last().remove();
      }
    }
  }

  private createLabel(): JQuery {
    const $label = $('<div>', { class: 'slider__scale-label' });
    $label.on('click', this.handleLabelClick.bind(this));
    return $label;
  }

  private get $labels() {
    return this.$scale.children();
  }
}

export default Scale;
