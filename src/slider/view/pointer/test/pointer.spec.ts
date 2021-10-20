import Pointer from "../pointer"
import { PointerProps } from "../pointerInterface";

describe('Pointer', () => {
    let pointer: Pointer;
    let $pointer: JQuery;
    let $parent: JQuery;
    const props: PointerProps = {
        display: true,
        vertical: false,
        position: 30,
    }

    beforeEach(() => {
        $parent = $('<div>', {class: 'bar__container'});
        pointer = new Pointer($parent);
        $pointer = $parent.children().first();
    })

    it("constructor should create element $pointer with class 'slider__pointer' on parent node", () => {
        expect($pointer).toHaveClass('slider__pointer');
    });
    
    it("method 'render' should update pointer state correctly", () => {
        pointer.render(props);
        expect($pointer.css("display")).toEqual("");
        expect($pointer.css("left")).toEqual("30%");
        expect($pointer.css("top")).toEqual("");

        let newProps = {...props, ...{vertical: true, position: 83}};
        pointer.render(newProps);
        expect($pointer.css("display")).toEqual("");
        expect($pointer.css("left")).toEqual("");
        expect($pointer.css("top")).toEqual("83%");

        newProps = {...props, ...{display: false}};
        pointer.render(newProps);
        expect($pointer.css("display")).toEqual("none");
    })
})