import { ModelInterface, ModelData, ModelObserver, ModelUpdateEventOptions, ModelDataDefault } from "./modelInterface";

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

    constructor(){        
        this.typeVertical = ModelDataDefault.typeVertical;
        this.typeRange = ModelDataDefault.typeRange;
        this.displayTips = ModelDataDefault.displayTips;
        this.displayProgressBar = ModelDataDefault.displayProgressBar;
        this.displayScale = ModelDataDefault.displayScale;
        this.minValue = ModelDataDefault.maxValue;
        this.maxValue = ModelDataDefault.maxValue;
        this.step = ModelDataDefault.step;
        this.pointerPosition = ModelDataDefault.pointerPosition;
        this.secondPointerPosition = ModelDataDefault.secondPointerPosition;              
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
    }

    public setTypeVertical(typeVertical: boolean) {
        this.typeVertical = typeVertical;
        this.updateEvent();
    }        

    public setTypeRange(typeRange: boolean) {
        this.typeRange = typeRange;
        this.secondPointerPosition = this.normalizeSecondPointerPosition(this.secondPointerPosition);
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
        if (minValue >= this.maxValue)
            this.maxValue = minValue + 1;
        this.minValue = minValue;
        this.pointerPosition = this.normalizePointerPosition(this.pointerPosition);
        this.secondPointerPosition = this.normalizeSecondPointerPosition(this.secondPointerPosition);
        this.updateEvent();
    } 

    public setMaxValue(maxValue: number) { 
        if (maxValue <= this.minValue)
            this.minValue = maxValue - 1;       
        this.maxValue = maxValue;
        this.pointerPosition = this.normalizePointerPosition(this.pointerPosition);
        this.secondPointerPosition = this.normalizeSecondPointerPosition(this.secondPointerPosition);
        this.updateEvent();
    }

    public setStep(step: number) {
        if (step <= 0)
            step = 1;
        this.step = step;        
        this.pointerPosition = this.normalizePointerPosition(this.pointerPosition);
        this.secondPointerPosition = this.normalizeSecondPointerPosition(this.secondPointerPosition);
        this.updateEvent();
    } 

    public setPointerPosition(position: number) {
        this.pointerPosition = this.normalizePointerPosition(position);
        this.updateEvent({updatedOnlyPointersPositions: true});
    }

    public setSecondPointerPosition(position: number) {
        this.secondPointerPosition = this.normalizeSecondPointerPosition(position);
        this.updateEvent({updatedOnlyPointersPositions: true});
    }

    public setPointerPositionInPercent(percent: number){       
        this.pointerPosition = this.normalizePointerPosition(this.convertPercentToPosition(percent));
        this.updateEvent({updatedOnlyPointersPositions: true});       
    }

    public setSecondPointerPositionInPercent(percent: number){
        this.secondPointerPosition = this.normalizeSecondPointerPosition(this.convertPercentToPosition(percent));
        this.updateEvent({updatedOnlyPointersPositions: true});        
    }

    public getData(): ModelData{
        return {
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
    
    private normalizePointerPosition(position: number){
        position = this.normalizePosition(position);
        if (this.typeRange && position > this.secondPointerPosition)
            position = this.secondPointerPosition;
        return position;
    }

    private normalizeSecondPointerPosition(position: number){
        position = this.normalizePosition(position);
        if (position < this.pointerPosition)
            position = this.secondPointerPosition;
        return position;
    }
    
    private normalizePosition(position: number): number{
        position = Math.round(position / this.step) * this.step;
        
        if (position < this.minValue)
            position = this.minValue
        if (position > this.maxValue)
            position = this.maxValue;

        return position;
    }

    private updateEvent(options?: ModelUpdateEventOptions){        
        if (options === undefined) 
            options = {updatedOnlyPointersPositions: false};         
        
        this.observer?.update(options);                
    }
}