import{W as U,M as I,E as p,w as J,N as Q,p as Y,r as F,J as E,a1 as be,ah as K,K as L,a4 as X,L as D,o as y,c as Z,k as _,i as M,B as x,u,U as w,h as C,Y as $,bK as N,R as P,F as ve,z as j,t as ee,m as z,Q as ne,P as me,O as fe,a0 as he}from"./entry.893479c5.js";import{u as ae,m as A,n as G,l as T,o as ke,a as O,g as H,p as le,_ as R,b as pe,d as ge,w as xe,q as te}from"./el-button.a59501ca.js";import{g as q,h as ye,j as Ce,k as Se,l as Le,U as V}from"./el-overlay.1f5dd129.js";import{c as oe,e as Be,f as Ee,h as Ie,d as se}from"./focus-trap.57815629.js";import{i as we}from"./isEqual.e7705bdc.js";import{f as $e}from"./flatten.8d59f145.js";function Ne(e){return e}function Ve(e,n,l){switch(l.length){case 0:return e.call(n);case 1:return e.call(n,l[0]);case 2:return e.call(n,l[0],l[1]);case 3:return e.call(n,l[0],l[1],l[2])}return e.apply(n,l)}var Fe=800,ze=16,Ge=Date.now;function Te(e){var n=0,l=0;return function(){var a=Ge(),s=ze-(a-l);if(l=a,s>0){if(++n>=Fe)return arguments[0]}else n=0;return e.apply(void 0,arguments)}}function De(e){return function(){return e}}var Pe=q?function(e,n){return q(e,"toString",{configurable:!0,enumerable:!1,value:De(n),writable:!0})}:Ne;const Oe=Pe;var Re=Te(Oe);const Ue=Re;var W=Math.max;function Ke(e,n,l){return n=W(n===void 0?e.length-1:n,0),function(){for(var a=arguments,s=-1,d=W(a.length-n,0),c=Array(d);++s<d;)c[s]=a[n+s];s=-1;for(var t=Array(n+1);++s<n;)t[s]=a[s];return t[n]=l(c),Ve(e,this,t)}}function Me(e){return Ue(Ke(e,void 0,$e),e+"")}function Ae(e,n){return e!=null&&n in Object(e)}function He(e,n,l){n=oe(n,e);for(var a=-1,s=n.length,d=!1;++a<s;){var c=Be(n[a]);if(!(d=e!=null&&l(e,c)))break;e=e[c]}return d||++a!=s?d:(s=e==null?0:e.length,!!s&&ye(s)&&Ce(c,s)&&(Ee(e)||Se(e)))}function qe(e,n){return e!=null&&He(e,n,Ae)}function We(e,n,l){for(var a=-1,s=n.length,d={};++a<s;){var c=n[a],t=Ie(e,c);l(t,c)&&Le(d,oe(c,e),t)}return d}function Je(e,n){return We(e,n,function(l,a){return qe(e,a)})}var Qe=Me(function(e,n){return e==null?{}:Je(e,n)});const Ye=Qe,ue={modelValue:{type:[Number,String,Boolean],default:void 0},label:{type:[String,Boolean,Number,Object]},indeterminate:Boolean,disabled:Boolean,checked:Boolean,name:{type:String,default:void 0},trueLabel:{type:[String,Number],default:void 0},falseLabel:{type:[String,Number],default:void 0},id:{type:String,default:void 0},controls:{type:String,default:void 0},border:Boolean,size:ae,tabindex:[String,Number],validateEvent:{type:Boolean,default:!0}},ie={[V]:e=>U(e)||A(e)||G(e),change:e=>U(e)||A(e)||G(e)},B=Symbol("checkboxGroupContextKey"),Xe=({model:e,isChecked:n})=>{const l=I(B,void 0),a=p(()=>{var d,c;const t=(d=l==null?void 0:l.max)==null?void 0:d.value,m=(c=l==null?void 0:l.min)==null?void 0:c.value;return!T(t)&&e.value.length>=t&&!n.value||!T(m)&&e.value.length<=m&&n.value});return{isDisabled:ke(p(()=>(l==null?void 0:l.disabled.value)||a.value)),isLimitDisabled:a}},Ze=(e,{model:n,isLimitExceeded:l,hasOwnLabel:a,isDisabled:s,isLabeledByFormItem:d})=>{const c=I(B,void 0),{formItem:t}=O(),{emit:m}=Y();function o(r){var b,v;return r===e.trueLabel||r===!0?(b=e.trueLabel)!=null?b:!0:(v=e.falseLabel)!=null?v:!1}function f(r,b){m("change",o(r),b)}function k(r){if(l.value)return;const b=r.target;m("change",o(b.checked),r)}async function S(r){l.value||!a.value&&!s.value&&d.value&&(r.composedPath().some(h=>h.tagName==="LABEL")||(n.value=o([!1,e.falseLabel].includes(n.value)),await Q(),f(n.value,r)))}const i=p(()=>(c==null?void 0:c.validateEvent)||e.validateEvent);return J(()=>e.modelValue,()=>{i.value&&(t==null||t.validate("change").catch(r=>se()))}),{handleChange:k,onClickRoot:S}},_e=e=>{const n=F(!1),{emit:l}=Y(),a=I(B,void 0),s=p(()=>T(a)===!1),d=F(!1);return{model:p({get(){var t,m;return s.value?(t=a==null?void 0:a.modelValue)==null?void 0:t.value:(m=e.modelValue)!=null?m:n.value},set(t){var m,o;s.value&&E(t)?(d.value=((m=a==null?void 0:a.max)==null?void 0:m.value)!==void 0&&t.length>(a==null?void 0:a.max.value),d.value===!1&&((o=a==null?void 0:a.changeEvent)==null||o.call(a,t))):(l(V,t),n.value=t)}}),isGroup:s,isLimitExceeded:d}},je=(e,n,{model:l})=>{const a=I(B,void 0),s=F(!1),d=p(()=>{const o=l.value;return G(o)?o:E(o)?be(e.label)?o.map(K).some(f=>we(f,e.label)):o.map(K).includes(e.label):o!=null?o===e.trueLabel:!!o}),c=H(p(()=>{var o;return(o=a==null?void 0:a.size)==null?void 0:o.value}),{prop:!0}),t=H(p(()=>{var o;return(o=a==null?void 0:a.size)==null?void 0:o.value})),m=p(()=>!!(n.default||e.label));return{checkboxButtonSize:c,isChecked:d,isFocused:s,checkboxSize:t,hasOwnLabel:m}},en=(e,{model:n})=>{function l(){E(n.value)&&!n.value.includes(e.label)?n.value.push(e.label):n.value=e.trueLabel||!0}e.checked&&l()},re=(e,n)=>{const{formItem:l}=O(),{model:a,isGroup:s,isLimitExceeded:d}=_e(e),{isFocused:c,isChecked:t,checkboxButtonSize:m,checkboxSize:o,hasOwnLabel:f}=je(e,n,{model:a}),{isDisabled:k}=Xe({model:a,isChecked:t}),{inputId:S,isLabeledByFormItem:i}=le(e,{formItemContext:l,disableIdGeneration:f,disableIdManagement:s}),{handleChange:r,onClickRoot:b}=Ze(e,{model:a,isLimitExceeded:d,hasOwnLabel:f,isDisabled:k,isLabeledByFormItem:i});return en(e,{model:a}),{inputId:S,isLabeledByFormItem:i,isChecked:t,isDisabled:k,isFocused:c,checkboxButtonSize:m,checkboxSize:o,hasOwnLabel:f,model:a,handleChange:r,onClickRoot:b}},nn=["tabindex","role","aria-checked"],an=["id","aria-hidden","name","tabindex","disabled","true-value","false-value"],ln=["id","aria-hidden","disabled","value","name","tabindex"],tn=L({name:"ElCheckbox"}),on=L({...tn,props:ue,emits:ie,setup(e){const n=e,l=X(),{inputId:a,isLabeledByFormItem:s,isChecked:d,isDisabled:c,isFocused:t,checkboxSize:m,hasOwnLabel:o,model:f,handleChange:k,onClickRoot:S}=re(n,l),i=D("checkbox"),r=p(()=>[i.b(),i.m(m.value),i.is("disabled",c.value),i.is("bordered",n.border),i.is("checked",d.value)]),b=p(()=>[i.e("input"),i.is("disabled",c.value),i.is("checked",d.value),i.is("indeterminate",n.indeterminate),i.is("focus",t.value)]);return(v,h)=>(y(),Z(ne(!u(o)&&u(s)?"span":"label"),{class:x(u(r)),"aria-controls":v.indeterminate?v.controls:null,onClick:u(S)},{default:_(()=>[M("span",{class:x(u(b)),tabindex:v.indeterminate?0:void 0,role:v.indeterminate?"checkbox":void 0,"aria-checked":v.indeterminate?"mixed":void 0},[v.trueLabel||v.falseLabel?w((y(),C("input",{key:0,id:u(a),"onUpdate:modelValue":h[0]||(h[0]=g=>$(f)?f.value=g:null),class:x(u(i).e("original")),type:"checkbox","aria-hidden":v.indeterminate?"true":"false",name:v.name,tabindex:v.tabindex,disabled:u(c),"true-value":v.trueLabel,"false-value":v.falseLabel,onChange:h[1]||(h[1]=(...g)=>u(k)&&u(k)(...g)),onFocus:h[2]||(h[2]=g=>t.value=!0),onBlur:h[3]||(h[3]=g=>t.value=!1)},null,42,an)),[[N,u(f)]]):w((y(),C("input",{key:1,id:u(a),"onUpdate:modelValue":h[4]||(h[4]=g=>$(f)?f.value=g:null),class:x(u(i).e("original")),type:"checkbox","aria-hidden":v.indeterminate?"true":"false",disabled:u(c),value:v.label,name:v.name,tabindex:v.tabindex,onChange:h[5]||(h[5]=(...g)=>u(k)&&u(k)(...g)),onFocus:h[6]||(h[6]=g=>t.value=!0),onBlur:h[7]||(h[7]=g=>t.value=!1)},null,42,ln)),[[N,u(f)]]),M("span",{class:x(u(i).e("inner"))},null,2)],10,nn),u(o)?(y(),C("span",{key:0,class:x(u(i).e("label"))},[P(v.$slots,"default"),v.$slots.default?z("v-if",!0):(y(),C(ve,{key:0},[j(ee(v.label),1)],64))],2)):z("v-if",!0)]),_:3},8,["class","aria-controls","onClick"]))}});var sn=R(on,[["__file","/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox.vue"]]);const un=["name","tabindex","disabled","true-value","false-value"],rn=["name","tabindex","disabled","value"],dn=L({name:"ElCheckboxButton"}),cn=L({...dn,props:ue,emits:ie,setup(e){const n=e,l=X(),{isFocused:a,isChecked:s,isDisabled:d,checkboxButtonSize:c,model:t,handleChange:m}=re(n,l),o=I(B,void 0),f=D("checkbox"),k=p(()=>{var i,r,b,v;const h=(r=(i=o==null?void 0:o.fill)==null?void 0:i.value)!=null?r:"";return{backgroundColor:h,borderColor:h,color:(v=(b=o==null?void 0:o.textColor)==null?void 0:b.value)!=null?v:"",boxShadow:h?`-1px 0 0 0 ${h}`:void 0}}),S=p(()=>[f.b("button"),f.bm("button",c.value),f.is("disabled",d.value),f.is("checked",s.value),f.is("focus",a.value)]);return(i,r)=>(y(),C("label",{class:x(u(S))},[i.trueLabel||i.falseLabel?w((y(),C("input",{key:0,"onUpdate:modelValue":r[0]||(r[0]=b=>$(t)?t.value=b:null),class:x(u(f).be("button","original")),type:"checkbox",name:i.name,tabindex:i.tabindex,disabled:u(d),"true-value":i.trueLabel,"false-value":i.falseLabel,onChange:r[1]||(r[1]=(...b)=>u(m)&&u(m)(...b)),onFocus:r[2]||(r[2]=b=>a.value=!0),onBlur:r[3]||(r[3]=b=>a.value=!1)},null,42,un)),[[N,u(t)]]):w((y(),C("input",{key:1,"onUpdate:modelValue":r[4]||(r[4]=b=>$(t)?t.value=b:null),class:x(u(f).be("button","original")),type:"checkbox",name:i.name,tabindex:i.tabindex,disabled:u(d),value:i.label,onChange:r[5]||(r[5]=(...b)=>u(m)&&u(m)(...b)),onFocus:r[6]||(r[6]=b=>a.value=!0),onBlur:r[7]||(r[7]=b=>a.value=!1)},null,42,rn)),[[N,u(t)]]),i.$slots.default||i.label?(y(),C("span",{key:2,class:x(u(f).be("button","inner")),style:me(u(s)?u(k):void 0)},[P(i.$slots,"default",{},()=>[j(ee(i.label),1)])],6)):z("v-if",!0)],2))}});var de=R(cn,[["__file","/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-button.vue"]]);const bn=pe({modelValue:{type:ge(Array),default:()=>[]},disabled:Boolean,min:Number,max:Number,size:ae,label:String,fill:String,textColor:String,tag:{type:String,default:"div"},validateEvent:{type:Boolean,default:!0}}),vn={[V]:e=>E(e),change:e=>E(e)},mn=L({name:"ElCheckboxGroup"}),fn=L({...mn,props:bn,emits:vn,setup(e,{emit:n}){const l=e,a=D("checkbox"),{formItem:s}=O(),{inputId:d,isLabeledByFormItem:c}=le(l,{formItemContext:s}),t=async o=>{n(V,o),await Q(),n("change",o)},m=p({get(){return l.modelValue},set(o){t(o)}});return fe(B,{...Ye(he(l),["size","min","max","disabled","validateEvent","fill","textColor"]),modelValue:m,changeEvent:t}),J(()=>l.modelValue,()=>{l.validateEvent&&(s==null||s.validate("change").catch(o=>se()))}),(o,f)=>{var k;return y(),Z(ne(o.tag),{id:u(d),class:x(u(a).b("group")),role:"group","aria-label":u(c)?void 0:o.label||"checkbox-group","aria-labelledby":u(c)?(k=u(s))==null?void 0:k.labelId:void 0},{default:_(()=>[P(o.$slots,"default")]),_:3},8,["id","class","aria-label","aria-labelledby"])}}});var ce=R(fn,[["__file","/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-group.vue"]]);const Cn=xe(sn,{CheckboxButton:de,CheckboxGroup:ce});te(de);const Sn=te(ce);export{Cn as E,Sn as a};