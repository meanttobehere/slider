import Scale from '../Scale';
import { ScaleObserver, ScaleProps } from '../scaleInterface';

describe('Scale', () => {
  let scale: Scale;
  let $scale: JQuery;
  const $parent: JQuery = $('<div>', { class: 'slider__scale-container' });
  const props: ScaleProps = {
    display: true,
    vertical: false,
    labels: [
      { val: 'val1', pos: 12 },
      { val: 'val2', pos: 34 },
      { val: 'val3', pos: 35 },
    ],
  };

  beforeAll(() => {
    scale = new Scale($parent);
    $scale = $parent.children().first();
  });

  it("constructor should create element $scale with class 'slider__scale' on parent node", () => {
    expect($scale).toHaveClass('slider__scale');
  });

  it("method 'render' should create elements $label with class 'slider__scale-label' on $scale element", () => {
    scale.render(props);
    expect($scale.children()).toHaveClass('slider__scale-label');
  });

  it("method 'render' should update the number of $labels elements", () => {
    scale.render(props);
    expect($scale.children().length).toEqual(props.labels.length);

    let newProps = { ...props, ...{ labels: [] } };
    scale.render(newProps);
    expect($scale.children().length).toEqual(newProps.labels.length);

    newProps = {
      ...props,
      ...{
        labels: [
          { val: 'val1', pos: 12 }, { val: 'val2', pos: 12 },
          { val: 'val3', pos: 12 }, { val: 'val4', pos: 12 },
        ],
      },
    };
    scale.render(newProps);
    expect($scale.children().length).toEqual(newProps.labels.length);
  });

  it("method 'render' should update scale state correctly", () => {
    scale.render(props);
    expect($scale.css('display')).toEqual('');
    $scale.children().each(function check(idx) {
      const $label = $(this);
      expect($label.text()).toEqual(props.labels[idx].val);
      expect($label.css('top')).toEqual('');
      expect($label.css('left')).toEqual(`${props.labels[idx].pos}%`);
    });

    let newProps = { ...props, ...{ vertical: true } };
    scale.render(newProps);
    expect($scale.css('display')).toEqual('');
    $scale.children().each(function check(idx) {
      const $label = $(this);
      expect($label.text()).toEqual(newProps.labels[idx].val);
      expect($label.css('top')).toEqual(`${newProps.labels[idx].pos}%`);
      expect($label.css('left')).toEqual('');
    });

    newProps = { ...props, ...{ display: false } };
    scale.render(newProps);
    expect($scale.css('display')).toEqual('none');
  });

  it('when clicking on label scale should notify observer', () => {
    const observer = jasmine.createSpyObj<ScaleObserver>('spy', ['click']);
    scale.setObserver(observer);
    scale.render(props);
    $scale.children().each(function check(idx) {
      $(this).trigger('click');
      expect(observer.click).toHaveBeenCalledOnceWith(props.labels[idx].pos);
      observer.click.calls.reset();
    });
  });
});
