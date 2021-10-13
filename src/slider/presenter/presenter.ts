import Model, { ModelData, ModelObserver } from "../model/model";
import View, { ViewProps, ViewObserver } from "../view/view";

export default class Presenter{
    private model: Model;
    private view: View;    

    constructor(model: Model, view: View){
        this.model = model;
        this.view = view;

        this.view.setObserver(this.getViewObserver());
        this.model.setObserver(this.getModelObserver());

        this.view.render(this.getViewProps());
    }
    
    private getViewObserver(){
        let observer: ViewObserver = {
            pointerMove: this.pointerMoveEventHandler.bind(this),
            pointerStartMove: this.pointerStartMoveEventHandler.bind(this),
            pointerEndMove: this.pointerEndMoveEventHandler.bind(this),
            clickOnScaleLabel: this.scaleClickEventHandler.bind(this),
            clickOnBar: this.barClickEventHandler.bind(this),
        }

        return observer;
    }

    private getModelObserver(){
        let observer: ModelObserver ={
            update: this.modelUpdateEventHandler.bind(this),
        }
        return observer;
    }   

    private getViewProps(){
        let data = this.model.getData();
        let props: ViewProps = {
            typeVertical: data.typeVertical,
            typeRange: data.typeRange,
            displayTips: data.displayTips,
            displayProgressBar: data.displayProgressBar,
            displayScale: data.displayScale,             
            pointerPosition: data.pointerPosition,
            secondPointerPosition: data.secondPointerPosition,
            tipValue: Math.floor(data.pointerPosition).toString(),
            secondTipValue: Math.floor(data.secondPointerPosition).toString(),
            scaleLabels: ["0", "25", "50", "75", "100"],
        }
        return props;
    }

    private pointerStartMoveEventHandler(isSecond: boolean){
        
    }

    private pointerEndMoveEventHandler(isSecond: boolean){

    }

    private pointerMoveEventHandler(distance: number, isSecond: boolean){
        let data = this.model.getData();        
            
        if (isSecond){
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
    
    private scaleClickEventHandler(labelNum: number){
        console.log(labelNum);
        let data = this.model.getData();

        if (data.typeRange){
            
        }
    }

    private barClickEventHandler(){

    }

    private modelUpdateEventHandler(){
        this.view.render(this.getViewProps());
    }
}