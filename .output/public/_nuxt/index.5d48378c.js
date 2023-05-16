import{E as G}from"./el-input.7fd03793.js";import{E as J,_ as h,a as K}from"./el-overlay.64de5399.js";import{E as O}from"./el-button.6d07ff3a.js";import"./el-form-item.4ed993c7.js";import{D as Q,B as X,s as Y,C as Z,r as c,w as $,e as ee,f as m,m as s,h as f,i as d,u as o,j as oe,l as ie,o as a,t as ne,k as u,A as C,c as N,x as te,y as se,v as re}from"./entry.1c65c56b.js";import{a as le}from"./js.cookie.edb2da2a.js";import{E as M}from"./ErrorMassageModal.180b4dfd.js";import{h as V,s as B}from"./eye-close-icon.f5ebd9e6.js";import ae from"./auth.3b6594a0.js";import{_ as ue}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.cf142168.js";import"./refs.6073550b.js";const _=v=>(te("data-v-4b581c01"),v=v(),se(),v),pe={class:"main"},me={class:"main__form"},de=_(()=>s("div",{class:"main__form--title"},"Set PIN",-1)),_e=_(()=>s("div",{class:"main__form--subtitle"}," Fill in the fields to set your PIN. ",-1)),fe={key:0,class:"el-form-item__global-error"},ce=_(()=>s("img",{src:h,alt:""},null,-1)),ve=_(()=>s("span",{for:"pin",class:"custom_placeholder"}," PIN ",-1)),ge=[ve],we=["src"],be={key:0,class:"el-form-item__error"},ye=["innerHTML"],he=_(()=>s("div",null,null,-1)),Se=_(()=>s("span",{for:"password",class:"custom_placeholder"}," PIN Confirmation ",-1)),xe=[Se],Ie=["src"],Ee={key:0,class:"el-form-item__error"},Pe=["innerHTML"],ke=_(()=>s("div",null,null,-1)),$e=_(()=>s("span",{class:"submit-button__text"},"Save",-1)),Ce={__name:"index",setup(v){const S=Q(),F=X(),{setPinData:T,setPinFailureData:q,isLoadingSubmit:L}=Y(S),b=ie(),D=Z(),R=(n,e,r)=>{e===""?r(new Error("Please input the PIN again")):e!==l.value.pin?r(new Error("PIN and repeat PIN do not match.")):r()},H=(n,e,r)=>{/^\d{4,6}$/.test(e)?r():r(new Error(`<span>PIN is improperly formatted.<br></span>
            <ul class="error_info">
              <li>4-6 characters long.</li>
              <li>Should include only numbers.</li>
            </ul>`))},l=c({pin:null,pin_confirmation:null}),i=c({pin:{value:"",isShow:!1},pin_confirmation:{value:"",isShow:!1},global:{value:""}}),z=c({pin:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:H,trigger:"blur"}],pin_confirmation:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:R,trigger:"blur"}]}),g=c(!1),w=c(!1);$(q,n=>{for(const e in n)if(typeof n[e]!="string")for(const r in n[e])i.value.global.value=n[e][r];else i.value.global.value=n[e]}),$(T,n=>{le.remove("first_login"),re("/")}),ee(()=>{var n;ae(),(n=F.profileSuccessData.value)!=null&&n.user.email&&(l.value.email=D.value.query.email),window.addEventListener("resize",U)});const j=()=>{S.setPin(l.value)},x=n=>{b.refs.pinForm.validateField(n,(e,r)=>{e?i.value[n].value="":i.value[n].value=r[n][0].message})},p=()=>window.innerWidth>990,U=()=>{b.update()},I=n=>{p()&&(i.value[n].isShow=!1)},E=n=>{i.value[n].isShow=!0},P=n=>{p()&&(i.value[n].isShow=!0)},k=n=>{b.refs[n].focus()};return(n,e)=>{const r=G,y=K,W=O,A=J;return a(),m("div",pe,[s("div",me,[de,_e,f(A,{ref:"pinForm",class:"main__form--box","hide-required-asterisk":"",model:o(l),rules:o(z),onSubmit:oe(j,["prevent"])},{default:d(()=>[o(i).global.value?(a(),m("div",fe,[ce,s("span",null,ne(o(i).global.value),1)])):u("",!0),f(y,{prop:"pin",class:"password-form-item"},{error:d(()=>[o(i).pin.isShow&&p()?(a(),m("div",be,[s("span",{innerHTML:o(i).pin.value},null,8,ye)])):u("",!0),he]),default:d(()=>[f(r,{id:"pin",ref:"pin",modelValue:o(l).pin,"onUpdate:modelValue":e[5]||(e[5]=t=>o(l).pin=t),type:o(g)?"text":"password",class:"main__form--box__input",placeholder:"Enter PIN",onBlur:e[6]||(e[6]=t=>x("pin"))},{suffix:d(()=>[o(l).pin?(a(),m("div",{key:0,style:{position:"relative"},onClick:e[0]||(e[0]=t=>k("pin"))},ge)):u("",!0),s("img",{class:C(o(i).pin.value?"eye_icon":""),src:o(g)?o(V):o(B),alt:"eye_icon",onClick:e[1]||(e[1]=t=>g.value=!o(g))},null,10,we),o(i).pin.value?(a(),m("img",{key:1,src:h,alt:"",class:"error_icon",onMouseover:e[2]||(e[2]=t=>P("pin")),onMouseout:e[3]||(e[3]=t=>I("pin")),onClick:e[4]||(e[4]=t=>E("pin"))},null,32)):u("",!0)]),_:1},8,["modelValue","type"])]),_:1}),f(y,{prop:"pin_confirmation",class:"password-form-item"},{error:d(()=>[o(i).pin_confirmation.isShow&&p()?(a(),m("div",Ee,[s("span",{innerHTML:o(i).pin_confirmation.value},null,8,Pe)])):u("",!0),ke]),default:d(()=>[f(r,{id:"pin_confirmation",ref:"pin_confirmation",modelValue:o(l).pin_confirmation,"onUpdate:modelValue":e[12]||(e[12]=t=>o(l).pin_confirmation=t),type:o(w)?"text":"password",class:"main__form--box__input",placeholder:"Repeat PIN",onBlur:e[13]||(e[13]=t=>x("pin_confirmation"))},{suffix:d(()=>[o(l).pin_confirmation?(a(),m("div",{key:0,style:{position:"relative"},onClick:e[7]||(e[7]=t=>k("pin_confirmation"))},xe)):u("",!0),s("img",{class:C(o(i).pin_confirmation.value?"eye_icon":""),src:o(w)?o(V):o(B),alt:"eye_icon",onClick:e[8]||(e[8]=t=>w.value=!o(w))},null,10,Ie),o(i).pin_confirmation.value?(a(),m("img",{key:1,src:h,alt:"",class:"error_icon",onMouseover:e[9]||(e[9]=t=>P("pin_confirmation")),onMouseout:e[10]||(e[10]=t=>I("pin_confirmation")),onClick:e[11]||(e[11]=t=>E("pin_confirmation"))},null,32)):u("",!0)]),_:1},8,["modelValue","type"])]),_:1}),f(W,{class:"submit-button","native-type":"submit",loading:o(L)},{default:d(()=>[$e]),_:1},8,["loading"]),o(i).pin.isShow&&!p()?(a(),N(M,{key:1,"dialog-visible":o(i).pin.isShow&&!p(),"error-text":o(i).pin.value,onVisible:e[14]||(e[14]=t=>o(i).pin.isShow=!1)},null,8,["dialog-visible","error-text"])):u("",!0),o(i).pin_confirmation.isShow&&!p()?(a(),N(M,{key:2,"dialog-visible":o(i).pin_confirmation.isShow&&!p(),"error-text":o(i).pin_confirmation.value,onVisible:e[15]||(e[15]=t=>o(i).pin_confirmation.isShow=!1)},null,8,["dialog-visible","error-text"])):u("",!0)]),_:1},8,["model","rules","onSubmit"])])])}}},je=ue(Ce,[["__scopeId","data-v-4b581c01"]]);export{je as default};