import{c as W,_ as Y,a as G,b as K,E as Q}from"./el-overlay.762be8f4.js";import{E as Z}from"./el-button.2cb36390.js";import{D as M,s as F,r,w as y,e as R,o as d,c as B,j as u,p as o,u as s,h as w,t as S,l as f,A as ee,H as te,b as oe,i as P,z as se,k as le,f as g,m as ae}from"./entry.3ab378a4.js";import{_ as ie}from"./email-primary-icon.4adf2e14.js";import{h as ne,s as re}from"./eye-close-icon.0e4f6dd9.js";const ue=""+new URL("access-check.4d7962db.svg",import.meta.url).href,ce=o("div",null,[o("div",{class:"title__image"},[o("img",{src:ie,alt:""})]),o("div",{class:"title__text"},"Check your email")],-1),de=o("span",{class:"title"},"In order to reset your PIN check your email and follow the instructions.",-1),pe={key:0,class:"error"},me={class:"dialog-footer"},_e={key:0},ge={key:2,class:"later"},fe={__name:"OvConfirmPINChangeModal",props:{dialogVisible:{type:Boolean,required:!1},email:{type:String,default:""},appendToBody:{type:Boolean,default:!1}},setup(E){const v=E,I=M(),{forgotPinData:h,forgotPinFailureData:N}=F(I),a=r("560px"),i=r(59),c=r(null);y(h,p=>{});const x=()=>{i._value=59,I.forgotPin({email:v.email})};return y(N,p=>{p&&(c.value="You have exceeded the maximum number of reset PIN requests.")}),R(()=>{document.documentElement.clientWidth<=425&&(a.value="315px"),window.addEventListener("resize",p=>{p.target.innerWidth<=425?a.value="315px":a.value="560px"}),setInterval(()=>{i.value&&i.value--},1e3)}),(p,b)=>{const C=W;return d(),B(C,{modelValue:v.dialogVisible,"onUpdate:modelValue":b[0]||(b[0]=V=>v.dialogVisible=V),width:s(a),"append-to-body":E.appendToBody,"show-close":"",top:"30vh",class:"customModal",onClose:b[1]||(b[1]=V=>p.$emit("close"))},{header:u(()=>[ce]),footer:u(()=>[o("span",me,[s(i)&&!s(c)?(d(),w("span",_e,"0:"+S(s(i)>9?s(i):`0${s(i)}`),1)):f("",!0),!s(c)&&!s(i)?(d(),w("a",{key:1,href:"",class:"dialog-footer__action",onClick:x},"Resend Email")):f("",!0),s(c)?(d(),w("span",ge," Please try again later. ")):f("",!0)])]),default:u(()=>[de,s(c)?(d(),w("span",pe,S(s(c)),1)):f("",!0)]),_:1},8,["modelValue","width","append-to-body"])}}},ve=o("div",{class:"access-header"},[o("h3",null,"Access check")],-1),he=o("div",{class:"title__image"},[o("img",{src:ue,alt:""})],-1),be=o("span",{class:"title__text"}," Please enter your PIN in order to access account management section. ",-1),ke={key:0,class:"el-form-item__global-error-container"},ye={class:"el-form-item__global-error"},we=o("img",{src:Y,alt:""},null,-1),xe=o("span",{for:"pin",class:"custom_placeholder"}," Enter PIN ",-1),Pe=[xe],Ee=["src"],Ie={class:"forgot-password"},Ve={class:"submit-button__text"},Fe={__name:"AccessCheckModal",props:{dialogVisible:{type:Boolean,required:!1}},setup(E){const v=E,I=ee(),h=r("450px"),N=r("400px"),a=ae(),i=te(),c=oe(),x=M(),{checkPinData:p,checkPinFailureData:b,forgotPinData:C,forgotPinFailureData:V,isLoadingSubmit:T}=F(x),{profileSuccessData:q}=F(I),m=r({pin:null}),z=r({pin:[{required:!0,message:"This field is required.",trigger:"blur"},{min:4,max:6,message:"PIN must be between 4 and 6 digits",trigger:"blur"}]}),n=r({pin:{value:"",isShow:!1},global:{value:null}}),$=r(!1),D=r(!1);y(p,({data:e})=>{const t=g.get("currentAccountID")?g.get("currentAccountID"):0;{const l=JSON.parse(localStorage.getItem("accounts"));if(!g.get("login_pin_token")&&g.get("login_pin_token")!==e.login_pin_token){const k=new Date;k.setDate(k.getDate()+30),g.set("login_pin_token",e.login_pin_token,{expires:(Date.parse(k)-new Date)/864e5}),l[t].login_pin_token=e.login_pin_token,l[t].login_pin_token_expires=k}a.emit("loginToken",g.get("login_pin_token")),g.set("settings_pin_token",e.settings_pin_token,0),l[t].settings_pin_token=e.settings_pin_token,localStorage.setItem("accounts",JSON.stringify(l))}a.emit("close"),c.go()}),y(b,e=>{if(typeof e!="string")for(const t in e)if(typeof e[t]!="string")for(const l in e[t])n.value.global.value=e[t][l];else n.value.global.value=e[t];else n.value.global.value=e;i.path!=="/"&&setTimeout(()=>{c.go(-1)},1e3)}),y(V,e=>{for(const t in e)if(typeof e[t]!="string")for(const l in e[t])this.errors.global.value=e[t][l];else this.errors.global.value=e[t]}),y(C,e=>{e&&(D.value=!0)}),R(()=>{var e,t;(e=q.value)!=null&&e.user.email&&(m.value.email=(t=q.value)==null?void 0:t.user.email),document.documentElement.clientWidth<=425&&(h.value="315px"),window.addEventListener("resize",l=>{l.target.innerWidth<=425?h.value="315px":h.value="450px"})});const L=()=>{a.refs.pinForm.validate(e=>{e?x.checkPin(m.value):m.value.pin?n.value.global.value="PIN must be between 4 and 6 digits":n.value.global.value="This field is required"})},O=e=>{a.refs[e].focus()},U=()=>{x.forgotPin()},j=()=>{n.value.global.value=""},H=e=>{a.refs.pinForm.validateField(e,(t,l)=>{t?n.value.global.value="":n.value.global.value=l[e][0].message})};return(e,t)=>{const l=G,k=K,A=Z,J=Q,X=W;return d(),B(X,{modelValue:v.dialogVisible,"onUpdate:modelValue":t[5]||(t[5]=_=>v.dialogVisible=_),width:h.value,height:N.value,"close-on-click-modal":!1,"text-align":"center","show-close":!1,top:"230px",class:"access_modal",onClose:t[6]||(t[6]=_=>e.$emit("close"))},{header:u(()=>[ve]),default:u(()=>[he,be,P(J,{ref:"pinForm",class:"main__form--box","hide-required-asterisk":"","show-message":!1,model:m.value,rules:z.value,onSubmit:le(L,["prevent"])},{default:u(()=>[n.value.global.value?(d(),w("div",ke,[o("div",ye,[we,o("span",null,S(n.value.global.value),1)]),o("span",{class:"clear-error",onClick:j},"X")])):f("",!0),P(k,{prop:"pin",class:"password-form-item"},{default:u(()=>[P(l,{id:"pin",ref:"pin",modelValue:m.value.pin,"onUpdate:modelValue":t[2]||(t[2]=_=>m.value.pin=_),type:$.value?"text":"password",class:"main__form--box__input",placeholder:"Enter PIN",autofocus:"",onBlur:t[3]||(t[3]=_=>H("pin"))},{suffix:u(()=>[m.value.pin?(d(),w("div",{key:0,style:{position:"relative"},onClick:t[0]||(t[0]=_=>O("pin"))},Pe)):f("",!0),o("img",{src:$.value?s(ne):s(re),alt:"eye_icon",onClick:t[1]||(t[1]=_=>$.value=!$.value)},null,8,Ee)]),_:1},8,["modelValue","type"])]),_:1}),o("div",Ie,[P(A,{style:{"font-size":"14px","font-weight":"400"},onClick:U},{default:u(()=>[se("Forgot PIN?")]),_:1})]),P(A,{class:"submit-button","native-type":"submit",loading:s(T)},{default:u(()=>[o("span",Ve,S(s(T)?"":"NEXT"),1)]),_:1},8,["loading"])]),_:1},8,["model","rules","onSubmit"]),D.value?(d(),B(fe,{key:0,email:m.value.email,"dialog-visible":D.value,"append-to-body":!0,onClose:t[4]||(t[4]=_=>D.value=!1)},null,8,["email","dialog-visible"])):f("",!0)]),_:1},8,["modelValue","width","height"])}}};export{Fe as _,fe as a};
