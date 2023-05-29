import{E as oe,_ as h,a as ie,b as se}from"./el-overlay.6ca4e62b.js";import{E as te}from"./el-button.e243c5d4.js";import"./el-form-item.4ed993c7.js";import{B as ne,A as re,s as R,b as le,r as f,w as I,e as ae,h as d,p as n,u as o,i as _,j as p,k as ue,c as w,l as u,m as pe,o as a,t as H,G as M,z as de,x as me,y as ve,v as fe}from"./entry.a509592d.js";import{_ as _e}from"./chevron-left.0770b46e.js";import{E as T}from"./ErrorMassageModal.1c89c491.js";import{a as ce,_ as ge}from"./AccessCheckModal.34efd2e4.js";import{h as F,s as B}from"./eye-close-icon.545039e0.js";import be from"./settingsToken.3af67707.js";import we from"./loginToken.a0684f54.js";import ye from"./auth.8c39c358.js";import{_ as ke}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.14e866f0.js";import"./email-primary-icon.86041680.js";const c=y=>(me("data-v-9dc21494"),y=y(),ve(),y),Se={class:"main"},Pe={class:"main__form"},$e={class:"main__form--title"},xe=c(()=>n("span",null,"Reset PIN",-1)),Ie=c(()=>n("div",{class:"main__form--subtitle"},"Fill in the fields to change your PIN.",-1)),he={key:0,class:"el-form-item__global-error-container"},Ne={class:"el-form-item__global-error"},Ce=c(()=>n("img",{src:h,alt:""},null,-1)),Ee=c(()=>n("span",{for:"previous",class:"custom_placeholder"}," Old PIN ",-1)),Ve=[Ee],Me=["src"],Te={key:0,class:"el-form-item__error"},Fe=["innerHTML"],Be=c(()=>n("div",null,null,-1)),De=c(()=>n("span",{for:"pin",class:"custom_placeholder"}," New PIN ",-1)),Le=[De],qe=["src"],Re={key:0,class:"el-form-item__error"},He=["innerHTML"],ze=c(()=>n("div",null,null,-1)),Oe=c(()=>n("span",{for:"password",class:"custom_placeholder"}," Repeat PIN ",-1)),je=[Oe],Ae=["src"],Ue={key:0,class:"el-form-item__error"},We=["innerHTML"],Ge=c(()=>n("div",null,null,-1)),Xe={class:"forgot-password"},Je={class:"submit-button__text"},Ke={__name:"update-pin",setup(y){const N=ne(),z=re(),{resetPinFailureData:O,resetPinData:j,forgotPinFailureData:A,forgotPinData:U,isLoadingSubmit:D}=R(N),{profileSuccessData:C}=R(z),k=pe(),W=le(),G=(s,e,r)=>{e===""?r(new Error("Please input the PIN again")):e!==l.value.pin?r(new Error("PIN and repeat PIN do not match.")):r()},X=(s,e,r)=>{/^\d{4,6}$/.test(e)?r():r(new Error(`<span>PIN is improperly formatted.<br></span>
            <ul class="error_info">
              <li>4-6 characters long.</li>
              <li>Should include only numbers.</li>
            </ul>`))},l=f({previous:null,pin:null,pin_confirmation:null}),S=f(!1),P=f(!1),$=f(!1),g=f(!1),b=f(!1),L=f(!1),i=f({previous:{value:"",isShow:!1},pin:{value:"",isShow:!1},pin_confirmation:{value:"",isShow:!1},global:{value:""}}),J=f({previous:[{required:!0,message:"This field is required.",trigger:"blur"}],pin:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:X,trigger:"blur"}],pin_confirmation:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:G,trigger:"blur"}]});I(O,s=>{for(const e in s)if(typeof s[e]!="string")for(const r in s[e])i.value.global.value=s[e][r];else i.value.global.value=s[e]}),I(j,s=>{s&&fe("/")}),I(A,s=>{if(!g.value)for(const e in s)if(typeof s[e]!="string")for(const r in s[e])i.value.global.value=s[e][r];else i.value.global.value=s[e]}),I(U,s=>{s&&(g.value=!0)}),ae(()=>{var s,e;ye(),b.value=we(),b.value=be(),(s=C.value)!=null&&s.user.email&&(l.value.email=(e=C.value)==null?void 0:e.user.email),window.addEventListener("resize",Z())});const K=()=>{N.resetPin(l.value)},Q=()=>{var s;l.value.email=(s=C.value)==null?void 0:s.user.email,N.forgotPin()},E=s=>{k.refs.pinForm.validateField(s,(e,r)=>{e?i.value[s].value="":i.value[s].value=r[s][0].message}),Object.values(l.value).every(e=>e)&&k.refs.pinForm.validate(e=>L.value=e)},Y=()=>{i.value.global.value=""},m=()=>window.innerWidth>990,Z=()=>{k.update()},v=(s,e)=>{m()?i.value[s].isShow=e==="mouseover":e==="click"&&(i.value[s].isShow=!0)},V=s=>{k.refs[s].focus()};return(s,e)=>{const r=ie,x=se,q=te,ee=oe;return a(),d("div",Se,[n("div",Pe,[n("div",$e,[n("img",{src:_e,alt:"chevron-left",onClick:e[0]||(e[0]=t=>o(W).go(-1))}),xe]),Ie,_(ee,{ref:"pinForm",class:"main__form--box","hide-required-asterisk":"",model:o(l),rules:o(J),onSubmit:ue(K,["prevent"])},{default:p(()=>[o(i).global.value?(a(),d("div",he,[n("div",Ne,[Ce,n("span",null,H(o(i).global.value),1)]),n("span",{class:"clear-error",onClick:Y},"X")])):u("",!0),_(x,{prop:"previous",class:"password-form-item"},{error:p(()=>[o(i).previous.isShow&&m()?(a(),d("div",Te,[n("span",{innerHTML:o(i).previous.value},null,8,Fe)])):u("",!0),Be]),default:p(()=>[_(r,{id:"previous",ref:"previous",modelValue:o(l).previous,"onUpdate:modelValue":e[6]||(e[6]=t=>o(l).previous=t),type:o(S)?"text":"password",class:"main__form--box__input",placeholder:"Old PIN",onBlur:e[7]||(e[7]=t=>E("previous"))},{suffix:p(()=>[o(l).previous?(a(),d("div",{key:0,style:{position:"relative"},onClick:e[1]||(e[1]=t=>V("previous"))},Ve)):u("",!0),n("img",{class:M(o(i).previous.value?"eye_icon":""),src:o(S)?o(F):o(B),alt:"eye_icon",onClick:e[2]||(e[2]=t=>S.value=!o(S))},null,10,Me),o(i).previous.value?(a(),d("img",{key:1,src:h,alt:"",class:"error_icon",onMouseover:e[3]||(e[3]=t=>v("previous","mouseover")),onMouseout:e[4]||(e[4]=t=>v("previous","mouseout")),onClick:e[5]||(e[5]=t=>v("previous","click"))},null,32)):u("",!0)]),_:1},8,["modelValue","type"])]),_:1}),_(x,{prop:"pin",class:"password-form-item"},{error:p(()=>[o(i).pin.isShow&&m()?(a(),d("div",Re,[n("span",{innerHTML:o(i).pin.value},null,8,He)])):u("",!0),ze]),default:p(()=>[_(r,{id:"pin",ref:"pin",modelValue:o(l).pin,"onUpdate:modelValue":e[13]||(e[13]=t=>o(l).pin=t),type:o(P)?"text":"password",class:"main__form--box__input",placeholder:"New PIN",onBlur:e[14]||(e[14]=t=>E("pin"))},{suffix:p(()=>[o(l).pin?(a(),d("div",{key:0,style:{position:"relative"},onClick:e[8]||(e[8]=t=>V("pin"))},Le)):u("",!0),n("img",{class:M(o(i).pin.value?"eye_icon":""),src:o(P)?o(F):o(B),alt:"eye_icon",onClick:e[9]||(e[9]=t=>P.value=!o(P))},null,10,qe),o(i).pin.value?(a(),d("img",{key:1,src:h,alt:"",class:"error_icon",onMouseover:e[10]||(e[10]=t=>v("pin","mouseover")),onMouseout:e[11]||(e[11]=t=>v("pin","mouseout")),onClick:e[12]||(e[12]=t=>v("pin","click"))},null,32)):u("",!0)]),_:1},8,["modelValue","type"])]),_:1}),_(x,{prop:"pin_confirmation",class:"password-form-item"},{error:p(()=>[o(i).pin_confirmation.isShow&&m()?(a(),d("div",Ue,[n("span",{innerHTML:o(i).pin_confirmation.value},null,8,We)])):u("",!0),Ge]),default:p(()=>[_(r,{id:"pin_confirmation",ref:"pin_confirmation",modelValue:o(l).pin_confirmation,"onUpdate:modelValue":e[20]||(e[20]=t=>o(l).pin_confirmation=t),type:o($)?"text":"password",class:"main__form--box__input",placeholder:"Repeat PIN",onBlur:e[21]||(e[21]=t=>E("pin_confirmation"))},{suffix:p(()=>[o(l).pin_confirmation?(a(),d("div",{key:0,style:{position:"relative"},onClick:e[15]||(e[15]=t=>V("pin_confirmation"))},je)):u("",!0),n("img",{class:M(o(i).pin_confirmation.value?"eye_icon":""),src:o($)?o(F):o(B),alt:"eye_icon",onClick:e[16]||(e[16]=t=>$.value=!o($))},null,10,Ae),o(i).pin_confirmation.value?(a(),d("img",{key:1,src:h,alt:"",class:"error_icon",onMouseover:e[17]||(e[17]=t=>v("pin_confirmation","mouseover")),onMouseout:e[18]||(e[18]=t=>v("pin_confirmation","mouseout")),onClick:e[19]||(e[19]=t=>v("pin_confirmation","click"))},null,32)):u("",!0)]),_:1},8,["modelValue","type"])]),_:1}),n("div",Xe,[_(q,{style:{"font-size":"14px","font-weight":"400"},onClick:Q},{default:p(()=>[de("Forgot PIN?")]),_:1})]),_(q,{class:"submit-button","native-type":"submit",loading:o(D),disabled:!o(L)},{default:p(()=>[n("span",Je,H(o(D)?"":"Save"),1)]),_:1},8,["loading","disabled"]),o(i).previous.isShow&&!m()?(a(),w(T,{key:1,"dialog-visible":o(i).previous.isShow&&!m(),"error-text":o(i).previous.value,onVisible:e[22]||(e[22]=t=>o(i).previous.isShow=!1)},null,8,["dialog-visible","error-text"])):u("",!0),o(i).pin.isShow&&!m()?(a(),w(T,{key:2,"dialog-visible":o(i).pin.isShow&&!m(),"error-text":o(i).pin.value,onVisible:e[23]||(e[23]=t=>o(i).pin.isShow=!1)},null,8,["dialog-visible","error-text"])):u("",!0),o(i).pin_confirmation.isShow&&!m()?(a(),w(T,{key:3,"dialog-visible":o(i).pin_confirmation.isShow&&!m(),"error-text":o(i).pin_confirmation.value,onVisible:e[24]||(e[24]=t=>o(i).pin_confirmation.isShow=!1)},null,8,["dialog-visible","error-text"])):u("",!0)]),_:1},8,["model","rules","onSubmit"])]),o(g)?(a(),w(ce,{key:0,email:o(l).email,"dialog-visible":o(g),onClose:e[25]||(e[25]=t=>g.value=!1)},null,8,["email","dialog-visible"])):u("",!0),o(b)?(a(),w(ge,{key:1,"dialog-visible":o(b),onClose:e[26]||(e[26]=t=>b.value=!1)},null,8,["dialog-visible"])):u("",!0)])}}},mo=ke(Ke,[["__scopeId","data-v-9dc21494"]]);export{mo as default};
