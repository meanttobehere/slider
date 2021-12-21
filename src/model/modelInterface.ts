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
  minValue: number;
  maxValue: number;
  step: number;
  pointerPosition: number;
  secondPointerPosition: number;
}

export const ModelStateDefault: ModelState = {
  isVertical: false,
  isRange: true,
  shouldDisplayTips: true,
  shouldDisplayProgressBar: true,
  shouldDisplayScale: false,
  minValue: 0,
  maxValue: 100,
  step: 1,
  pointerPosition: 20,
  secondPointerPosition: 80,
};
