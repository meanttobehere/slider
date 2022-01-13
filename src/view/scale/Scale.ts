import { ViewObserver, ViewProps } from '../main/viewInterface';
import './scale.css';

type LabelData = {
  posPercentage: number,
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

  public render(props: ViewProps) {
    if (!props.shouldDisplayScale) {
      this.$scale.hide();
      return;
    } this.$scale.show();

    const labelsData = this.getLabelsData(props);
    this.updateNumOfLabels(labelsData.length);
    this.$labels.each(function update(idx) {
      const $label = $(this);
      const label = labelsData[idx];
      $label.data('pos', label.posPercentage);
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

  private getLabelsData(props: ViewProps): LabelData[] {
    let step = 1;
    let pos = 0;
    const labels: LabelData[] = [];

    while (pos < props.scaleLabels.length) {
      const label = this.getLabelData(props, pos);
      if (!this.isIntersection(labels, label)) {
        labels.push(label);
        pos += step;
      } else {
        labels.length = 0;
        pos = 0;
        step += 1;
      }
    }

    return labels;
  }

  private getLabelData(props: ViewProps, idx: number): LabelData {
    const label = props.scaleLabels[idx];

    const size = this.getLabelSizeInPercent(label.val, props);
    const start = label.posPercentage - size / 2;
    const end = label.posPercentage + size / 2;

    const labelData: LabelData = {
      posPercentage: label.posPercentage,
      val: label.val,
      scalePos: label.posPercentage,
      start,
      end,
    };

    const [minStart, maxEnd] = [-1, 101];

    if (start < minStart) {
      labelData.start = minStart;
      labelData.end = minStart + size;
      labelData.scalePos = minStart + (size / 2);
    } else if (end > maxEnd) {
      labelData.start = maxEnd - size;
      labelData.end = maxEnd;
      labelData.scalePos = maxEnd - (size / 2);
    }

    return labelData;
  }

  private isIntersection(
    labels: Array<LabelData>,
    newLabel: LabelData,
  ): boolean {
    if (labels.length === 0) {
      return false;
    }
    const safetyFactor = 2.5;
    const isIntersection = labels.some((label) => (
      (newLabel.start < (label.end + safetyFactor))
    ));
    return isIntersection;
  }

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
