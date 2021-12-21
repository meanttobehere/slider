import { ModelStateDefault } from '../model/modelInterface';
import Presenter from '../presenter/Presenter';
import {
  PresenterObserver,
  PresenterParams,
} from '../presenter/presenterInterface';

declare global {
  interface JQuery {
    superSlider: (
      options?: object | string | string[] | undefined,
      arg?: number | boolean | undefined,
    ) => JQuery | PresenterParams | number | boolean | undefined | any;
  }
}

function superSlider(
  options?: object | string | string[] | undefined,
  arg?: number | boolean | undefined,
) : JQuery | PresenterParams | number | boolean | undefined {
  const $this = $(this);

  const isInitialized = $this.data('presenter') !== undefined;

  const shouldSetOptions = typeof options === 'object'
    || (typeof options === 'string'
    && (typeof arg === 'number' || typeof arg === 'boolean'));

  const shouldGetOptions = arg === undefined
    && (typeof options === 'string'
    || (Array.isArray(options)
    && (options as []).every((val) => typeof val === 'string')));

  const getPresenterParams = (): PresenterParams => {
    if (typeof options === 'object') {
      return Object.keys(options)
        .filter((key) => key in ModelStateDefault)
        .reduce((acc, key) => ({
          ...acc,
          [key]: (options as PresenterParams)[key],
        }), {});
    }
    if (typeof options === 'string') {
      return (Object.keys(ModelStateDefault).includes(options)
        ? { [options]: arg }
        : {}
      );
    }
    return {};
  };

  if (isInitialized && shouldGetOptions) {
    const presenter = $this.data('presenter');
    return presenter.getOptions(options);
  }

  if (isInitialized && shouldSetOptions) {
    const presenter = $this.data('presenter');
    const params = getPresenterParams();
    presenter.setOptions(params);
    return $this;
  }

  if (!isInitialized) {
    const observer: PresenterObserver = {
      update: () => { $this.trigger('sliderupdate'); },
      start: () => { $this.trigger('slidestart'); },
      slide: () => { $this.trigger('slide'); },
      stop: () => { $this.trigger('slidestop'); },
    };
    const params = getPresenterParams();
    $this.data('presenter', new Presenter($this, params, observer));
    return $this;
  }

  return undefined;
}

$.fn.superSlider = superSlider;
