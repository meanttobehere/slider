import { SliderParams } from '../../plugin/sliderTypes';
import setElementPositions from '../helpers/helpers';
import { ViewElement } from '../main/viewTypes';
import View from '../main/View';

class Scale implements ViewElement {
  private scale = document.createElement('div');

  private labels: HTMLElement[] = [];

  private view: View;

  constructor(node: HTMLElement, view: View) {
    this.view = view;
    this.configureDomElements(node);
  }

  public render(params: SliderParams) {
    if (!params.shouldDisplayScale) {
      this.scale.style.display = 'none';
      return;
    } this.scale.style.display = 'block';

    this.updateLabels(params);
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
      this.view.notify({ eventType: 'click', posPercentage: pos });
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

  private updateLabels(params: SliderParams) {
    this.updateNumOfLabels(params.scaleLabels.length);
    params.scaleLabels.forEach((data, idx) => {
      const label = this.labels[idx];
      label.setAttribute('data-pos', data.posPercentage.toString());
      if (label) {
        label.textContent = data.val;
        if (params.isVertical && params.isInversion) {
          setElementPositions(label, { top: 100 - data.posPercentage });
        } else if (params.isVertical) {
          setElementPositions(label, { top: data.posPercentage });
        } else if (params.isInversion) {
          setElementPositions(label, { left: 100 - data.posPercentage });
        } else {
          setElementPositions(label, { left: data.posPercentage });
        }
      }
    });
    this.updateLabelsVisibility(params);
  }

  private updateLabelsVisibility(params: SliderParams) {
    let last = 0;
    let step = 1;
    let visibleLabels = new Set();
    visibleLabels.add(0);

    while (last + step < this.labels.length) {
      if (this.isIntersection(last, last + step, params)) {
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
    params: SliderParams,
  ): boolean {
    const label1 = this.labels[index1];
    const label2 = this.labels[index2];
    const size1 = this.getLabelSizeInPercent(label1, params);
    const size2 = this.getLabelSizeInPercent(label2, params);
    const pos1 = params.scaleLabels[index1].posPercentage;
    const pos2 = params.scaleLabels[index2].posPercentage;

    const safetyFactor = params.isVertical
      ? (30 / this.scale.clientHeight) * 100
      : (30 / this.scale.clientWidth) * 100;
    const isIntersection = pos1 + size1 / 2 + safetyFactor > pos2 - size2 / 2;

    return isIntersection;
  }

  private getLabelSizeInPercent(
    label: HTMLElement,
    params: SliderParams,
  ): number {
    return params.isVertical
      ? (label.clientHeight / this.scale.clientHeight) * 100
      : (label.clientWidth / this.scale.clientWidth) * 100;
  }
}

export default Scale;
