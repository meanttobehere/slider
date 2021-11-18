import MoveableObject from '../moveableObject';
import { MoveableObjectObserver } from '../moveableObjectInterface';

describe('MoveableObject', () => {
  let $parent: JQuery;
  let $object: JQuery;
  let moveableObject: MoveableObject;

  beforeEach(() => {
    $parent = $('<div>', { width: '300px', height: '100px' });
    $object = $('<div>', { width: '10px', height: '10px' });
    $parent.append($object);
    moveableObject = new MoveableObject($object);
  });

  it('when mouse events occur, moveableObject should notify observer with correct args', () => {
    const observer = jasmine
      .createSpyObj<MoveableObjectObserver>('spy', ['startMove', 'move', 'endMove']);
    moveableObject.setObserver(observer);

    const mouseDownEvent = $.Event('mousedown');
    mouseDownEvent.offsetX = 8;
    mouseDownEvent.offsetY = 7;
    const mouseMoveEvent = $.Event('mousemove');
    mouseMoveEvent.clientX = 52;
    mouseMoveEvent.clientY = 99;
    const mouseUpEvent = $.Event('mouseup');
    const expectDistY = ((mouseMoveEvent.clientY - mouseDownEvent.offsetY)
      / $parent.height()) * 100;
    const expectDistX = ((mouseMoveEvent.clientX - mouseDownEvent.offsetX)
      / $parent.width()) * 100;

    $object.trigger(mouseDownEvent);
    expect(observer.startMove).toHaveBeenCalledOnceWith();

    $(document).trigger(mouseMoveEvent);
    expect(observer.move).toHaveBeenCalledTimes(1);
    expect(observer.move.calls.mostRecent().args[0]).toBeCloseTo(expectDistX);
    expect(observer.move.calls.mostRecent().args[1]).toBeCloseTo(expectDistY);

    $(document).trigger(mouseUpEvent);
    expect(observer.endMove).toHaveBeenCalledOnceWith();
  });

  it('when touch events occur, moveableObject should notify observer with correct args', () => {
    const observer = jasmine
      .createSpyObj<MoveableObjectObserver>('spy', ['startMove', 'move', 'endMove']);
    moveableObject.setObserver(observer);

    const touchStartEvent = new TouchEvent('touchstart');
    const touch = new Touch({
      clientX: 52,
      clientY: 99,
      identifier: 44432,
      target: $object[0],
    });
    const touchMoveEvent = new TouchEvent('touchmove', { touches: [touch] });
    const touchEndEvent = new TouchEvent('touchend');
    const expectDistX = (touchMoveEvent.touches[0].clientX
      / $parent.width()) * 100;
    const expectDistY = (touchMoveEvent.touches[0].clientY
      / $parent.height()) * 100;

    $object[0].dispatchEvent(touchStartEvent);
    expect(observer.startMove).toHaveBeenCalledOnceWith();

    document.dispatchEvent(touchMoveEvent);
    expect(observer.move).toHaveBeenCalledTimes(1);
    expect(observer.move.calls.mostRecent().args[0]).toBeCloseTo(expectDistX);
    expect(observer.move.calls.mostRecent().args[1]).toBeCloseTo(expectDistY);

    document.dispatchEvent(touchEndEvent);
    expect(observer.endMove).toHaveBeenCalledOnceWith();
  });
});
