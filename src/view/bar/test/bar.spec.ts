import { ViewObserver, ViewProps } from '../../main/viewInterface';
import Bar from '../Bar';

describe('Bar', () => {
  let bar: Bar;
  let $bar: JQuery;
  let $progressBar: JQuery;
  let $parent: JQuery;
  const observer = jasmine.createSpyObj<ViewObserver>('spy', ['click']);
  const props: ViewProps = {
    maxValue: 100,
    minValue: 0,
    step: 1,
    isVertical: false,
    isRange: true,
    shouldDisplayTips: false,
    shouldDisplayProgressBar: true,
    shouldDisplayScale: false,
    pointerPosition: 11,
    secondPointerPosition: 67,
    pointerPosPercentage: 11,
    secondPointerPosPercentage: 67,
    tipValue: '11',
    secondTipValue: '67',
    scaleLabels: [],
  };

  beforeEach(() => {
    $parent = $('<div>', { class: 'slider__bar-container' });
    bar = new Bar($parent, observer);
    $bar = $parent.children().first();
    $progressBar = $bar.children().first();
  });

  it("Constructor should create element $bar with class 'slider__bar' on parent node", () => {
    expect($bar).toHaveClass('slider__bar');
  });

  it("Element $bar should contain element $progressBar with class 'slider__progress-bar'", () => {
    expect($progressBar).toHaveClass('slider__progress-bar');
  });

  it('Method render should update bars state correctly', () => {
    bar.render(props);
    expect($progressBar.css('display')).toEqual('');
    expect($progressBar.css('left')).toEqual('11%');
    expect($progressBar.css('width')).toEqual('56%');
    expect($progressBar.css('top')).toEqual('');
    expect($progressBar.css('height')).toEqual('0px');

    const props1: ViewProps = {
      ...props,
      isVertical: true,
      pointerPosPercentage: 43.2,
      secondPointerPosPercentage: 60,
    };
    bar.render(props1);
    expect($progressBar.css('display')).toEqual('');
    expect($progressBar.css('left')).toEqual('');
    expect($progressBar.css('width')).toEqual('0px');
    expect($progressBar.css('top')).toEqual('43.2%');
    expect($progressBar.css('height')).toEqual('16.8%');

    const props2 = {
      ...props,
      shouldDisplayProgressBar: false,
    };
    bar.render(props2);
    expect($progressBar.css('display')).toEqual('none');
  });

  it('When click event occurs, bar should notify view observer', () => {
    bar.render(props);
    $bar.trigger('click');
    expect(observer.click).toHaveBeenCalledTimes(1);
  });
});
