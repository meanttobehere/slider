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
  $slider: JQuery | number | boolean | PresenterParams,
): JQuery {
  const panel = new Panel(this, $slider as JQuery);
  return this;
};

$.fn.superSliderPanel = superSliderPanel;
