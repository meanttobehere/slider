import './scale.css';

interface ScaleInterface{
    render: (props: ScaleProps) => void;
    setClickEventHandler: (eventHandler: ScaleClickEventHandler) => void;
}

export interface ScaleProps{
    display: boolean;
    vertical: boolean;
    labels: Array<string>;
}

export type ScaleClickEventHandler = (labelNum: number) => void;

export default class Scale implements ScaleInterface{
    constructor(){
        
    }

    render(props: ScaleProps){

    }

    setClickEventHandler(eventHandler: ScaleClickEventHandler){
        
    }
}