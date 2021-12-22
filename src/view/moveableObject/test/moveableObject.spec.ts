import { ViewObserver, ViewProps } from '../../main/viewInterface';
import MoveableObject from '../MoveableObject';

describe('MoveableObject', () => {
  let $parent: JQuery;
  let $object: JQuery;
  let moveableObject: MoveableObject;
  const observer = jasmine
    .createSpyObj<ViewObserver>('spy', ['startMove', 'move', 'endMove']);
  const props: ViewProps = {
    isVertical: false,
    isRange: true,
    shouldDisplayTips: true,
    shouldDisplayProgressBar: true,
    shouldDisplayScale: true,
    scaleLabels: [],
    pointerPosition: 11,
    secondPointerPosition: 67,
    tipValue: 'tipValue',
    secondTipValue: '',
  };

  beforeEach(() => {
    $parent = $('<div>', { width: '300px', height: '100px' });
    $object = $('<div>', { width: '10px', height: '10px' });
    $parent.append($object);
    moveableObject = new MoveableObject($object, observer);
    moveableObject.update(props);
    observer.move.calls.reset();
    observer.startMove.calls.reset();
    observer.endMove.calls.reset();
  });

  it('when mouse events occur, moveableObject should notify observer with correct args', () => {
    const mouseDownEvent = $.Event('mousedown');
    mouseDownEvent.offsetX = 8;
    const mouseMoveEvent = $.Event('mousemove');
    mouseMoveEvent.clientX = 52;
    const mouseUpEvent = $.Event('mouseup');
    const expectDist = ((mouseMoveEvent.clientX - mouseDownEvent.offsetX)
      / <number>$parent.width()) * 100;

    $object.trigger(mouseDownEvent);
    expect(observer.startMove).toHaveBeenCalledOnceWith(false);

    $(document).trigger(mouseMoveEvent);
    expect(observer.move).toHaveBeenCalledTimes(1);
    expect(observer.move.calls.mostRecent().args[0]).toBeCloseTo(expectDist);
    expect(observer.move.calls.mostRecent().args[1]).toBe(false);

    $(document).trigger(mouseUpEvent);
    expect(observer.endMove).toHaveBeenCalledOnceWith(false);
  });

  it('when touch events occur, moveableObject should notify observer with correct args', () => {
    const touchStartEvent = new TouchEvent('touchstart');
    const touch = new Touch({
      clientX: 52,
      identifier: 44432,
      target: $object[0],
    });
    const touchMoveEvent = new TouchEvent('touchmove', { touches: [touch] });
    const touchEndEvent = new TouchEvent('touchend');
    const expectDist = (touchMoveEvent.touches[0].clientX
      / <number>$parent.width()) * 100;

    $object[0].dispatchEvent(touchStartEvent);
    expect(observer.startMove).toHaveBeenCalledOnceWith(false);

    document.dispatchEvent(touchMoveEvent);
    expect(observer.move).toHaveBeenCalledTimes(1);
    expect(observer.move.calls.mostRecent().args[0]).toBeCloseTo(expectDist);
    expect(observer.move.calls.mostRecent().args[1]).toBe(false);

    document.dispatchEvent(touchEndEvent);
    expect(observer.endMove).toHaveBeenCalledOnceWith(false);
  });
});
