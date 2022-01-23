import Panel from './panel/panel';

declare global {
  interface JQuery {
    superSliderPanel: (
      $slider: JQuery
    ) => JQuery;
  }
}

function superSliderPanel(
  this: JQuery,
  $slider: JQuery,
): JQuery {
  const $this = this;
  $this.data('panel', new Panel($this[0], $slider));
  return $this;
}

$.fn.superSliderPanel = superSliderPanel;
