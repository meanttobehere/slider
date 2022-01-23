import './toggle.css';

export interface ToggleParams{
  node: HTMLElement;
  title: string;
  callback: (checked: boolean) => void;
}

export default class CustomToggle {
  private checkbox: HTMLInputElement;

  private toggle: HTMLElement;

  private title: HTMLElement;

  private label: HTMLElement;

  constructor(params: ToggleParams) {
    this.createDomElements(params.node);
    this.title.textContent = params.title;
    this.checkbox.addEventListener(
      'change',
      this.makeCheckboxChangeHandler(params.callback),
    );
  }

  public update(value: boolean) {
    this.checkbox.checked = value;
  }

  private createDomElements(node: HTMLElement) {
    this.toggle = document.createElement('div');
    this.toggle.classList.add('toggle');

    this.label = document.createElement('label');
    this.label.classList.add('toggle__label');

    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.classList.add('toggle__checkbox');

    this.title = document.createElement('div');
    this.title.classList.add('toggle__title');

    this.toggle.appendChild(this.label);
    this.label.appendChild(this.checkbox);
    this.toggle.appendChild(this.title);
    node.appendChild(this.toggle);
  }

  private makeCheckboxChangeHandler(callback: (checked: boolean) => void) {
    const handleCheckboxChange = () => {
      const value = this.checkbox.checked;
      callback(value);
    };
    return handleCheckboxChange;
  }
}
