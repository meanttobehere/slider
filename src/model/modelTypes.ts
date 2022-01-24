import { ViewProps } from '../view/main/viewTypes';

export interface ModelInterface{
  setState: (state: ModelStatePartial, forceUpdate?: boolean) => void;
  getState: () => ModelState;
  setPositionsPercentage: (percentage: {
    pointer?: number,
    secondPointer?: number,
  }) => void;
  setPositionPercentage: (percentage: number) => void;
}

export interface ModelObserver{
  update: (props: ViewProps) => void;
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
  [key: string]: any;
}

export interface ModelStatePartial extends Partial<ModelState> {}

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
