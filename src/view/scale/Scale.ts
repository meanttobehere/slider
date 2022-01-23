import { ViewObserver, ViewProps } from '../main/viewTypes';

type LabelData = {
  posPercentage: number,
  val: string,
  scalePos: number,
  start: number,
  end: number,
};

class Scale {
  private scale: HTMLElement;

  private labels: HTMLElement[];

  private observer: ViewObserver;

  private context: CanvasRenderingContext2D;

  constructor(node: HTMLElement, observer: ViewObserver) {
    this.observer = observer;
    this.createDomElements(node);
  }

  public render(props: ViewProps) {
    if (!props.shouldDisplayScale) {
      this.scale.style.display = 'none';
      return;
    } this.scale.style.display = 'block';

    const labelsData = this.getLabelsData(props);
    this.updateNumOfLabels(labelsData.length);

    labelsData.forEach((data, idx) => {
      const label = this.labels[idx];
      label.setAttribute('data-pos', data.posPercentage.toString());
      if (label) {
        label.textContent = data.val;
        if (props.isVertical) {
          label.style.top = `${data.scalePos}%`;
          label.style.left = '';
        } else {
          label.style.top = '';
          label.style.left = `${data.scalePos}%`;
        }
      }
    });
  }

  private createDomElements(node: HTMLElement) {
    this.scale = document.createElement('div');
    this.scale.classList.add('slider__scale');
    this.labels = [];
    node.appendChild(this.scale);
  }

  private updateNumOfLabels(num: number) {
    while (this.labels.length !== num) {
      if (this.labels.length < num) {
        const label = this.createLabel();
        this.scale.appendChild(label);
        this.labels.push(label);
      } else {
        const label = this.labels.pop();
        label?.remove();
      }
    }
  }

  private createLabel(): HTMLElement {
    const label = document.createElement('div');
    label.classList.add('slider__scale-label');
    label.addEventListener('click', () => {
      const pos = Number.parseFloat(label.getAttribute('data-pos') || '0');
      this.observer.click(pos);
    });
    return label;
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
        const width = this.scale.clientWidth;
        const metrics = this.context.measureText(text);
        return (metrics.width / width) * 100;
      }
      const height = this.scale.clientHeight;
      return (18 / height) * 100;
    }
    return 100;
  }

  private getLabelFont(): string {
    const label = this.createLabel();
    this.scale.appendChild(label);

    const fontWeight = label.style.fontWeight || 'normal';
    const fontSize = label.style.fontSize || '16px';
    const fontFamily = label.style.fontFamily || 'Times New Roman';

    label.remove();
    return `${fontWeight} ${fontSize} ${fontFamily}`;
  }
}

export default Scale;
