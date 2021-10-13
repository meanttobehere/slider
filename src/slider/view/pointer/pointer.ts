import './pointer.css'

interface PointerInterface{    
    render: (props: PointerProps) => void;
    setEventsHandlers: (
        startMoveEventHandler: PointerStartMoveEventHandler,
        moveEventHandler: PointerMoveEventHandler,
        endMoveEventHandler: PointerEndMoveEventHandler
    ) => void;
}

export interface PointerProps{
    display: boolean,
    vertical: boolean;
    position: number;
}

export type PointerMoveEventHandler = (distance: number, isSecond: boolean) => void;
export type PointerStartMoveEventHandler = (isSecond: boolean) => void;
export type PointerEndMoveEventHandler = (isSecond: boolean) => void;

export default class Pointer implements PointerInterface
{
    private $pointer: JQuery;    
    private isSecond: boolean;
    private isVertical: boolean;
    private startMoveEventHandler: PointerStartMoveEventHandler;
    private moveEventHandler: PointerMoveEventHandler;
    private endMoveEventHandler: PointerEndMoveEventHandler;    

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
        if (props.vertical)
            this.isVertical = true;
        
        if (props.vertical){            
            this.$pointer.css("top", props.position + "%");
            this.$pointer.css("left", "50%");
        } else{            
            this.$pointer.css("left", props.position + "%");
            this.$pointer.css("top", "50%");
        }     
    }

    setEventsHandlers(
        startMoveEventHandler: PointerStartMoveEventHandler,
        moveEventHandler: PointerMoveEventHandler,
        endMoveEventHandler: PointerEndMoveEventHandler
    ){
        this.startMoveEventHandler = startMoveEventHandler;
        this.moveEventHandler = moveEventHandler;
        this.endMoveEventHandler = endMoveEventHandler;
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
            this.moveEventHandler?.(this.isVertical ? distancePercentY : distancePercentX, this.isSecond);
        }).bind(this);

        let pointerMouseUpEvent = (function mouseUpEvent(){
            document.removeEventListener('mousemove', pointerMouseMove);  
            this.endMoveEventHandler?.(this.isSecond);
        }).bind(this);

        let pointerMoueseDownEvent = (function mouseDownEvent(event: MouseEvent){
            document.addEventListener('mousemove', pointerMouseMove);
            document.addEventListener('mouseup', pointerMouseUpEvent, {once: true});
            offsetX = event.offsetX; 
            offsetY = event.offsetY;        
            this.startMoveEventHandler?.(this.isSecond);        
        }).bind(this);        
        
        this.$pointer.on("mousedown", pointerMoueseDownEvent);        
    }
}