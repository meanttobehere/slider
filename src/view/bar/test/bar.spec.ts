import Bar from '../bar';
import { BarObserver, BarProps } from '../barInterface';

describe('Bar', () => {
  let bar: Bar;
  let $bar: JQuery;
  let $progressSegment: JQuery;
  let $parent: JQuery;
  const props: BarProps = {
    progressbar: true,
    vertical: false,
    intervalStartPos: 11,
    intervalLength: 67,
  };

  beforeEach(() => {
    $parent = $('<div>', { class: 'slider__bar-container' });
    bar = new Bar($parent);
    $bar = $parent.children().first();
    $progressSegment = $bar.children().first();
  });

  it("constructor should create element $bar with class 'slider__bar' on parent node", () => {
    expect($bar).toHaveClass('slider__bar');
  });

  it("element $bar should contain element $progressSegment with class 'slider__progress-segment'", () => {
    expect($progressSegment).toHaveClass('slider__progress-segment');
  });

  it("method 'render' should update bars state correctly", () => {
    bar.render(props);
    expect($progressSegment.css('display')).toEqual('');
    expect($progressSegment.css('left')).toEqual('11%');
    expect($progressSegment.css('width')).toEqual('67%');
    expect($progressSegment.css('top')).toEqual('');
    expect($progressSegment.css('height')).toEqual('0px');

    let newProps = {
      ...props,
      ...{ vertical: true, intervalStartPos: 43.2, intervalLength: 12.783 },
    };
    bar.render(newProps);
    expect($progressSegment.css('display')).toEqual('');
    expect($progressSegment.css('left')).toEqual('');
    expect($progressSegment.css('width')).toEqual('0px');
    expect($progressSegment.css('top')).toEqual('43.2%');
    expect($progressSegment.css('height')).toEqual('12.783%');

    newProps = { ...props, ...{ progressbar: false } };
    bar.render(newProps);
    expect($progressSegment.css('display')).toEqual('none');
  });

  it('when click event occurs, bar should notify observer', () => {
    const observer = jasmine.createSpyObj<BarObserver>('spy', ['click']);
    bar.setObserver(observer);
    bar.render(props);
    $bar.trigger('click');
    expect(observer.click).toHaveBeenCalledTimes(1);
  });
});
