import "./bar.css"

interface BarInterface{
    render: (props: BarProps) => void;
    setClickEventHandler: (eventHandler: BarClickEventHandler) => void;
}

export interface BarProps{
    progressbar?: boolean;
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
        let width = this.$progressSegment.parent().width() * (props.intervalEndPos - props.intervalStartPos) / 100;
        let offset = this.$progressSegment.parent().width() * props.intervalStartPos / 100;

        this.$progressSegment.css("width", width + "px");
        this.$progressSegment.css("left", offset + "px");
    }

    setClickEventHandler(eventHandler: BarClickEventHandler){
        
    }
}