import { ModelState } from '../../model/modelTypes';
import Bar from '../bar/Bar';
import Pointer from '../pointer/Pointer';
import Scale from '../scale/Scale';
import Tips from '../tips/Tips';

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

export interface ViewElements {
  scale: Scale;
  bar: Bar;
  pointer: Pointer;
  secondPointer: Pointer;
  tips: Tips;
}
