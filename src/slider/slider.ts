import View from './view/view';
import Model, { ModelData } from './model/model';
import Presenter from './presenter/presenter';

export interface SliderOptions{
    typeVertical?: boolean;
    typeRange?: boolean;
    displayTips?: boolean;
    displayProgressBar?: boolean;
    displayScale?: boolean;
    minValue?: number;
    maxValue?: number;
    step?: number;
    pointerPosition?: number;
    secondPointerPosition?: number;

    start?: () => void;
    slide?: () => void;
    stop?: () => void;    
}

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

        this.view = new View(node);
        this.model = new Model(options as ModelData);
        this.presenter = new Presenter(this.model, this.view);   
    }

    public getSetters(){
        return this.presenter.getSetters();
    }

    public getGetters(){
        return this.presenter.getGetters();
    }

    public update(options: SliderOptions){
        options = {...this.model.getData, ...options};
        this.model.setData(options as ModelData);
    }
}