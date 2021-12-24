import { ModelStatePartial } from '../model/modelInterface';

export interface PresenterInterface {
  getOptions(
    options: string | string[]
  ): ModelStatePartial | number | boolean | undefined,
  setOptions(options: ModelStatePartial): void,
}

export interface PresenterObserver {
  start: () => void;
  slide: () => void;
  stop: () => void;
  update: () => void;
}
