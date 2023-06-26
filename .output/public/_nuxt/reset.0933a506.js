import{E as W,_ as P,a as O,b as G}from"./el-overlay.303db8d7.js";import{E as J}from"./el-button.a9620db7.js";import{D as K,s as Q,H as X,r as c,w as N,f as Y,i as p,j as s,k as v,l as m,u as o,m as Z,q as ee,o as a,t as C,p as u,B as V,c as M,x as oe,y as ne,z as ie}from"./entry.4919aef1.js";import{E as q}from"./ErrorMassageModal.6cc8bcf1.js";import{h as T,s as F}from"./eye-close-icon.a59f8c16.js";import te from"./auth.8d4f467f.js";import{_ as se}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.a4932e6f.js";const _=b=>(oe("data-v-5a21fe85"),b=b(),ne(),b),re={class:"main"},le={class:"main__form"},ae=_(()=>s("div",{class:"main__form--title"},"Reset PIN",-1)),ue=_(()=>s("div",{class:"main__form--subtitle"},"Enter a new PIN below to change your PIN.",-1)),pe={key:0,class:"el-form-item__global-error-container"},me={class:"el-form-item__global-error"},de=_(()=>s("img",{src:P,alt:""},null,-1)),_e=_(()=>s("span",{for:"pin",class:"custom_placeholder"}," PIN ",-1)),fe=[_e],ce=["src"],ve={key:0,class:"el-form-item__error"},ge=["innerHTML"],be=_(()=>s("div",null,null,-1)),we=_(()=>s("span",{for:"password",class:"custom_placeholder"}," PIN Confirmation ",-1)),ye=[we],he=["src"],Ie={key:0,class:"el-form-item__error"},ke=["innerHTML"],Se=_(()=>s("div",null,null,-1)),Pe={class:"submit-button__text"},xe={__name:"reset",setup(b){const x=K(),{changePinData:B,changePinFailureData:L,isLoadingSubmit:E}=Q(x),g=ee(),w=X(),R=(i,e,r)=>{e===""?r(new Error("Please input the PIN again")):e!==l.value.pin?r(new Error("PIN and repeat PIN do not match.")):r()},H=(i,e,r)=>{/^\d{4,6}$/.test(e)?r():r(new Error(`<span>PIN is improperly formatted.<br></span>
            <ul class="error_info">
              <li>4-6 characters long.</li>
              <li>Should include only numbers.</li>
            </ul>`))},l=c({pin:null,pin_confirmation:null,pinToken:null}),n=c({pin:{value:"",isShow:!1},pin_confirmation:{value:"",isShow:!1},global:{value:""}}),z=c({pin:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:H,trigger:"input"}],pin_confirmation:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:R,trigger:"blur"}]}),y=c(!1),h=c(!1),k=c(!1);N(L,i=>{for(const e in i)if(typeof i[e]!="string")for(const r in i[e])n.value.global.value=i[e][r];else n.value.global.value=i[e]}),N(B,i=>{l.value={pin:null,pin_confirmation:null},ie("/")}),Y(()=>{te(),w.query.email&&(l.value.email=w.query.email),w.query.token&&(l.value.pinToken=w.query.token),window.addEventListener("resize",j)});const D=()=>{g.refs.resetForm.validate(i=>{if(i)x.changePin(l.value);else return n.value.global.value="Please fill empty areas",!1})},I=i=>{g.refs.resetForm.validateField(i,(e,r)=>{e?n.value[i].value="":n.value[i].value=r[i][0].message}),Object.values(l.value).every(e=>e)?g.refs.resetForm.validate(e=>k.value=e):k.value=!1},d=()=>window.innerWidth>990,j=()=>{g.update()},f=(i,e)=>{d()?n.value[i].isShow=e==="mouseover":e==="click"&&(n.value[i].isShow=!0)},$=i=>{g.refs[i].focus()};return(i,e)=>{const r=O,S=G,A=J,U=W;return a(),p("div",re,[s("div",le,[ae,ue,v(U,{ref:"resetForm",class:"main__form--box","hide-required-asterisk":"",model:o(l),rules:o(z),onSubmit:Z(D,["prevent"])},{default:m(()=>[o(n).global.value?(a(),p("div",pe,[s("div",me,[de,s("span",null,C(o(n).global.value),1)])])):u("",!0),v(S,{prop:"pin",class:"password-form-item"},{error:m(()=>[o(n).pin.isShow&&d()?(a(),p("div",ve,[s("span",{innerHTML:o(n).pin.value},null,8,ge)])):u("",!0),be]),default:m(()=>[v(r,{id:"pin",ref:"pin",modelValue:o(l).pin,"onUpdate:modelValue":e[5]||(e[5]=t=>o(l).pin=t),type:o(y)?"text":"password",class:"main__form--box__input",placeholder:"Enter PIN",onBlur:e[6]||(e[6]=t=>I("pin")),onInput:e[7]||(e[7]=t=>I("pin"))},{suffix:m(()=>[o(l).pin?(a(),p("div",{key:0,style:{position:"relative"},onClick:e[0]||(e[0]=t=>$("pin"))},fe)):u("",!0),s("img",{class:V(o(n).pin.value?"eye_icon":""),src:o(y)?o(T):o(F),alt:"eye_icon",onClick:e[1]||(e[1]=t=>y.value=!o(y))},null,10,ce),o(n).pin.value?(a(),p("img",{key:1,src:P,alt:"",class:"error_icon",onMouseover:e[2]||(e[2]=t=>f("pin","mouseover")),onMouseout:e[3]||(e[3]=t=>f("pin","mouseout")),onClick:e[4]||(e[4]=t=>f("pin","click"))},null,32)):u("",!0)]),_:1},8,["modelValue","type"])]),_:1}),v(S,{prop:"pin_confirmation",class:"password-form-item"},{error:m(()=>[o(n).pin_confirmation.isShow&&d()?(a(),p("div",Ie,[s("span",{innerHTML:o(n).pin_confirmation.value},null,8,ke)])):u("",!0),Se]),default:m(()=>[v(r,{id:"pin_confirmation",ref:"pin_confirmation",modelValue:o(l).pin_confirmation,"onUpdate:modelValue":e[13]||(e[13]=t=>o(l).pin_confirmation=t),type:o(h)?"text":"password",class:"main__form--box__input",placeholder:"Repeat PIN",onInput:e[14]||(e[14]=t=>I("pin_confirmation")),onBlur:e[15]||(e[15]=t=>I("pin_confirmation"))},{suffix:m(()=>[o(l).pin_confirmation?(a(),p("div",{key:0,style:{position:"relative"},onClick:e[8]||(e[8]=t=>$("pin_confirmation"))},ye)):u("",!0),s("img",{class:V(o(n).pin_confirmation.value?"eye_icon":""),src:o(h)?o(T):o(F),alt:"eye_icon",onClick:e[9]||(e[9]=t=>h.value=!o(h))},null,10,he),o(n).pin_confirmation.value?(a(),p("img",{key:1,src:P,alt:"",class:"error_icon",onMouseover:e[10]||(e[10]=t=>f("pin_confirmation","mouseover")),onMouseout:e[11]||(e[11]=t=>f("pin_confirmation","mouseout")),onClick:e[12]||(e[12]=t=>f("pin_confirmation","click"))},null,32)):u("",!0)]),_:1},8,["modelValue","type"])]),_:1}),v(A,{class:"submit-button","native-type":"submit",loading:o(E),disabled:!o(k)},{default:m(()=>[s("span",Pe,C(o(E)?"":"Save"),1)]),_:1},8,["loading","disabled"]),o(n).pin.isShow&&!d()?(a(),M(q,{key:1,"dialog-visible":o(n).pin.isShow&&!d(),"error-text":o(n).pin.value,onVisible:e[16]||(e[16]=t=>o(n).pin.isShow=!1)},null,8,["dialog-visible","error-text"])):u("",!0),o(n).pin_confirmation.isShow&&!d()?(a(),M(q,{key:2,"dialog-visible":o(n).pin_confirmation.isShow&&!d(),"error-text":o(n).pin_confirmation.value,onVisible:e[17]||(e[17]=t=>o(n).pin_confirmation.isShow=!1)},null,8,["dialog-visible","error-text"])):u("",!0)]),_:1},8,["model","rules","onSubmit"])])])}}},Fe=se(xe,[["__scopeId","data-v-5a21fe85"]]);export{Fe as default};