import './input.css';

export interface InputParams{
  node: JQuery;
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
  private $input: JQuery;

  private $title: JQuery;

  private $textarea: JQuery;

  constructor(params: InputParams) {
    this.createDomElements(params.node);
    this.$title.text(params.title);
    this.$textarea.val(0);
    this.$textarea.attr('step', 1);
    this.$textarea.on(
      'change',
      CustomInput.makeTextareaChangeHandler(params.callback),
    );
  }

  public update = (params: InputUpdateParams) => {
    if (params.value !== undefined) { this.$textarea.val(params.value); }
    if (params.step !== undefined) { this.$textarea.attr('step', params.step); }
    if (params.min !== undefined) { this.$textarea.attr('min', params.min); }
    if (params.blocked !== undefined) {
      this.$textarea.prop('disabled', params.blocked);
      if (params.blocked) { this.$input.addClass('input_blocked'); }
      else { this.$input.removeClass('input_blocked'); }
    }
  };

  private createDomElements(node: JQuery) {
    this.$input = $('<div>', { class: 'input' });
    this.$title = $('<div>', { class: 'input__title' });
    this.$textarea = $('<input>', { type: 'number', class: 'input__textarea' });
    this.$input
      .append(this.$title)
      .append(this.$textarea);
    node.append(this.$input);
  }

  private static makeTextareaChangeHandler(callback: (value: number) => void) {
    const handler = function handleTextareaChange(event: JQuery.TriggeredEvent) {
      callback(parseInt($(event.target).val() as string, 10));
    };
    return handler;
  }
}
