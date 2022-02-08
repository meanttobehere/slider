import { SliderParams } from '../../plugin/sliderTypes';
import setElementPositions from '../helpers/helpers';
import View from '../main/View';
import { ViewElement } from '../main/viewTypes';

class Bar implements ViewElement {
  private bar = document.createElement('div');

  private progressBar = document.createElement('div');

  private view: View;

  private isVertical = false;

  private isInversion = false;

  constructor(node: HTMLElement, view: View) {
    this.view = view;
    this.configureDomElements(node);
    this.attachEventHandlers();
  }

  render(params: SliderParams) {
    this.isVertical = params.isVertical;
    this.isInversion = params.isInversion;

    if (!params.shouldDisplayProgressBar) {
      this.progressBar.style.display = 'none';
      return;
    } this.progressBar.style.display = 'block';

    const pos1 = params.pointerPosPercentage;
    const pos2 = params.secondPointerPosPercentage;

    const [pos, length] = params.isRange
      ? [Math.min(pos1, pos2), Math.abs(pos1 - pos2)]
      : [0, pos1];

    if (params.isVertical && params.isInversion) {
      setElementPositions(this.progressBar, { top: 100 - pos - length });
    } else if (params.isVertical) {
      setElementPositions(this.progressBar, { top: pos });
    } else if (params.isInversion) {
      setElementPositions(this.progressBar, { left: 100 - pos - length });
    } else {
      setElementPositions(this.progressBar, { left: pos });
    }

    if (params.isVertical) {
      this.progressBar.style.height = `${length}%`;
      this.progressBar.style.width = '';
    } else {
      this.progressBar.style.height = '';
      this.progressBar.style.width = `${length}%`;
    }
  }

  private configureDomElements(node: HTMLElement) {
    this.bar.classList.add('slider__bar');
    this.progressBar.classList.add('slider__progress-bar');

    this.bar.appendChild(this.progressBar);
    node.appendChild(this.bar);
  }

  private attachEventHandlers() {
    this.bar.addEventListener('click', this.handleBarClick.bind(this));
  }

  private handleBarClick(event: MouseEvent) {
    const { left, top } = this.bar.getBoundingClientRect();
    const pos = this.isVertical
      ? ((event.clientY - top) / this.bar.offsetHeight) * 100
      : ((event.clientX - left) / this.bar.offsetWidth) * 100;
    const invertedPos = Math.abs(pos - 100 * Number(this.isInversion));

    this.view.notify({ eventType: 'click', posPercentage: invertedPos });
  }
}

export default Bar;
