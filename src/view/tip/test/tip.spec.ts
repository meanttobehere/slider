import Tip from '../tip';
import { TipProps } from '../tipInterface';

describe('Tip', () => {
  let tip: Tip;
  let $parent: JQuery;
  let $tip: JQuery;
  const props: TipProps = {
    vertical: false,
    position: 25,
    value: 'tipValue',
    display: true,
  };

  beforeEach(() => {
    $parent = $('<div>', { class: 'slider__tips-container' });
    tip = new Tip($parent);
    $tip = $parent.children().first();
  });

  it("constructor should create element with class 'slider__tip' on parent node", () => {
    expect($tip).toHaveClass('slider__tip');
  });

  it("method 'render' should update tips state correctly", () => {
    tip.render(props);
    expect($tip.css('display')).toEqual('');
    expect($tip.text()).toEqual('tipValue');
    expect($tip.css('left')).toEqual('25%');
    expect($tip.css('top')).toEqual('');

    let newProps = { ...props, ...{ vertical: true, position: 37, value: 'newTipValue' } };
    tip.render(newProps);
    expect($tip.css('display')).toEqual('');
    expect($tip.text()).toEqual('newTipValue');
    expect($tip.css('left')).toEqual('');
    expect($tip.css('top')).toEqual('37%');

    newProps = { ...props, ...{ display: false } };
    tip.render(newProps);
    expect($tip.css('display')).toEqual('none');
  });
});
