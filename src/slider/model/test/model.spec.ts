import Model from '../model';
import { ModelDataDefault, ModelObserver, ModelUpdateEventOptions } from '../modelInterface';

function isItNumberMultiplier(num: number, multiplier: number): boolean{    
    let reminder = num % multiplier;
    return (reminder <= multiplier / 1000 || multiplier - reminder <= multiplier / 1000);  
}

describe("Model constructor, setters and getters", () => {
    let model = new Model();
    beforeEach(() => {
        model = new Model();
    });

    it("Model constructor set model state equal to ModelDataDefault, getters work fine", () => {               
        expect(model.getTypeVertical()).toBe(ModelDataDefault.typeVertical);
        expect(model.getTypeRange()).toBe(ModelDataDefault.typeRange);
        expect(model.getDisplayTips()).toBe(ModelDataDefault.displayTips);
        expect(model.getDisplayProgressBar()).toBe(ModelDataDefault.displayProgressBar);
        expect(model.getDisplayScale()).toBe(ModelDataDefault.displayScale);
        expect(model.getMinValue()).toBe(ModelDataDefault.minValue);
        expect(model.getMaxValue()).toBe(ModelDataDefault.maxValue);
        expect(model.getStep()).toBe(ModelDataDefault.step);
        expect(model.getPointerPosition()).toBe(ModelDataDefault.pointerPosition);
        expect(model.getSecondPointerPosition()).toBe(ModelDataDefault.secondPointerPosition);
        expect(model.getData()).toEqual(ModelDataDefault);
    });

    it("ModelDataDefault shoud be correct state of model", () => {
        let isCorrect: boolean = true;
        isCorrect = model.getMinValue() < model.getMaxValue();
        isCorrect = model.getStep() > 0;
        isCorrect = model.getPointerPosition() >= model.getMinValue();
        isCorrect = model.getPointerPosition() <= model.getMaxValue();
        isCorrect = isItNumberMultiplier(model.getPointerPosition(), model.getStep()); 
        if (model.getTypeRange() == true){
            isCorrect = model.getSecondPointerPosition() >= model.getMinValue();
            isCorrect = model.getSecondPointerPosition() <= model.getMaxValue();
            isCorrect = model.getPointerPosition() <= model.getSecondPointerPosition();
            isCorrect = isItNumberMultiplier(model.getSecondPointerPosition(), model.getStep());
        }
        expect(isCorrect).toBeTrue();
    })

    it("Model setters set values and notify observer", () => {             
        let observer: ModelObserver = {update: (options: ModelUpdateEventOptions) => {}}
        model.setObserver(observer); 
        const spy = spyOn(observer, "update");

        model.setTypeRange(!ModelDataDefault.typeVertical);
        expect(model.getTypeRange()).toEqual(!ModelDataDefault.typeVertical);         
        expect(spy).toHaveBeenCalledWith({updatedOnlyPointersPositions: false});
        spy.calls.reset();

        model.setTypeRange(!ModelDataDefault.typeRange);
        expect(model.getTypeRange()).toEqual(!ModelDataDefault.typeRange);         
        expect(spy).toHaveBeenCalledWith({updatedOnlyPointersPositions: false});
        spy.calls.reset();
        
        model.setTypeRange(!ModelDataDefault.displayTips);
        expect(model.getTypeRange()).toEqual(!ModelDataDefault.displayTips);         
        expect(spy).toHaveBeenCalledWith({updatedOnlyPointersPositions: false});
        spy.calls.reset();
        
        model.setTypeRange(!ModelDataDefault.displayProgressBar);
        expect(model.getTypeRange()).toEqual(!ModelDataDefault.displayProgressBar);         
        expect(spy).toHaveBeenCalledWith({updatedOnlyPointersPositions: false});
        spy.calls.reset();
        
        model.setTypeRange(!ModelDataDefault.displayScale);
        expect(model.getTypeRange()).toEqual(!ModelDataDefault.displayScale);         
        expect(spy).toHaveBeenCalledWith({updatedOnlyPointersPositions: false});
        spy.calls.reset();
        
        model.setMinValue(ModelDataDefault.minValue - 100);
        expect(model.getMinValue()).toEqual(ModelDataDefault.minValue - 100);
        expect(spy).toHaveBeenCalledWith({updatedOnlyPointersPositions: false});
        spy.calls.reset();
        
        model.setMaxValue(ModelDataDefault.maxValue + 100);
        expect(model.getMaxValue()).toEqual(ModelDataDefault.maxValue + 100);
        expect(spy).toHaveBeenCalledWith({updatedOnlyPointersPositions: false});
        spy.calls.reset();

        model.setStep(ModelDataDefault.step / 2);
        expect(model.getStep()).toEqual(ModelDataDefault.step / 2);
        expect(spy).toHaveBeenCalledWith({updatedOnlyPointersPositions: false});
        spy.calls.reset();

        model.setPointerPosition(ModelDataDefault.minValue);
        expect(model.getPointerPosition()).toEqual(ModelDataDefault.minValue);
        expect(spy).toHaveBeenCalledWith({updatedOnlyPointersPositions: true});
        spy.calls.reset();

        model.setSecondPointerPosition(ModelDataDefault.maxValue);
        expect(model.getSecondPointerPosition()).toEqual(ModelDataDefault.maxValue);
        expect(spy).toHaveBeenCalledWith({updatedOnlyPointersPositions: true});
        spy.calls.reset();
        
        model.setPointerPositionInPercent(0);
        expect(model.getPointerPositionInPercent()).toBeCloseTo(0);
        expect(spy).toHaveBeenCalledWith({updatedOnlyPointersPositions: true});
        spy.calls.reset();

        model.setSecondPointerPositionInPercent(100);
        expect(model.getSecondPointerPositionInPercent()).toBeCloseTo(100);
        expect(spy).toHaveBeenCalledWith({updatedOnlyPointersPositions: true});
        spy.calls.reset();
    })
});

describe("Minvalue shoud be stricly less than maxvalue", () => {
    let model: Model;
    beforeEach(() => {
        model = new Model();
    });

    it("If you try to set minvalue, that is more than maxvalue, it will set the minvalue equal to the given value and set the maxvalue equal to the minvalue + 1", () => {        
        let newMinValue = ModelDataDefault.maxValue + 100;        
        model.setMinValue(newMinValue);
        expect(model.getMinValue()).toEqual(newMinValue);
        expect(model.getMaxValue()).toEqual(newMinValue + 1);
    });

    it("If you try to set maxvalue, that is less than minvalue, it will set maxvalue equal to the given value and set the minvalue equal maxvalue - 1", () => {
        let newMaxValue = ModelDataDefault.minValue - 100;
        model.setMaxValue(newMaxValue);
        expect(model.getMaxValue()).toEqual(newMaxValue);
        expect(model.getMinValue()).toEqual(newMaxValue - 1);
    });
});

describe("Pointers position shoud be inside min-max interval, secondPointerPosition shoud be more or equal to pointerPosition", () => {
    let model: Model;
    beforeEach(() => {
        model = new Model();
    });

    it("If you try to set pointerPosition outside min-max interval, pointerPosition shoud stay inside min-max interval", () => {
        model.setTypeRange(false);
        model.setPointerPosition(ModelDataDefault.minValue - 1);
        expect(model.getPointerPosition()).toEqual(ModelDataDefault.minValue);
        model.setPointerPosition(ModelDataDefault.maxValue + 1);
        expect(model.getPointerPosition()).toEqual(ModelDataDefault.maxValue);
    });

    it("If you try to set pointerPosition more than secondPointerPosition, pointerPosition shoud be equal to secondPointerPosition", () => {
        model.setTypeRange(true);
        model.setPointerPosition(ModelDataDefault.secondPointerPosition + 1);
        expect(model.getPointerPosition()).toEqual(ModelDataDefault.secondPointerPosition);       
    });

    it("If you try to set secondPointerPosition less than pointerPosition, secondPointerPosition shoud be equal to pointerPosition", () => {
        model.setTypeRange(true);
        model.setSecondPointerPosition(ModelDataDefault.pointerPosition - 1);        
        expect(model.getSecondPointerPosition()).toEqual(ModelDataDefault.pointerPosition);
    });

    it("If you try to set secondPointerPosition outside min-max interval, secondPointerPosition shoud stay inside min-max interval", () => {
        model.setTypeRange(true);
        model.setSecondPointerPosition(ModelDataDefault.maxValue + 1);        
        expect(model.getSecondPointerPosition()).toEqual(ModelDataDefault.maxValue);
        model.setPointerPosition(ModelDataDefault.minValue - 1);
        model.setSecondPointerPosition(ModelDataDefault.minValue - 1);
        expect(model.getSecondPointerPosition()).toEqual(ModelDataDefault.minValue);
    });
});

describe("Pointers positions shoud be multiples of step, step shoud be stricly more than 0", () => {
    let model: Model;
    beforeEach(() => {
        model = new Model();
    });

    it("If you try to set step less or equal to 0, it will set step equal to 1", () => {
        model.setStep(-1);
        expect(model.getStep()).toEqual(1);
        model.setStep(0);
        expect(model.getStep()).toEqual(1);
    });

    it("When you set step, pointers positions shoud be updated, to be multiples of step", () => {
        model.setTypeRange(true);
        model.setMaxValue(100);
        model.setMinValue(0);
        model.setPointerPosition(25);
        model.setSecondPointerPosition(75);
        model.setStep(1.784564575);        
        expect(isItNumberMultiplier(model.getPointerPosition(), model.getStep())).toBeTrue();
        expect(isItNumberMultiplier(model.getSecondPointerPosition(), model.getStep())).toBeTrue(); 
    })

    it("When you set pointers positions, they will be set to multiples of the step", () => {
        model.setTypeRange(true);
        model.setMaxValue(100);
        model.setMinValue(0);
        model.setStep(1.784564575); 
        model.setPointerPosition(25);
        model.setSecondPointerPosition(75);
        expect(isItNumberMultiplier(model.getPointerPosition(), model.getStep())).toBeTrue();
        expect(isItNumberMultiplier(model.getSecondPointerPosition(), model.getStep())).toBeTrue(); 
    });
})

describe("Functions operating in percent work correctly", () => {
    let model: Model;
    beforeEach(() => {
        model = new Model();
    });

    it("Getters shoud return what setters have set", () => {
        model.setMaxValue(100);
        model.setMinValue(0);
        model.setStep(5);        
        model.setTypeRange(false);                
        model.setPointerPositionInPercent(35);
        model.setTypeRange(true);
        model.setSecondPointerPositionInPercent(75);
        expect(model.getPointerPositionInPercent()).toBeCloseTo(35);
        expect(model.getSecondPointerPositionInPercent()).toBeCloseTo(75);
        expect(model.getStepInPercent()).toBeCloseTo(5);       
    })
});