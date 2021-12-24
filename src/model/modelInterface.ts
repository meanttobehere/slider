export interface ModelInterface{
  setState: (params: ModelState) => void;
  getState: () => ModelState;
}

export interface ModelObserver{
  update: () => void;
}

export interface ModelState{
  isVertical: boolean;
  isRange: boolean;
  shouldDisplayTips: boolean;
  shouldDisplayProgressBar: boolean;
  shouldDisplayScale: boolean;
  maxNumberLabels: number;
  minValue: number;
  maxValue: number;
  step: number;
  pointerPosition: number;
  secondPointerPosition: number;
  [key: string]: number | boolean | undefined;
}

export const ModelStateDefault: ModelState = {
  isVertical: false,
  isRange: true,
  shouldDisplayTips: true,
  shouldDisplayProgressBar: true,
  shouldDisplayScale: false,
  maxNumberLabels: 20,
  minValue: 0,
  maxValue: 100,
  step: 1,
  pointerPosition: 20,
  secondPointerPosition: 80,
};
