import View from './slider/view/view';

declare global {
    interface JQuery {
        superSlider(): void;
    }
}

$.fn.superSlider = function()
{
    let view = new View(this);
    
    view.render({
        pointersProps: [
            {
                position: 0,                
            },
            {
                position: 100,                
            }
        ]
    });
}

$( "#slider" ).superSlider();
