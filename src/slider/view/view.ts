import './view.css'

import Pointer from "./pointer/pointer";
import { PointerProps } from "./pointer/pointer";
import Bar from "./bar/bar";

export default class View{
    private $container: JQuery;
    private pointers: Array<Pointer>;
    private bar: Bar;
    
    constructor(node: JQuery){
        this.$container = $('<div>', {class: 'slider__container'});
        node.append(this.$container);

        this.bar = new Bar();
        this.pointers = [];
        this.pointers.push(new Pointer(this.$container));
        this.pointers.push(new Pointer(this.$container));
    }

    render(props: ViewProps){
        this.bar.render();
        this.pointers.forEach((pointer, idx) => pointer.render(props.pointersProps[idx]));        
    }
}

interface ViewProps{
    pointersProps: Array<PointerProps>;
}