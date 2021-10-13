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

        let scaleLabels: Array<string> = [];
        for (let i = data.minValue; i <= data.maxValue; i += data.step)
            scaleLabels.push(i.toString());
          
        let pointerPosition = this.model.pointerPositionInPercent;
        let secondPointerPosition = this.model.secondPointerPositionInPercent;

        let tipValue = Math.floor(data.pointerPosition).toString();
        let secondTipValue = Math.floor(data.secondPointerPosition).toString();        

        let props: ViewProps = {
            typeVertical: data.typeVertical,
            typeRange: data.typeRange,
            displayTips: data.displayTips,
            displayProgressBar: data.displayProgressBar,
            displayScale: data.displayScale,             
            pointerPosition: pointerPosition,
            secondPointerPosition: secondPointerPosition,
            tipValue: tipValue,
            secondTipValue: secondTipValue, 
            scaleLabels: scaleLabels,
        }
        return props;
    }  

    private pointerStartMoveEventHandler(isSecond: boolean){
        
    }

    private pointerEndMoveEventHandler(isSecond: boolean){

    }

    private pointerMoveEventHandler(distance: number, isSecond: boolean){
        let model = this.model;
        
        if (Math.abs(distance) < model.stepInPercent * 0.6)
            return;

        if (model.getData().typeRange === false){
            let newPos = model.pointerPositionInPercent + model.stepInPercent * Math.sign(distance);
            if (newPos < 0)
                newPos = 0;
            else if (newPos > 100)
                newPos = 100;
            
            model.pointerPositionInPercent = newPos;
            return;
        }
            
        if (isSecond){
            let newPos = model.secondPointerPositionInPercent + model.stepInPercent * Math.sign(distance);

            if (newPos > 100)
                newPos = 100;
            else if (newPos < model.pointerPositionInPercent)
                newPos = model.pointerPositionInPercent;
            
            model.secondPointerPositionInPercent = newPos;
        } else {
            let newPos = model.pointerPositionInPercent + model.stepInPercent * Math.sign(distance);

            if (newPos < 0)
                newPos = 0;
            else if (newPos > model.secondPointerPositionInPercent)
                newPos = model.secondPointerPositionInPercent;
            
            model.pointerPositionInPercent = newPos;
        }          
    }   
    
    private scaleClickEventHandler(labelNum: number){
        let model = this.model;
        let newPos = model.stepInPercent * labelNum;
        
        if (model.getData().typeRange){
            if (Math.abs(newPos - model.pointerPositionInPercent) < Math.abs(newPos - model.secondPointerPositionInPercent))
                model.pointerPositionInPercent = newPos;
            else
                model.secondPointerPositionInPercent = newPos;
        } else {
             model.pointerPositionInPercent = newPos;
        }
    }

    private barClickEventHandler(){
        
    }

    private modelUpdateEventHandler(){
        this.view.render(this.getViewProps());
    }
}