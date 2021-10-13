import View from './view/view';
import Model, { ModelData } from './model/model';
import Presenter from './presenter/presenter';

export default class Slider{
    private presenter: Presenter;
    private view: View;
    private model: Model;

    constructor(node: JQuery){
        let data: ModelData = {
            typeVertical: false,
            typeRange: false,
            displayTips: true,
            displayProgressBar: true,
            displayScale: true,
            minValue: -50,
            maxValue: 50,
            step: 10,
            pointerPosition: -20,
            secondPointerPosition: 40,
        }

        this.view = new View(node);
        this.model = new Model(data);
        this.presenter = new Presenter(this.model, this.view);   
    }
}