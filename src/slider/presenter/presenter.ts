import Model, { ModelData, ModelObserver } from "../model/model";
import View, { ViewProps, ViewObserver } from "../view/view";

interface PresenterInterface{
    
}

export default class Presenter implements PresenterInterface{
    private model: Model;
    private view: View;    

    constructor(model: Model, view: View){
        this.model = model;
        this.view = view;

        this.view.setObserver(this._createViewObserver());
        this.model.setObserver(this._createModelObserver());

        this._renderView();
    }
    
    private _createViewObserver(){
        let observer: ViewObserver = {
            pointerMove: this._pointerMoveEventHandler.bind(this),
            pointerStartMove: this._pointerStartMoveEventHandler.bind(this),
            pointerEndMove: this._pointerEndMoveEventHandler.bind(this),
            clickOnScale: this._scaleClickEventHandler.bind(this),            
        }
        return observer;
    }

    private _createModelObserver(){
        let observer: ModelObserver ={
            update: this._modelUpdateEventHandler.bind(this),
        }
        return observer;
    }   

    private _renderView(){
        let scaleLabels: Array<string> = [];
        for (let i = this.model.getMinValue(); i <= this.model.getMaxValue(); i += this.model.getStep())
            scaleLabels.push(i.toString());        
    
        let props: ViewProps = {
            typeVertical: this.model.getTypeVertical(),
            typeRange: this.model.getTypeRange(),
            displayTips: this.model.getDisplayTips(),
            displayProgressBar: this.model.getDisplayProgressBar(),
            displayScale: this.model.getDisplayScale(),             
            pointerPosition: this.model.getPointerPositionInPercent(),
            secondPointerPosition: this.model.getSecondPointerPositionInPercent(),
            tipValue:  this.model.getPointerPosition().toString(),
            secondTipValue: this.model.getSecondPointerPosition().toString(), 
            scaleLabels: scaleLabels,
        }
        
        this.view.render(props);
    }  

    private _pointerStartMoveEventHandler(isSecond: boolean){
        
    }

    private _pointerEndMoveEventHandler(isSecond: boolean){

    }

    private _pointerMoveEventHandler(distance: number, isSecond: boolean){
        let step = this.model.getStepInPercent();
        let pos1 = this.model.getPointerPositionInPercent();
        let pos2 = this.model.getSecondPointerPositionInPercent();        
      
        if (Math.abs(distance) < step * 0.6)
            return;

        if (isSecond){
            let newPos = pos2 + distance;                       
            this.model.setSecondPointerPositionInPercent(newPos);            
        } else {
            let newPos = pos1 + distance;           
            this.model.setPointerPositionInPercent(newPos);
        }              
    }   
    
    private _scaleClickEventHandler(labelNum: number){
        let step = this.model.getStepInPercent();        
        let isNotRange = !this.model.getTypeRange();

        let newPos = step * labelNum;

        if (isNotRange){
            this.model.setPointerPositionInPercent(newPos);
        } else {
            let pos1 = this.model.getPointerPositionInPercent();
            let pos2 = this.model.getSecondPointerPositionInPercent();
            if (Math.abs(newPos - pos1) < Math.abs(newPos - pos2))
                this.model.setPointerPositionInPercent(newPos);
            else    
                this.model.setSecondPointerPositionInPercent(newPos);
        }      
    }    

    private _modelUpdateEventHandler(){
        this._renderView();
    }
}