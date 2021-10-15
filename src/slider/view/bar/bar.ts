import "./bar.css"

interface BarInterface{
    render: (props: BarProps) => void;
}

export interface BarProps{
    progressbar: boolean;
    vertical: boolean;
    intervalStartPos: number;
    intervalEndPos: number;
}

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

        let properties = {
            length: props.vertical ? "height" : "width",
            offset: props.vertical ? "top" : "left",
        } 

        this.$progressSegment.css(properties.length, length + "%");
        this.$progressSegment.css(properties.offset, offset + "%");
    }
}