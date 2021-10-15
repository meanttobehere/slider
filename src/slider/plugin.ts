import Slider, { SliderOptions } from './slider';

declare global {
    interface JQuery {
        superSlider: (options?: SliderOptions | string, arg?: any) => JQuery;
    }
}

$.fn.superSlider = function(options?: SliderOptions | string, arg?: any) : JQuery
{
    if (typeof options === "object" || !options){        
        const slider = new Slider(this, options as SliderOptions);

        if (this.data("inizialized") == true){
            slider.update(options as SliderOptions);           
        } else{
            this.data("inizialized", true);
            this.data("setters", slider.getSetters());
            this.data("getters", slider.getGetters());
        }
    }

    if (typeof options === "string"){
        if (arg)
            return this.data("setters")[options](arg);
        else 
            return this.data("getters")[options]();
    }

    return this;
}


