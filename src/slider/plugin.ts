import Slider from './slider';

declare global {
    interface JQuery {
        superSlider(): void;
    }
}

$.fn.superSlider = function()
{
    let slider = new Slider(this);
}


