import './input.scss';

export interface InputParams{
  node: HTMLElement;
  title: string;
  callback: (value: number) => void;
}

export interface InputUpdateParams{
  value?: number;
  step?: number;
  min?: number;
  blocked?: boolean;
}

export default class CustomInput {
  private input = document.createElement('div');

  private title = document.createElement('label');

  private textarea = document.createElement('input');

  private lastValidValue = 0;

  constructor(params: InputParams) {
    this.configureDomElements(params);
    this.attachEventHandlers(params);
  }

  public update(params: InputUpdateParams) {
    if (params.value !== undefined) {
      this.textarea.value = params.value.toString();
      this.lastValidValue = params.value;
    }
    if (params.step !== undefined) {
      this.textarea.setAttribute('step', params.step.toString());
    }
    if (params.min !== undefined) {
      this.textarea.setAttribute('min', params.min.toString());
    }
    if (params.blocked !== undefined) {
      this.textarea.disabled = params.blocked;
      if (params.blocked) {
        this.input.classList.add('input_blocked');
        this.textarea.value = '';
      } else {
        this.input.classList.remove('input_blocked');
      }
    }
  }

  private configureDomElements(params: InputParams) {
    this.input.classList.add('input');
    this.title.classList.add('input__title');
    this.textarea.classList.add('input__textarea');

    this.title.textContent = params.title;

    this.textarea.type = 'number';
    this.textarea.step = '1';
    this.textarea.value = '0';

    this.input.appendChild(this.title);
    this.input.appendChild(this.textarea);
    params.node.appendChild(this.input);
  }

  private attachEventHandlers(params: InputParams) {
    const handleTextareaChange = () => {
      const val = parseFloat(this.textarea.value);
      if (!Number.isNaN(val)) {
        this.lastValidValue = val;
        params.callback(val);
      } else {
        this.textarea.value = this.lastValidValue.toString();
        params.callback(this.lastValidValue);
      }
    };

    this.textarea.addEventListener('change', handleTextareaChange);
  }
}
