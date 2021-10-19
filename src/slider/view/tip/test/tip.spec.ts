import Tip from '../tip';
import { TipProps } from '../tipInterface';

describe('Tip', () => {
  let tip: Tip;
  let $parent: JQuery;
  let $tip: JQuery;

  beforeEach(() => {
    $parent = $('<div>', { class: 'slider__tips-container' });
    tip = new Tip($parent);
    $tip = $parent.children().first();
  });

  it("Constructor should create element with class 'slider__tip' on parent node", () => {
    expect($tip).toHaveClass('slider__tip');
  });

  it('Rendor method should update tips state correctly', () => {
    let props: TipProps = {
      vertical: false,
      position: 25,
      value: 'tipValue',
      display: true,
    };
    tip.render(props);
    expect($tip.text()).toEqual('tipValue');
    expect($tip.css('left')).toEqual('25%');
    expect($tip.css('top')).toEqual('');

    props = {
      vertical: true,
      position: 37,
      value: 'newTipValue',
      display: true,
    };
    tip.render(props);
    expect($tip.text()).toEqual('newTipValue');
    expect($tip.css('left')).toEqual('');
    expect($tip.css('top')).toEqual('37%');
  });
});
