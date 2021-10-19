import './view.css'
import { ViewInterface, ViewProps, ViewObserver } from './viewInterface';
import Pointer from "./pointer/pointer";
import { PointerObserver, PointerProps } from './pointer/pointerInterface';
import Bar from './bar/bar';
import { BarProps } from './bar/barInterface';
import Scale from './scale/scale';
import { ScaleObserver, ScaleProps} from './scale/scaleInterface';
import Tip from './tip/tip';
import { TipProps } from './tip/tipInterface';

export default class View implements ViewInterface
{
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

    private observer: ViewObserver;
    
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
    
        [this.pointer, this.secondPointer].forEach(pointer => {
            pointer.setObserver(this.createPointerObserver());
        })
        this.scale.setObserver(this.createScaleObserver());
    }    

    render(props: ViewProps, renderOnlyPositionDependedElements?: boolean)
    {
        if (props.typeVertical)
            this.$container.addClass("slider__container_vertical");
        else
            this.$container.removeClass("slider__container_vertical");

        let barProps: BarProps = {
            progressbar: props.displayProgressBar,
            vertical: props.typeVertical,
            intervalStartPos: props.typeRange ? props.pointerPosition : 0,
            intervalLength: props.typeRange ? props.secondPointerPosition - props.pointerPosition : props.pointerPosition,
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

        if (renderOnlyPositionDependedElements === undefined || renderOnlyPositionDependedElements == false)
            this.scale.render(scaleProps);
        
        this.bar.render(barProps);        
        this.tip.render(tipProps);
        this.secondTip.render(secondTipProps);
        this.pointer.render(pointerProps);
        this.secondPointer.render(secondPointerProps);
    }

    setObserver(viewObserver: ViewObserver){
        this.observer = viewObserver;
    }

    private createPointerObserver(): PointerObserver{
        return {
            startMove: (isSecond: boolean) => (this.observer?.pointerStartMove(isSecond)),
            move: (position: number, isSecond: boolean) => (this.observer?.pointerMove(position, isSecond)),
            endMove: (isSecond: boolean) => (this.observer?.pointerEndMove(isSecond)),
        }       
    }

    private createScaleObserver(): ScaleObserver{
        return {
            click: (position: number) => (this.observer?.clickOnScale(position)),
        }
    }
}