export interface InputParams{
  node: JQuery;
  title: string;
  callback: (value: number) => void;
}

export interface InputUpdateParams{
  value?: number;
  step?: number;
  blocked?: boolean;
}

export default class CustomInput {
  private $input: JQuery;

  private $title: JQuery;

  private $textarea: JQuery;

  constructor(params: InputParams) {
    this.$input = $('<div>', { class: 'input' });
    this.$title = $('<div>', { class: 'input__title' });
    this.$textarea = $('<input>', { type: 'number', class: 'input__textarea' });

    params.node.append(this.$input);
    this.$input
      .append(this.$title)
      .append(this.$textarea);

    this.$textarea.val(0);
    this.$textarea.attr('step', 1);
    this.$title.text(params.title);
    this.$textarea.on('change', function textareaChangeEventHandler() {
      params.callback(parseInt($(this).val() as string, 10));
    });
  }

  public update = (params: InputUpdateParams) => {
    if (params.value !== undefined) { this.$textarea.val(params.value); }
    if (params.step !== undefined) { this.$textarea.attr('step', params.step); }
    if (params.blocked !== undefined) {
      this.$textarea.prop('disabled', params.blocked);
      params.blocked ? this.$input.addClass('input_blocked') : this.$input.removeClass('input_blocked');
    }
  };
}
