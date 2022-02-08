(()=>{"use strict";var e={894:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(81),o=n.n(i),a=n(645),s=n.n(a)()(o());s.push([e.id,".container{margin:auto;max-width:900px}.container__group{margin:auto;margin-bottom:80px}.container__slider{margin:auto;padding:0 60px;margin-bottom:30px}.container__panel{padding:0 20px;max-width:max-content;margin:auto}",""]);const r=s},526:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(81),o=n.n(i),a=n(645),s=n.n(a)()(o());s.push([e.id,".input{display:flex;color:var(--panel-white-color);width:max-content;height:2.4em}.input__title{min-width:3.5em;border-radius:1.2em 0 0 1.2em;background:var(--panel-primary-color);display:flex;align-items:center;justify-content:center;user-select:none}.input__textarea{font-family:inherit;font-size:inherit;font-weight:inherit;color:var(--panel-gray-color);max-width:5em;padding:0 .5em;border-radius:0 1.2em 1.2em 0;box-sizing:border-box;border:1px solid var(--panel-primary-color);background:var(--panel-white-color);outline:none}.input__textarea:disabled{border-color:var(--panel-lightgray-color);color:var(--panel-lightgray-color)}.input_blocked .input__title{background:var(--panel-lightgray-color)}",""]);const r=s},108:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(81),o=n.n(i),a=n(645),s=n.n(a)()(o());s.push([e.id,':root{--panel-primary-color: #47ad72;--panel-white-color: white;--panel-gray-color: #3f3f3f;--panel-lightgray-color: #999999;--panel-mainsize: 15px}.panel{max-width:max-content;font-family:"Sans-Serif";font-style:normal;font-weight:bold;font-size:var(--panel-mainsize);-webkit-tap-highlight-color:transparent}@media screen and (max-width: 900px){.panel{display:flex;gap:1.3em;font-size:14px}}.panel__inputs-container{max-width:800px;display:flex;justify-content:center;flex-wrap:wrap;gap:1.5em;margin-bottom:1.5em}@media screen and (max-width: 900px){.panel__inputs-container{flex-flow:column;justify-content:space-between;margin-bottom:0}}.panel__toggles-container{display:flex;flex-wrap:wrap;gap:1.5em;justify-content:center}@media screen and (max-width: 900px){.panel__toggles-container{flex-flow:column;justify-content:space-between}}',""]);const r=s},857:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(81),o=n.n(i),a=n(645),s=n.n(a)()(o());s.push([e.id,'.toggle{display:flex;align-items:center;gap:.6em;user-select:none}.toggle__label{position:relative;display:inline-block;width:4em;height:2em;border-radius:1em;cursor:pointer;background:var(--panel-white-color)}.toggle__checkbox{appearance:none;cursor:pointer;font-size:inherit}.toggle__checkbox::before{content:"";position:absolute;left:0;top:0;width:4em;height:2em;border-radius:1em;box-sizing:border-box;border:1px solid var(--panel-lightgray-color)}.toggle__checkbox:checked::before{border-color:var(--panel-primary-color)}.toggle__checkbox::after{content:"";position:absolute;top:.4em;left:.4em;width:1.2em;height:1.2em;border-radius:50%;background:var(--panel-lightgray-color);transition:.21s}.toggle__checkbox:checked::after{transform:translateX(2em);background:var(--panel-primary-color)}.toggle__title{color:var(--panel-gray-color)}',""]);const r=s},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",i=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),i&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),i&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,i,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(i)for(var r=0;r<this.length;r++){var l=this[r][0];null!=l&&(s[l]=!0)}for(var c=0;c<e.length;c++){var p=[].concat(e[c]);i&&s[p[0]]||(void 0!==a&&(void 0===p[5]||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=a),n&&(p[2]?(p[1]="@media ".concat(p[2]," {").concat(p[1],"}"),p[2]=n):p[2]=n),o&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=o):p[4]="".concat(o)),t.push(p))}},t}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function n(e){for(var n=-1,i=0;i<t.length;i++)if(t[i].identifier===e){n=i;break}return n}function i(e,i){for(var a={},s=[],r=0;r<e.length;r++){var l=e[r],c=i.base?l[0]+i.base:l[0],p=a[c]||0,d="".concat(c," ").concat(p);a[c]=p+1;var u=n(d),h={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)t[u].references++,t[u].updater(h);else{var m=o(h,i);i.byIndex=r,t.splice(r,0,{identifier:d,updater:m,references:1})}s.push(d)}return s}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var a=i(e=e||[],o=o||{});return function(e){e=e||[];for(var s=0;s<a.length;s++){var r=n(a[s]);t[r].references--}for(var l=i(e,o),c=0;c<a.length;c++){var p=n(a[c]);0===t[p].references&&(t[p].updater(),t.splice(p,1))}a=l}}},569:e=>{var t={};e.exports=function(e,n){var i=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,o&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(i,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var a=t[i]={id:i,exports:{}};return e[i](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(379),t=n.n(e),i=n(795),o=n.n(i),a=n(569),s=n.n(a),r=n(565),l=n.n(r),c=n(216),p=n.n(c),d=n(589),u=n.n(d),h=n(526),m={};m.styleTagTransform=u(),m.setAttributes=l(),m.insert=s().bind(null,"head"),m.domAPI=o(),m.insertStyleElement=p(),t()(h.Z,m),h.Z&&h.Z.locals&&h.Z.locals;const g=function(){function e(e){this.input=document.createElement("div"),this.title=document.createElement("label"),this.textarea=document.createElement("input"),this.lastValidValue=0,this.configureDomElements(e),this.attachEventHandlers(e)}return e.prototype.update=function(e){void 0!==e.value&&(this.textarea.value=e.value.toString(),this.lastValidValue=e.value),void 0!==e.step&&this.textarea.setAttribute("step",e.step.toString()),void 0!==e.min&&this.textarea.setAttribute("min",e.min.toString()),void 0!==e.blocked&&(this.textarea.disabled=e.blocked,e.blocked?(this.input.classList.add("input_blocked"),this.textarea.value=""):this.input.classList.remove("input_blocked"))},e.prototype.configureDomElements=function(e){this.input.classList.add("input"),this.title.classList.add("input__title"),this.textarea.classList.add("input__textarea"),this.title.textContent=e.title,this.textarea.type="number",this.textarea.step="1",this.textarea.value="0",this.input.appendChild(this.title),this.input.appendChild(this.textarea),e.node.appendChild(this.input)},e.prototype.attachEventHandlers=function(e){var t=this;this.textarea.addEventListener("change",(function(){var n=parseFloat(t.textarea.value);Number.isNaN(n)?(t.textarea.value=t.lastValidValue.toString(),e.callback(t.lastValidValue)):(t.lastValidValue=n,e.callback(n))}))},e}();var f=n(857),v={};v.styleTagTransform=u(),v.setAttributes=l(),v.insert=s().bind(null,"head"),v.domAPI=o(),v.insertStyleElement=p(),t()(f.Z,v),f.Z&&f.Z.locals&&f.Z.locals;const b=function(){function e(e){this.checkbox=document.createElement("input"),this.toggle=document.createElement("div"),this.title=document.createElement("div"),this.label=document.createElement("label"),this.configureDomElements(e),this.attachEventHandlers(e)}return e.prototype.update=function(e){this.checkbox.checked=e},e.prototype.configureDomElements=function(e){this.toggle.classList.add("toggle"),this.checkbox.classList.add("toggle__checkbox"),this.label.classList.add("toggle__label"),this.title.classList.add("toggle__title"),this.checkbox.type="checkbox",this.title.textContent=e.title,this.toggle.appendChild(this.label),this.label.appendChild(this.checkbox),this.toggle.appendChild(this.title),e.node.appendChild(this.toggle)},e.prototype.attachEventHandlers=function(e){var t=this;this.checkbox.addEventListener("change",(function(){e.callback(t.checkbox.checked)}))},e}();var x=n(108),y={};y.styleTagTransform=u(),y.setAttributes=l(),y.insert=s().bind(null,"head"),y.domAPI=o(),y.insertStyleElement=p(),t()(x.Z,y),x.Z&&x.Z.locals&&x.Z.locals;var _=function(){function e(e,t){this.panelContainer=document.createElement("div"),this.togglesContainer=document.createElement("div"),this.inputsContainer=document.createElement("div"),this.slider=t.data("sliderInterface"),this.elements=this.createPanelElements(),this.configureDomElements(e),this.update(),t.on("sliderupdate",this.handleSliderUpdate.bind(this))}return e.prototype.configureDomElements=function(e){this.panelContainer.classList.add("panel"),this.togglesContainer.classList.add("panel__toggles-container"),this.inputsContainer.classList.add("panel__inputs-container"),this.panelContainer.appendChild(this.inputsContainer),this.panelContainer.appendChild(this.togglesContainer),e.appendChild(this.panelContainer)},e.prototype.createPanelElements=function(){var e=this,t=new g({node:this.inputsContainer,title:"min",callback:function(t){e.slider.setOptions({minValue:t})}}),n=new g({node:this.inputsContainer,title:"max",callback:function(t){e.slider.setOptions({maxValue:t})}}),i=new g({node:this.inputsContainer,title:"step",callback:function(t){e.slider.setOptions({step:t})}}),o=new g({node:this.inputsContainer,title:"from",callback:function(t){e.setFromValue(t)}}),a=new g({node:this.inputsContainer,title:"to",callback:function(t){e.setToValue(t)}}),s=new b({node:this.togglesContainer,title:"vertical",callback:function(t){e.slider.setOptions({isVertical:t})}}),r=new b({node:this.togglesContainer,title:"range",callback:function(t){e.slider.setOptions({isRange:t})}}),l=new b({node:this.togglesContainer,title:"tip",callback:function(t){e.slider.setOptions({shouldDisplayTips:t})}}),c=new b({node:this.togglesContainer,title:"bar",callback:function(t){e.slider.setOptions({shouldDisplayProgressBar:t})}});return{minInput:t,maxInput:n,stepInput:i,fromInput:o,toInput:a,verticalToggle:s,rangeToggle:r,tipToggle:l,scaleToggle:new b({node:this.togglesContainer,title:"scale",callback:function(t){e.slider.setOptions({shouldDisplayScale:t})}}),barToggle:c,inversionToggle:new b({node:this.togglesContainer,title:"inversion",callback:function(t){e.slider.setOptions({isInversion:t})}})}},e.prototype.update=function(){var e=this.slider.getOptions();this.elements.maxInput.update({value:e.maxValue,step:e.step}),this.elements.minInput.update({value:e.minValue,step:e.step}),this.elements.stepInput.update({value:e.step}),this.elements.fromInput.update({value:this.getFromValue(),step:e.step,min:e.minValue}),this.elements.toInput.update({value:this.getToValue(),step:e.step,min:e.minValue,blocked:!e.isRange}),this.elements.verticalToggle.update(e.isVertical),this.elements.rangeToggle.update(e.isRange),this.elements.tipToggle.update(e.shouldDisplayTips),this.elements.scaleToggle.update(e.shouldDisplayScale),this.elements.barToggle.update(e.shouldDisplayProgressBar),this.elements.inversionToggle.update(e.isInversion)},e.prototype.handleSliderUpdate=function(){this.update()},e.prototype.getFromValue=function(){var e=this.slider.getOptions();return e.isRange?Math.min(e.pointerPosition,e.secondPointerPosition):e.pointerPosition},e.prototype.setFromValue=function(e){var t=this.slider.getOptions();if(t.isRange){var n=t.pointerPosition,i=t.secondPointerPosition;n<i?(this.slider.setOptions({pointerPosition:e}),e>i&&this.slider.setOptions({secondPointerPosition:e})):(this.slider.setOptions({secondPointerPosition:e}),e>n&&this.slider.setOptions({pointerPosition:e}))}else this.slider.setOptions({pointerPosition:e})},e.prototype.setToValue=function(e){var t=this.slider.getOptions(),n=t.pointerPosition,i=t.secondPointerPosition;i>n?(this.slider.setOptions({secondPointerPosition:e}),e<n&&this.slider.setOptions({pointerPosition:e})):(this.slider.setOptions({pointerPosition:e}),e<i&&this.slider.setOptions({secondPointerPosition:e}))},e.prototype.getToValue=function(){var e=this.slider.getOptions();return Math.max(e.pointerPosition,e.secondPointerPosition)},e}();const P=_;$.fn.superSliderPanel=function(e){var t=this;return t.data("panel",new P(t[0],e)),t};var w=n(894),k={};k.styleTagTransform=u(),k.setAttributes=l(),k.insert=s().bind(null,"head"),k.domAPI=o(),k.insertStyleElement=p(),t()(w.Z,k),w.Z&&w.Z.locals&&w.Z.locals;var C=$("#slider0").superSlider({pointerPosition:20,secondPointerPosition:80,minValue:0,maxValue:100,step:10,shouldDisplayScale:!0});$("#panel0").superSliderPanel(C);var E=$("#slider1").superSlider({pointerPosition:-10,secondPointerPosition:10,minValue:-20,maxValue:40,step:1,isVertical:!1,isRange:!0,isInversion:!0,shouldDisplayScale:!0,shouldDisplayTips:!0,shouldDisplayProgressBar:!0});$("#panel1").superSliderPanel(E);var T=$("#slider2").superSlider({pointerPosition:5e3,secondPointerPosition:1e5,minValue:0,maxValue:1e8,step:1});function V(){var e=$(this);e.data("sliderInterface").getOptions().isVertical?(e.css("height","400px"),e.css("max-width","max-content")):(e.css("height","auto"),e.css("max-width",""))}$("#panel2").superSliderPanel(T),[C,E,T].forEach((function(e){e.on("sliderupdate",V)}))})()})();