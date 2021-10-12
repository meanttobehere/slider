import './pointer.css'

interface PointerInterface{    
    render: (props: PointerProps) => void;
    setDragEventHandler: (eventHandler: PointerDragEventHandler) => void;
}

export interface PointerProps{
    vertical: boolean;
    position: number;
}

export type PointerDragEventHandler = (distance: number, isSecond?: boolean) => void;

export default class Pointer implements PointerInterface
{
    private $pointer: JQuery;
    private dragEventHandler: PointerDragEventHandler;
    private isSecond: boolean;

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

    setDragEventHandler(dragEventHandler: PointerDragEventHandler){
        this.dragEventHandler = dragEventHandler;
    }

    private initDragEvents()
    {
        let offset: number;
        
        let pointerMouseMove = (function mouseMoveEvent(event: MouseEvent){
            this.userPointerMoveEvent(event.clientX - offset);
        }).bind(this);

        let pointerMouseUpEvent = function mouseUpEvent(){
            document.removeEventListener('mousemove', pointerMouseMove);  
        }

        let pointerMoueseDownEvent = (function mouseDownEvent(event: MouseEvent){
            document.addEventListener('mousemove', pointerMouseMove);
            document.addEventListener('mouseup', pointerMouseUpEvent, {once: true});
            offset = event.offsetX; 
            console.log(offset);          
        }).bind(this);        
        
        this.$pointer.on("mousedown", pointerMoueseDownEvent);        
    }   

    userPointerMoveEvent(pos: number)
    {
        let offset = pos - this.$pointer[0].getBoundingClientRect().left;
        console.log(offset);
        let distance = offset / this.$pointer.parent().width() * 100;

        if (this.dragEventHandler)
            this.dragEventHandler(distance, this.isSecond);         
    }
}