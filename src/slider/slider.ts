import View from './view/view';
import Model from './model/model';
import Presenter from './presenter/presenter';

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
