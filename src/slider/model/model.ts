interface ModelInterface{
    update: (data: ModelData) => void;    
    getData: () => ModelData;
    setObserver: (observer: ModelObserver) => void;
}

export interface ModelData{
    typeVertical?: boolean;
    typeRange?: boolean;
    displayTips?: boolean;
    displayProgressBar?: boolean;
    displayScale?: boolean;
    minValue?: number;
    maxValue?: number;
    step?: number;
    pointerPosition?: number;
    secondPointerPosition?: number;
}

export interface ModelObserver{
    update: () => void;
}

type ModelUpdateEventHandler = () => void;

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
}