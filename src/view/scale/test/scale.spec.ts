import { ViewObserver, ViewProps } from '../../main/viewInterface';
import Scale from '../Scale';

describe('Scale', () => {
  let scale: Scale;
  let $scale: JQuery;
  let $parent: JQuery;
  const observer = jasmine.createSpyObj<ViewObserver>('spy', ['click']);
  const props: ViewProps = {
    isVertical: false,
    isRange: true,
    shouldDisplayTips: false,
    shouldDisplayProgressBar: true,
    shouldDisplayScale: true,
    scaleLabels: [
      { val: 'val1', pos: 12 },
      { val: 'val2', pos: 22 },
      { val: 'val3', pos: 32 },
      { val: 'val4', pos: 42 },
    ],
    pointerPosition: 11,
    secondPointerPosition: 67,
    tipValue: '',
    secondTipValue: '',
  };

  beforeAll(() => {
    $parent = $('<div>', { class: 'slider__scale-container' });
    scale = new Scale($parent, observer);
    $scale = $parent.children().first();
  });

  it("constructor should create element $scale with class 'slider__scale' on parent node", () => {
    expect($scale).toHaveClass('slider__scale');
  });

  it("method 'render' should create elements $label with class 'slider__scale-label' on $scale element", () => {
    scale.render(props);
    expect($scale.children()).toHaveClass('slider__scale-label');
  });

  it("method 'render' should update the number of $label elements", () => {
    scale.render(props);
    expect($scale.children().length).toEqual(props.scaleLabels.length);

    const props1: ViewProps = {
      ...props,
      scaleLabels: [],
    };
    scale.render(props1);
    expect($scale.children().length).toEqual(props1.scaleLabels.length);

    const props2: ViewProps = {
      ...props,
      scaleLabels: [
        { val: 'val1', pos: 10 },
        { val: 'val2', pos: 90 },
      ],
    };
    scale.render(props2);
    expect($scale.children().length).toEqual(props2.scaleLabels.length);
  });

  it("method 'render' should update scale state correctly", () => {
    scale.render(props);
    expect($scale.css('display')).toEqual('');
    $scale.children().each(function check(idx) {
      const $label = $(this);
      expect($label.text()).toEqual(props.scaleLabels[idx].val);
      expect($label.css('top')).toEqual('');
      expect($label.css('left')).toEqual(`${props.scaleLabels[idx].pos}%`);
    });

    const props1 = {
      ...props,
      isVertical: true,
    };
    scale.render(props1);
    expect($scale.css('display')).toEqual('');
    $scale.children().each(function check(idx) {
      const $label = $(this);
      expect($label.text()).toEqual(props1.scaleLabels[idx].val);
      expect($label.css('top')).toEqual(`${props1.scaleLabels[idx].pos}%`);
      expect($label.css('left')).toEqual('');
    });

    const props2 = {
      ...props,
      shouldDisplayScale: false,
    };
    scale.render(props2);
    expect($scale.css('display')).toEqual('none');
  });

  it('when clicking on label scale should notify view observer', () => {
    scale.render(props);
    $scale.children().each(function check(idx) {
      $(this).trigger('click');
      expect(observer.click)
        .toHaveBeenCalledOnceWith(props.scaleLabels[idx].pos);
      observer.click.calls.reset();
    });
  });
});
