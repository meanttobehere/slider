import Model from "../model/model";
import View from "../view/view";
import { ModelData } from "../model/model";
import { ViewProps } from "../view/view"

export default class Presenter{
    private model: Model;
    private view: View;

    constructor(model: Model, view: View){
        this.model = model;
        this.view = view;

        this.model.setUpdateEventHandler(this.modelUpdateEventHandler.bind(this));
        this.view.setPointersDragEventHandler(this.viewPointersDragEventHandler.bind(this));

        let modelData: ModelData = {
            typeVertical: false,
            typeRange: true,
            displayTips: true,
            displayProgressBar: true,
            displayScale: true,
            minValue: 0,
            maxValue: 100,
            step: 10,
            pointerPosition: 30,
            secondPointerPosition: 70,
        } 
        
        this.model.update(modelData);
    } 
    
    private modelUpdateEventHandler(){
        this.view.render(this.getViewProps());
    }

    private getViewProps(){
        let data = this.model.getData();
        let props: ViewProps = {
            typeVertical: data.typeVertical,
            typeRange: data.typeRange,
            displayTips: data.displayTips,
            displayProgressBar: data.displayProgressBar,
            displayScale: data.displayScale,
            minValue: data.minValue,
            maxValue: data.maxValue,
            step: data.step,
            pointerPosition: data.pointerPosition,
            secondPointerPosition: data.secondPointerPosition,
            tipValue: data.pointerPosition.toString(),
            secondTipValue: data.secondPointerPosition.toString(),
        }
        return props;
    }

    private viewPointersDragEventHandler(distance: number, isSecondPointer: boolean){
        let data = this.model.getData();
            
        if (isSecondPointer){
            let newPos = data.secondPointerPosition + distance;

            if (newPos > 100)
                newPos = 100;
            else if (newPos <  data.pointerPosition)
                newPos = data.pointerPosition;
            
            data.secondPointerPosition = newPos;
        } else {
            let newPos = data.pointerPosition + distance;

            if (newPos < 0)
                newPos = 0;
            else if (newPos > data.secondPointerPosition)
                newPos = data.secondPointerPosition;
            
            data.pointerPosition = newPos;
        }
        
        this.model.update(data);    
    }
}