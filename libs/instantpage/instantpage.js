/*! instant.page v2.0.0 - (C) 2019 Alexandre Dieulot - https://instant.page/license */
let urlToPreload,mouseoverTimer,lastTouchTimestamp;const prefetcher=document.createElement("link"),isSupported=prefetcher.relList&&prefetcher.relList.supports&&prefetcher.relList.supports("prefetch"),isDataSaverEnabled=navigator.connection&&navigator.connection.saveData,allowQueryString="instantAllowQueryString"in document.body.dataset,allowExternalLinks="instantAllowExternalLinks"in document.body.dataset,useWhitelist="instantWhitelist"in document.body.dataset;let delayOnHover=65,useMousedown=!1,useMousedownOnly=!1;if("instantIntensity"in document.body.dataset)if("mousedown"==document.body.dataset.instantIntensity.substr(0,"mousedown".length))useMousedown=!0,"mousedown-only"==document.body.dataset.instantIntensity&&(useMousedownOnly=!0);else{const e=parseInt(document.body.dataset.instantIntensity);isNaN(e)||(delayOnHover=e)}if(isSupported&&!isDataSaverEnabled){prefetcher.rel="prefetch",document.head.appendChild(prefetcher);const e={capture:!0,passive:!0};useMousedownOnly||document.addEventListener("touchstart",touchstartListener,e),useMousedown?document.addEventListener("mousedown",mousedownListener,e):document.addEventListener("mouseover",mouseoverListener,e)}function touchstartListener(e){lastTouchTimestamp=performance.now();const t=e.target.closest("a");isPreloadable(t)&&(t.addEventListener("touchcancel",touchendAndTouchcancelListener,{passive:!0}),t.addEventListener("touchend",touchendAndTouchcancelListener,{passive:!0}),urlToPreload=t.href,preload(t.href))}function touchendAndTouchcancelListener(){urlToPreload=void 0,stopPreloading()}function mouseoverListener(e){if(performance.now()-lastTouchTimestamp<1100)return;const t=e.target.closest("a");isPreloadable(t)&&(t.addEventListener("mouseout",mouseoutListener,{passive:!0}),urlToPreload=t.href,mouseoverTimer=setTimeout((()=>{preload(t.href),mouseoverTimer=void 0}),delayOnHover))}function mousedownListener(e){const t=e.target.closest("a");isPreloadable(t)&&(t.addEventListener("mouseout",mouseoutListener,{passive:!0}),urlToPreload=t.href,preload(t.href))}function mouseoutListener(e){e.relatedTarget&&e.target.closest("a")==e.relatedTarget.closest("a")||(mouseoverTimer&&(clearTimeout(mouseoverTimer),mouseoverTimer=void 0),urlToPreload=void 0,stopPreloading())}function isPreloadable(e){if(e&&e.href&&urlToPreload!=e.href&&(!useWhitelist||"instant"in e.dataset)&&(allowExternalLinks||e.origin==location.origin||"instant"in e.dataset)&&["http:","https:"].includes(e.protocol)&&("http:"!=e.protocol||"https:"!=location.protocol)&&(allowQueryString||!e.search||"instant"in e.dataset)&&!(e.hash&&e.pathname+e.search==location.pathname+location.search||"noInstant"in e.dataset))return!0}function preload(e){prefetcher.href=e}function stopPreloading(){prefetcher.removeAttribute("href")}