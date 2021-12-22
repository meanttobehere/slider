import { PresenterParams } from '../../src/presenter/presenterInterface';
import Panel from './panel/panel';

declare global {
  interface JQuery {
    superSliderPanel: (
      $slider: JQuery | number | boolean | PresenterParams
    ) => JQuery;
  }
}

function superSliderPanel(
  this: HTMLElement,
  $slider: JQuery | number | boolean | PresenterParams,
): JQuery {
  const $this = $(this);
  $this.data('panel', new Panel($this, <JQuery>$slider));
  return $this;
}

$.fn.superSliderPanel = superSliderPanel;
