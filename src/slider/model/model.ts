interface ModelInterface{
    update: (data: ModelData) => void;
    getData: () => ModelData;
    setUpdateEventHandler: (updateEventHandler: ModelUpdateEventHandler) => void;
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
    secondPointerPosition?: number;
}

type ModelUpdateEventHandler = () => void;

export default class Model implements ModelInterface{
    private data: ModelData;
    private updateEventHandler: ModelUpdateEventHandler;

    constructor(data: ModelData){
        this.data = data;
    }

    update(data: ModelData){
        this.data = data;

        if (this.updateEventHandler)
            this.updateEventHandler();
    }

    getData(){
        return this.data;
    }

    setUpdateEventHandler(updateEventHandler: ModelUpdateEventHandler){
        this.updateEventHandler = updateEventHandler;
    }
}