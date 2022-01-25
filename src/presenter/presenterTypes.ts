import {
  ModelState,
  ModelStatePartial,
} from '../model/modelTypes';

export interface PresenterInterface {
  getOptions(): ModelState,
  setOptions(options: ModelStatePartial): void,
}

export interface PresenterObserver {
  start: () => void;
  slide: () => void;
  stop: () => void;
  update: () => void;
}
