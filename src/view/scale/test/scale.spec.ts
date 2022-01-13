import { ViewObserver, ViewProps } from '../../main/viewInterface';
import Scale from '../Scale';

describe('Scale', () => {
  let scale: Scale;
  let $scale: JQuery;
  let $parent: JQuery;
  const observer = jasmine.createSpyObj<ViewObserver>('spy', ['click']);
  const props: ViewProps = {
    minValue: 0,
    maxValue: 100,
    step: 10,
    isVertical: false,
    isRange: true,
    shouldDisplayTips: true,
    shouldDisplayProgressBar: true,
    shouldDisplayScale: true,
    pointerPosition: 10,
    secondPointerPosition: 70,
    pointerPosPercentage: 10,
    secondPointerPosPercentage: 70,
    tipValue: '10',
    secondTipValue: '70',
    scaleLabels: [
      { val: '10', posPercentage: 10 },
      { val: '55', posPercentage: 55 },
    ],
  };

  beforeAll(() => {
    $parent = $('<div>', { class: 'slider__scale-container', width: '1000px' });
    scale = new Scale($parent, observer);
    $scale = $parent.children().first();
    $(document.body).append($parent);
  });

  it("Constructor should create element $scale with class 'slider__scale' on parent node", () => {
    expect($scale).toHaveClass('slider__scale');
  });

  it("Method render should create elements $label with class 'slider__scale-label' on $scale element", () => {
    scale.render(props);
    expect($scale.children()).toHaveClass('slider__scale-label');
  });

  it('Method render should update the number of $label elements', () => {
    scale.render(props);
    expect($scale.children().length).toEqual(2);
  });

  it('Method render should update scale state correctly', () => {
    scale.render(props);
    expect($scale.css('display')).toEqual('block');
    const props2 = {
      ...props,
      shouldDisplayScale: false,
    };
    scale.render(props2);
    expect($scale.css('display')).toEqual('none');
  });

  it('When clicking on label, scale should notify view observer', () => {
    scale.render(props);
    $scale.children().each(function check() {
      $(this).trigger('click');
      expect(observer.click)
        .toHaveBeenCalled();
      observer.click.calls.reset();
    });
  });
});
