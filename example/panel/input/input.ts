import './input.css';

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
  private input: HTMLElement;

  private title: HTMLElement;

  private textarea: HTMLInputElement;

  private lastValidValue: number;

  constructor(params: InputParams) {
    this.createDomElements(params.node);
    this.title.textContent = params.title;
    this.textarea.addEventListener(
      'change',
      this.makeTextareaChangeHandler(params.callback),
    );
  }

  public update = (params: InputUpdateParams) => {
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
  };

  private createDomElements(node: HTMLElement) {
    this.input = document.createElement('div');
    this.input.classList.add('input');

    this.textarea = document.createElement('input');
    this.textarea.setAttribute('type', 'number');
    this.textarea.setAttribute('step', '1');
    this.textarea.value = '0';
    this.textarea.classList.add('input__textarea');

    this.title = document.createElement('div');
    this.title.classList.add('input__title');

    this.input.appendChild(this.textarea);
    this.input.appendChild(this.title);
    node.appendChild(this.input);
  }

  private makeTextareaChangeHandler(callback: (value: number) => void) {
    const handleTextareaChange = () => {
      const val = parseFloat(this.textarea.value);
      if (!Number.isNaN(val)) {
        this.lastValidValue = val;
        callback(val);
      } else {
        this.textarea.value = this.lastValidValue.toString();
        callback(this.lastValidValue);
      }
    };
    return handleTextareaChange;
  }
}
