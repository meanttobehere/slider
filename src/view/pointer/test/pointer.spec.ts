import { MoveableObjectObserver } from '../../moveableObject/moveableObjectInterface';
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
    $parent = $('<div>', { width: '300px', height: '100px' });
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

  it('pointer should raise up events from moveableObject', () => {
    const pointerObserver = jasmine
      .createSpyObj<PointerObserver>('spy', ['startMove', 'move', 'endMove']);
    const moavableObjectObserver: MoveableObjectObserver
      = (pointer as any).moveableObject.observer;
    pointer.setObserver(pointerObserver);
    pointer.render(props);

    moavableObjectObserver.startMove();
    expect(pointerObserver.startMove).toHaveBeenCalledOnceWith(false);
    moavableObjectObserver.move(33, 55);
    expect(pointerObserver.move).toHaveBeenCalledOnceWith(33, false);
    moavableObjectObserver.endMove();
    expect(pointerObserver.endMove).toHaveBeenCalledOnceWith(false);

    const newProps = { ...props, ...{ vertical: true } };
    pointer.render(newProps);

    pointerObserver.move.calls.reset();
    moavableObjectObserver.move(33, 55);
    expect(pointerObserver.move).toHaveBeenCalledOnceWith(55, false);
  });
});
