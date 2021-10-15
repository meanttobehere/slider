import { PresenterInterface, PresenterEvents, PresenterOptions } from "./preesenterInterface";
import { ModelInterface, ModelData, ModelObserver } from "../model/modelInterface";
import { ViewInterface, ViewProps, ViewObserver } from "../view/viewInterface";

export default class Presenter implements PresenterInterface{
    private model: ModelInterface;
    private view: ViewInterface;
    private events: PresenterEvents;
    private viewProps: ViewProps;   

    constructor(model: ModelInterface, view: ViewInterface, options: PresenterOptions){
        this.model = model;
        this.view = view;

        this.updateModel(options);
        this.updateEvents(options);
        
        this.viewProps = {} as ViewProps;
        this.updateView();        

        this.view.setObserver(this.createViewObserver());
        this.model.setObserver(this.createModelObserver());        
    }

    public getUpdateFunction(){
        return ((options: PresenterOptions) => {
            this.updateModel(options);
            this.updateEvents(options);
        })     
    }

    public getSetters(){
        return {
            data: this.model.setData.bind(this.model),
            typeVertical: this.model.setTypeVertical.bind(this.model),
            typeRange: this.model.setTypeRange.bind(this.model),
            displayTips: this.model.setDisplayTips.bind(this.model),
            displayProgressBar: this.model.setDisplayProgressBar.bind(this.model),
            displayScale: this.model.setDisplayScale.bind(this.model),
            minValue: this.model.setMinValue.bind(this.model),
            maxValue: this.model.setMaxValue.bind(this.model),
            step: this.model.setStep.bind(this.model),
            pointerPosition: this.model.setPointerPosition.bind(this.model),
            secondPointerPosition: this.model.setSecondPointerPosition.bind(this.model),
            pointerPositionInPercent: this.model.setPointerPositionInPercent.bind(this.model),
            secondPointerPositionInPercent: this.model.setSecondPointerPositionInPercent.bind(this.model),

            start: (start: () => {}) => {this.events.start = start},
            slide: (slide: () => {}) => {this.events.slide = slide},
            stop: (stop: () => {}) => {this.events.stop = stop},
        }
    }

    public getGetters(){
        return {
            data: this.model.getData.bind(this.model),
            typeVertical: this.model.getTypeVertical.bind(this.model),
            typeRange: this.model.getTypeRange.bind(this.model),
            displayTips: this.model.getDisplayTips.bind(this.model),
            displayProgressBar: this.model.getDisplayProgressBar.bind(this.model),
            displayScale: this.model.getDisplayScale.bind(this.model),
            minValue: this.model.getMinValue.bind(this.model),
            maxValue: this.model.getMaxValue.bind(this.model),
            step: this.model.getStep.bind(this.model),
            pointerPosition: this.model.getPointerPosition.bind(this.model),
            secondPointerPosition: this.model.getSecondPointerPosition.bind(this.model),
            stepInPercent: this.model.getStepInPercent.bind(this.model),
            pointerPositionInPercent: this.model.getPointerPositionInPercent.bind(this.model),       
            secondPointerPositionInPercent: this.model.getSecondPointerPositionInPercent.bind(this.model),
        }
    }  
    
    private createViewObserver(){        
        let observer: ViewObserver = {
            pointerMove: this.pointerMoveEventHandler.bind(this),
            pointerStartMove: this.pointerStartMoveEventHandler.bind(this),
            pointerEndMove: this.pointerEndMoveEventHandler.bind(this),
            clickOnScale: this.scaleClickEventHandler.bind(this),            
        }
        return observer;
    }

    private createModelObserver(){
        let observer: ModelObserver = {
            update: this.modelUpdateEventHandler.bind(this),
        }
        return observer;
    }      

    private modelUpdateEventHandler(updatedOnlyPointersPosition: boolean){
        this.updateView(updatedOnlyPointersPosition);
    }

    private pointerStartMoveEventHandler(isSecond: boolean){
        this.events.start?.();
    }

    private pointerEndMoveEventHandler(isSecond: boolean){
        this.events.stop?.();
    }

    private pointerMoveEventHandler(distance: number, isSecond: boolean){
        let step = this.model.getStepInPercent();
        let pos1 = this.model.getPointerPositionInPercent();
        let pos2 = this.model.getSecondPointerPositionInPercent();        
      
        if (Math.abs(distance) < step * 0.6 || Math.abs(distance) < 0.1)
            return; 

        if (isSecond){
            let newPos = pos2 + distance;                       
            this.model.setSecondPointerPositionInPercent(newPos);            
        } else {
            let newPos = pos1 + distance;           
            this.model.setPointerPositionInPercent(newPos);
        }
        this.events.slide?.();              
    }   
    
    private scaleClickEventHandler(labelNum: number){
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
    
    private updateView(updatedOnlyPointersPosition?: boolean){
        this.viewProps.pointerPosition = this.model.getPointerPositionInPercent();
        this.viewProps.secondPointerPosition = this.model.getSecondPointerPositionInPercent();
        this.viewProps.tipValue =  Math.round(this.model.getPointerPosition()).toString();
        this.viewProps.secondTipValue = Math.round(this.model.getSecondPointerPosition()).toString();
        
        if (updatedOnlyPointersPosition === undefined || updatedOnlyPointersPosition == false){
            let scaleLabels: Array<string> = [];
            for (let i = this.model.getMinValue(); i <= this.model.getMaxValue(); i += this.model.getStep())
                scaleLabels.push(i.toString());

            this.viewProps.typeVertical = this.model.getTypeVertical();
            this.viewProps.typeRange = this.model.getTypeRange();
            this.viewProps.displayTips = this.model.getDisplayTips();
            this.viewProps.displayProgressBar = this.model.getDisplayProgressBar();
            this.viewProps.displayScale = this.model.getDisplayScale();
            this.viewProps.scaleLabels = scaleLabels;    
        }

        this.view.render(this.viewProps, updatedOnlyPointersPosition);
    }

    private updateModel(options: PresenterOptions){
        let data: ModelData = {...this.model.getData(), ...options};
        this.model.setData(data);
    }

    private updateEvents(options: PresenterOptions){
        this.events = {...this.events, ...options};
    }
}