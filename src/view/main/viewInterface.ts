export interface ViewInterface{
  render: (props: ViewProps, renderOnlyPositionDependedElements?: boolean) => void;
  setObserver: (viewObserver: ViewObserver) => void;
}

export interface ViewObserver{
  click(position: number): void;
  startMove(isSecond: boolean): void;
  move(distance: number, isSecond: boolean): void;
  endMove(isSecond: boolean): void;
}

export interface ViewProps {
  typeVertical: boolean;
  typeRange: boolean;
  displayTips: boolean;
  displayProgressBar: boolean;
  displayScale: boolean;
  scaleLabels: Array<{ val: string, pos: number }>;
  pointerPosition: number;
  secondPointerPosition: number;
  tipValue: string;
  secondTipValue: string;
}
