import View from '../main/View';
import { ViewObserver, ViewProps } from '../main/viewInterface';
import './scale.css';

type LabelData = {
  pos: number,
  val: string,
  scalePos: number,
  start: number,
  end: number,
};

class Scale {
  private $scale: JQuery;

  private observer: ViewObserver;

  private context: CanvasRenderingContext2D;

  constructor(node: JQuery, observer: ViewObserver) {
    this.observer = observer;
    this.createDomElements(node);
  }

  render(props: ViewProps) {
    if (!props.shouldDisplayScale) {
      this.$scale.hide();
      return;
    } this.$scale.show();

    const labelsData = this.getLabelsData(props);
    this.updateNumOfLabels(labelsData.length);
    this.$labels.each(function update(idx) {
      const $label = $(this);
      const label = labelsData[idx];
      $label.data('pos', label.pos);
      $label.text(label.val);
      if (props.isVertical) {
        $label.css({ top: `${label.scalePos}%`, left: '' });
      } else {
        $label.css({ left: `${label.scalePos}%`, top: '' });
      }
    });
  }

  private createDomElements(node: JQuery) {
    this.$scale = $('<div>', { class: 'slider__scale' });
    node.append(this.$scale);
  }

  private handleLabelClick(event: JQuery.ClickEvent) {
    const pos = $(event.currentTarget).data('pos');
    this.observer.click(pos);
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

  private getLabelsData(props: ViewProps): Array<LabelData> {
    const { minValue, maxValue, step } = props;

    const getSparsity = (numLabels: number):number => (
      Math.floor((maxValue - minValue) / (step * numLabels)) + 1
    );

    const labels: Array<LabelData> = [];
    let numLabels = 20;
    let pos = minValue;
    while (pos < maxValue) {
      const newLabel = this.getLabelData(pos, props);
      if (this.isThereNotIntersection(labels, newLabel)) {
        labels.push(newLabel);
        pos += step * getSparsity(numLabels);
      } else {
        labels.length = 0;
        numLabels -= 1;
        pos = minValue;
      }
    }
    const rightLabel = this.getLabelData(maxValue, props);
    if (this.isThereNotIntersection(labels, rightLabel)) {
      labels.push(rightLabel);
    }
    return labels;
  }

  private getLabelData(position: number, props: ViewProps): LabelData {
    const positionInPercent = View.convertPosToPercent(position, props);
    const value = position > 10000000
      ? position.toExponential(5)
      : Number.parseFloat(
        position.toFixed(Math.min(View.getNumDecimals(position), 4)),
      ).toString();
    const size = this.getLabelSizeInPercent(value, props);
    const start = positionInPercent - size / 2;
    const end = positionInPercent + size / 2;

    const label: LabelData = {
      pos: positionInPercent,
      val: value,
      scalePos: positionInPercent,
      start,
      end,
    };

    const [minStart, maxEnd] = [-1, 101];

    if (start < minStart) {
      label.start = minStart;
      label.end = minStart + size;
      label.scalePos = minStart + (size / 2);
    } else if (end > maxEnd) {
      label.start = maxEnd - size;
      label.end = maxEnd;
      label.scalePos = maxEnd - (size / 2);
    }

    return label;
  }

  private isThereNotIntersection = (
    labels: Array<LabelData>,
    newLabel: LabelData,
  ): boolean => (
    labels.every((label) => (
      (label.start > newLabel.end || label.end < newLabel.start)
    ))
  );

  private getLabelSizeInPercent(text: string, props: ViewProps): number {
    if (!this.context) {
      const context = document.createElement('canvas').getContext('2d');
      if (context) {
        context.font = this.getLabelFont();
        this.context = context;
      }
    }
    if (this.context) {
      if (!props.isVertical) {
        const width = this.$scale[0].clientWidth;
        const metrics = this.context.measureText(text);
        return (metrics.width / width) * 100;
      }
      const height = this.$scale[0].clientHeight;
      return (18 / height) * 100;
    }
    return 100;
  }

  private getLabelFont(): string {
    const $label = this.createLabel();
    $label.appendTo(this.$scale);

    const fontWeight = $label.css('font-weight') || 'normal';
    const fontSize = $label.css('font-size') || '16px';
    const fontFamily = $label.css('font-family') || 'Times New Roman';

    $label.remove();
    return `${fontWeight} ${fontSize} ${fontFamily}`;
  }
}

export default Scale;
