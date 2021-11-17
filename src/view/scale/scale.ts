import './scale.css';
import { ScaleInterface, ScaleObserver, ScaleProps } from './scaleInterface';

export default class Scale implements ScaleInterface {
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

    props.labels.forEach((label, idx) => {
      const $label = $(this.$scale.children()[idx]);

      $label.off('click');
      $label.on('click', () => {
        this.observer?.click(label.pos);
      });

      $label.text(label.val);
      if (props.vertical) { $label.css({ top: `${label.pos}%`, left: '' }); }
      else { $label.css({ left: `${label.pos}%`, top: '' }); }
    });
  }

  setObserver(observer: ScaleObserver) {
    this.observer = observer;
  }

  private createDomElements(node: JQuery){
    this.$scale = $('<div>', { class: 'slider__scale' });
    node.append(this.$scale);
  }

  private updateNumOfLabels(num: number){
    while (this.$scale.children().length !== num) {
      if (this.$scale.children().length < num) {
        const $label = $('<div>', { class: 'slider__scale-label' });
        this.$scale.append($label);
      } else {
        this.$scale.children().last().remove();
      }
    }
  }
}
