import './toggle.scss';

export interface ToggleParams{
  node: HTMLElement;
  title: string;
  callback: (checked: boolean) => void;
}

export default class CustomToggle {
  private checkbox = document.createElement('input');

  private toggle = document.createElement('div');

  private title = document.createElement('div');

  private label = document.createElement('label');

  constructor(params: ToggleParams) {
    this.configureDomElements(params);
    this.attachEventHandlers(params);
  }

  public update(value: boolean) {
    this.checkbox.checked = value;
  }

  private configureDomElements(params: ToggleParams) {
    this.toggle.classList.add('toggle');
    this.checkbox.classList.add('toggle__checkbox');
    this.label.classList.add('toggle__label');
    this.title.classList.add('toggle__title');

    this.checkbox.type = 'checkbox';
    this.title.textContent = params.title;

    this.toggle.appendChild(this.label);
    this.label.appendChild(this.checkbox);
    this.toggle.appendChild(this.title);
    params.node.appendChild(this.toggle);
  }

  private attachEventHandlers(params: ToggleParams) {
    const handleCheckboxChange = () => {
      params.callback(this.checkbox.checked);
    };

    this.checkbox.addEventListener('change', handleCheckboxChange);
  }
}
