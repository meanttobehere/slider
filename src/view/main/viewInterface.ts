import { ModelState } from '../../model/modelInterface';

export interface ViewInterface {
  render: (state: ModelState) => void;
}

export interface ViewObserver {
  click(position: number): void;
  startMove(isSecond: boolean): void;
  move(distance: number, isSecond: boolean): void;
  endMove(isSecond: boolean): void;
}

export interface ViewProps extends ModelState{
  pointerPositionInPercent: number,
  secondPointerPositionInPercent: number,
}
