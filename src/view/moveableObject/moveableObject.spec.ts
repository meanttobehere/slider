import { SliderParams } from '../../plugin/sliderTypes';
import View from '../main/View';
import MoveableObject from './MoveableObject';

describe('MoveableObject', () => {
  let parent: HTMLElement;
  let object: HTMLElement;
  let moveableObject: MoveableObject;
  const viewSpy = jasmine.createSpyObj<View>('spy', ['notify']);
  const params: SliderParams = {
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
    moveableObject = new MoveableObject(object, viewSpy);
    moveableObject.update(params);
  });

  it('When mouse events occur, moveableObject should notify view', () => {
    const mouseDownEvent = new MouseEvent('mousedown');
    const mouseMoveEvent = new MouseEvent('mousemove');
    const mouseUpEvent = new MouseEvent('mouseup');

    object.dispatchEvent(mouseDownEvent);
    const mouseDownType = viewSpy.notify.calls.mostRecent().args[0].eventType;
    expect(mouseDownType).toBe('startMove');

    document.dispatchEvent(mouseMoveEvent);
    const mouseMoveType = viewSpy.notify.calls.mostRecent().args[0].eventType;
    expect(mouseMoveType).toBe('move');

    document.dispatchEvent(mouseUpEvent);
    const mouseUpType = viewSpy.notify.calls.mostRecent().args[0].eventType;
    expect(mouseUpType).toBe('endMove');
  });

  it('When touch events occur, moveableObject should notify view', () => {
    const touch = new Touch({
      clientX: 80,
      identifier: 44432,
      target: object,
    });

    const touchStartEvent = new TouchEvent('touchstart', { touches: [touch] });
    const touchMoveEvent = new TouchEvent('touchmove', { touches: [touch] });
    const touchEndEvent = new TouchEvent('touchend');

    object.dispatchEvent(touchStartEvent);
    const touchStartType = viewSpy.notify.calls.mostRecent().args[0].eventType;
    expect(touchStartType).toBe('startMove');

    document.dispatchEvent(touchMoveEvent);
    const touchMoveType = viewSpy.notify.calls.mostRecent().args[0].eventType;
    expect(touchMoveType).toBe('move');

    document.dispatchEvent(touchEndEvent);
    const touchEndType = viewSpy.notify.calls.mostRecent().args[0].eventType;
    expect(touchEndType).toBe('endMove');
  });
});
