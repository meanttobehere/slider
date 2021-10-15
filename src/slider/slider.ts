import View from './view/view';
import Model from './model/model'
import Presenter from './presenter/presenter';
import { PresenterOptions } from './presenter/preesenterInterface';

declare global {
    interface JQuery {
        superSlider: (options?: PresenterOptions | string, arg?: any) => JQuery;
    }
}

$.fn.superSlider = function(options?: PresenterOptions | string, arg?: any) : JQuery
{
    if (typeof options === "object" || options === undefined){
        let sliderIsInitialized = this.data("update");        
        if (sliderIsInitialized){
            this.data("update")(options as PresenterOptions);            
            return;         
        }

        const view = new View(this);
        const model = new Model();
        const presenter = new Presenter(model, view, options as PresenterOptions);
        
        this.data("update", presenter.getUpdateFunction());
        this.data("setters", presenter.getSetters());
        this.data("getters", presenter.getGetters());
    }

    if (typeof options === "string"){
        if (arg != undefined)
            return this.data("setters")[options](arg);
        else 
            return this.data("getters")[options]();
    }

    return this;
} 