import { ModelStateDefault, ModelStatePartial } from '../model/modelInterface';
import Presenter from '../presenter/Presenter';
import { PresenterObserver } from '../presenter/presenterInterface';

export type SuperSlider = (
  options?: ModelStatePartial | string | string[],
  arg?: number | boolean,
) => JQuery | ModelStatePartial | number | boolean | undefined;

declare global {
  interface JQuery {
    superSlider: SuperSlider;
  }
}

function superSlider(
  this: HTMLElement,
  options?: ModelStatePartial | string | string[],
  arg?: number | boolean,
) : JQuery | ModelStatePartial | number | boolean | undefined {
  const $this = $(this);

  const isInitialized = $this.data('presenter') !== undefined;

  const shouldSetOptions = typeof options === 'object'
    || (typeof options === 'string' && arg !== undefined);

  const shouldGetOptions = (typeof options === 'string' && arg === undefined)
   || (Array.isArray(options) && options.every((o) => typeof o === 'string'));

  const getPresenterParams = (): ModelStatePartial => {
    if (typeof options === 'object' && !Array.isArray(options)) {
      return Object.keys(options)
        .filter((key) => key in ModelStateDefault)
        .reduce((acc, key) => ({
          ...acc,
          [key]: options[key],
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

  return $this;
}

$.fn.superSlider = superSlider;
