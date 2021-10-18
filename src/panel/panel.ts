import './panel.css'

declare global {
    interface JQuery {
        superSliderPanel: ($slider: JQuery) => void;
    }
}

$.fn.superSliderPanel = function($slider: JQuery): void
{
    createPanel(this, $slider);
} 

function createPanel(node: JQuery, $slider: JQuery){ 
    const $panelContainer = $("<div>", {class: "panel__container"});   
    const $togglesContainer = $("<div>", {class: "panel__toggels-container"});
    const $inputsContainer = $("<div>", {class: "panel__inputs-container"});
    node.append($panelContainer);
    $panelContainer.append($inputsContainer).append($togglesContainer);

    let slider = $slider.superSlider.bind($slider);

    const updateMinInput = createInput({
        node: $inputsContainer,
        title: "min",        
        callback: (value: number) => {
            slider("minValue", value);
        },
    });
    const updateMaxInput = createInput({
        node: $inputsContainer,
        title: "max",        
        callback: (value: number) => {
            slider("maxValue", value);
        },
    });
    const updateStepInput = createInput({
        node: $inputsContainer,
        title: "step",        
        callback: (value: number) => {
            slider("step", value);
        },
    });
    const updateFromInput = createInput({
        node: $inputsContainer,
        title: "from",        
        callback: (value: number) => {
            slider("pointerPosition", value);
        },
    });
    const updateToInput = createInput({
        node: $inputsContainer,
        title: "to",        
        callback: (value: number) => {
            slider("secondPointerPosition", value);
        },
    });
    const updateVerticalToggle = createToggle({
        node: $togglesContainer, 
        title: "vertical",        
        callback: (checked: boolean) => {            
            slider("typeVertical", checked);
        }
    });
    const updateRangeToggle = createToggle({
        node: $togglesContainer, 
        title: "range",        
        callback: (checked: boolean) => {            
            slider("typeRange", checked);
        }
    });
    const updateTipToggle = createToggle({
        node: $togglesContainer, 
        title: "tip",        
        callback: (checked: boolean) => {            
            slider("displayTips", checked);
        }
    }); 
    const updateBarToggle = createToggle({
        node: $togglesContainer, 
        title: "bar",         
        callback: (checked: boolean) => {            
            slider("displayProgressBar", checked);
        }
    });
    const updateScaleToggle = createToggle({
        node: $togglesContainer, 
        title: "scale",         
        callback: (checked: boolean) => {            
            slider("displayScale", checked);
        }
    }); 
    
    const updatePanel = () => {
        updateMaxInput({
            value: slider("maxValue"),
            step: slider("step"),
        });
        updateMinInput({
            value: slider("minValue"),
            step: slider("step"),
        })
        updateStepInput({
            value: slider("step"),
        })
        updateFromInput({
            value: slider("pointerPosition"),
            step: slider("step"),
        });
        updateToInput({
            value: slider("secondPointerPosition"),
            step: slider("step"),
            blocked: !slider("typeRange"),
        })
        updateVerticalToggle(slider("typeVertical"));
        updateRangeToggle(slider("typeRange"));
        updateTipToggle(slider("displayTips"));
        updateScaleToggle(slider("displayScale"));
        updateBarToggle(slider("displayProgressBar"));
    }
    
    updatePanel();
    $slider.on("sliderupdate", updatePanel);    
}

function createToggle(
    params: {
        node: JQuery, 
        title: string,        
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
    $checkbox.on("change", function(){        
        params.callback((this as HTMLInputElement).checked);
    });

    function update(value:boolean){
        $checkbox.prop("checked", value);
    }

    return update;
}

function createInput(
    params: {
        node: JQuery, 
        title: string, 
        callback: (value: number) => void
    }){
    let $input = $("<div>", {class: "input"});
    let $title = $("<div>", {class: "input__title"});
    let $textarea = $("<input>", {type: "number", class: "input__textarea"});    
   
    params.node.append($input);
    $input
        .append($title)
        .append($textarea);

    $textarea.val(0);
    $textarea.attr("step", 1);
    $title.text(params.title);
    $textarea.on("change", function(){
        params.callback(parseInt($(this).val() as string));
    })

    function update(
        params: { 
            value?: number,
            step?: number,
            blocked?: boolean,  
        }){
        if (params.value !== undefined)        
            $textarea.val(params.value);
        if (params.step !== undefined)
            $textarea.attr("step", params.step);
        if (params.blocked !== undefined){
            $textarea.prop("disabled", params.blocked);    
            params.blocked ? $input.addClass("input_blocked") : $input.removeClass("input_blocked");
        }
    }
    
    return update;
}