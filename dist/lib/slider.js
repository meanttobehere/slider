!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("slider",[],e):"object"==typeof exports?exports.slider=e():t.slider=e()}(self,(function(){return(()=>{"use strict";var t={};(t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})})(t);const e=function(){function t(){this.observers=new Set}return t.prototype.attach=function(t){this.observers.add(t)},t.prototype.notify=function(t){this.observers.forEach((function(e){e(t)}))},t}();function i(t,e){var i=function(t){return void 0!==t?t+"%":""},s=t;s.style.top=i(e.top),s.style.left=i(e.left),s.style.bottom=i(e.bottom),s.style.right=i(e.right)}const s=function(){function t(t,e){this.scale=document.createElement("div"),this.labels=[],this.view=e,this.configureDomElements(t)}return t.prototype.render=function(t){t.shouldDisplayScale?(this.scale.style.display="block",this.updateLabels(t)):this.scale.style.display="none"},t.prototype.configureDomElements=function(t){this.scale.classList.add("slider__scale"),t.appendChild(this.scale)},t.prototype.createLabel=function(){var t=this,e=document.createElement("div");return e.classList.add("slider__scale-label"),e.addEventListener("click",(function(){var i=Number.parseFloat(e.getAttribute("data-pos")||"0");t.view.notify({eventType:"click",posPercentage:i})})),e},t.prototype.updateNumOfLabels=function(t){for(;this.labels.length!==t;)if(this.labels.length<t){var e=this.createLabel();this.scale.appendChild(e),this.labels.push(e)}else null==(e=this.labels.pop())||e.remove()},t.prototype.updateLabels=function(t){var e=this;this.updateNumOfLabels(t.scaleLabels.length),t.scaleLabels.forEach((function(s,n){var o=e.labels[n];o.setAttribute("data-pos",s.posPercentage.toString()),o&&(o.textContent=s.val,t.isVertical&&t.isInversion?i(o,{top:100-s.posPercentage}):t.isVertical?i(o,{top:s.posPercentage}):t.isInversion?i(o,{left:100-s.posPercentage}):i(o,{left:s.posPercentage}))})),this.updateLabelsVisibility(t)},t.prototype.updateLabelsVisibility=function(t){var e=0,i=1,s=new Set;for(s.add(0);e+i<this.labels.length;)this.isIntersection(e,e+i,t)?(i+=1,e=0,s=new Set):e+=i,s.add(e);this.labels.forEach((function(t,e){var i=t,n=s.has(e);i.style.visibility=n?"visible":"hidden"}))},t.prototype.isIntersection=function(t,e,i){var s=this.labels[t],n=this.labels[e],o=this.getLabelSizeInPercent(s,i),r=this.getLabelSizeInPercent(n,i),a=i.scaleLabels[t].posPercentage,c=i.scaleLabels[e].posPercentage;return a+o/2+(i.isVertical?30/this.scale.clientHeight*100:30/this.scale.clientWidth*100)>c-r/2},t.prototype.getLabelSizeInPercent=function(t,e){return e.isVertical?t.clientHeight/this.scale.clientHeight*100:t.clientWidth/this.scale.clientWidth*100},t}(),n=function(){function t(t,e){this.bar=document.createElement("div"),this.progressBar=document.createElement("div"),this.isVertical=!1,this.isInversion=!1,this.view=e,this.configureDomElements(t),this.attachEventHandlers()}return t.prototype.render=function(t){if(this.isVertical=t.isVertical,this.isInversion=t.isInversion,t.shouldDisplayProgressBar){this.progressBar.style.display="block";var e=t.pointerPosPercentage,s=t.secondPointerPosPercentage,n=t.isRange?[Math.min(e,s),Math.abs(e-s)]:[0,e],o=n[0],r=n[1];t.isVertical&&t.isInversion?i(this.progressBar,{top:100-o-r}):t.isVertical?i(this.progressBar,{top:o}):t.isInversion?i(this.progressBar,{left:100-o-r}):i(this.progressBar,{left:o}),t.isVertical?(this.progressBar.style.height=r+"%",this.progressBar.style.width=""):(this.progressBar.style.height="",this.progressBar.style.width=r+"%")}else this.progressBar.style.display="none"},t.prototype.configureDomElements=function(t){this.bar.classList.add("slider__bar"),this.progressBar.classList.add("slider__progress-bar"),this.bar.appendChild(this.progressBar),t.appendChild(this.bar)},t.prototype.attachEventHandlers=function(){this.bar.addEventListener("click",this.handleBarClick.bind(this))},t.prototype.handleBarClick=function(t){var e=this.bar.getBoundingClientRect(),i=e.left,s=e.top,n=this.isVertical?(t.clientY-s)/this.bar.offsetHeight*100:(t.clientX-i)/this.bar.offsetWidth*100,o=Math.abs(n-100*Number(this.isInversion));this.view.notify({eventType:"click",posPercentage:o})},t}(),o=function(){function t(t,e,i){var s=this;this.startOffset=0,this.offsetX=0,this.offsetY=0,this.isVertical=!1,this.isInversion=!1,this.position=0,this.handleObjectMouseMove=function(t){var e=s.calcPositionInPercent(t.clientX-s.offsetX,t.clientY-s.offsetY);s.view.notify({eventType:"move",isSecond:s.isSecond,posPercentage:e-s.startOffset})},this.handleObjectMouseUp=function(){document.removeEventListener("mousemove",s.handleObjectMouseMove),s.view.notify({eventType:"endMove",isSecond:s.isSecond})},this.handleObjectMouseDown=function(t){document.addEventListener("mousemove",s.handleObjectMouseMove),document.addEventListener("mouseup",s.handleObjectMouseUp,{once:!0}),s.offsetX=t.offsetX-s.object.clientWidth/2,s.offsetY=t.offsetY-s.object.clientHeight/2,s.startOffset=s.calcPositionInPercent(t.clientX-s.offsetX,t.clientY-s.offsetY)-s.position,s.view.notify({eventType:"startMove",isSecond:s.isSecond})},this.handleObjectTouchMove=function(t){var e=s.calcPositionInPercent(t.touches[0].clientX,t.touches[0].clientY);s.view.notify({eventType:"move",isSecond:s.isSecond,posPercentage:e-s.startOffset}),t.preventDefault(),t.stopPropagation()},this.handleObjectTouchEnd=function(){document.removeEventListener("touchmove",s.handleObjectTouchMove),s.view.notify({eventType:"endMove",isSecond:s.isSecond})},this.handleObjectTouchStart=function(t){document.addEventListener("touchmove",s.handleObjectTouchMove,{passive:!1}),document.addEventListener("touchend",s.handleObjectTouchEnd,{once:!0}),s.startOffset=s.calcPositionInPercent(t.touches[0].clientX,t.touches[0].clientY)-s.position,t.preventDefault(),t.stopPropagation(),s.view.notify({eventType:"startMove",isSecond:s.isSecond})},this.object=t,this.view=e,this.isSecond=Boolean(i),this.initMouseEvents(),this.initTouchEvents()}return t.prototype.update=function(t){this.isVertical=t.isVertical,this.isInversion=t.isInversion,this.position=this.isSecond?t.secondPointerPosPercentage:t.pointerPosPercentage},t.prototype.initMouseEvents=function(){this.object.addEventListener("mousedown",this.handleObjectMouseDown)},t.prototype.initTouchEvents=function(){this.object.addEventListener("touchstart",this.handleObjectTouchStart,{passive:!1})},t.prototype.calcPositionInPercent=function(t,e){var i=this.object.parentElement;if(!i)return 0;var s=i.getBoundingClientRect(),n=s.top,o=s.left;return this.isVertical&&this.isInversion?(n-e)/i.offsetHeight*100:this.isVertical?(e-n)/i.offsetHeight*100:this.isInversion?(o-t)/i.offsetWidth*100:(t-o)/i.offsetWidth*100},t}(),r=function(){function t(t,e,i){this.pointer=document.createElement("div"),this.isSecond=Boolean(i),this.configureDomElements(t),this.moveableObject=new o(this.pointer,e,i)}return t.prototype.render=function(t){if(this.shouldBeDisplayed(t)){this.pointer.style.display="block";var e=this.isSecond?t.secondPointerPosPercentage:t.pointerPosPercentage;t.isVertical&&t.isInversion?i(this.pointer,{top:100-e}):t.isVertical?i(this.pointer,{top:e}):t.isInversion?i(this.pointer,{left:100-e}):i(this.pointer,{left:e}),this.moveableObject.update(t)}else this.pointer.style.display="none"},t.prototype.configureDomElements=function(t){this.pointer.classList.add("slider__pointer"),t.appendChild(this.pointer)},t.prototype.shouldBeDisplayed=function(t){return!this.isSecond||t.isRange},t}(),a=function(){function t(t,e){this.tip=document.createElement("div"),this.secondTip=document.createElement("div"),this.parent=t,this.configureDomElements(),this.moveableObjects=[new o(this.tip,e),new o(this.secondTip,e,!0)]}return t.prototype.render=function(e){if(!e.shouldDisplayTips)return this.tip.style.display="none",void(this.secondTip.style.display="none");this.tip.style.display="block",this.secondTip.style.display=e.isRange?"block":"none",this.tip.textContent=e.tipValue,this.secondTip.textContent=e.secondTipValue,this.moveableObjects.forEach((function(t){return t.update(e)}));var s=this.getTipsPositions(e),n=s.tipPos,o=s.secondTipPos,r=s.isConnected,a=s.isTipCloserToStart;e.isVertical&&e.isInversion?(i(this.tip,{top:100-n}),i(this.secondTip,{top:100-o})):e.isVertical?(i(this.tip,{top:n}),i(this.secondTip,{top:o})):e.isInversion?(i(this.tip,{left:100-n}),i(this.secondTip,{left:100-o})):(i(this.tip,{left:n}),i(this.secondTip,{left:o})),r&&e.isRange?a?(this.tip.classList.add(t.TIP_CLASS_CONNECTED),this.secondTip.classList.remove(t.TIP_CLASS_CONNECTED)):(this.tip.classList.remove(t.TIP_CLASS_CONNECTED),this.secondTip.classList.add(t.TIP_CLASS_CONNECTED)):(this.tip.classList.remove(t.TIP_CLASS_CONNECTED),this.secondTip.classList.remove(t.TIP_CLASS_CONNECTED))},t.prototype.configureDomElements=function(){this.tip.classList.add("slider__tip"),this.secondTip.classList.add("slider__tip"),this.parent.appendChild(this.tip),this.parent.appendChild(this.secondTip)},t.prototype.getTipsPositions=function(t){var e=t.pointerPosPercentage,i=t.secondPointerPosPercentage,s=this.getTipsSizeInPercent(t),n=s.tipSize,o=s.secondTipSize,r=Math.abs(e-i),a=r<(n+o)/2,c=t.tipValue===t.secondTipValue,l=e<i;if(a&&!c&&t.isRange){var p=((n+o)/2-r)/2,h=l?[e-p,i+p]:[e+p,i-p];return{tipPos:h[0],secondTipPos:h[1],isConnected:!0,isTipCloserToStart:l!==t.isInversion}}return{tipPos:e,secondTipPos:i,isConnected:!1}},t.prototype.getTipsSizeInPercent=function(t){if(t.isVertical){var e=this.parent.clientHeight;return{tipSize:this.tip.clientHeight/e*100,secondTipSize:this.secondTip.clientHeight/e*100}}var i=this.parent.clientWidth;return{tipSize:this.tip.clientWidth/i*100,secondTipSize:this.secondTip.clientWidth/i*100}},t.TIP_CLASS_CONNECTED="slider__tip_connected",t}();var c,l=(c=function(t,e){return c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},c(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});const p=function(t){function e(e){var i=t.call(this)||this;return i.container=document.createElement("div"),i.tipsContainer=document.createElement("div"),i.barContainer=document.createElement("div"),i.scaleContainer=document.createElement("div"),i.elements=[],i.isLoading=!0,i.createViewElements(),i.configureDomElements(e),i.attachEventHandlers(),i}return l(e,t),e.prototype.render=function(t){this.params=t,this.isLoading||this.updateView(t)},e.prototype.updateView=function(t){t.isVertical?this.container.classList.add("slider_vertical"):this.container.classList.remove("slider_vertical"),this.elements.forEach((function(e){e.render(t)}))},e.prototype.handleWindowResize=function(){this.params&&this.updateView(this.params)},e.prototype.handleWindowLoad=function(){this.isLoading=!1,this.params&&this.updateView(this.params)},e.prototype.attachEventHandlers=function(){window.addEventListener("resize",this.handleWindowResize.bind(this)),window.addEventListener("load",this.handleWindowLoad.bind(this))},e.prototype.configureDomElements=function(t){var e=this;this.container.classList.add("slider"),[this.tipsContainer,this.barContainer,this.scaleContainer].forEach((function(t){t.classList.add("slider__container"),e.container.appendChild(t)})),t.appendChild(this.container)},e.prototype.createViewElements=function(){this.elements.push(new s(this.scaleContainer,this),new n(this.barContainer,this),new r(this.barContainer,this),new r(this.barContainer,this,!0),new a(this.tipsContainer,this))},e}(e);var h={isVertical:!1,isRange:!0,isInversion:!1,shouldDisplayTips:!0,shouldDisplayProgressBar:!0,shouldDisplayScale:!1,minValue:0,maxValue:100,step:1,pointerPosition:20,secondPointerPosition:80},d=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function s(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)}}(),u=function(){return u=Object.assign||function(t){for(var e,i=1,s=arguments.length;i<s;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},u.apply(this,arguments)};const f=function(t){function e(e){var i=t.call(this)||this;return i.state=h,i.nextState=h,i.state=i.getNextState(e),i}return d(e,t),e.prototype.setState=function(t){var e=this.getNextState(t);this.isEqualStates(this.state,e)||(this.state=e,this.notify({eventType:"update",params:this.getParams()}))},e.prototype.getState=function(){return this.state},e.prototype.setPositionsPercentage=function(t){var e={};t.pointer&&(e.pointerPosition=this.convertPercentageToPos(t.pointer)),t.secondPointer&&(e.secondPointerPosition=this.convertPercentageToPos(t.secondPointer)),this.setState(e)},e.prototype.setPositionPercentage=function(t){var e=this.convertPercentageToPos(t),i=Math.abs(e-this.state.pointerPosition)<Math.abs(e-this.state.secondPointerPosition);this.setState(!this.state.isRange||i?{pointerPosition:e}:{secondPointerPosition:e})},e.prototype.getParams=function(){return u(u({},this.state),{pointerPosPercentage:this.convertPosToPercentage(this.state.pointerPosition),secondPointerPosPercentage:this.convertPosToPercentage(this.state.secondPointerPosition),tipValue:this.convertPosToString(this.state.pointerPosition),secondTipValue:this.convertPosToString(this.state.secondPointerPosition),scaleLabels:this.createScaleLabels()})},e.prototype.convertPosToPercentage=function(t){var e=this.state,i=e.maxValue,s=e.minValue;return(t-s)/(i-s)*100},e.prototype.convertPercentageToPos=function(t){var e=this.state,i=e.maxValue,s=e.minValue;return s+t/100*(i-s)},e.prototype.convertPosToString=function(t){return t>1e6?t.toExponential(3):this.getRoundedValue(t,this.state.step).toString()},e.prototype.createScaleLabels=function(){for(var t=this.state,e=t.maxValue,i=t.minValue,s=t.step,n=Math.ceil((e-i)/(25*s))*s,o=[],r=i;r<=e;r+=n)o.push({posPercentage:this.convertPosToPercentage(r),val:this.convertPosToString(r)});return o},e.prototype.getNextState=function(t){return this.nextState=u(u({},this.state),t),this.normalizeNextStateInterval(),this.normalizeNextStateStep(),this.normalizeNextStatePositions(),this.nextState},e.prototype.normalizeNextStateInterval=function(){if(!(this.nextState.maxValue>this.nextState.minValue)){var t=this.state.maxValue!==this.nextState.maxValue,e=this.state.minValue!==this.nextState.minValue;t&&e?this.nextState=u({},this.state):t?this.nextState.minValue=this.nextState.maxValue-1:this.nextState.maxValue=this.nextState.minValue+1}},e.prototype.normalizeNextStateStep=function(){var t=this.nextState.maxValue-this.nextState.minValue;this.nextState.step<=0&&(this.nextState.step=1),this.nextState.step>t&&(this.nextState.step=t)},e.prototype.normalizeNextStatePositions=function(){var t=this,e=this.nextState,i=e.step,s=e.minValue,n=e.maxValue,o=[e.pointerPosition,e.secondPointerPosition].map((function(e){var o=Math.round((e-s)/i)*i+s,r=t.getRoundedValue(o,i);return o<s?s:o>n||n-e<e-o?n:r})),r=o[0],a=o[1];this.nextState.pointerPosition=r,this.nextState.secondPointerPosition=a},e.prototype.isEqualStates=function(t,e){return Object.keys(t).every((function(i){return t[i]===e[i]}))},e.prototype.getRoundedValue=function(t,e){var i=e%1==0?0:e.toString().split(".")[1].length;return Number.parseFloat(t.toFixed(i))},e}(e),v=function(){function t(t,e,i){this.callbacks=i,this.model=new f(e),this.model.attach(this.createModelObserver()),this.view=new p(t),this.view.attach(this.createViewObserver()),this.view.render(this.model.getParams())}return t.prototype.setOptions=function(t){this.model.setState(t)},t.prototype.getOptions=function(){return this.model.getState()},t.prototype.createViewObserver=function(){var t=this;return function(e){switch(e.eventType){case"move":t.model.setPositionsPercentage(e.isSecond?{secondPointer:e.posPercentage}:{pointer:e.posPercentage}),t.callbacks.slide();break;case"startMove":t.callbacks.start();break;case"endMove":t.callbacks.stop();break;case"click":void 0!==e.posPercentage&&t.model.setPositionPercentage(e.posPercentage),t.callbacks.start(),t.callbacks.slide(),t.callbacks.stop()}}},t.prototype.createModelObserver=function(){var t=this;return function(e){t.callbacks.update(),t.view.render(e.params)}},t}();return $.fn.superSlider=function(t){var e=this,i=e.data("sliderInterface");if(i)t&&i.setOptions(t);else{var s={update:function(){e.trigger("sliderupdate")},start:function(){e.trigger("slidestart")},slide:function(){e.trigger("slide")},stop:function(){e.trigger("slidestop")}},n=t||{};e.data("sliderInterface",new v(e[0],n,s))}return e},t})()}));