export interface ToggleParams{
  node: JQuery;
  title: string;
  callback: (checked: boolean) => void;
}

export default class CustomToggle {
  private $checkbox: JQuery;

  private $toggle: JQuery;

  private $title: JQuery;

  private $label: JQuery;

  private $slider: JQuery;

  private $border: JQuery;

  constructor(params: ToggleParams) {
    this.$toggle = $('<div>', { class: 'toggle' });
    this.$title = $('<div>', { class: 'toggle__title' });
    this.$label = $('<label>', { class: 'toggle__label' });
    this.$checkbox = $('<input>', { type: 'checkbox', class: 'toggle__input' });
    this.$slider = $('<div>', { class: 'toggle__slider' });
    this.$border = $('<div>', { class: 'toggle__border' });

    params.node.append(this.$toggle);
    this.$toggle.append(this.$label);
    this.$label
      .append(this.$checkbox)
      .append(this.$slider)
      .append(this.$border);
    this.$toggle.append(this.$title);

    this.$title.text(params.title);
    this.$checkbox.on('change', function checkboxChangeEventHandler() {
      params.callback((this as HTMLInputElement).checked);
    });
  }

  public update(value:boolean) {
    this.$checkbox.prop('checked', value);
  }
}
