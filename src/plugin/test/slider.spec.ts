
describe('function superSlider', () => {
    let $slider: JQuery;

    beforeEach(() => {      
        $slider = $('<div>', {class: 'slider'});
        $slider.superSlider();
    });

    it('should update state correctly', () => {
       const slider = $slider.superSlider.bind($slider);

       slider("maxValue", 77);
       slider("minValue", -77); 
       slider("step", 7);
       slider("pointerPosition", 28);
       slider("secondPointerPosition", 35);
       slider("displayScale", false); 
       slider("displayTips", false);
       slider("displayProgressBar", false);
       slider("typeRange", true);
       slider("typeVertical", true);

       expect(slider("maxValue")).toBe(77);
       expect(slider("minValue")).toBe(-77); 
       expect(slider("step")).toBe(7);
       expect(slider("pointerPosition")).toBe(28);
       expect(slider("secondPointerPosition")).toBe(35);
       expect(slider("displayScale")).toBe(false); 
       expect(slider("displayTips")).toBe(false);
       expect(slider("displayProgressBar")).toBe(false);
       expect(slider("typeRange")).toBe(true);
       expect(slider("typeVertical")).toBe(true);
    });
});