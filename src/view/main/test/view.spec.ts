import View from '../view';

describe('View', () => {
  let $parent: JQuery;
  let view: View;
  let $view: JQuery;
  let $bar;
  let $pointer;
  let $secondPointer;
  let $tip;
  let $secondTip;

  beforeEach(() => {
    $parent = $('<div>', { class: 'parent' });
    view = new View($parent);
    $view = $parent.children().first();
  });

  it("constructor should create element $view on parent node with class 'slider__container'", () => {
    expect($view).toHaveClass('slider__container');
  });

  it('view should contain $bar, 2 $pointer and 2 $tip elements', () => {

  });
});
