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
    private startMoveEventHandler: PointerStartMoveEventHandler;
    private moveEventHandler: PointerMoveEventHandler;
    private endMoveEventHandler: PointerEndMoveEventHandler;    

    constructor(node: JQuery, isSecond?: boolean){
        this.$pointer = $('<div>', {class: 'slider__pointer'});
        node.append(this.$pointer);
        this.isSecond = isSecond ? true : false;
        this.initDragEvents();
    }

    render(props: PointerProps){        
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
        let offset: number;
        
        let pointerMouseMove = (function mouseMoveEvent(event: MouseEvent){
            let pos = event.clientX - offset;
            let distance = pos - this.$pointer[0].getBoundingClientRect().left;
            let distancePercent = distance / this.$pointer.parent().width() * 100;
            this.moveEventHandler?.(distancePercent, this.isSecond);
        }).bind(this);

        let pointerMouseUpEvent = (function mouseUpEvent(){
            document.removeEventListener('mousemove', pointerMouseMove);  
            this.endMoveEventHandler?.(this.isSecond);
        }).bind(this);

        let pointerMoueseDownEvent = (function mouseDownEvent(event: MouseEvent){
            document.addEventListener('mousemove', pointerMouseMove);
            document.addEventListener('mouseup', pointerMouseUpEvent, {once: true});
            offset = event.offsetX;
            this.startMoveEventHandler?.(this.isSecond);        
        }).bind(this);        
        
        this.$pointer.on("mousedown", pointerMoueseDownEvent);        
    }
}