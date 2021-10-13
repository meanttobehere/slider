interface ModelInterface{
    update: (data: ModelData) => void;    
    getData: () => ModelData;
    setObserver: (observer: ModelObserver) => void;
    pointerPositionInPercent: number;
    secondPointerPositionInPercent: number;
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

export default class Model implements ModelInterface{
    private data: ModelData;
    private observer: ModelObserver;

    constructor(data: ModelData){
        this.data = data;
    }

    update(data: ModelData){
        this.data = data;

        this.observer.update();
    }

    getData(){
        return this.data;
    }

    setObserver(observer: ModelObserver){
        this.observer = observer;
    }

    get stepInPercent(): number{        
        return this.convertValueToPercent(this.data.step);
    }

    get pointerPositionInPercent(): number{
        return this.convertPositionToPercent(this.data.pointerPosition);
    }

    get secondPointerPositionInPercent(): number{
        return this.convertPositionToPercent(this.data.secondPointerPosition);
    }

    set pointerPositionInPercent(percent: number){
        this.data.pointerPosition = this.convertPercentToPosition(percent);
        this.observer.update();
    }

    set secondPointerPositionInPercent(percent: number){
        this.data.secondPointerPosition = this.convertPercentToPosition(percent);
        this.observer.update();
    }

    private convertPositionToPercent(pos: number): number{        
        return (pos - this.data.minValue) / (this.data.maxValue - this.data.minValue) * 100;
    }

    private convertPercentToPosition(percent: number): number{
        return this.data.minValue + (this.data.maxValue - this.data.minValue) * percent / 100;        
    }

    private convertValueToPercent(value: number): number{
        return value / (this.data.maxValue - this.data.minValue) * 100;
    }
}