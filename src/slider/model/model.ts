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
    private _observer: ModelObserver;
    
    private _typeVertical: boolean;
    private _typeRange: boolean;
    private _displayTips: boolean;
    private _displayProgressBar: boolean;
    private _displayScale: boolean;
    private _minValue: number;
    private _maxValue: number;
    private _secondPointerPosition: number;
    private _pointerPosition: number;
    private _step: number;    

    constructor(data: ModelData){
        this.setData(data);        
    }    

    public setObserver(observer: ModelObserver){
        this._observer = observer;
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
        this._updateEvent();        
    }

    public setTypeVertical(typeVertical: boolean) {
        this._typeVertical = typeVertical;
        this._updateEvent();
    }        

    public setTypeRange(typeRange: boolean) {
        this._typeRange = typeRange;
        this._updateEvent();
    }

    public setDisplayTips(displayTips: boolean) {
        this._displayTips = displayTips;
        this._updateEvent();
    }

    public setDisplayProgressBar(displayProgressBar: boolean) {
        this._displayProgressBar = displayProgressBar;
        this._updateEvent();
    } 

    public setDisplayScale(displayScale: boolean) {
        this._displayScale = displayScale;
        this._updateEvent();
    }

    public setMinValue(minValue: number) {
        this._minValue = minValue;
        this._updateEvent();
    } 

    public setMaxValue(maxValue: number) {        
        this._maxValue = maxValue;
        this._updateEvent();
    }

    public setStep(step: number) {
        if (step <= 0)
            step = 1;
        else if (step > this._maxValue - this._minValue)
            this._maxValue = this._minValue + step;

        this.setPointerPosition(this._pointerPosition);
        this.setSecondPointerPositionInPercent(this._secondPointerPosition);

        this._step = step;
        this._updateEvent();
    } 

    public setPointerPosition(position: number) {
        position = this._bindPositionToStep(position);

        if (position < this._minValue)
            position = this._minValue
        if (position > this._maxValue)
            position = this._maxValue;
        if (this._typeRange && position > this._secondPointerPosition)
            position = this._secondPointerPosition;        

        this._pointerPosition = position;
        this._updateEvent();
    }

    public setSecondPointerPosition(position: number) {
        position = this._bindPositionToStep(position);

        if (position < this._pointerPosition)
            position = this._pointerPosition;
        if (position > this._maxValue)
            position = this._maxValue;
   
        this._secondPointerPosition = position;
        this._updateEvent();
    }

    public setPointerPositionInPercent(percent: number){
        this.setPointerPosition(this._convertPercentToPosition(percent));
        this._updateEvent();
    }

    public setSecondPointerPositionInPercent(percent: number){
        this.setSecondPointerPosition(this._convertPercentToPosition(percent));
        this._updateEvent();
    }

    public getData(): ModelData{
        let data: ModelData = {
            typeVertical: this._typeVertical,            
            typeRange: this._typeRange,
            displayTips: this._displayTips,
            displayProgressBar: this._displayProgressBar,
            displayScale: this._displayScale,
            minValue: this._minValue, 
            maxValue: this._maxValue,
            step: this._step,
            pointerPosition: this._pointerPosition,
            secondPointerPosition: this._secondPointerPosition,
        }
        return data;
    }

    public getTypeVertical(): boolean {
        return this._typeVertical;
    }

    public getTypeRange(): boolean {
        return this._typeRange;
    }

    public getDisplayTips(): boolean {
        return this._displayTips;
    }

    public getDisplayProgressBar(): boolean {
        return this._displayProgressBar;
    }

    public getDisplayScale(): boolean {
        return this._displayScale;
    }

    public getMinValue(): number {
        return this._minValue;
    }

    public getMaxValue(): number {
        return this._maxValue;
    }

    public getStep(): number {
        return this._step;
    }

    public getPointerPosition(): number {
        return this._pointerPosition;
    }

    public getSecondPointerPosition(): number {
        return this._secondPointerPosition;
    }

    public getStepInPercent(): number{        
        return this._convertValueToPercent(this._step);
    }

    public getPointerPositionInPercent(): number{
        return this._convertPositionToPercent(this._pointerPosition);
    }

    public getSecondPointerPositionInPercent(): number{
        return this._convertPositionToPercent(this._secondPointerPosition);
    }

    private _convertPositionToPercent(position: number): number{        
        return (position - this._minValue) / (this._maxValue - this._minValue) * 100;
    }

    private _convertPercentToPosition(percent: number): number{        
        return this._minValue + (this._maxValue - this._minValue) * percent / 100;        
    }

    private _convertValueToPercent(value: number): number{
        return value / (this._maxValue - this._minValue) * 100;
    }   
    
    private _bindPositionToStep(position: number): number{
        return Math.round((position - this._minValue) / this._step) * this._step + this._minValue;
    }

    private _updateEvent(){
        this._observer?.update();
    }
}