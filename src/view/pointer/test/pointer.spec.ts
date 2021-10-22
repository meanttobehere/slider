import Pointer from '../pointer';
import { PointerObserver, PointerProps } from '../pointerInterface';

describe('Pointer', () => {
  let pointer: Pointer;
  let $pointer: JQuery;
  let $parent: JQuery;
  const props: PointerProps = {
    display: true,
    vertical: false,
    position: 30,
  };

  beforeEach(() => {
    $parent = $('<div>', { class: 'bar__container', width: '300px', height: '100px' });
    pointer = new Pointer($parent);
    $pointer = $parent.children().first();
  });

  it("constructor should create element $pointer with class 'slider__pointer' on parent node", () => {
    expect($pointer).toHaveClass('slider__pointer');
  });

  it("method 'render' should update pointer state correctly", () => {
    pointer.render(props);
    expect($pointer.css('display')).toEqual('');
    expect($pointer.css('left')).toEqual('30%');
    expect($pointer.css('top')).toEqual('');

    let newProps = { ...props, ...{ vertical: true, position: 83 } };
    pointer.render(newProps);
    expect($pointer.css('display')).toEqual('');
    expect($pointer.css('left')).toEqual('');
    expect($pointer.css('top')).toEqual('83%');

    newProps = { ...props, ...{ display: false } };
    pointer.render(newProps);
    expect($pointer.css('display')).toEqual('none');
  });

  it('when pointer vertical = false and mouse move events occur, pointer should notify observer with correct args', () => {
    const observer = jasmine.createSpyObj<PointerObserver>('spy', ['startMove', 'move', 'endMove']);
    pointer.setObserver(observer);
    pointer.render(props);

    const mouseDownEvent = $.Event('mousedown');
    mouseDownEvent.offsetX = 8;
    mouseDownEvent.offsetY = 7;
    const mouseMoveEvent = $.Event('mousemove');
    mouseMoveEvent.clientX = 52;
    mouseMoveEvent.clientY = 99;
    const mouseUpEvent = $.Event('mouseup');
    const expectDist = ((mouseMoveEvent.clientX - mouseDownEvent.offsetX) / $parent.width()) * 100;

    $pointer.trigger(mouseDownEvent);
    expect(observer.startMove).toHaveBeenCalledOnceWith(false);

    $(document).trigger(mouseMoveEvent);
    expect(observer.move).toHaveBeenCalledTimes(1);
    expect(observer.move.calls.mostRecent().args[0]).toBeCloseTo(expectDist);
    expect(observer.move.calls.mostRecent().args[1]).toBe(false);

    $(document).trigger(mouseUpEvent);
    expect(observer.endMove).toHaveBeenCalledOnceWith(false);
  });

  it('when pointer vertical = true and mouse move events occur, pointer should notify observer with correct args', () => {
    const observer = jasmine.createSpyObj<PointerObserver>('spy', ['startMove', 'move', 'endMove']);
    pointer.setObserver(observer);

    const newProps = { ...props, ...{ vertical: true } };
    pointer.render(newProps);

    const mouseDownEvent = $.Event('mousedown');
    mouseDownEvent.offsetX = 8;
    mouseDownEvent.offsetY = 7;
    const mouseMoveEvent = $.Event('mousemove');
    mouseMoveEvent.clientX = 52;
    mouseMoveEvent.clientY = 99;
    const mouseUpEvent = $.Event('mouseup');
    const expectDist = ((mouseMoveEvent.clientY - mouseDownEvent.offsetY) / $parent.height()) * 100;

    $pointer.trigger(mouseDownEvent);
    expect(observer.startMove).toHaveBeenCalledOnceWith(false);

    $(document).trigger(mouseMoveEvent);
    expect(observer.move).toHaveBeenCalledTimes(1);
    expect(observer.move.calls.mostRecent().args[0]).toBeCloseTo(expectDist);
    expect(observer.move.calls.mostRecent().args[1]).toBe(false);

    $(document).trigger(mouseUpEvent);
    expect(observer.endMove).toHaveBeenCalledOnceWith(false);
  });

  it('when touch events occur, pointer should notify observer with correct args', () => {
    const observer = jasmine.createSpyObj<PointerObserver>('spy', ['startMove', 'move', 'endMove']);
    pointer.setObserver(observer);
    pointer.render(props);

    const touchStartEvent = new TouchEvent('touchstart');
    const touch = new Touch({
      clientX: 52,
      clientY: 99,
      identifier: 44432,
      target: $pointer[0],
    });
    const touchMoveEvent = new TouchEvent('touchmove', { touches: [touch] });
    const touchEndEvent = new TouchEvent('touchend');
    const expectDist = (touchMoveEvent.touches[0].clientX / $parent.width()) * 100;

    $pointer[0].dispatchEvent(touchStartEvent);
    expect(observer.startMove).toHaveBeenCalledOnceWith(false);

    document.dispatchEvent(touchMoveEvent);
    expect(observer.move).toHaveBeenCalledTimes(1);
    expect(observer.move.calls.mostRecent().args[0]).toBeCloseTo(expectDist);
    expect(observer.move.calls.mostRecent().args[1]).toBe(false);

    document.dispatchEvent(touchEndEvent);
    expect(observer.endMove).toHaveBeenCalledOnceWith(false);
  });
});
