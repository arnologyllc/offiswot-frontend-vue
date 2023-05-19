import{aC as ce,aD as ie,D as x,aE as ve,aF as Ee,aG as me,aH as le,K as Oe,aI as _e,aJ as be,_ as ye}from"./el-button.efbddc4b.js";import{w as T,r as h,B as we,l as Te,U as Fe,e as K,ad as B,M as ge,Q as he,u as S,S as Pe,P as j,W as Se}from"./entry.d5ce8ebf.js";function g(e){var t;const n=ie(e);return(t=n==null?void 0:n.$el)!=null?t:n}const V=x?window:void 0;function k(...e){let t,n,s,a;if(me(e[0])||Array.isArray(e[0])?([n,s,a]=e,t=V):[t,n,s,a]=e,!t)return le;Array.isArray(n)||(n=[n]),Array.isArray(s)||(s=[s]);const i=[],l=()=>{i.forEach(p=>p()),i.length=0},f=(p,O,r,u)=>(p.addEventListener(O,r,u),()=>p.removeEventListener(O,r,u)),m=T(()=>[g(t),ie(a)],([p,O])=>{l(),p&&i.push(...n.flatMap(r=>s.map(u=>f(p,r,u,O))))},{immediate:!0,flush:"post"}),_=()=>{m(),l()};return ce(_),_}let J=!1;function nt(e,t,n={}){const{window:s=V,ignore:a=[],capture:i=!0,detectIframe:l=!1}=n;if(!s)return;Oe&&!J&&(J=!0,Array.from(s.document.body.children).forEach(r=>r.addEventListener("click",le)));let f=!0;const m=r=>a.some(u=>{if(typeof u=="string")return Array.from(s.document.querySelectorAll(u)).some(o=>o===r.target||r.composedPath().includes(o));{const o=g(u);return o&&(r.target===o||r.composedPath().includes(o))}}),p=[k(s,"click",r=>{const u=g(e);if(!(!u||u===r.target||r.composedPath().includes(u))){if(r.detail===0&&(f=!m(r)),!f){f=!0;return}t(r)}},{passive:!0,capture:i}),k(s,"pointerdown",r=>{const u=g(e);u&&(f=!r.composedPath().includes(u)&&!m(r))},{passive:!0}),l&&k(s,"blur",r=>{var u;const o=g(e);((u=s.document.activeElement)==null?void 0:u.tagName)==="IFRAME"&&!(o!=null&&o.contains(s.document.activeElement))&&t(r)})].filter(Boolean);return()=>p.forEach(r=>r())}function Ie(e,t=!1){const n=h(),s=()=>n.value=!!e();return s(),ve(s,t),n}function Ce(e){return JSON.parse(JSON.stringify(e))}const q=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},z="__vueuse_ssr_handlers__";q[z]=q[z]||{};var G=Object.getOwnPropertySymbols,Le=Object.prototype.hasOwnProperty,Ne=Object.prototype.propertyIsEnumerable,Re=(e,t)=>{var n={};for(var s in e)Le.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(e!=null&&G)for(var s of G(e))t.indexOf(s)<0&&Ne.call(e,s)&&(n[s]=e[s]);return n};function st(e,t,n={}){const s=n,{window:a=V}=s,i=Re(s,["window"]);let l;const f=Ie(()=>a&&"ResizeObserver"in a),m=()=>{l&&(l.disconnect(),l=void 0)},_=T(()=>g(e),O=>{m(),f.value&&a&&O&&(l=new ResizeObserver(t),l.observe(O,i))},{immediate:!0,flush:"post"}),p=()=>{m(),_()};return ce(p),{isSupported:f,stop:p}}var Y;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(Y||(Y={}));var Ae=Object.defineProperty,X=Object.getOwnPropertySymbols,Ue=Object.prototype.hasOwnProperty,ke=Object.prototype.propertyIsEnumerable,Z=(e,t,n)=>t in e?Ae(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,De=(e,t)=>{for(var n in t||(t={}))Ue.call(t,n)&&Z(e,n,t[n]);if(X)for(var n of X(t))ke.call(t,n)&&Z(e,n,t[n]);return e};const $e={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};De({linear:Ee},$e);function ot(e,t,n,s={}){var a,i,l;const{clone:f=!1,passive:m=!1,eventName:_,deep:p=!1,defaultValue:O}=s,r=Te(),u=n||(r==null?void 0:r.emit)||((a=r==null?void 0:r.$emit)==null?void 0:a.bind(r))||((l=(i=r==null?void 0:r.proxy)==null?void 0:i.$emit)==null?void 0:l.bind(r==null?void 0:r.proxy));let o=_;t||(t="modelValue"),o=_||o||`update:${t.toString()}`;const c=d=>f?_e(f)?f(d):Ce(d):d,v=()=>be(e[t])?c(e[t]):O;if(m){const d=v(),E=h(d);return T(()=>e[t],w=>E.value=c(w)),T(E,w=>{(w!==e[t]||p)&&u(o,w)},{deep:p}),E}else return we({get(){return v()},set(d){u(o,d)}})}function xe(e){return e==null}class Ke extends Error{constructor(t){super(t),this.name="ElementPlusError"}}function rt(e,t){throw new Ke(`[${e}] ${t}`)}function at(e,t){}const ut=(...e)=>t=>{e.forEach(n=>{Fe(n)?n(t):n.value=t})},de={tab:"Tab",enter:"Enter",space:"Space",left:"ArrowLeft",up:"ArrowUp",right:"ArrowRight",down:"ArrowDown",esc:"Escape",delete:"Delete",backspace:"Backspace",numpadEnter:"NumpadEnter",pageUp:"PageUp",pageDown:"PageDown",home:"Home",end:"End"};let F=[];const ee=e=>{const t=e;t.key===de.esc&&F.forEach(n=>n(t))},Be=e=>{K(()=>{F.length===0&&document.addEventListener("keydown",ee),x&&F.push(e)}),B(()=>{F=F.filter(t=>t!==e),F.length===0&&x&&document.removeEventListener("keydown",ee)})},D="focus-trap.focus-after-trapped",$="focus-trap.focus-after-released",Ve="focus-trap.focusout-prevented",te={cancelable:!0,bubbles:!1},He={cancelable:!0,bubbles:!1},ne="focusAfterTrapped",se="focusAfterReleased",Qe=Symbol("elFocusTrap"),H=h(),N=h(0),Q=h(0);let I=0;const fe=e=>{const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:s=>{const a=s.tagName==="INPUT"&&s.type==="hidden";return s.disabled||s.hidden||a?NodeFilter.FILTER_SKIP:s.tabIndex>=0||s===document.activeElement?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t},oe=(e,t)=>{for(const n of e)if(!We(n,t))return n},We=(e,t)=>{if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1},Me=e=>{const t=fe(e),n=oe(t,e),s=oe(t.reverse(),e);return[n,s]},je=e=>e instanceof HTMLInputElement&&"select"in e,y=(e,t)=>{if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),Q.value=window.performance.now(),e!==n&&je(e)&&t&&e.select()}};function re(e,t){const n=[...e],s=e.indexOf(t);return s!==-1&&n.splice(s,1),n}const Je=()=>{let e=[];return{push:s=>{const a=e[0];a&&s!==a&&a.pause(),e=re(e,s),e.unshift(s)},remove:s=>{var a,i;e=re(e,s),(i=(a=e[0])==null?void 0:a.resume)==null||i.call(a)}}},qe=(e,t=!1)=>{const n=document.activeElement;for(const s of e)if(y(s,t),document.activeElement!==n)return},ae=Je(),ze=()=>N.value>Q.value,C=()=>{H.value="pointer",N.value=window.performance.now()},ue=()=>{H.value="keyboard",N.value=window.performance.now()},Ge=()=>(K(()=>{I===0&&(document.addEventListener("mousedown",C),document.addEventListener("touchstart",C),document.addEventListener("keydown",ue)),I++}),B(()=>{I--,I<=0&&(document.removeEventListener("mousedown",C),document.removeEventListener("touchstart",C),document.removeEventListener("keydown",ue))}),{focusReason:H,lastUserFocusTimestamp:N,lastAutomatedFocusTimestamp:Q}),L=e=>new CustomEvent(Ve,{...He,detail:e}),Ye=ge({name:"ElFocusTrap",inheritAttrs:!1,props:{loop:Boolean,trapped:Boolean,focusTrapEl:Object,focusStartEl:{type:[Object,String],default:"first"}},emits:[ne,se,"focusin","focusout","focusout-prevented","release-requested"],setup(e,{emit:t}){const n=h();let s,a;const{focusReason:i}=Ge();Be(o=>{e.trapped&&!l.paused&&t("release-requested",o)});const l={paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}},f=o=>{if(!e.loop&&!e.trapped||l.paused)return;const{key:c,altKey:v,ctrlKey:d,metaKey:E,currentTarget:w,shiftKey:W}=o,{loop:M}=e,pe=c===de.tab&&!v&&!d&&!E,P=document.activeElement;if(pe&&P){const R=w,[A,U]=Me(R);if(A&&U){if(!W&&P===U){const b=L({focusReason:i.value});t("focusout-prevented",b),b.defaultPrevented||(o.preventDefault(),M&&y(A,!0))}else if(W&&[A,R].includes(P)){const b=L({focusReason:i.value});t("focusout-prevented",b),b.defaultPrevented||(o.preventDefault(),M&&y(U,!0))}}else if(P===R){const b=L({focusReason:i.value});t("focusout-prevented",b),b.defaultPrevented||o.preventDefault()}}};he(Qe,{focusTrapRef:n,onKeydown:f}),T(()=>e.focusTrapEl,o=>{o&&(n.value=o)},{immediate:!0}),T([n],([o],[c])=>{o&&(o.addEventListener("keydown",f),o.addEventListener("focusin",p),o.addEventListener("focusout",O)),c&&(c.removeEventListener("keydown",f),c.removeEventListener("focusin",p),c.removeEventListener("focusout",O))});const m=o=>{t(ne,o)},_=o=>t(se,o),p=o=>{const c=S(n);if(!c)return;const v=o.target,d=o.relatedTarget,E=v&&c.contains(v);e.trapped||d&&c.contains(d)||(s=d),E&&t("focusin",o),!l.paused&&e.trapped&&(E?a=v:y(a,!0))},O=o=>{const c=S(n);if(!(l.paused||!c))if(e.trapped){const v=o.relatedTarget;!xe(v)&&!c.contains(v)&&setTimeout(()=>{if(!l.paused&&e.trapped){const d=L({focusReason:i.value});t("focusout-prevented",d),d.defaultPrevented||y(a,!0)}},0)}else{const v=o.target;v&&c.contains(v)||t("focusout",o)}};async function r(){await j();const o=S(n);if(o){ae.push(l);const c=o.contains(document.activeElement)?s:document.activeElement;if(s=c,!o.contains(c)){const d=new Event(D,te);o.addEventListener(D,m),o.dispatchEvent(d),d.defaultPrevented||j(()=>{let E=e.focusStartEl;Se(E)||(y(E),document.activeElement!==E&&(E="first")),E==="first"&&qe(fe(o),!0),(document.activeElement===c||E==="container")&&y(o)})}}}function u(){const o=S(n);if(o){o.removeEventListener(D,m);const c=new CustomEvent($,{...te,detail:{focusReason:i.value}});o.addEventListener($,_),o.dispatchEvent(c),!c.defaultPrevented&&(i.value=="keyboard"||!ze()||o.contains(document.activeElement))&&y(s??document.body),o.removeEventListener($,m),ae.remove(l)}}return K(()=>{e.trapped&&r(),T(()=>e.trapped,o=>{o?r():u()})}),B(()=>{e.trapped&&u()}),{onKeydown:f}}});function Xe(e,t,n,s,a,i){return Pe(e.$slots,"default",{handleKeydown:e.onKeydown})}var ct=ye(Ye,[["render",Xe],["__file","/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);export{de as E,Qe as F,ot as a,ct as b,ut as c,at as d,k as e,g as f,xe as i,nt as o,rt as t,st as u};
