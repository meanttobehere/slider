import './view.css'

import Pointer, { PointerStartMoveEventHandler, PointerMoveEventHandler, PointerEndMoveEventHandler,  PointerProps } from "./pointer/pointer"
import Bar, { BarClickEventHandler, BarProps } from './bar/bar';
import Scale, { ScaleClickEventHandler, ScaleProps } from './scale/scale';
import Tip, { TipProps } from './tip/tip';

interface ViewInterface{
    render: (props: ViewProps) => void;
    setObserver: (viewObserver: ViewObserver) => void;   
}

export interface ViewObserver{
    clickOnScaleLabel(labelNum: number): void;
    clickOnBar(position: number): void;
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

export default class View implements ViewInterface
{
    private observer: ViewObserver;

    private $container: JQuery;
    private $barContainer: JQuery;
    private $scaleContainer: JQuery;
    private $tipsContainer: JQuery;

    private bar: Bar;
    private scale: Scale;    
    private pointer: Pointer;
    private secondPointer: Pointer;
    private tip: Tip;
    private secondTip: Tip;    
    
    constructor(node: JQuery)
    {
        this.$container = $('<div>', {class: 'slider__container'});
        this.$scaleContainer = $("<div>", {class: "slider__scale-container"});
        this.$barContainer = $("<div>", {class: "slider__bar-container"});
        this.$tipsContainer = $("<div>", {class: "slider__tips-container"});

        node.append(this.$container);
        this.$container
            .append(this.$tipsContainer)
            .append(this.$barContainer)
            .append(this.$scaleContainer);    

        this.scale = new Scale(this.$scaleContainer);
        this.bar = new Bar(this.$barContainer);                
        this.pointer = new Pointer(this.$barContainer);
        this.secondPointer = new Pointer(this.$barContainer, true);
        this.tip = new Tip(this.$tipsContainer);
        this.secondTip = new Tip(this.$tipsContainer);               
    
        this.pointer.setEventsHandlers(
            this.GetPointerStartMoveEventHandler(),
            this.GetPointerMoveEventHandler(),
            this.GetPointerEndMoveEventHandler()
        )
        this.secondPointer.setEventsHandlers(
            this.GetPointerStartMoveEventHandler(),
            this.GetPointerMoveEventHandler(),
            this.GetPointerEndMoveEventHandler()
        )        
        this.scale.setClickEventHandler(this.GetScaleClickEventHandler());
        this.bar.setClickEventHandler(this.GetBarClickEventHandler());
    }    

    render(props: ViewProps)
    {
        let barProps: BarProps = {
            progressbar: props.displayProgressBar,
            vertical: props.typeVertical,
            intervalStartPos: props.typeRange ? props.pointerPosition : 0,
            intervalEndPos: props.typeRange ? props.secondPointerPosition : props.pointerPosition,
        }
        
        let scaleProps: ScaleProps = {
            display: props.displayScale,
            vertical: props.typeVertical,
            labels: props.scaleLabels,
        }

        let tipProps: TipProps = {
            display: props.displayTips,
            vertical: props.typeVertical,
            position: props.pointerPosition,
            value: props.tipValue,
        }        

        let pointerProps: PointerProps = {
            display: true,
            vertical: props.typeVertical,
            position: props.pointerPosition,            
        }        

        let secondTipProps: TipProps = {
            display: props.displayTips && props.typeRange,
            vertical: props.typeVertical,
            position: props.secondPointerPosition,
            value: props.secondTipValue,
        }        

        let secondPointerProps: PointerProps = {
            display: props.typeRange,
            vertical: props.typeVertical,
            position: props.secondPointerPosition,            
        } 
        
        if (props.typeVertical)
            this.$container.addClass("slider__container_vertical");
        else
            this.$container.removeClass("slider__container_vertical");

        this.bar.render(barProps);
        this.scale.render(scaleProps);
        this.tip.render(tipProps);
        this.secondTip.render(secondTipProps);
        this.pointer.render(pointerProps);
        this.secondPointer.render(secondPointerProps); 
    }

    setObserver(viewObserver: ViewObserver){
        this.observer = viewObserver;
    }

    private GetPointerStartMoveEventHandler(){
        let eventHandler: PointerStartMoveEventHandler = (isSecond: boolean) => (this.observer.pointerStartMove?.(isSecond));
        return eventHandler;
    }

    private GetPointerMoveEventHandler(){
        let eventHandler: PointerMoveEventHandler = (position: number, isSecond: boolean) => (this.observer.pointerMove?.(position, isSecond));
        return eventHandler;
    }

    private GetPointerEndMoveEventHandler(){
        let eventHandler: PointerEndMoveEventHandler = (isSecond: boolean) => (this.observer.pointerEndMove?.(isSecond));
        return eventHandler;
    }

    private GetBarClickEventHandler(){
        let eventHandler: BarClickEventHandler = (position: number) => (this.observer.clickOnBar?.(position));
        return eventHandler;
    }

    private GetScaleClickEventHandler(){
        let eventHandler: ScaleClickEventHandler = (labelNum: number) => (this.observer.clickOnScaleLabel?.(labelNum));
        return eventHandler;
    }
}