import{E as K}from"./el-input.7fd03793.js";import{b as R,_ as Q,a as Z,E as ee}from"./el-overlay.64de5399.js";import{E as oe}from"./el-button.6d07ff3a.js";import"./el-form-item.4ed993c7.js";import{D as A,s as B,r,w as y,e as L,o as d,c as F,i as u,m as t,u as s,f as w,t as C,k as g,j as U,B as te,C as se,b as le,h as P,q as ae,l as ie}from"./entry.1c65c56b.js";import{a as k}from"./js.cookie.edb2da2a.js";import{n as M}from"./nuxt-storage.min.d80392db.js";import{_ as ne}from"./email-primary-icon.754ea29f.js";import{h as re,s as ue}from"./eye-close-icon.f5ebd9e6.js";const ce=""+new URL("access-check.4d7962db.svg",import.meta.url).href,de=t("div",null,[t("div",{class:"title__image"},[t("img",{src:ne,alt:""})]),t("div",{class:"title__text"},"Check your email")],-1),pe=t("span",{class:"title"},"In order to reset your PIN check your email and follow the instructions.",-1),me={key:0,class:"error"},_e={class:"dialog-footer"},ge={key:0},fe=["onClick"],ve={key:2,class:"later"},he={__name:"OvConfirmPINChangeModal",props:{dialogVisible:{type:Boolean,required:!1},email:{type:String,default:""},appendToBody:{type:Boolean,default:!1}},setup($){const f=$,D=A(),{forgotPinData:v,forgotPinFailureData:S}=B(D),a=r("560px"),i=r(59),c=r(null);y(v,p=>{});const x=()=>{i._value=59,D.forgotPin({email:f.email})};return y(S,p=>{p||(c.value="You have exceeded the maximum number of reset password requests.")}),L(()=>{document.documentElement.clientWidth<=425&&(a.value="315px"),window.addEventListener("resize",p=>{p.target.innerWidth<=425?a.value="315px":a.value="560px"}),setInterval(()=>{i.value&&i.value--},1e3)}),(p,h)=>{const N=R;return d(),F(N,{modelValue:f.dialogVisible,"onUpdate:modelValue":h[0]||(h[0]=V=>f.dialogVisible=V),width:s(a),"append-to-body":$.appendToBody,"show-close":"",top:"30vh",class:"customModal",onClose:h[1]||(h[1]=V=>p.$emit("close"))},{header:u(()=>[de]),footer:u(()=>[t("span",_e,[s(i)&&!s(c)?(d(),w("span",ge,"0:"+C(s(i)>9?s(i):`0${s(i)}`),1)):g("",!0),!s(c)&&!s(i)?(d(),w("a",{key:1,href:"",class:"dialog-footer__action",onClick:U(x,["prevent"])},"Resend Email",8,fe)):g("",!0),s(c)?(d(),w("span",ve," Please try again later. ")):g("",!0)])]),default:u(()=>[pe,s(c)?(d(),w("span",me,C(s(c)),1)):g("",!0)]),_:1},8,["modelValue","width","append-to-body"])}}},be=t("div",{class:"access-header"},[t("h3",null,"Access check")],-1),ke=t("div",{class:"title__image"},[t("img",{src:ce,alt:""})],-1),ye=t("span",{class:"title__text"}," Please enter your PIN in order to access account management section. ",-1),we={key:0,class:"el-form-item__global-error-container"},xe={class:"el-form-item__global-error"},Ee=t("img",{src:Q,alt:""},null,-1),Pe=t("span",{for:"pin",class:"custom_placeholder"}," Enter PIN ",-1),$e=[Pe],De=["src"],Ve={class:"forgot-password"},Ie={class:"submit-button__text"},Re={__name:"AccessCheckModal",props:{dialogVisible:{type:Boolean,required:!1}},setup($){const f=$,D=te(),v=r("450px"),S=r("400px"),a=ie(),i=se(),c=le(),x=A(),{checkPinData:p,checkPinFailureData:h,forgotPinData:N,forgotPinFailureData:V,isLoadingSubmit:T}=B(x),{profileSuccessData:q}=B(D),m=r({pin:null}),j=r({pin:[{required:!0,message:"This field is required.",trigger:"blur"},{min:4,max:6,message:"PIN must be between 4 and 6 digits",trigger:"blur"}]}),n=r({pin:{value:"",isShow:!1},global:{value:null}}),I=r(!1),E=r(!1);y(p,({data:e})=>{const o=k.get("currentAccountID"),l=M.localStorage.getData("accounts");if(!k.get("login_pin_token")&&k.get("login_pin_token")!==e.login_pin_token){const b=new Date;b.setDate(b.getDate()+30),k.set("login_pin_token",e.login_pin_token,{expires:(Date.parse(b)-new Date)/864e5}),l[o].login_pin_token=e.login_pin_token,l[o].login_pin_token_expires=b}a.emit("loginToken",k.get("login_pin_token")),k.set("settings_pin_token",e.settings_pin_token,0),l[o].settings_pin_token=e.settings_pin_token,M.localStorage.setData("accounts",l,30,"d"),a.emit("close"),c.go()}),y(h,e=>{if(typeof e!="string")for(const o in e)if(typeof e[o]!="string")for(const l in e[o])n.value.global.value=e[o][l];else n.value.global.value=e[o];else n.value.global.value=e;i.path!=="/"&&setTimeout(()=>{c.go(-1)},1e3)}),y(V,e=>{for(const o in e)if(typeof e[o]!="string")for(const l in e[o])this.errors.global.value=e[o][l];else this.errors.global.value=e[o]}),y(N,e=>{e&&(E.value=!0)}),L(()=>{var e,o;(e=q.value)!=null&&e.user.email&&(m.value.email=(o=q.value)==null?void 0:o.user.email),document.documentElement.clientWidth<=425&&(v.value="315px"),window.addEventListener("resize",l=>{l.target.innerWidth<=425?v.value="315px":v.value="450px"})});const z=()=>{a.refs.pinForm.validate(e=>{e?x.checkPin(m._value):m._value.pin?n.value.global.value="PIN must be between 4 and 6 digits":n.value.global.value="This field is required"})},O=e=>{a.refs[e].focus()},X=()=>{E.value=!0,x.forgotPin()},H=()=>{n.value.global.value=""},Y=e=>{a.refs.pinForm.validateField(e,(o,l)=>{o?n.value.global.value="":n.value.global.value=l[e][0].message})};return(e,o)=>{const l=K,b=Z,W=oe,G=ee,J=R;return d(),F(J,{modelValue:f.dialogVisible,"onUpdate:modelValue":o[5]||(o[5]=_=>f.dialogVisible=_),width:v.value,height:S.value,"close-on-click-modal":!1,"text-align":"center","show-close":!1,top:"230px",class:"access_modal",onClose:o[6]||(o[6]=_=>e.$emit("close"))},{header:u(()=>[be]),default:u(()=>[ke,ye,P(G,{ref:"pinForm",class:"main__form--box","hide-required-asterisk":"","show-message":!1,model:m.value,rules:j.value,onSubmit:U(z,["prevent"])},{default:u(()=>[n.value.global.value?(d(),w("div",we,[t("div",xe,[Ee,t("span",null,C(n.value.global.value),1)]),t("span",{class:"clear-error",onClick:H},"X")])):g("",!0),P(b,{prop:"pin",class:"password-form-item"},{default:u(()=>[P(l,{id:"pin",ref:"pin",modelValue:m.value.pin,"onUpdate:modelValue":o[2]||(o[2]=_=>m.value.pin=_),type:I.value?"text":"password",class:"main__form--box__input",placeholder:"Enter PIN",onBlur:o[3]||(o[3]=_=>Y("pin"))},{suffix:u(()=>[m.value.pin?(d(),w("div",{key:0,style:{position:"relative"},onClick:o[0]||(o[0]=_=>O("pin"))},$e)):g("",!0),t("img",{src:I.value?s(re):s(ue),alt:"eye_icon",onClick:o[1]||(o[1]=_=>I.value=!I.value)},null,8,De)]),_:1},8,["modelValue","type"])]),_:1}),t("div",Ve,[P(W,{style:{"font-size":"14px","font-weight":"400"},onClick:X},{default:u(()=>[ae("Forgot PIN?")]),_:1})]),P(W,{class:"submit-button","native-type":"submit",loading:s(T)},{default:u(()=>[t("span",Ie,C(s(T)?"":"NEXT"),1)]),_:1},8,["loading"])]),_:1},8,["model","rules","onSubmit"]),E.value?(d(),F(he,{key:0,email:m.value.email,"dialog-visible":E.value,"append-to-body":!0,onClose:o[4]||(o[4]=_=>E.value=!1)},null,8,["email","dialog-visible"])):g("",!0)]),_:1},8,["modelValue","width","height"])}}};export{Re as _,he as a};