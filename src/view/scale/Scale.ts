import { ViewObserver, ViewProps } from '../main/viewTypes';

class Scale {
  private scale = document.createElement('div');

  private labels: HTMLElement[] = [];

  private observer: ViewObserver;

  constructor(node: HTMLElement, observer: ViewObserver) {
    this.observer = observer;
    this.configureDomElements(node);
  }

  public render(props: ViewProps) {
    if (!props.shouldDisplayScale) {
      this.scale.style.display = 'none';
      return;
    } this.scale.style.display = 'block';

    this.updateLabels(props);
  }

  private configureDomElements(node: HTMLElement) {
    this.scale.classList.add('slider__scale');
    node.appendChild(this.scale);
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

  private updateLabels(props: ViewProps) {
    this.updateNumOfLabels(props.scaleLabels.length);
    props.scaleLabels.forEach((data, idx) => {
      const label = this.labels[idx];
      label.setAttribute('data-pos', data.posPercentage.toString());
      if (label) {
        label.textContent = data.val;
        if (props.isVertical) {
          label.style.top = `${data.posPercentage}%`;
          label.style.left = '';
        } else {
          label.style.top = '';
          label.style.left = `${data.posPercentage}%`;
        }
      }
    });
    this.updateLabelsVisibility(props);
  }

  private updateLabelsVisibility(props: ViewProps) {
    let last = 0;
    let step = 1;
    let visibleLabels = new Set();
    visibleLabels.add(0);

    while (last + step < this.labels.length) {
      if (this.isIntersection(last, last + step, props)) {
        step += 1;
        last = 0;
        visibleLabels = new Set();
      } else {
        last += step;
      }
      visibleLabels.add(last);
    }

    this.labels.forEach((item, idx) => {
      const label = item;
      const isVisible = visibleLabels.has(idx);
      label.style.visibility = isVisible ? 'visible' : 'hidden';
    });
  }

  private isIntersection(
    index1: number,
    index2: number,
    props: ViewProps,
  ): boolean {
    const label1 = this.labels[index1];
    const label2 = this.labels[index2];
    const size1 = this.getLabelSizeInPercent(label1, props);
    const size2 = this.getLabelSizeInPercent(label2, props);
    const pos1 = props.scaleLabels[index1].posPercentage;
    const pos2 = props.scaleLabels[index2].posPercentage;

    const safetyFactor = props.isVertical
      ? (30 / this.scale.clientHeight) * 100
      : (30 / this.scale.clientWidth) * 100;
    const isIntersection = pos1 + size1 / 2 + safetyFactor > pos2 - size2 / 2;

    return isIntersection;
  }

  private getLabelSizeInPercent(label: HTMLElement, props: ViewProps): number {
    return props.isVertical
      ? (label.clientHeight / this.scale.clientHeight) * 100
      : (label.clientWidth / this.scale.clientWidth) * 100;
  }
}

export default Scale;
