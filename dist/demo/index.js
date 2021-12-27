(()=>{"use strict";var e={111:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(81),i=n.n(r),o=n(645),a=n.n(o)()(i());a.push([e.id,".input{\r\n  display: flex;\r\n  color: var(--panel-white-color);\r\n  width: max-content;\r\n  height: 2.4em;\r\n}\r\n\r\n.input__title{\r\n  min-width: 3.5em;\r\n  border-radius: 1.2em 0 0 1.2em;\r\n  background: var(--panel-primary-color);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  user-select: none;\r\n}\r\n\r\n.input__textarea{\r\n  font-family: inherit;\r\n  font-size: inherit;\r\n  font-weight: inherit;\r\n  color: var(--panel-gray-color);\r\n  max-width: 5em;\r\n  padding: 0 0.5em;\r\n  border-radius: 0 1.2em 1.2em 0;\r\n  box-sizing: border-box;\r\n  border: 1px solid var(--panel-primary-color);\r\n  background: var(--panel-white-color);\r\n  outline: none;\r\n}\r\n\r\n.input_blocked .input__title{\r\n  background: var(--panel-lightgray-color);\r\n}\r\n\r\n.input__textarea:disabled{\r\n  border-color: var(--panel-lightgray-color);\r\n  color: var(--panel-lightgray-color);\r\n}",""]);const s=a},955:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(81),i=n.n(r),o=n(645),a=n.n(o)()(i());a.push([e.id,":root {\r\n  --panel-primary-color: #47ad72;\r\n  --panel-white-color: white;\r\n  --panel-gray-color: #3f3f3f;\r\n  --panel-lightgray-color: #999999;\r\n  --panel-mainsize: 15px;\r\n}\r\n\r\n.panel__container{\r\n  max-width: max-content;\r\n  font-family: 'Sans-Serif';\r\n  font-style: normal;\r\n  font-weight: bold;\r\n  font-size: var(--panel-mainsize);\r\n  -webkit-tap-highlight-color: transparent;\r\n}\r\n\r\n.panel__inputs-container{\r\n  max-width: 800px;\r\n  display: flex;\r\n  justify-content: center;\r\n  flex-wrap: wrap;\r\n  gap: 1.5em;\r\n  margin-bottom: 1.5em;\r\n}\r\n\r\n.panel__toggles-container{\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 1.5em;\r\n  justify-content: center;\r\n}\r\n\r\n@media screen and (max-width: 900px){\r\n  .panel__container{\r\n    display: flex;\r\n    gap: 1.3em;\r\n    font-size: 14px;\r\n  }\r\n\r\n  .panel__inputs-container{\r\n    flex-flow: column;\r\n    justify-content: flex-start;\r\n    margin-bottom: 0;\r\n  }\r\n\r\n  .panel__toggles-container{\r\n    flex-flow: column;\r\n    justify-content: space-between;\r\n  }\r\n}",""]);const s=a},210:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(81),i=n.n(r),o=n(645),a=n.n(o)()(i());a.push([e.id,".toggle{\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.6em;\r\n  user-select: none;\r\n}\r\n\r\n.toggle__label{\r\n  position: relative;\r\n  display: inline-block;\r\n  width: 4em;\r\n  height: 2em;\r\n  border-radius: 1em;\r\n  cursor: pointer;\r\n  background: var(--panel-white-color);\r\n} \r\n\r\n.toggle__checkbox{\r\n  appearance: none;\r\n  cursor: pointer;\r\n  font-size: inherit;\r\n}\r\n\r\n.toggle__checkbox::before{\r\n  content: '';\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 4em;\r\n  height: 2em;\r\n  border-radius: 1em;\r\n  box-sizing: border-box;\r\n  border: 1px solid var(--panel-lightgray-color);\r\n}\r\n\r\n.toggle__checkbox:checked::before{\r\n  border-color: var(--panel-primary-color);\r\n}\r\n\r\n.toggle__checkbox::after{\r\n  content: '';\r\n  position: absolute;\r\n  top: 0.4em;\r\n  left: 0.4em;\r\n  width: 1.2em;\r\n  height: 1.2em;\r\n  border-radius: 50%;\r\n  background: var(--panel-lightgray-color);\r\n  transition: .21s;\r\n}\r\n\r\n.toggle__checkbox:checked::after{\r\n  transform: translateX(2em);\r\n  background: var(--panel-primary-color);\r\n}\r\n\r\n.toggle__title{\r\n  color: var(--panel-gray-color);\r\n}",""]);const s=a},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,i,o){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(r)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(a[l]=!0)}for(var c=0;c<e.length;c++){var p=[].concat(e[c]);r&&a[p[0]]||(void 0!==o&&(void 0===p[5]||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=o),n&&(p[2]?(p[1]="@media ".concat(p[2]," {").concat(p[1],"}"),p[2]=n):p[2]=n),i&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=i):p[4]="".concat(i)),t.push(p))}},t}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var o={},a=[],s=0;s<e.length;s++){var l=e[s],c=r.base?l[0]+r.base:l[0],p=o[c]||0,d="".concat(c," ").concat(p);o[c]=p+1;var u=n(d),h={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)t[u].references++,t[u].updater(h);else{var g=i(h,r);r.byIndex=s,t.splice(s,0,{identifier:d,updater:g,references:1})}a.push(d)}return a}function i(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){var o=r(e=e||[],i=i||{});return function(e){e=e||[];for(var a=0;a<o.length;a++){var s=n(o[a]);t[s].references--}for(var l=r(e,i),c=0;c<o.length;c++){var p=n(o[c]);0===t[p].references&&(t[p].updater(),t.splice(p,1))}o=l}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,i&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var o=n.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={id:r,exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(379),t=n.n(e),r=n(795),i=n.n(r),o=n(569),a=n.n(o),s=n(565),l=n.n(s),c=n(216),p=n.n(c),d=n(589),u=n.n(d),h=n(111),g={};g.styleTagTransform=u(),g.setAttributes=l(),g.insert=a().bind(null,"head"),g.domAPI=i(),g.insertStyleElement=p(),t()(h.Z,g),h.Z&&h.Z.locals&&h.Z.locals;const m=function(){function e(e){var t=this;this.update=function(e){void 0!==e.value&&(t.$textarea.val(e.value),t.lastValidValue=e.value),void 0!==e.step&&t.$textarea.attr("step",e.step),void 0!==e.min&&t.$textarea.attr("min",e.min),void 0!==e.blocked&&(t.$textarea.prop("disabled",e.blocked),e.blocked?(t.$input.addClass("input_blocked"),t.$textarea.val("")):t.$input.removeClass("input_blocked"))},this.createDomElements(e.node),this.$title.text(e.title),this.$textarea.val(0),this.$textarea.attr("step",1),this.$textarea.on("change",this.makeTextareaChangeHandler(e.callback))}return e.prototype.createDomElements=function(e){this.$input=$("<div>",{class:"input"}),this.$title=$("<div>",{class:"input__title"}),this.$textarea=$("<input>",{type:"number",class:"input__textarea"}),this.$input.append(this.$title).append(this.$textarea),e.append(this.$input)},e.prototype.makeTextareaChangeHandler=function(e){var t=this;return function(n){var r=n.target,i=parseFloat(r.value);Number.isNaN(i)?(r.value=t.lastValidValue,e(t.lastValidValue)):(t.lastValidValue=i,e(i))}},e}();var f=n(210),v={};v.styleTagTransform=u(),v.setAttributes=l(),v.insert=a().bind(null,"head"),v.domAPI=i(),v.insertStyleElement=p(),t()(f.Z,v),f.Z&&f.Z.locals&&f.Z.locals;const b=function(){function e(t){this.createDomElements(t.node),this.$title.text(t.title),this.$checkbox.on("change",e.makeCheckboxChangeHandler(t.callback))}return e.prototype.update=function(e){this.$checkbox.prop("checked",e)},e.prototype.createDomElements=function(e){this.$toggle=$("<div>",{class:"toggle"}),this.$label=$("<label>",{class:"toggle__label"}),this.$checkbox=$("<input>",{type:"checkbox",class:"toggle__checkbox"}),this.$title=$("<div>",{class:"toggle__title"}),this.$toggle.append(this.$label),this.$label.append(this.$checkbox),this.$toggle.append(this.$title),e.append(this.$toggle)},e.makeCheckboxChangeHandler=function(e){return function(t){e(t.target.checked)}},e}();var x=n(955),y={};y.styleTagTransform=u(),y.setAttributes=l(),y.insert=a().bind(null,"head"),y.domAPI=i(),y.insertStyleElement=p(),t()(x.Z,y),x.Z&&x.Z.locals&&x.Z.locals;const _=function(){function e(e,t){this.slider=t.superSlider.bind(t),this.createDomElements(e),this.initElements(),this.update(),t.on("sliderupdate",this.handleSliderUpdate.bind(this))}return e.prototype.createDomElements=function(e){this.$panelContainer=$("<div>",{class:"panel__container"}),this.$togglesContainer=$("<div>",{class:"panel__toggles-container"}),this.$inputsContainer=$("<div>",{class:"panel__inputs-container"}),this.$panelContainer.append(this.$inputsContainer).append(this.$togglesContainer),e.append(this.$panelContainer)},e.prototype.initElements=function(){var e=this;this.minInput=new m({node:this.$inputsContainer,title:"min",callback:function(t){e.slider("minValue",t)}}),this.maxInput=new m({node:this.$inputsContainer,title:"max",callback:function(t){e.slider("maxValue",t)}}),this.stepInput=new m({node:this.$inputsContainer,title:"step",callback:function(t){e.slider("step",t)}}),this.fromInput=new m({node:this.$inputsContainer,title:"from",callback:function(t){e.setFromValue(t)}}),this.toInput=new m({node:this.$inputsContainer,title:"to",callback:function(t){e.setToValue(t)}}),this.verticalToggle=new b({node:this.$togglesContainer,title:"vertical",callback:function(t){e.slider("isVertical",t)}}),this.rangeToggle=new b({node:this.$togglesContainer,title:"range",callback:function(t){e.slider("isRange",t)}}),this.tipToggle=new b({node:this.$togglesContainer,title:"tip",callback:function(t){e.slider("shouldDisplayTips",t)}}),this.barToggle=new b({node:this.$togglesContainer,title:"bar",callback:function(t){e.slider("shouldDisplayProgressBar",t)}}),this.scaleToggle=new b({node:this.$togglesContainer,title:"scale",callback:function(t){e.slider("shouldDisplayScale",t)}})},e.prototype.update=function(){this.maxInput.update({value:this.slider("maxValue"),step:this.slider("step")}),this.minInput.update({value:this.slider("minValue"),step:this.slider("step")}),this.stepInput.update({value:this.slider("step")}),this.fromInput.update({value:this.getFromValue(),step:this.slider("step"),min:this.slider("minValue")}),this.toInput.update({value:this.getToValue(),step:this.slider("step"),min:this.slider("minValue"),blocked:!this.slider("isRange")}),this.verticalToggle.update(this.slider("isVertical")),this.rangeToggle.update(this.slider("isRange")),this.tipToggle.update(this.slider("shouldDisplayTips")),this.scaleToggle.update(this.slider("shouldDisplayScale")),this.barToggle.update(this.slider("shouldDisplayProgressBar"))},e.prototype.handleSliderUpdate=function(){this.update()},e.prototype.getFromValue=function(){return this.slider("isRange")?Math.min(this.slider("pointerPosition"),this.slider("secondPointerPosition")):this.slider("pointerPosition")},e.prototype.setFromValue=function(e){if(this.slider("isRange")){var t=this.slider("pointerPosition"),n=this.slider("secondPointerPosition");t<n?(this.slider("pointerPosition",e),e>n&&this.slider("secondPointerPosition",e)):(this.slider("secondPointerPosition",e),e>t&&this.slider("pointerPosition",e))}else this.slider("pointerPosition",e)},e.prototype.setToValue=function(e){var t=this.slider("pointerPosition"),n=this.slider("secondPointerPosition");n>t?(this.slider("secondPointerPosition",e),e<t&&this.slider("pointerPosition",e)):(this.slider("pointerPosition",e),e<n&&this.slider("secondPointerPosition",e))},e.prototype.getToValue=function(){return Math.max(this.slider("pointerPosition"),this.slider("secondPointerPosition"))},e}();$.fn.superSliderPanel=function(e){var t=$(this);return t.data("panel",new _(t,e)),t};var k=$("#slider1").superSlider({pointerPosition:20,secondPointerPosition:80,minValue:0,maxValue:100,step:10,shouldDisplayScale:!0});$("#panel1").superSliderPanel(k);var P=$("#slider2").superSlider({pointerPosition:-10,secondPointerPosition:10,minValue:-20,maxValue:40,step:7,isVertical:!1,isRange:!0,shouldDisplayScale:!0,shouldDisplayTips:!0,shouldDisplayProgressBar:!0});$("#panel2").superSliderPanel(P);var w=$("#slider3").superSlider({pointerPosition:5e3,secondPointerPosition:1e5,minValue:0,maxValue:1e8,step:1});function C(){var e=$(this);e.superSlider("isVertical")?(e.css("height","400px"),e.css("max-width","max-content")):(e.css("height","auto"),e.css("max-width",""))}$("#panel3").superSliderPanel(w),[k,P,w].forEach((function(e){e.on("sliderupdate",C)}))})()})();