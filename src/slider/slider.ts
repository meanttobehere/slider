import View from './view/view';
import Model, { ModelData } from './model/model';
import Presenter, { PresenterEvents } from './presenter/presenter';

export interface SliderOptions extends Partial<ModelData>, Partial<PresenterEvents>{};

export default class Slider{
    private presenter: Presenter;
    private view: View;
    private model: Model;

    constructor(node: JQuery, options?: SliderOptions){
        const defaultOptions: ModelData = {
            typeVertical: false,
            typeRange: true,
            displayTips: true,
            displayProgressBar: true,
            displayScale: true,
            minValue: 0,
            maxValue: 50,
            step: 5,
            pointerPosition: 10,
            secondPointerPosition: 40,
        }
        options = {...defaultOptions, ...options};

        const defaultEvetns: PresenterEvents = {
            start: () => {},
            slide: () => {},
            stop: () => {},
        }
        options = {...defaultEvetns, ...options};

        this.view = new View(node);
        this.model = new Model(options as ModelData);
        this.presenter = new Presenter(this.model, this.view, options as PresenterEvents);   
    }

    public getSetters(){
        return this.presenter.getSetters();
    }

    public getGetters(){
        return this.presenter.getGetters();
    }

    public getUpdateFunction(){
        return (options: SliderOptions) => {
            options = {...this.model.getData(), ...options};
            options = {...this.presenter.getEvents(), ...options};
            this.model.setData(options as ModelData);
            this.presenter.setEvents(options as PresenterEvents);
        }
    }
}