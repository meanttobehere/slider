import './tip.css'

interface TipInterface{
    render: (props: TipProps) => void;
}

export interface TipProps{
    display: boolean;
    vertical: boolean;
    position: number;
    value: string;
}

export default class Tip
{
    private $tip: JQuery;

    constructor(node: JQuery)
    {
        this.$tip = $("<div>", {class: "slider__tip"});
        node.append(this.$tip);
    }

    render(props: TipProps)
    {
        this.$tip.css("left", props.position + "%");
        this.$tip.text(props.value);
    }
}