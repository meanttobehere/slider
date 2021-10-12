import './view.css'

import Pointer, { PointerDragEventHandler } from "./pointer/pointer";
import { PointerProps } from "./pointer/pointer";
import Bar from "./bar/bar";
import { BarProps } from './bar/bar';
import Tip from './tip/tip';
import { TipProps } from './tip/tip';

interface ViewInterface{
    render: (props: ViewProps) => void;
    setPointersDragEventHandler: (dragEventHandler: PointerDragEventHandler) => void;      
}

export interface ViewProps
{
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
    tipValue: string;
    secondTipValue?: string;    
}

export default class View implements ViewInterface
{
    private $container: JQuery;
    private pointer: Pointer;
    private secondPointer: Pointer;
    private tip: Tip;
    private secondTip: Tip;
    private bar: Bar;
    
    constructor(node: JQuery)
    {
        this.$container = $('<div>', {class: 'slider__container'});
        node.append(this.$container);

        this.bar = new Bar(this.$container);        
        this.pointer = new Pointer(this.$container);
        this.secondPointer = new Pointer(this.$container, true);
        this.tip = new Tip(this.$container);
        this.secondTip = new Tip(this.$container);
    }    

    render(props: ViewProps)
    {
        let barProps: BarProps = {
            intervalStartPos: props.typeRange ? props.pointerPosition : 0,
            intervalEndPos: props.typeRange ? props.secondPointerPosition : props.pointerPosition,
        }
        this.bar.render(barProps);

        let tipProps: TipProps = {
            position: props.pointerPosition,
            value: props.tipValue,
        }
        this.tip.render(tipProps);

        let pointerProps: PointerProps = {
            position: props.pointerPosition,
            vertical: props.typeVertical,
        }
        this.pointer.render(pointerProps);

        let secondTipProps = {
            position: props.secondPointerPosition,
            value: props.secondTipValue,
        }
        this.secondTip.render(secondTipProps);

        let secondPointerProps = {
            position: props.secondPointerPosition,
            vertical: props.typeVertical,
        }
        this.secondPointer.render(secondPointerProps); 
    }

    setPointersDragEventHandler(dragEventHandler: PointerDragEventHandler){
        this.pointer.setDragEventHandler(dragEventHandler);
        this.secondPointer.setDragEventHandler(dragEventHandler);
    }
}