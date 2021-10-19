import './tip.css'
import { TipInterface, TipProps } from './tipInterface';

export default class Tip implements TipInterface
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

        if (props.vertical)
            this.$tip.css({"top": props.position + "%", "left": ""});
        else
            this.$tip.css({"left": props.position + "%", "top": ""});
            
        this.$tip.text(props.value);
    }
}