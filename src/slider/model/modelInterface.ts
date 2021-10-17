export interface ModelInterface{    
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
    update: (options: ModelUpdateEventOptions) => void;
}

export interface ModelUpdateEventOptions{   
    updatedOnlyPointersPositions: boolean;
}

export const ModelDataDefault: ModelData = {
    typeVertical: false,
    typeRange: true,
    displayTips: true,
    displayProgressBar: true,
    displayScale: false,
    minValue: 0,
    maxValue: 100,
    step: 1,
    pointerPosition: 20,
    secondPointerPosition: 80,
}