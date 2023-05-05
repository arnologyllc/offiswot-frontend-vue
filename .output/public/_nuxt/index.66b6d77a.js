import{al as re,a1 as A,a4 as se,b as D,_ as K,K as ne,d as le,n as R,a6 as Y,w as oe}from"./index.9ce43428.js";import{t as ie,G as I,b as ce}from"./focus-trap.04464a06.js";import{K as O,M as ue,L as Z,r as v,O as k,ag as fe,a5 as U,o as L,c as $,k as ee,U as me,l as X,C as B,u as p,Q as j,a6 as ve,V as de,i as te,j as F,F as he,w as V,N as G,P as pe,$ as be,h as ge,as as ye,S as Se,R as we,m as ze,a1 as Ee}from"./entry.dabfc507.js";var Te=/\s/;function _e(a){for(var n=a.length;n--&&Te.test(a.charAt(n)););return n}var ke=/^\s+/;function xe(a){return a&&a.slice(0,_e(a)+1).replace(ke,"")}var q=0/0,Ce=/^[-+]0x[0-9a-f]+$/i,Ne=/^0b[01]+$/i,He=/^0o[0-7]+$/i,Re=parseInt;function Q(a){if(typeof a=="number")return a;if(re(a))return q;if(A(a)){var n=typeof a.valueOf=="function"?a.valueOf():a;a=A(n)?n+"":n}if(typeof a!="string")return a===0?a:+a;a=xe(a);var o=Ne.test(a);return o||He.test(a)?Re(a.slice(2),o?2:8):Ce.test(a)?q:+a}var Le=function(){return se.Date.now()};const W=Le;var Be="Expected a function",Pe=Math.max,Me=Math.min;function Ze(a,n,o){var l,f,m,i,c,r,d=0,b=!1,s=!1,g=!0;if(typeof a!="function")throw new TypeError(Be);n=Q(n)||0,A(o)&&(b=!!o.leading,s="maxWait"in o,m=s?Pe(Q(o.maxWait)||0,n):m,g="trailing"in o?!!o.trailing:g);function y(t){var e=l,u=f;return l=f=void 0,d=t,i=a.apply(u,e),i}function E(t){return d=t,c=setTimeout(S,n),b?y(t):i}function x(t){var e=t-r,u=t-d,h=n-e;return s?Me(h,m-u):h}function T(t){var e=t-r,u=t-d;return r===void 0||e>=n||e<0||s&&u>=m}function S(){var t=W();if(T(t))return w(t);c=setTimeout(S,x(t))}function w(t){return c=void 0,g&&l?y(t):(l=f=void 0,i)}function C(){c!==void 0&&clearTimeout(c),d=0,l=r=f=c=void 0}function N(){return c===void 0?i:w(W())}function z(){var t=W(),e=T(t);if(l=arguments,f=this,r=t,e){if(c===void 0)return E(r);if(s)return clearTimeout(c),c=setTimeout(S,n),y(r)}return c===void 0&&(c=setTimeout(S,n)),i}return z.cancel=C,z.flush=N,z}const _=4,Oe={vertical:{offset:"offsetHeight",scroll:"scrollTop",scrollSize:"scrollHeight",size:"height",key:"vertical",axis:"Y",client:"clientY",direction:"top"},horizontal:{offset:"offsetWidth",scroll:"scrollLeft",scrollSize:"scrollWidth",size:"width",key:"horizontal",axis:"X",client:"clientX",direction:"left"}},We=({move:a,size:n,bar:o})=>({[o.size]:n,transform:`translate${o.axis}(${a}%)`}),ae=Symbol("scrollbarContextKey"),Ae=D({vertical:Boolean,size:String,move:Number,ratio:{type:Number,required:!0},always:Boolean}),Ie="Thumb",$e=O({__name:"thumb",props:Ae,setup(a){const n=a,o=ue(ae),l=Z("scrollbar");o||ie(Ie,"can not inject scrollbar context");const f=v(),m=v(),i=v({}),c=v(!1);let r=!1,d=!1,b=ne?document.onselectstart:null;const s=k(()=>Oe[n.vertical?"vertical":"horizontal"]),g=k(()=>We({size:n.size,move:n.move,bar:s.value})),y=k(()=>f.value[s.value.offset]**2/o.wrapElement[s.value.scrollSize]/n.ratio/m.value[s.value.offset]),E=t=>{var e;if(t.stopPropagation(),t.ctrlKey||[1,2].includes(t.button))return;(e=window.getSelection())==null||e.removeAllRanges(),T(t);const u=t.currentTarget;u&&(i.value[s.value.axis]=u[s.value.offset]-(t[s.value.client]-u.getBoundingClientRect()[s.value.direction]))},x=t=>{if(!m.value||!f.value||!o.wrapElement)return;const e=Math.abs(t.target.getBoundingClientRect()[s.value.direction]-t[s.value.client]),u=m.value[s.value.offset]/2,h=(e-u)*100*y.value/f.value[s.value.offset];o.wrapElement[s.value.scroll]=h*o.wrapElement[s.value.scrollSize]/100},T=t=>{t.stopImmediatePropagation(),r=!0,document.addEventListener("mousemove",S),document.addEventListener("mouseup",w),b=document.onselectstart,document.onselectstart=()=>!1},S=t=>{if(!f.value||!m.value||r===!1)return;const e=i.value[s.value.axis];if(!e)return;const u=(f.value.getBoundingClientRect()[s.value.direction]-t[s.value.client])*-1,h=m.value[s.value.offset]-e,H=(u-h)*100*y.value/f.value[s.value.offset];o.wrapElement[s.value.scroll]=H*o.wrapElement[s.value.scrollSize]/100},w=()=>{r=!1,i.value[s.value.axis]=0,document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",w),z(),d&&(c.value=!1)},C=()=>{d=!1,c.value=!!n.size},N=()=>{d=!0,c.value=r};fe(()=>{z(),document.removeEventListener("mouseup",w)});const z=()=>{document.onselectstart!==b&&(document.onselectstart=b)};return I(U(o,"scrollbarElement"),"mousemove",C),I(U(o,"scrollbarElement"),"mouseleave",N),(t,e)=>(L(),$(de,{name:p(l).b("fade"),persisted:""},{default:ee(()=>[me(X("div",{ref_key:"instance",ref:f,class:B([p(l).e("bar"),p(l).is(p(s).key)]),onMousedown:x},[X("div",{ref_key:"thumb",ref:m,class:B(p(l).e("thumb")),style:j(p(g)),onMousedown:E},null,38)],34),[[ve,t.always||c.value]])]),_:1},8,["name"]))}});var J=K($e,[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);const Xe=D({always:{type:Boolean,default:!0},width:String,height:String,ratioX:{type:Number,default:1},ratioY:{type:Number,default:1}}),je=O({__name:"bar",props:Xe,setup(a,{expose:n}){const o=a,l=v(0),f=v(0);return n({handleScroll:i=>{if(i){const c=i.offsetHeight-_,r=i.offsetWidth-_;f.value=i.scrollTop*100/c*o.ratioY,l.value=i.scrollLeft*100/r*o.ratioX}}}),(i,c)=>(L(),te(he,null,[F(J,{move:l.value,ratio:i.ratioX,size:i.width,always:i.always},null,8,["move","ratio","size","always"]),F(J,{move:f.value,ratio:i.ratioY,size:i.height,vertical:"",always:i.always},null,8,["move","ratio","size","always"])],64))}});var De=K(je,[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);const Ke=D({height:{type:[String,Number],default:""},maxHeight:{type:[String,Number],default:""},native:{type:Boolean,default:!1},wrapStyle:{type:le([String,Object,Array]),default:""},wrapClass:{type:[String,Array],default:""},viewClass:{type:[String,Array],default:""},viewStyle:{type:[String,Array,Object],default:""},noresize:Boolean,tag:{type:String,default:"div"},always:Boolean,minSize:{type:Number,default:20}}),Ye={scroll:({scrollTop:a,scrollLeft:n})=>[a,n].every(R)},Ue="ElScrollbar",Fe=O({name:Ue}),Ve=O({...Fe,props:Ke,emits:Ye,setup(a,{expose:n,emit:o}){const l=a,f=Z("scrollbar");let m,i;const c=v(),r=v(),d=v(),b=v("0"),s=v("0"),g=v(),y=v(1),E=v(1),x=k(()=>{const e={};return l.height&&(e.height=Y(l.height)),l.maxHeight&&(e.maxHeight=Y(l.maxHeight)),[l.wrapStyle,e]}),T=k(()=>[l.wrapClass,f.e("wrap"),{[f.em("wrap","hidden-default")]:!l.native}]),S=k(()=>[f.e("view"),l.viewClass]),w=()=>{var e;r.value&&((e=g.value)==null||e.handleScroll(r.value),o("scroll",{scrollTop:r.value.scrollTop,scrollLeft:r.value.scrollLeft}))};function C(e,u){Ee(e)?r.value.scrollTo(e):R(e)&&R(u)&&r.value.scrollTo(e,u)}const N=e=>{R(e)&&(r.value.scrollTop=e)},z=e=>{R(e)&&(r.value.scrollLeft=e)},t=()=>{if(!r.value)return;const e=r.value.offsetHeight-_,u=r.value.offsetWidth-_,h=e**2/r.value.scrollHeight,H=u**2/r.value.scrollWidth,P=Math.max(h,l.minSize),M=Math.max(H,l.minSize);y.value=h/(e-h)/(P/(e-P)),E.value=H/(u-H)/(M/(u-M)),s.value=P+_<e?`${P}px`:"",b.value=M+_<u?`${M}px`:""};return V(()=>l.noresize,e=>{e?(m==null||m(),i==null||i()):({stop:m}=ce(d,t),i=I("resize",t))},{immediate:!0}),V(()=>[l.maxHeight,l.height],()=>{l.native||G(()=>{var e;t(),r.value&&((e=g.value)==null||e.handleScroll(r.value))})}),pe(ae,be({scrollbarElement:c,wrapElement:r})),ge(()=>{l.native||G(()=>{t()})}),ye(()=>t()),n({wrapRef:r,update:t,scrollTo:C,setScrollTop:N,setScrollLeft:z,handleScroll:w}),(e,u)=>(L(),te("div",{ref_key:"scrollbarRef",ref:c,class:B(p(f).b())},[X("div",{ref_key:"wrapRef",ref:r,class:B(p(T)),style:j(p(x)),onScroll:w},[(L(),$(we(e.tag),{ref_key:"resizeRef",ref:d,class:B(p(S)),style:j(e.viewStyle)},{default:ee(()=>[Se(e.$slots,"default")]),_:3},8,["class","style"]))],38),e.native?ze("v-if",!0):(L(),$(De,{key:0,ref_key:"barRef",ref:g,height:s.value,width:b.value,always:e.always,"ratio-x":E.value,"ratio-y":y.value},null,8,["height","width","always","ratio-x","ratio-y"]))],2))}});var Ge=K(Ve,[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]);const et=oe(Ge);export{et as E,Ze as d};
