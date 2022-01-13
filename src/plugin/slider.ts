import { ModelStatePartial } from '../model/modelInterface';
import Presenter from '../presenter/Presenter';
import { PresenterObserver } from '../presenter/presenterInterface';

export type SuperSlider = (
  options?: ModelStatePartial,
) => JQuery;

declare global {
  interface JQuery {
    superSlider: SuperSlider;
  }
}

function superSlider(
  this: HTMLElement,
  options?: ModelStatePartial,
) : JQuery {
  const $this = $(this);
  const presenter = $this.data('sliderInterface');

  if (!presenter) {
    const observer: PresenterObserver = {
      update: () => { $this.trigger('sliderupdate'); },
      start: () => { $this.trigger('slidestart'); },
      slide: () => { $this.trigger('slide'); },
      stop: () => { $this.trigger('slidestop'); },
    };
    const initialState = options || {};
    $this.data('sliderInterface', new Presenter($this, initialState, observer));
  } else if (options) {
    presenter.setOptions(options);
  }

  return $this;
}

$.fn.superSlider = superSlider;
