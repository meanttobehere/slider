import Presenter from '../presenter/Presenter';
import { SliderCallbacks, SliderStatePartial } from './sliderTypes';

export type SuperSlider = (
  options?: SliderStatePartial,
) => JQuery;

declare global {
  interface JQuery {
    superSlider: SuperSlider;
  }
}

function superSlider(
  this: JQuery,
  options?: SliderStatePartial,
) : JQuery {
  const $this = this;
  const presenter = $this.data('sliderInterface');

  if (!presenter) {
    const observer: SliderCallbacks = {
      update: () => { $this.trigger('sliderupdate'); },
      start: () => { $this.trigger('slidestart'); },
      slide: () => { $this.trigger('slide'); },
      stop: () => { $this.trigger('slidestop'); },
    };
    const initialState = options || {};
    $this.data('sliderInterface', new Presenter($this[0], initialState, observer));
  } else if (options) {
    presenter.setOptions(options);
  }

  return $this;
}

$.fn.superSlider = superSlider;
