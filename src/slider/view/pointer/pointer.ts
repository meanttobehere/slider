import './pointer.css'

export interface PointerProps{
    vertical?: boolean;
    position: number;
}

export default class Pointer
{
    private $pointer: JQuery;    

    constructor(node: JQuery)
    {
        this.$pointer = $('<div>', {class: 'slider__pointer'});
        node.append(this.$pointer);
    }

    render(props: PointerProps)
    {        
        if (props.vertical){
            let offset = props.position * this.$pointer.parent().height() / 100;
            this.$pointer.css("top", offset + "px");
            this.$pointer.css("left", 0);
        } else{
            let offset = props.position * this.$pointer.parent().width() / 100;
            console.log(offset);
            this.$pointer.css("left", offset + "px");
            this.$pointer.css("top", 0);
        }         
    }  
}