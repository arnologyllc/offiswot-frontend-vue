import{G as w,s as V,r as m,w as f,e as E,o as i,c as C,j as u,p as s,u as e,h as n,t as h,l as c}from"./entry.3ab378a4.js";import{c as S}from"./el-overlay.762be8f4.js";import"./el-button.2cb36390.js";import{_ as b}from"./email-primary-icon.4adf2e14.js";const U=""+new URL("user-icon.024ad466.svg",import.meta.url).href,B=s("div",null,[s("div",{class:"title__image"},[s("img",{src:b,alt:""})]),s("div",{class:"title__text"},"Check your email")],-1),D=s("span",{class:"title"},"We have emailed you a verification link on your registered email. Please click on the link sent for verifying your email.",-1),W={key:0,class:"error"},M={class:"dialog-footer"},R={key:0},$={key:2,class:"later"},j={__name:"OvConfirmEmailModal",props:{dialogVisible:{type:Boolean,required:!1},email:{type:String,default:""}},setup(v){const d=v,p=w(),{resendSuccessData:g,resendFailureData:k}=V(p),l=m("560px"),t=m(0),o=m(null);f(g,a=>{}),f(k,a=>{a&&(o.value="You have exceeded the maximum number of verification link requests.")});const y=()=>{t._value=59,p.resendEmail(d.email)};return E(()=>{document.documentElement.clientWidth<=425&&(l.value="315px"),window.addEventListener("resize",a=>{a.target.innerWidth<=425?l.value="315px":l.value="560px"}),setInterval(()=>{t.value&&t.value--},1e3)}),(a,r)=>{const x=S;return i(),C(x,{modelValue:d.dialogVisible,"onUpdate:modelValue":r[0]||(r[0]=_=>d.dialogVisible=_),"max-width":e(l),class:"customModal","show-close":"",top:"30vh",onClose:r[1]||(r[1]=_=>a.$emit("close"))},{header:u(()=>[B]),footer:u(()=>[s("span",M,[e(t)&&!e(o)?(i(),n("span",R,"0:"+h(e(t)>9?e(t):`0${e(t)}`),1)):c("",!0),!e(o)&&!e(t)?(i(),n("a",{key:1,href:"",class:"dialog-footer__action",onClick:y},"Resend Verification Email")):c("",!0),e(o)?(i(),n("span",$," Please try again later. ")):c("",!0)])]),default:u(()=>[D,e(o)?(i(),n("span",W,h(e(o)),1)):c("",!0)]),_:1},8,["modelValue","max-width"])}}};export{j as _,U as a};