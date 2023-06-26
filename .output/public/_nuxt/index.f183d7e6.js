import{E as Y,_ as P,a as G,b as K}from"./el-overlay.303db8d7.js";import{E as Q}from"./el-button.a9620db7.js";import{r as p,D as X,b as Z,s as ee,w as C,f as oe,i as m,j as r,k as v,l as d,u as o,m as ie,q as ne,o as a,t as te,p as u,B as V,c as M,x as se,y as re,h as k,z as F}from"./entry.4919aef1.js";import{E as T}from"./ErrorMassageModal.6cc8bcf1.js";import{h as B,s as D}from"./eye-close-icon.a59f8c16.js";import le from"./auth.8d4f467f.js";import{_ as ae}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.a4932e6f.js";const _=b=>(se("data-v-37e58679"),b=b(),re(),b),ue={class:"main"},pe={class:"main__form"},me=_(()=>r("div",{class:"main__form--title"},"Set PIN",-1)),de=_(()=>r("div",{class:"main__form--subtitle"},"Fill in the fields to set your PIN.",-1)),_e={key:0,class:"el-form-item__global-error-container"},ce={class:"el-form-item__global-error"},fe=_(()=>r("img",{src:P,alt:""},null,-1)),ve=_(()=>r("span",{for:"pin",class:"custom_placeholder"}," PIN ",-1)),ge=[ve],be=["src"],we={key:0,class:"el-form-item__error"},ye=["innerHTML"],Se=_(()=>r("div",null,null,-1)),Ie=_(()=>r("span",{for:"password",class:"custom_placeholder"}," PIN Confirmation ",-1)),he=[Ie],xe=["src"],ke={key:0,class:"el-form-item__error"},Pe=["innerHTML"],Ee=_(()=>r("div",null,null,-1)),$e=_(()=>r("span",{class:"submit-button__text"},"Save",-1)),Ne={__name:"index",setup(b){const g=p(!1),E=X(),q=Z(),{setPinData:L,setPinFailureData:z,isLoadingSubmit:A}=ee(E),h=p(!1),$=p(0),w=ne(),H=(n,e,s)=>{e===""?s(new Error("Please input the PIN again")):e!==l.value.pin?s(new Error("PIN and repeat PIN do not match.")):s()},O=(n,e,s)=>{/^\d{4,6}$/.test(e)?s():s(new Error(`<span>PIN is improperly formatted.<br></span>
            <ul class="error_info">
              <li>4-6 characters long.</li>
              <li>Should include only numbers.</li>
            </ul>`))},l=p({pin:null,pin_confirmation:null}),i=p({pin:{value:"",isShow:!1},pin_confirmation:{value:"",isShow:!1},global:{value:""}}),R=p({pin:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:O,trigger:"blur"}],pin_confirmation:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:H,trigger:"blur"}]}),y=p(!1),S=p(!1);C(z,n=>{for(const e in n)if(typeof n[e]!="string")for(const s in n[e])i.value.global.value=n[e][s];else i.value.global.value=n[e];i.value.global.value==="You have already created a pin."&&setTimeout(()=>{g.value[0].first_login=!1,localStorage.setItem("accounts",JSON.stringify(g.value)),k.remove("first_login"),F("/")},2e3)}),C(L,n=>{$.value=+k.get("currentAccountID"),g.value[$.value].first_login=null,localStorage.setItem("accounts",JSON.stringify(g.value)),k.remove("first_login"),F("/")}),oe(()=>{var n,e,s;le(),g.value=JSON.parse(localStorage.getItem("accounts")),(e=(n=q.profileSuccessData)==null?void 0:n.value)!=null&&e.user.email&&(l.value.email=(s=profileSuccessData==null?void 0:profileSuccessData.value)==null?void 0:s.user.email),window.addEventListener("resize",J)});const j=()=>{E.setPin(l.value)},I=n=>{w.refs.pinForm.validateField(n,(e,s)=>{e?i.value[n].value="":i.value[n].value=s[n][0].message}),Object.values(l.value).every(e=>e)?w.refs.pinForm.validate(e=>h.value=e):h.value=!1},c=()=>window.innerWidth>990,J=()=>{w.update()},f=(n,e)=>{c()?i.value[n].isShow=e==="mouseover":e==="click"&&(i.value[n].isShow=!0)},N=n=>{w.refs[n].focus()};return(n,e)=>{const s=G,x=K,U=Q,W=Y;return a(),m("div",ue,[r("div",pe,[me,de,v(W,{ref:"pinForm",class:"main__form--box","hide-required-asterisk":"",model:o(l),rules:o(R),onSubmit:ie(j,["prevent"])},{default:d(()=>[o(i).global.value?(a(),m("div",_e,[r("div",ce,[fe,r("span",null,te(o(i).global.value),1)])])):u("",!0),v(x,{prop:"pin",class:"password-form-item"},{error:d(()=>[o(i).pin.isShow&&c()?(a(),m("div",we,[r("span",{innerHTML:o(i).pin.value},null,8,ye)])):u("",!0),Se]),default:d(()=>[v(s,{id:"pin",ref:"pin",modelValue:o(l).pin,"onUpdate:modelValue":e[5]||(e[5]=t=>o(l).pin=t),type:o(y)?"text":"password",class:"main__form--box__input",placeholder:"Enter PIN",onInput:e[6]||(e[6]=t=>I("pin")),onBlur:e[7]||(e[7]=t=>I("pin"))},{suffix:d(()=>[o(l).pin?(a(),m("div",{key:0,style:{position:"relative"},onClick:e[0]||(e[0]=t=>N("pin"))},ge)):u("",!0),r("img",{class:V(o(i).pin.value?"eye_icon":""),src:o(y)?o(B):o(D),alt:"eye_icon",onClick:e[1]||(e[1]=t=>y.value=!o(y))},null,10,be),o(i).pin.value?(a(),m("img",{key:1,src:P,alt:"",class:"error_icon",onMouseover:e[2]||(e[2]=t=>f("pin","mouseover")),onMouseout:e[3]||(e[3]=t=>f("pin","mouseout")),onClick:e[4]||(e[4]=t=>f("pin","click"))},null,32)):u("",!0)]),_:1},8,["modelValue","type"])]),_:1}),v(x,{prop:"pin_confirmation",class:"password-form-item"},{error:d(()=>[o(i).pin_confirmation.isShow&&c()?(a(),m("div",ke,[r("span",{innerHTML:o(i).pin_confirmation.value},null,8,Pe)])):u("",!0),Ee]),default:d(()=>[v(s,{id:"pin_confirmation",ref:"pin_confirmation",modelValue:o(l).pin_confirmation,"onUpdate:modelValue":e[13]||(e[13]=t=>o(l).pin_confirmation=t),type:o(S)?"text":"password",class:"main__form--box__input",placeholder:"Repeat PIN",onInput:e[14]||(e[14]=t=>I("pin_confirmation")),onBlur:e[15]||(e[15]=t=>I("pin_confirmation"))},{suffix:d(()=>[o(l).pin_confirmation?(a(),m("div",{key:0,style:{position:"relative"},onClick:e[8]||(e[8]=t=>N("pin_confirmation"))},he)):u("",!0),r("img",{class:V(o(i).pin_confirmation.value?"eye_icon":""),src:o(S)?o(B):o(D),alt:"eye_icon",onClick:e[9]||(e[9]=t=>S.value=!o(S))},null,10,xe),o(i).pin_confirmation.value?(a(),m("img",{key:1,src:P,alt:"",class:"error_icon",onMouseover:e[10]||(e[10]=t=>f("pin_confirmation","mouseover")),onMouseout:e[11]||(e[11]=t=>f("pin_confirmation","mouseout")),onClick:e[12]||(e[12]=t=>f("pin_confirmation","click"))},null,32)):u("",!0)]),_:1},8,["modelValue","type"])]),_:1}),v(U,{class:"submit-button","native-type":"submit",loading:o(A),disabled:!o(h)},{default:d(()=>[$e]),_:1},8,["loading","disabled"]),o(i).pin.isShow&&!c()?(a(),M(T,{key:1,"dialog-visible":o(i).pin.isShow&&!c(),"error-text":o(i).pin.value,onVisible:e[16]||(e[16]=t=>o(i).pin.isShow=!1)},null,8,["dialog-visible","error-text"])):u("",!0),o(i).pin_confirmation.isShow&&!c()?(a(),M(T,{key:2,"dialog-visible":o(i).pin_confirmation.isShow&&!c(),"error-text":o(i).pin_confirmation.value,onVisible:e[17]||(e[17]=t=>o(i).pin_confirmation.isShow=!1)},null,8,["dialog-visible","error-text"])):u("",!0)]),_:1},8,["model","rules","onSubmit"])])])}}},Le=ae(Ne,[["__scopeId","data-v-37e58679"]]);export{Le as default};