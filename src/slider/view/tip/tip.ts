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
        if (props.display === false){
            this.$tip.hide();
            return;
        } else
            this.$tip.show();

        let property = props.vertical ? "top" : "left";

        this.$tip.css(property, props.position + "%");
        this.$tip.text(props.value);
    }
}