import './slider/plugin';

let $slider = $( "#slider" ).superSlider({
    pointerPosition: 10,
    secondPointerPosition: 90,
    minValue: 0,
    maxValue: 100,
    step: 10,
    slide: () => {
        console.log(2);
    }
});

$slider.superSlider({
    start: () => {
        console.log("start");
    }
})

$slider.superSlider({
    stop: () => {
        console.log("the end");
    },
    slide: () => {
        console.log("slide");
    }
})




/*
$( "#slider1" ).superSlider();

$( "#slider2" ).superSlider();

$( "#slider3" ).superSlider();*/