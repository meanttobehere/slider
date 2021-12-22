import './toggle.css';

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

  constructor(params: ToggleParams) {
    this.createDomElements(params.node);
    this.$title.text(params.title);
    this.$checkbox.on(
      'change',
      CustomToggle.makeCheckboxChangeHandler(params.callback),
    );
  }

  public update(value:boolean) {
    this.$checkbox.prop('checked', value);
  }

  private createDomElements(node: JQuery) {
    this.$toggle = $('<div>', { class: 'toggle' });
    this.$label = $('<label>', { class: 'toggle__label' });
    this.$checkbox = $('<input>', { type: 'checkbox', class: 'toggle__checkbox' });
    this.$title = $('<div>', { class: 'toggle__title' });
    this.$toggle.append(this.$label);
    this.$label.append(this.$checkbox);
    this.$toggle.append(this.$title);
    node.append(this.$toggle);
  }

  private static makeCheckboxChangeHandler(
    callback: (checked: boolean) => void,
  ) {
    const handleCheckboxChange = (event: JQuery.TriggeredEvent) => {
      callback(event.target.checked);
    };
    return handleCheckboxChange;
  }
}
