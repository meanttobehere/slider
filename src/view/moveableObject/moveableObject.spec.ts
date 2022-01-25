import { ViewObserver, ViewProps } from '../main/viewTypes';
import MoveableObject from './MoveableObject';

describe('MoveableObject', () => {
  let parent: HTMLElement;
  let object: HTMLElement;
  let moveableObject: MoveableObject;
  const observer = jasmine
    .createSpyObj<ViewObserver>('spy', ['startMove', 'move', 'endMove']);
  const props: ViewProps = {
    minValue: 0,
    maxValue: 100,
    step: 1,
    isVertical: false,
    isRange: true,
    isInversion: false,
    shouldDisplayTips: true,
    shouldDisplayProgressBar: true,
    shouldDisplayScale: true,
    pointerPosition: 0,
    secondPointerPosition: 67,
    pointerPosPercentage: 0,
    secondPointerPosPercentage: 67,
    tipValue: '0',
    secondTipValue: '67',
    scaleLabels: [],
  };

  beforeEach(() => {
    parent = document.createElement('div');
    parent.style.width = '300px';
    parent.style.height = '100px';
    object = document.createElement('div');
    object.style.width = '20px';
    object.style.height = '20px';
    parent.appendChild(object);
    document.body.appendChild(parent);
    moveableObject = new MoveableObject(object, observer);
    moveableObject.update(props);
    observer.move.calls.reset();
    observer.startMove.calls.reset();
    observer.endMove.calls.reset();
  });

  it('When mouse events occur, moveableObject should notify observer', () => {
    const mouseDownEvent = new MouseEvent('mousedown');
    const mouseMoveEvent = new MouseEvent('mousemove');
    const mouseUpEvent = new MouseEvent('mouseup');

    object.dispatchEvent(mouseDownEvent);
    expect(observer.startMove).toHaveBeenCalledOnceWith(false);

    document.dispatchEvent(mouseMoveEvent);
    expect(observer.move).toHaveBeenCalledTimes(1);

    document.dispatchEvent(mouseUpEvent);
    expect(observer.endMove).toHaveBeenCalledOnceWith(false);
  });

  it('When touch events occur, moveableObject should notify observer with correct args', () => {
    const touch = new Touch({
      clientX: 80,
      identifier: 44432,
      target: object,
    });

    const touchStartEvent = new TouchEvent('touchstart', { touches: [touch] });
    const touchMoveEvent = new TouchEvent('touchmove', { touches: [touch] });
    const touchEndEvent = new TouchEvent('touchend');

    object.dispatchEvent(touchStartEvent);
    expect(observer.startMove).toHaveBeenCalledOnceWith(false);

    document.dispatchEvent(touchMoveEvent);
    expect(observer.move).toHaveBeenCalledTimes(1);

    document.dispatchEvent(touchEndEvent);
    expect(observer.endMove).toHaveBeenCalledOnceWith(false);
  });
});
