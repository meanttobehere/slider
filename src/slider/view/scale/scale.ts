import './scale.css';

interface ScaleInterface{
    render: (props: ScaleProps) => void;
    setClickEventHandler: (eventHandler: ScaleClickEventHandler) => void;
}

export interface ScaleProps{
    display: boolean;
    vertical: boolean;
    labels: Array<string>;
}

export type ScaleClickEventHandler = (labelNum: number) => void;

export default class Scale implements ScaleInterface
{
    private $scale: JQuery;
    private clickEventHandler: ScaleClickEventHandler;

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
        
        while (this.$scale.children().length < props.labels.length){
            let $label = $("<div>", {class: "slider__scale-label"});
            this.$scale.append($label);            
            $label.on("click", () => {
                this.clickEventHandler?.(this.$scale.children().index($label));
            })
        }

        this.$scale.children().filter(function(idx){
            return idx >= props.labels.length
        }).remove();
        
        let property = props.vertical ? "top" : "left";
        this.$scale.children().each(function(idx){            
            $(this).text(props.labels[idx]);
            $(this).css(property, (idx / (props.labels.length - 1)) * 100 + "%");
        });
    }

    setClickEventHandler(eventHandler: ScaleClickEventHandler){
        this.clickEventHandler = eventHandler;
    }
}