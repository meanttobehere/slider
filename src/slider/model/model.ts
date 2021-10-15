interface ModelInterface{    
    setObserver: (observer: ModelObserver) => void;  

    setData: (data: ModelData) => void;
    setTypeVertical: (typeVertical: boolean) => void;
    setTypeRange: (typeRange: boolean) => void;
    setDisplayTips: (displayTips: boolean) => void;
    setDisplayProgressBar: (displayProgressBar: boolean) => void;
    setDisplayScale: (displayScale: boolean) => void;
    setMinValue: (value: number) => void;
    setMaxValue: (value: number) => void;
    setStep: (step: number) => void;
    setPointerPosition: (position: number) => void;
    setSecondPointerPosition: (position: number) => void;
    setPointerPositionInPercent: (percent: number) => void;
    setSecondPointerPositionInPercent: (percent: number) => void;
   
    getData: () => ModelData;
    getTypeVertical: () => boolean;
    getTypeRange: () => boolean;  
    getDisplayTips: () => boolean; 
    getDisplayProgressBar: () => boolean;
    getDisplayScale: () => boolean;
    getMinValue: () => number; 
    getMaxValue: () => number;
    getStep: () => number;
    getPointerPosition: () => number;
    getSecondPointerPosition: () => number;
    getStepInPercent: () => number; 
    getPointerPositionInPercent: () => number;        
    getSecondPointerPositionInPercent: () => number;   
}

export interface ModelData{
    typeVertical: boolean;
    typeRange: boolean;
    displayTips: boolean;
    displayProgressBar: boolean;
    displayScale: boolean;
    minValue: number;
    maxValue: number;
    step: number;
    pointerPosition: number;
    secondPointerPosition: number;
}

export interface ModelObserver{
    update: () => void;
}

export default class Model implements ModelInterface {
    private observer: ModelObserver;
    
    private typeVertical: boolean;
    private typeRange: boolean;
    private displayTips: boolean;
    private displayProgressBar: boolean;
    private displayScale: boolean;
    private minValue: number;
    private maxValue: number;
    private secondPointerPosition: number;
    private pointerPosition: number;
    private step: number;    

    constructor(data: ModelData){
        this.setData(data);        
    }    

    public setObserver(observer: ModelObserver){
        this.observer = observer;
    }

    public setData(data: ModelData){        
        this.setTypeVertical(data.typeVertical);
        this.setTypeRange(data.typeRange);
        this.setDisplayTips(data.displayTips);
        this.setDisplayProgressBar(data.displayProgressBar);
        this.setDisplayScale(data.displayScale);
        this.setMinValue(data.minValue);
        this.setMaxValue(data.maxValue);
        this.setStep(data.step);
        this.setPointerPosition(data.pointerPosition);
        this.setSecondPointerPosition(data.secondPointerPosition);
        this.updateEvent();        
    }

    public setTypeVertical(typeVertical: boolean) {
        this.typeVertical = typeVertical;
        this.updateEvent();
    }        

    public setTypeRange(typeRange: boolean) {
        this.typeRange = typeRange;
        this.updateEvent();
    }

    public setDisplayTips(displayTips: boolean) {
        this.displayTips = displayTips;
        this.updateEvent();
    }

    public setDisplayProgressBar(displayProgressBar: boolean) {
        this.displayProgressBar = displayProgressBar;
        this.updateEvent();
    } 

    public setDisplayScale(displayScale: boolean) {
        this.displayScale = displayScale;
        this.updateEvent();
    }

    public setMinValue(minValue: number) {
        this.minValue = minValue;
        this.updateEvent();
    } 

    public setMaxValue(maxValue: number) {        
        this.maxValue = maxValue;
        this.updateEvent();
    }

    public setStep(step: number) {
        if (step <= 0)
            step = 1;
        else if (step > this.maxValue - this.minValue)
            this.maxValue = this.minValue + step;

        this.setPointerPosition(this.pointerPosition);
        this.setSecondPointerPositionInPercent(this.secondPointerPosition);

        this.step = step;
        this.updateEvent();
    } 

    public setPointerPosition(position: number) {
        position = this.bindPositionToStep(position);

        if (position < this.minValue)
            position = this.minValue
        if (position > this.maxValue)
            position = this.maxValue;
        if (this.typeRange && position > this.secondPointerPosition)
            position = this.secondPointerPosition;        

        this.pointerPosition = position;
        this.updateEvent();
    }

    public setSecondPointerPosition(position: number) {
        position = this.bindPositionToStep(position);

        if (position < this.pointerPosition)
            position = this.pointerPosition;
        if (position > this.maxValue)
            position = this.maxValue;
   
        this.secondPointerPosition = position;
        this.updateEvent();
    }

    public setPointerPositionInPercent(percent: number){
        this.setPointerPosition(this.convertPercentToPosition(percent));
        this.updateEvent();
    }

    public setSecondPointerPositionInPercent(percent: number){
        this.setSecondPointerPosition(this.convertPercentToPosition(percent));
        this.updateEvent();
    }

    public getData(): ModelData{
        let data: ModelData = {
            typeVertical: this.typeVertical,            
            typeRange: this.typeRange,
            displayTips: this.displayTips,
            displayProgressBar: this.displayProgressBar,
            displayScale: this.displayScale,
            minValue: this.minValue, 
            maxValue: this.maxValue,
            step: this.step,
            pointerPosition: this.pointerPosition,
            secondPointerPosition: this.secondPointerPosition,
        }
        return data;
    }

    public getTypeVertical(): boolean {
        return this.typeVertical;
    }

    public getTypeRange(): boolean {
        return this.typeRange;
    }

    public getDisplayTips(): boolean {
        return this.displayTips;
    }

    public getDisplayProgressBar(): boolean {
        return this.displayProgressBar;
    }

    public getDisplayScale(): boolean {
        return this.displayScale;
    }

    public getMinValue(): number {
        return this.minValue;
    }

    public getMaxValue(): number {
        return this.maxValue;
    }

    public getStep(): number {
        return this.step;
    }

    public getPointerPosition(): number {
        return this.pointerPosition;
    }

    public getSecondPointerPosition(): number {
        return this.secondPointerPosition;
    }

    public getStepInPercent(): number{        
        return this.convertValueToPercent(this.step);
    }

    public getPointerPositionInPercent(): number{
        return this.convertPositionToPercent(this.pointerPosition);
    }

    public getSecondPointerPositionInPercent(): number{
        return this.convertPositionToPercent(this.secondPointerPosition);
    }

    private convertPositionToPercent(position: number): number{        
        return (position - this.minValue) / (this.maxValue - this.minValue) * 100;
    }

    private convertPercentToPosition(percent: number): number{        
        return this.minValue + (this.maxValue - this.minValue) * percent / 100;        
    }

    private convertValueToPercent(value: number): number{
        return value / (this.maxValue - this.minValue) * 100;
    }   
    
    private bindPositionToStep(position: number): number{
        return Math.round((position - this.minValue) / this.step) * this.step + this.minValue;
    }

    private updateEvent(){
        this.observer?.update();
    }
}