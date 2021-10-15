import './slider/slider';

let $slider = $( "#slider" ).superSlider({
    pointerPosition: 10,
    secondPointerPosition: 90,
    minValue: 0,
    maxValue: 100,
    step: 10,
    typeRange: true,
    displayScale: true,
    displayTips: true,
    displayProgressBar: true,
    slide: () => {
        console.log("slide");
    }
});

let s2 = $( "#slider1" ).superSlider({
    typeVertical: true, 
    minValue: -50000,
    maxValue: 80000,
    secondPointerPosition: 10000,
    step: 1000,
    typeRange: true,
    displayScale: true,
    displayTips: true,
    displayProgressBar: true,
});

/*
$( "#slider2" ).superSlider();

$( "#slider3" ).superSlider();
*/
