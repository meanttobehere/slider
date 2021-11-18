import Panel from './panel/panel';

declare global {
  interface JQuery {
    superSliderPanel: ($slider: JQuery) => JQuery;
  }
}

$.fn.superSliderPanel = function superSliderPanel($slider: JQuery): JQuery {
  const panel = new Panel(this, $slider);
  return this;
};
