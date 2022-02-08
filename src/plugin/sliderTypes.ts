export interface SliderState {
  isVertical: boolean;
  isRange: boolean;
  isInversion: boolean;
  shouldDisplayTips: boolean;
  shouldDisplayProgressBar: boolean;
  shouldDisplayScale: boolean;
  minValue: number;
  maxValue: number;
  step: number;
  pointerPosition: number;
  secondPointerPosition: number;
  [key: string]: any;
}

export interface SliderParams extends SliderState {
  scaleLabels: Array<{ val: string, posPercentage: number }>;
  pointerPosPercentage: number;
  secondPointerPosPercentage: number;
  tipValue: string;
  secondTipValue: string;
}

export interface SliderStatePartial extends Partial<SliderState> {}

export const SliderStateDefault: SliderState = {
  isVertical: false,
  isRange: true,
  isInversion: false,
  shouldDisplayTips: true,
  shouldDisplayProgressBar: true,
  shouldDisplayScale: false,
  minValue: 0,
  maxValue: 100,
  step: 1,
  pointerPosition: 20,
  secondPointerPosition: 80,
};

export interface SliderCallbacks {
  start: () => void;
  slide: () => void;
  stop: () => void;
  update: () => void;
}
