import Model, { ModelData, ModelObserver } from "../model/model";
import View, { ViewProps, ViewObserver } from "../view/view";

interface PresenterInterface{
    getSetters: () => any;
    getGetters: () => any;
    setEvents: (events: PresenterEvents) => void;
    getEvents: () => PresenterEvents;    
}

export interface PresenterEvents{
    start: () => void;
    slide: () => void;
    stop: () => void;    
}

export default class Presenter implements PresenterInterface{
    private model: Model;
    private view: View;
    private events: PresenterEvents;    

    constructor(model: Model, view: View, events: PresenterEvents){
        this.model = model;
        this.view = view;
        this.events = events;

        this.view.setObserver(this.createViewObserver());
        this.model.setObserver(this.createModelObserver());
        
        this.renderView();
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

    public setEvents(events: PresenterEvents){
        this.events = events;
    }

    public getEvents(): PresenterEvents{
        return this.events;
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
        let observer: ModelObserver ={
            update: this.modelUpdateEventHandler.bind(this),
        }
        return observer;
    }   

    private renderView(){
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

    private pointerStartMoveEventHandler(isSecond: boolean){
        this.events.start();
    }

    private pointerEndMoveEventHandler(isSecond: boolean){
        this.events.stop();
    }

    private pointerMoveEventHandler(distance: number, isSecond: boolean){
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
        this.events.slide();              
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

    private modelUpdateEventHandler(){
        this.renderView();
    }
}