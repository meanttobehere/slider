import View from './view/main/view';
import Model from './model/model'
import Presenter from './presenter/presenter';
import { PresenterEvents, PresenterOptions } from './presenter/preesenterInterface';

declare global {
    interface JQuery {
        superSlider: (options?: PresenterOptions | string, arg?: any) => JQuery | any;
    }
}

$.fn.superSlider = function(options?: PresenterOptions | string, arg?: any) : JQuery | any
{
    const $this = $(this);
    
    if (typeof options === "object" || options === undefined){
        let sliderIsInitialized = $this.data("updateSettings");        
        if (sliderIsInitialized){
            $this.data("updateSettings")(options as PresenterOptions);            
            return;         
        }

        let view = new View($this);
        let model = new Model();

        let events: PresenterEvents = {
            update: () => {$this.trigger("sliderupdate")},
            start: () => {$this.trigger("slidestart")},
            slide: () => {$this.trigger("slide")},
            stop: () => {$this.trigger("slidestop")},
        };

        let presenter = new Presenter(model, view, options as PresenterOptions, events);
        
        $this.data("updateSettings", presenter.getUpdateFunction());
        $this.data("setters", presenter.getSetters());
        $this.data("getters", presenter.getGetters());      
    }

    if (typeof options === "string"){             
        if (arg != undefined)
            return $this.data("setters")[options](arg);            
        else
            return $this.data("getters")[options]();
    }

    return $this;
} 