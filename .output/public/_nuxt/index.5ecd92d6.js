import{E as W,_ as k,a as Y,b as G}from"./el-overlay.4bb92685.js";import{E as K}from"./el-button.42bf09d7.js";import{r as f,D as Q,b as X,s as Z,w as $,f as ee,i as p,j as r,k as v,l as m,u as o,m as oe,q as ie,o as a,t as ne,p as u,B as N,c as C,x as te,y as se,h as V,z as M}from"./entry.02181b34.js";import{E as F}from"./ErrorMassageModal.5cb0f6ed.js";import{h as T,s as B}from"./eye-close-icon.a6bcbe4b.js";import re from"./auth.ef07dd60.js";import{_ as le}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.456847b7.js";const d=b=>(te("data-v-37a32fdd"),b=b(),se(),b),ae={class:"main"},ue={class:"main__form"},pe=d(()=>r("div",{class:"main__form--title"},"Set PIN",-1)),me=d(()=>r("div",{class:"main__form--subtitle"},"Fill in the fields to set your PIN.",-1)),de={key:0,class:"el-form-item__global-error-container"},_e={class:"el-form-item__global-error"},fe=d(()=>r("img",{src:k,alt:""},null,-1)),ce=d(()=>r("span",{for:"pin",class:"custom_placeholder"}," PIN ",-1)),ve=[ce],ge=["src"],be={key:0,class:"el-form-item__error"},we=["innerHTML"],ye=d(()=>r("div",null,null,-1)),Se=d(()=>r("span",{for:"password",class:"custom_placeholder"}," PIN Confirmation ",-1)),Ie=[Se],he=["src"],xe={key:0,class:"el-form-item__error"},ke=["innerHTML"],Pe=d(()=>r("div",null,null,-1)),Ee=d(()=>r("span",{class:"submit-button__text"},"Save",-1)),$e={__name:"index",setup(b){const g=f(!1),P=Q(),q=X(),{setPinData:D,setPinFailureData:L,isLoadingSubmit:z}=Z(P),h=f(!1),w=ie(),H=(n,e,s)=>{e===""?s(new Error("Please input the PIN again")):e!==l.value.pin?s(new Error("PIN and repeat PIN do not match.")):s()},O=(n,e,s)=>{/^\d{4,6}$/.test(e)?s():s(new Error(`<span>PIN is improperly formatted.<br></span>
            <ul class="error_info">
              <li>4-6 characters long.</li>
              <li>Should include only numbers.</li>
            </ul>`))},l=f({pin:null,pin_confirmation:null}),i=f({pin:{value:"",isShow:!1},pin_confirmation:{value:"",isShow:!1},global:{value:""}}),R=f({pin:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:O,trigger:"blur"}],pin_confirmation:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:H,trigger:"blur"}]}),y=f(!1),S=f(!1);$(L,n=>{for(const e in n)if(typeof n[e]!="string")for(const s in n[e])i.value.global.value=n[e][s];else i.value.global.value=n[e];i.value.global.value==="You have already created a pin."&&setTimeout(()=>{g.value[0].first_login=!1,localStorage.setItem("accounts",JSON.stringify(g.value)),V.remove("first_login"),M("/")},2e3)}),$(D,n=>{g.value[0].first_login=null,localStorage.setItem("accounts",JSON.stringify(g.value)),V.remove("first_login"),M("/")}),ee(()=>{var n,e,s;re(),g.value=JSON.parse(localStorage.getItem("accounts")),(e=(n=q.profileSuccessData)==null?void 0:n.value)!=null&&e.user.email&&(l.value.email=(s=profileSuccessData==null?void 0:profileSuccessData.value)==null?void 0:s.user.email),window.addEventListener("resize",J)});const j=()=>{P.setPin(l.value)},I=n=>{w.refs.pinForm.validateField(n,(e,s)=>{e?i.value[n].value="":i.value[n].value=s[n][0].message}),Object.values(l.value).every(e=>e)?w.refs.pinForm.validate(e=>h.value=e):h.value=!1},_=()=>window.innerWidth>990,J=()=>{w.update()},c=(n,e)=>{_()?i.value[n].isShow=e==="mouseover":e==="click"&&(i.value[n].isShow=!0)},E=n=>{w.refs[n].focus()};return(n,e)=>{const s=Y,x=G,A=K,U=W;return a(),p("div",ae,[r("div",ue,[pe,me,v(U,{ref:"pinForm",class:"main__form--box","hide-required-asterisk":"",model:o(l),rules:o(R),onSubmit:oe(j,["prevent"])},{default:m(()=>[o(i).global.value?(a(),p("div",de,[r("div",_e,[fe,r("span",null,ne(o(i).global.value),1)])])):u("",!0),v(x,{prop:"pin",class:"password-form-item"},{error:m(()=>[o(i).pin.isShow&&_()?(a(),p("div",be,[r("span",{innerHTML:o(i).pin.value},null,8,we)])):u("",!0),ye]),default:m(()=>[v(s,{id:"pin",ref:"pin",modelValue:o(l).pin,"onUpdate:modelValue":e[5]||(e[5]=t=>o(l).pin=t),type:o(y)?"text":"password",class:"main__form--box__input",placeholder:"Enter PIN",onInput:e[6]||(e[6]=t=>I("pin")),onBlur:e[7]||(e[7]=t=>I("pin"))},{suffix:m(()=>[o(l).pin?(a(),p("div",{key:0,style:{position:"relative"},onClick:e[0]||(e[0]=t=>E("pin"))},ve)):u("",!0),r("img",{class:N(o(i).pin.value?"eye_icon":""),src:o(y)?o(T):o(B),alt:"eye_icon",onClick:e[1]||(e[1]=t=>y.value=!o(y))},null,10,ge),o(i).pin.value?(a(),p("img",{key:1,src:k,alt:"",class:"error_icon",onMouseover:e[2]||(e[2]=t=>c("pin","mouseover")),onMouseout:e[3]||(e[3]=t=>c("pin","mouseout")),onClick:e[4]||(e[4]=t=>c("pin","click"))},null,32)):u("",!0)]),_:1},8,["modelValue","type"])]),_:1}),v(x,{prop:"pin_confirmation",class:"password-form-item"},{error:m(()=>[o(i).pin_confirmation.isShow&&_()?(a(),p("div",xe,[r("span",{innerHTML:o(i).pin_confirmation.value},null,8,ke)])):u("",!0),Pe]),default:m(()=>[v(s,{id:"pin_confirmation",ref:"pin_confirmation",modelValue:o(l).pin_confirmation,"onUpdate:modelValue":e[13]||(e[13]=t=>o(l).pin_confirmation=t),type:o(S)?"text":"password",class:"main__form--box__input",placeholder:"Repeat PIN",onInput:e[14]||(e[14]=t=>I("pin_confirmation")),onBlur:e[15]||(e[15]=t=>I("pin_confirmation"))},{suffix:m(()=>[o(l).pin_confirmation?(a(),p("div",{key:0,style:{position:"relative"},onClick:e[8]||(e[8]=t=>E("pin_confirmation"))},Ie)):u("",!0),r("img",{class:N(o(i).pin_confirmation.value?"eye_icon":""),src:o(S)?o(T):o(B),alt:"eye_icon",onClick:e[9]||(e[9]=t=>S.value=!o(S))},null,10,he),o(i).pin_confirmation.value?(a(),p("img",{key:1,src:k,alt:"",class:"error_icon",onMouseover:e[10]||(e[10]=t=>c("pin_confirmation","mouseover")),onMouseout:e[11]||(e[11]=t=>c("pin_confirmation","mouseout")),onClick:e[12]||(e[12]=t=>c("pin_confirmation","click"))},null,32)):u("",!0)]),_:1},8,["modelValue","type"])]),_:1}),v(A,{class:"submit-button","native-type":"submit",loading:o(z),disabled:!o(h)},{default:m(()=>[Ee]),_:1},8,["loading","disabled"]),o(i).pin.isShow&&!_()?(a(),C(F,{key:1,"dialog-visible":o(i).pin.isShow&&!_(),"error-text":o(i).pin.value,onVisible:e[16]||(e[16]=t=>o(i).pin.isShow=!1)},null,8,["dialog-visible","error-text"])):u("",!0),o(i).pin_confirmation.isShow&&!_()?(a(),C(F,{key:2,"dialog-visible":o(i).pin_confirmation.isShow&&!_(),"error-text":o(i).pin_confirmation.value,onVisible:e[17]||(e[17]=t=>o(i).pin_confirmation.isShow=!1)},null,8,["dialog-visible","error-text"])):u("",!0)]),_:1},8,["model","rules","onSubmit"])])])}}},De=le($e,[["__scopeId","data-v-37a32fdd"]]);export{De as default};
