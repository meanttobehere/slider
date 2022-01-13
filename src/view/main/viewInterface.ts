import { ModelState } from '../../model/modelInterface';

export interface ViewInterface {
  render: (props: ViewProps) => void;
}

export interface ViewObserver {
  click(posPercentage: number): void;
  startMove(isSecond: boolean): void;
  move(posPercentage: number, isSecond: boolean): void;
  endMove(isSecond: boolean): void;
}

export interface ViewProps extends ModelState{
  scaleLabels: Array<{ val: string, posPercentage: number }>;
  pointerPosPercentage: number;
  secondPointerPosPercentage: number;
  tipValue: string;
  secondTipValue: string;
}
