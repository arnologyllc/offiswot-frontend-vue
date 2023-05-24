import{E as A,_ as S,a as J,b as K}from"./el-overlay.e875a51a.js";import{E as O}from"./el-button.baafa5c6.js";import"./el-form-item.4ed993c7.js";import{B as Q,s as X,H as Y,r as c,w as C,e as Z,h as m,p as s,i as f,j as _,u as o,k as ee,m as oe,o as a,t as M,l as u,G as V,c as T,x as ne,y as ie,v as te}from"./entry.1cc0a497.js";import{E as q}from"./ErrorMassageModal.0a286fe8.js";import{h as B,s as F}from"./eye-close-icon.e9487ca8.js";import se from"./auth.88f281fe.js";import{_ as re}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.f351b08e.js";const d=v=>(ne("data-v-93ca1263"),v=v(),ie(),v),le={class:"main"},ae={class:"main__form"},ue=d(()=>s("div",{class:"main__form--title"},"Reset PIN",-1)),pe=d(()=>s("div",{class:"main__form--subtitle"},"Enter a new PIN below to change your PIN.",-1)),me={key:0,class:"el-form-item__global-error-container"},_e={class:"el-form-item__global-error"},de=d(()=>s("img",{src:S,alt:""},null,-1)),fe=d(()=>s("span",{for:"pin",class:"custom_placeholder"}," PIN ",-1)),ce=[fe],ve=["src"],ge={key:0,class:"el-form-item__error"},we=["innerHTML"],ye=d(()=>s("div",null,null,-1)),be=d(()=>s("span",{for:"password",class:"custom_placeholder"}," PIN Confirmation ",-1)),he=[be],Ie=["src"],Se={key:0,class:"el-form-item__error"},ke=["innerHTML"],Ee=d(()=>s("div",null,null,-1)),Pe={class:"submit-button__text"},xe={__name:"reset",setup(v){const k=Q(),{changePinData:L,changePinFailureData:R,isLoadingSubmit:E}=X(k),g=oe(),w=Y(),H=(i,e,r)=>{e===""?r(new Error("Please input the PIN again")):e!==l.value.pin?r(new Error("PIN and repeat PIN do not match.")):r()},z=(i,e,r)=>{/^\d{4,6}$/.test(e)?r():r(new Error(`<span>PIN is improperly formatted.<br></span>
            <ul class="error_info">
              <li>4-6 characters long.</li>
              <li>Should include only numbers.</li>
            </ul>`))},l=c({pin:null,pin_confirmation:null,pinToken:null}),n=c({pin:{value:"",isShow:!1},pin_confirmation:{value:"",isShow:!1},global:{value:""}}),D=c({pin:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:z,trigger:"input"}],pin_confirmation:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:H,trigger:"blur"}]}),y=c(!1),b=c(!1);C(R,i=>{for(const e in i)if(typeof i[e]!="string")for(const r in i[e])n.value.global.value=i[e][r];else n.value.global.value=i[e]}),C(L,i=>{l.value={pin:null,pin_confirmation:null},te("/")}),Z(()=>{se(),w.query.email&&(l.value.email=w.query.email),w.query.token&&(l.value.pinToken=w.query.token),window.addEventListener("resize",U)});const j=()=>{g.refs.resetForm.validate(i=>{if(i)k.changePin(l.value);else return n.value.global.value="Please fill empty areas",!1})},h=i=>{g.refs.resetForm.validateField(i,(e,r)=>{e?n.value[i].value="":n.value[i].value=r[i][0].message})},p=()=>window.innerWidth>990,U=()=>{g.update()},P=i=>{p()&&(n.value[i].isShow=!1)},x=i=>{n.value[i].isShow=!0},$=i=>{p()&&(n.value[i].isShow=!0)},N=i=>{g.refs[i].focus()};return(i,e)=>{const r=J,I=K,W=O,G=A;return a(),m("div",le,[s("div",ae,[ue,pe,f(G,{ref:"resetForm",class:"main__form--box","hide-required-asterisk":"",model:o(l),rules:o(D),onSubmit:ee(j,["prevent"])},{default:_(()=>[o(n).global.value?(a(),m("div",me,[s("div",_e,[de,s("span",null,M(o(n).global.value),1)])])):u("",!0),f(I,{prop:"pin",class:"password-form-item"},{error:_(()=>[o(n).pin.isShow&&p()?(a(),m("div",ge,[s("span",{innerHTML:o(n).pin.value},null,8,we)])):u("",!0),ye]),default:_(()=>[f(r,{id:"pin",ref:"pin",modelValue:o(l).pin,"onUpdate:modelValue":e[5]||(e[5]=t=>o(l).pin=t),type:o(y)?"text":"password",class:"main__form--box__input",placeholder:"Enter PIN",onBlur:e[6]||(e[6]=t=>h("pin")),onInput:e[7]||(e[7]=t=>h("pin"))},{suffix:_(()=>[o(l).pin?(a(),m("div",{key:0,style:{position:"relative"},onClick:e[0]||(e[0]=t=>N("pin"))},ce)):u("",!0),s("img",{class:V(o(n).pin.value?"eye_icon":""),src:o(y)?o(B):o(F),alt:"eye_icon",onClick:e[1]||(e[1]=t=>y.value=!o(y))},null,10,ve),o(n).pin.value?(a(),m("img",{key:1,src:S,alt:"",class:"error_icon",onMouseover:e[2]||(e[2]=t=>$("pin")),onMouseout:e[3]||(e[3]=t=>P("pin")),onClick:e[4]||(e[4]=t=>x("pin"))},null,32)):u("",!0)]),_:1},8,["modelValue","type"])]),_:1}),f(I,{prop:"pin_confirmation",class:"password-form-item"},{error:_(()=>[o(n).pin_confirmation.isShow&&p()?(a(),m("div",Se,[s("span",{innerHTML:o(n).pin_confirmation.value},null,8,ke)])):u("",!0),Ee]),default:_(()=>[f(r,{id:"pin_confirmation",ref:"pin_confirmation",modelValue:o(l).pin_confirmation,"onUpdate:modelValue":e[13]||(e[13]=t=>o(l).pin_confirmation=t),type:o(b)?"text":"password",class:"main__form--box__input",placeholder:"Repeat PIN",onBlur:e[14]||(e[14]=t=>h("pin_confirmation"))},{suffix:_(()=>[o(l).pin_confirmation?(a(),m("div",{key:0,style:{position:"relative"},onClick:e[8]||(e[8]=t=>N("pin_confirmation"))},he)):u("",!0),s("img",{class:V(o(n).pin_confirmation.value?"eye_icon":""),src:o(b)?o(B):o(F),alt:"eye_icon",onClick:e[9]||(e[9]=t=>b.value=!o(b))},null,10,Ie),o(n).pin_confirmation.value?(a(),m("img",{key:1,src:S,alt:"",class:"error_icon",onMouseover:e[10]||(e[10]=t=>$("pin_confirmation")),onMouseout:e[11]||(e[11]=t=>P("pin_confirmation")),onClick:e[12]||(e[12]=t=>x("pin_confirmation"))},null,32)):u("",!0)]),_:1},8,["modelValue","type"])]),_:1}),f(W,{class:"submit-button","native-type":"submit",loading:o(E)},{default:_(()=>[s("span",Pe,M(o(E)?"":"Save"),1)]),_:1},8,["loading"]),o(n).pin.isShow&&!p()?(a(),T(q,{key:1,"dialog-visible":o(n).pin.isShow&&!p(),"error-text":o(n).pin.value,onVisible:e[15]||(e[15]=t=>o(n).pin.isShow=!1)},null,8,["dialog-visible","error-text"])):u("",!0),o(n).pin_confirmation.isShow&&!p()?(a(),T(q,{key:2,"dialog-visible":o(n).pin_confirmation.isShow&&!p(),"error-text":o(n).pin_confirmation.value,onVisible:e[16]||(e[16]=t=>o(n).pin_confirmation.isShow=!1)},null,8,["dialog-visible","error-text"])):u("",!0)]),_:1},8,["model","rules","onSubmit"])])])}}},Le=re(xe,[["__scopeId","data-v-93ca1263"]]);export{Le as default};