export interface ViewInterface{
  render: (props: ViewProps) => void;
}

export interface ViewObserver{
  click(position: number): void;
  startMove(isSecond: boolean): void;
  move(distance: number, isSecond: boolean): void;
  endMove(isSecond: boolean): void;
}

export interface ViewProps {
  isVertical: boolean;
  isRange: boolean;
  shouldDisplayTips: boolean;
  shouldDisplayProgressBar: boolean;
  shouldDisplayScale: boolean;
  scaleLabels: Array<{ val: string, pos: number }>;
  pointerPosition: number;
  secondPointerPosition: number;
  tipValue: string;
  secondTipValue: string;
}
