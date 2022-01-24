import { ViewObserver, ViewProps } from '../main/viewTypes';

class Bar {
  private bar = document.createElement('div');

  private progressBar = document.createElement('div');

  private observer: ViewObserver;

  private isVertical = false;

  constructor(node: HTMLElement, observer: ViewObserver) {
    this.observer = observer;
    this.configureDomElements(node);
    this.attachEventHandlers();
  }

  render(props: ViewProps) {
    this.isVertical = props.isVertical;

    if (!props.shouldDisplayProgressBar) {
      this.progressBar.style.display = 'none';
      return;
    } this.progressBar.style.display = 'block';

    const pos1 = props.pointerPosPercentage;
    const pos2 = props.secondPointerPosPercentage;

    const [start, length] = props.isRange
      ? [Math.min(pos1, pos2), Math.abs(pos1 - pos2)]
      : [0, pos1];

    if (props.isVertical) {
      this.progressBar.style.height = `${length}%`;
      this.progressBar.style.top = `${start}%`;
      this.progressBar.style.width = '';
      this.progressBar.style.left = '';
    } else {
      this.progressBar.style.height = '';
      this.progressBar.style.top = '';
      this.progressBar.style.width = `${length}%`;
      this.progressBar.style.left = `${start}%`;
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
    const positionInPercent = this.isVertical
      ? ((event.clientY - this.bar.getBoundingClientRect().top)
        / this.bar.offsetHeight) * 100
      : ((event.clientX - this.bar.getBoundingClientRect().left)
        / this.bar.offsetWidth) * 100;
    this.observer.click(positionInPercent);
  }
}

export default Bar;
