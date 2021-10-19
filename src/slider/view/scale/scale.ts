import './scale.css';
import { ScaleInterface, ScaleObserver, ScaleProps } from './scaleInterface';

export default class Scale implements ScaleInterface
{
    private $scale: JQuery;
    private observer: ScaleObserver;

    constructor(node: JQuery){
        this.$scale = $("<div>", {class: "slider__scale"});
        node.append(this.$scale);        
    }

    render(props: ScaleProps)
    {
        if (props.display === false){
            this.$scale.hide();
            return;
        } else
            this.$scale.show();        
        
        while (this.$scale.children().length != props.labels.length){
            if (this.$scale.children().length < props.labels.length){            
                let $label = $("<div>", {class: "slider__scale-label"});
                this.$scale.append($label);
            } else{
                this.$scale.children().last().remove();
            }
        }

        props.labels.forEach((label, idx) => {
            let $label = $(this.$scale.children()[idx]);
            
            $label.off("click");
            $label.on("click", () => {                
                this.observer?.click(label.pos);                              
            })
            
            $label.text(label.val);
            if (props.vertical)
                $label.css({"top": label.pos + "%", "left": ""});
            else
                $label.css({"left": label.pos + "%", "top": ""});
        })        
    }

    setObserver(observer: ScaleObserver){
        this.observer = observer;
    }
}