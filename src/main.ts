import View from './slider/view/view';
import { ViewProps } from './slider/view/view';

declare global {
    interface JQuery {
        superSlider(): void;
    }
}

$.fn.superSlider = function()
{
    let view = new View(this);

    let viewProps: ViewProps = {
        typeVertical: false,
        typeRange: true,
        displayTips: true,
        displayProgressBar: true,
        displayScale: true,
        minValue: 0,
        maxValue: 100,
        step: 10,
        pointerPosition: 30,
        secondPointerPosition: 70,
        tipValue: "30",
        secondTipValue: "70",
    }
    
    view.render(viewProps);

    view.setPointersDragEventHandler((distance: number, isSecondPointer: boolean) => {
        if (isSecondPointer){
            let newPos = viewProps.secondPointerPosition + distance;

            if (newPos > 100)
                newPos = 100;
            else if (newPos <  viewProps.pointerPosition)
                newPos = viewProps.pointerPosition;
            
            viewProps.secondPointerPosition = newPos;
            viewProps.secondTipValue = newPos.toString();
        } else {
            let newPos = viewProps.pointerPosition + distance;

            if (newPos < 0)
                newPos = 0;
            else if (newPos > viewProps.secondPointerPosition)
                newPos = viewProps.secondPointerPosition;
            
            viewProps.pointerPosition = newPos;
            viewProps.tipValue = newPos.toString();
        }
        
        view.render(viewProps);
    })
}

$( "#slider" ).superSlider();
