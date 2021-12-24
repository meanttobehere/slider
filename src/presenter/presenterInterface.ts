import { ModelState } from '../model/modelInterface';

export interface PresenterInterface {
  getOptions(
    options: string | string[]
  ): PresenterParams | number | boolean | undefined,
  setOptions(params: PresenterParams): void,
}

export interface PresenterObserver {
  start: () => void;
  slide: () => void;
  stop: () => void;
  update: () => void;
}

export interface PresenterParams extends Partial<ModelState> {}
