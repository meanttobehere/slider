export interface ViewInterface{
    render: (props: ViewProps, renderOnlyPositionDependedElements?: boolean) => void;
    setObserver: (viewObserver: ViewObserver) => void;   
}

export interface ViewObserver{
    clickOnScale(labelNum: number): void;
    pointerStartMove(isSecond: boolean): void;
    pointerMove(position: number, isSecond: boolean): void;
    pointerEndMove(isSecond: boolean): void;
}

export interface ViewProps
{
    typeVertical: boolean;
    typeRange: boolean;
    displayTips: boolean;
    displayProgressBar: boolean;
    displayScale: boolean;
    scaleLabels: Array<string>;
    pointerPosition: number;
    secondPointerPosition: number;
    tipValue: string;
    secondTipValue?: string;    
}