import{b as I}from"./error.3564d58a.js";import{A as x,s as C,r as m,w as v,h as S,o as i,c as V,k as p,l as a,u as e,i as d,t as h,m as c,v as b,y as D,z as E}from"./entry.dabfc507.js";import{_ as B}from"./email-primary-icon.1455806e.js";import{_ as M}from"./_plugin-vue_export-helper.c27b6911.js";const g=r=>(D("data-v-5686f7bc"),r=r(),E(),r),$=g(()=>a("div",null,[a("div",{class:"title__image"},[a("img",{src:B,alt:""})]),a("div",{class:"title__text"},"Check your email")],-1)),P=g(()=>a("span",{class:"title"},[a("span",null," In order to reset your password check your email and follow the instructions. ")],-1)),T={key:0,class:"error"},W={class:"dialog-footer"},q={key:0},z={key:2,class:"later"},A={__name:"OvConfirmPasswordChangeModal",props:{dialogVisible:{type:Boolean,required:!1},email:{type:String,default:""}},setup(r){const f=r,_=x(),{forgotSuccessData:w,forgotErrorData:y}=C(_),n=m("560px"),t=m(59),l=m(null);return v(w,s=>{if(s){t.value=59;const o=setInterval(()=>{t.value&&t.value--},1e3);setTimeout(()=>{clearInterval(o)},6e4)}}),v(y,s=>{s||(l.value="You have exceeded the maximum number of reset password requests.")}),S(()=>{document.documentElement.clientWidth<=425&&(n.value="315px"),window.addEventListener("resize",o=>{o.target.innerWidth<=425?n.value="315px":n.value="560px"}),t.value=59;const s=setInterval(()=>{t.value&&t.value--},1e3);setTimeout(()=>{clearInterval(s)},6e4)}),(s,o)=>{const k=I;return i(),V(k,{modelValue:f.dialogVisible,"onUpdate:modelValue":o[1]||(o[1]=u=>f.dialogVisible=u),width:e(n),"show-close":"",top:"30vh",onClose:o[2]||(o[2]=u=>s.$emit("close"))},{header:p(()=>[$]),footer:p(()=>[a("span",W,[e(t)&&!e(l)?(i(),d("span",q,"0:"+h(e(t)>9?e(t):`0${e(t)}`),1)):c("",!0),!e(l)&&!e(t)?(i(),d("a",{key:1,href:"",class:"dialog-footer__action",onClick:o[0]||(o[0]=b(u=>e(_).forgotPassword({email:r.email}),["prevent"]))},"Resend Email")):c("",!0),e(l)?(i(),d("span",z," Please try again later. ")):c("",!0)])]),default:p(()=>[P,e(l)?(i(),d("span",T,h(e(l)),1)):c("",!0)]),_:1},8,["modelValue","width"])}}},U=M(A,[["__scopeId","data-v-5686f7bc"]]);export{U as C};
