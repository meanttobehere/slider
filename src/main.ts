import './slider/slider';
import './panel/panel';

let $slider: JQuery;

$slider = $( "#slider1" ).superSlider(
    {
        pointerPosition: 10,
        secondPointerPosition: 90,
        minValue: 0,
        maxValue: 100,
        step: 5,
        typeVertical: false,
        typeRange: true,
        displayScale: false,
        displayTips: true,
        displayProgressBar: true,    
    }
);
$("#panel1").superSliderPanel($slider);

$slider.on("sliderupdate", () => (console.log("slide")));