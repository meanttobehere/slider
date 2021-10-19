import './pointer.css'
import { PointerInterface, PointerObserver, PointerProps } from './pointerInterface';

export default class Pointer implements PointerInterface
{
    private $pointer: JQuery;
    private observer: PointerObserver;   
    private isSecond: boolean;
    private isVertical: boolean;    

    constructor(node: JQuery, isSecond?: boolean){
        this.$pointer = $('<div>', {class: 'slider__pointer'});
        node.append(this.$pointer);
        if (isSecond){
            this.isSecond = isSecond ? true : false;
            this.$pointer.addClass("slider__pointer_second");
        }
        this.initDragEvents();
    }

    render(props: PointerProps){
        if (props.display === false){
            this.$pointer.hide();
            return;
        } else
            this.$pointer.show();
       
        this.isVertical = props.vertical;        
        
        if (props.vertical){            
            this.$pointer.css("top", props.position + "%");
            this.$pointer.css("left", "50%");
        } else{            
            this.$pointer.css("left", props.position + "%");
            this.$pointer.css("top", "50%");
        }     
    }

    setObserver(observer: PointerObserver){
        this.observer = observer;
    }

    private initDragEvents()
    {
        let offsetX: number;
        let offsetY: number;     
        
        let pointerMouseMove = (function mouseMoveEvent(event: MouseEvent){
            let posX = event.clientX - offsetX;
            let posY = event.clientY - offsetY;
            let distanceX = posX - this.$pointer[0].getBoundingClientRect().left;
            let distanceY = posY - this.$pointer[0].getBoundingClientRect().top;
            let distancePercentX = distanceX / this.$pointer.parent().width() * 100;
            let distancePercentY = distanceY / this.$pointer.parent().height() * 100;
            this.observer?.move(this.isVertical ? distancePercentY : distancePercentX, this.isSecond);
        }).bind(this);

        let pointerMouseUpEvent = (function mouseUpEvent(){
            $(document).off("mousemove", pointerMouseMove);
            this.observer?.endMove(this.isSecond);
        }).bind(this);

        let pointerMoueseDownEvent = (function mouseDownEvent(event: MouseEvent){
            $(document).on("mousemove", pointerMouseMove);
            $(document).one("mouseup", pointerMouseUpEvent);
            offsetX = event.offsetX; 
            offsetY = event.offsetY;        
            this.observer?.startMove(this.isSecond);        
        }).bind(this);        
        
        this.$pointer.on("mousedown", pointerMoueseDownEvent);      
    }
}