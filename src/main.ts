import View from './slider/view/view';
import Model from './slider/model/model';
import Presenter from './slider/presenter/presenter';

declare global {
    interface JQuery {
        superSlider(): void;
    }
}

$.fn.superSlider = function()
{
    let view = new View(this);
    let model = new Model(this);
    let presenter = new Presenter(model, view);   
}

$( "#slider" ).superSlider();
