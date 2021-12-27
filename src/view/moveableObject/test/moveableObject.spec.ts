import { ViewObserver, ViewProps } from '../../main/viewInterface';
import MoveableObject from '../MoveableObject';

describe('MoveableObject', () => {
  let $parent: JQuery<HTMLElement>;
  let $object: JQuery;
  let moveableObject: MoveableObject;
  const observer = jasmine
    .createSpyObj<ViewObserver>('spy', ['startMove', 'move', 'endMove']);
  const props: ViewProps = {
    minValue: 0,
    maxValue: 100,
    step: 1,
    isVertical: false,
    isRange: true,
    shouldDisplayTips: true,
    shouldDisplayProgressBar: true,
    shouldDisplayScale: true,
    pointerPosition: 11,
    secondPointerPosition: 67,
    pointerPositionInPercent: 11,
    secondPointerPositionInPercent: 67,
  };

  beforeEach(() => {
    $parent = $('<div>', { width: '300px', height: '100px' });
    $object = $('<div>', { width: '10px', height: '10px' });
    $parent.append($object);
    $(document.body).append($parent);
    moveableObject = new MoveableObject($object, observer);
    moveableObject.update(props);
    observer.move.calls.reset();
    observer.startMove.calls.reset();
    observer.endMove.calls.reset();
  });

  it('When mouse events occur, moveableObject should notify observer with correct args', () => {
    const mouseDownEvent = $.Event('mousedown');
    mouseDownEvent.offsetX = 10;
    const mouseMoveEvent = $.Event('mousemove');
    mouseMoveEvent.clientX = 50;
    const mouseUpEvent = $.Event('mouseup');
    const distance = ((mouseMoveEvent.clientX - mouseDownEvent.offsetX
      - $object[0].getBoundingClientRect().left) / $parent[0].offsetWidth) * 100;

    $object.trigger(mouseDownEvent);
    expect(observer.startMove).toHaveBeenCalledOnceWith(false);

    $(document).trigger(mouseMoveEvent);
    expect(observer.move).toHaveBeenCalledTimes(1);
    expect(observer.move.calls.mostRecent().args[0]).toBeCloseTo(distance);
    expect(observer.move.calls.mostRecent().args[1]).toBe(false);

    $(document).trigger(mouseUpEvent);
    expect(observer.endMove).toHaveBeenCalledOnceWith(false);
  });

  it('When touch events occur, moveableObject should notify observer with correct args', () => {
    const touchStartEvent = new TouchEvent('touchstart');
    const touch = new Touch({
      clientX: 52,
      identifier: 44432,
      target: $object[0],
    });
    const touchMoveEvent = new TouchEvent('touchmove', { touches: [touch] });
    const touchEndEvent = new TouchEvent('touchend');
    const distance = ((touchMoveEvent.touches[0].clientX
      - $object[0].getBoundingClientRect().left) / $parent[0].offsetWidth) * 100;

    $object[0].dispatchEvent(touchStartEvent);
    expect(observer.startMove).toHaveBeenCalledOnceWith(false);

    document.dispatchEvent(touchMoveEvent);
    expect(observer.move).toHaveBeenCalledTimes(1);
    expect(observer.move.calls.mostRecent().args[0]).toBeCloseTo(distance);
    expect(observer.move.calls.mostRecent().args[1]).toBe(false);

    document.dispatchEvent(touchEndEvent);
    expect(observer.endMove).toHaveBeenCalledOnceWith(false);
  });
});
