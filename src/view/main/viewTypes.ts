import { SliderParams } from '../../plugin/sliderTypes';

export interface ViewElement {
  render: (params: SliderParams) => void;
}

export interface ViewObserverData {
  eventType: string,
  posPercentage?: number,
  isSecond?: boolean,
}
