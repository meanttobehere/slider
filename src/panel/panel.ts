import './panel.css'

declare global {
    interface JQuery {
        superSliderPanel: (options?: object | string, arg?: any) => JQuery;
    }
}

$.fn.superSliderPanel = function($slider: JQuery) : JQuery
{
    const panel = createPanel(this, $slider);
    return this;
} 

function createPanel(node: JQuery, $slider: JQuery){    
    const updateTypeVertical = createToggle({
        node: node, 
        title: "type vertical",
        default: $slider.superSlider("typeVertical"),
        callback: (checked: boolean) => {            
            $slider.superSlider("typeVertical", checked);
        }
    });
    const updateTypeRange = createToggle({
        node: node, 
        title: "type range",
        default: $slider.superSlider("typeRange"),
        callback: (checked: boolean) => {            
            $slider.superSlider("typeRange", checked);
        }
    });
    const updateDisplayTips = createToggle({
        node: node, 
        title: "display tips",
        default: $slider.superSlider("displayTips"),
        callback: (checked: boolean) => {            
            $slider.superSlider("displayTips", checked);
        }
    }); 
    const updateDisplayBar = createToggle({
        node: node, 
        title: "diplsay progress bar",
        default: $slider.superSlider("displayProgressBar"), 
        callback: (checked: boolean) => {            
            $slider.superSlider("displayProgressBar", checked);
        }
    });
    const updateDisplayScale = createToggle({
        node: node, 
        title: "display scale",
        default: $slider.superSlider("displayScale"), 
        callback: (checked: boolean) => {            
            $slider.superSlider("displayScale", checked);
        }
    }); 
    const updateMaxValue = createInput({
        node: node,
        title: "max value",
        default: $slider.superSlider("maxValue"),
        callback: (value: number) => {
            $slider.superSlider("maxValue", value);
        }
    })
    const updateMinValue = createInput({
        node: node,
        title: "min value",
        default: $slider.superSlider("minValue"),
        callback: (value: number) => {
            $slider.superSlider("minValue", value);
        }
    })
    const updateStep = createInput({
        node: node,
        title: "step",
        default: $slider.superSlider("step"),
        callback: (value: number) => {
            $slider.superSlider("step", value);
        }
    })
    const updatePointerPosition = createInput({
        node: node,
        title: "pointer position",
        default: $slider.superSlider("pointerPosition"),
        callback: (value: number) => {
            $slider.superSlider("pointerPosition", value);
        }
    })
    const updateSecondPointerPosition = createInput({
        node: node,
        title: "second pointer position",
        default: $slider.superSlider("secondPointerPosition"),
        callback: (value: number) => {
            $slider.superSlider("secondPointerPosition", value);
        }
    })

    $slider.superSlider("update", () => {
        updateTypeVertical($slider.superSlider("typeVertical"));
        updateTypeRange($slider.superSlider("typeRange"));
        updateDisplayTips($slider.superSlider("displayTips"));
        updateDisplayBar($slider.superSlider("displayProgressBar"));
        updateDisplayScale($slider.superSlider("displayScale"));
        updateMaxValue($slider.superSlider("maxValue"));
        updateMinValue($slider.superSlider("minValue"));
        updateStep($slider.superSlider("step"));
        updatePointerPosition($slider.superSlider("pointerPosition"));
        updateSecondPointerPosition($slider.superSlider("secondPointerPosition"));
    })
}

function createToggle(
    params: {
        node: JQuery, 
        title: string,
        default: boolean, 
        callback: (checked: boolean) => void,
    }){
    let $toggle = $("<div>", {class: "toggle"});
    let $title = $("<div>", {class: "toggle__title"});
    let $label = $("<label>", {class: "toggle__label"});
    let $checkbox = $("<input>", {type: "checkbox", class: "toggle__input"});
    let $slider = $("<div>", {class: "toggle__slider"});
    let $border = $("<div>", {class: "toggle__border"});

    params.node.append($toggle);    
    $toggle.append($label);
    $label
        .append($checkbox)
        .append($slider)
        .append($border);  
    $toggle.append($title); 
        
    $title.text(params.title);
    $checkbox.prop("checked", params.default);    
    $checkbox.on("change", function(){        
        params.callback((this as HTMLInputElement).checked);
    });

    return ((value: boolean) => {$checkbox.prop("checked", value)});
}

function createInput(
    params: {
        node: JQuery, 
        title: string,
        default: number,
        callback: (value: number) => void,
    }){
    let $input = $("<div>", {class: "input"});
    let $title = $("<div>", {class: "input__title"});
    let $textarea = $("<input>", {type: "number", class: "input__textarea"});    

    params.node.append($input);
    $input
        .append($title)
        .append($textarea);

    $title.text(params.title);
    $textarea.val(params.default);
    $textarea.on("change", function(){
        params.callback($(this).val() as number);
    })

    return ((value: number) => {$textarea.val(value)});
}