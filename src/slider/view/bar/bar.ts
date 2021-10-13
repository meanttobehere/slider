import "./bar.css"

interface BarInterface{
    render: (props: BarProps) => void;
    setClickEventHandler: (eventHandler: BarClickEventHandler) => void;
}

export interface BarProps{
    progressbar: boolean;
    vertical: boolean;
    intervalStartPos: number;
    intervalEndPos: number;
}

export type BarClickEventHandler = (position: number) => void;

export default class Bar implements BarInterface{
    private $bar: JQuery;
    private $progressSegment: JQuery;

    constructor(node: JQuery)
    {
        this.$bar = $("<div>", {class: "slider__bar"});
        this.$progressSegment = $("<div>", {class: "slider__progressSegment"});

        node.append(this.$bar);
        this.$bar.append(this.$progressSegment);
    }

    render(props: BarProps)
    {        
        if (props.progressbar === false){
            this.$progressSegment.hide();
            return;
        }
        else
            this.$progressSegment.show();
        
        let length = props.intervalEndPos - props.intervalStartPos;
        let offset = props.intervalStartPos;

        let propertys = {
            length: props.vertical ? "height" : "width",
            offset: props.vertical ? "top" : "left",
        } 

        this.$progressSegment.css(propertys.length, length + "%");
        this.$progressSegment.css(propertys.offset, offset + "%");

        if (props.vertical){
            this.$bar.addClass("slider__bar_vertical");
            this.$progressSegment.addClass("slider__progressSegment_vertical")
        }
    }

    setClickEventHandler(eventHandler: BarClickEventHandler){
        
    }
}