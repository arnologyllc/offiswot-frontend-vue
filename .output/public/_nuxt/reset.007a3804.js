import{E as os}from"./focus-trap.04464a06.js";import{_ as V,E as es,a as rs}from"./error.3564d58a.js";import{E as ts}from"./index.9ce43428.js";import{A as as,s as is,b as ns,e as ls,f as ds,r as v,w as C,h as us,o as n,i as u,l as a,u as o,j as w,k as _,t as B,m as d,C as M,q as ps,c as h,v as _s,x as ms,y as ws,z as fs}from"./entry.dabfc507.js";import{_ as vs}from"./chevron-left.f66d90eb.js";import{_ as cs,a as gs}from"./good.9906b833.js";import{C as hs}from"./OvConfirmPasswordChangeModal.74a19316.js";import{C as ys}from"./AccessCheckModal.b359da57.js";import{E as F}from"./ErrorMassageModal.8c97b422.js";import{h as q,s as H}from"./eye-close-icon.eaa88d21.js";import bs from"./settingsToken.812dd4cb.js";import Ss from"./auth.0edab5ad.js";import{_ as ks}from"./_plugin-vue_export-helper.c27b6911.js";import"./email-primary-icon.1455806e.js";const f=y=>(ws("data-v-35a66696"),y=y(),fs(),y),$s={class:"main"},xs={class:"main__form"},Cs={class:"main__form--title"},Ms=f(()=>a("span",null,"Reset password",-1)),Vs=f(()=>a("div",{class:"main__form--subtitle"}," Fill in the fields to change your password. ",-1)),Es={key:0,class:"el-form-item__global-error-container"},Ps={class:"el-form-item__global-error"},Ts=f(()=>a("img",{src:V,alt:""},null,-1)),Ls=f(()=>a("span",{for:"old_password",class:"old_password_placeholder"}," Old Password ",-1)),Is=[Ls],zs=["src"],Rs={key:0,class:"el-form-item__error"},Fs=["innerHTML"],qs=f(()=>a("div",null,null,-1)),Hs=f(()=>a("span",{for:"password",class:"placeholder password_placeholder"}," New password ",-1)),Ws=[Hs],Bs=["src"],Ds={key:0,src:cs,alt:""},As={key:1,src:gs,alt:""},Os={key:2,src:V,alt:""},Zs=["innerHTML"],js={key:0,class:"el-form-item__error"},Us=["innerHTML"],Ns=f(()=>a("div",null,null,-1)),Xs=f(()=>a("span",{for:"password",class:"repeat-placeholder"}," Repeat Password ",-1)),Gs=[Xs],Js=["src"],Ks={key:0,class:"el-form-item__error"},Qs=["innerHTML"],Ys=f(()=>a("div",null,null,-1)),so={class:"forgot-password"},oo={class:"submit-button__text"},eo={__name:"reset",setup(y){const E=as(),{resetSuccessData:D,resetErrorData:A,resetLoading:W,forgotSuccessData:O,forgotErrorData:Z,forgotLoading:ro}=is(E),P=ns();ls();const j=ds(),b=v(!1),S=v(!1),k=v(!1),$=v(!1),x=v(!1),U=(r,s,i)=>{s.length===0&&i(new Error("This field is required"));const m=Y(s);m==="Weak"?(i(new Error("Password strength: <b>Weak</b>")),e.value.password.status="Weak"):m==="Medium"?(i(),e.value.password.status="Medium",e.value.password.value="Password strength: <b>Medium</b>"):m==="Strong"&&(i(),e.value.password.status="Strong",e.value.password.value="Password strength: <b>Strong</b>")},N=(r,s,i)=>{s===""?i(new Error("Please input the password again")):s!==l.value.password?i(new Error("Password and confirm password do not match")):i()},l=v({old_password:null,password:null,password_confirmation:null}),e=v({old_password:{value:"",isShow:!1},password:{value:"",isShow:!1},password_confirmation:{value:"",isShow:!1},global:{value:""}}),X=v({old_password:[{required:!0,message:"This field is required.",trigger:"blur"}],password:[{validator:U,trigger:"input"}],password_confirmation:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:N,trigger:"blur"}]});C(A,r=>{for(const s in r)if(typeof r[s]!="string")for(const i in r[s])e.value.global.value=r[s][i];else e.value.global.value=r[s]}),C(D,r=>{ms("/")}),C(Z,r=>{for(const s in r)if(typeof r[s]!="string")for(const i in r[s])e.value.global.value=r[s][i];else e.value.global.value=r[s]}),C(O,r=>{r&&(S.value=!0)}),us(()=>{Ss(),b.value=bs(),window.addEventListener("resize",K)});const G=()=>{E.resetPasswordWithSettings(l.value)},J=()=>{E.forgotPasswordWithMail(l.value)},T=r=>{P.refs[r].focus()},L=r=>{P.refs.passwordForm.validateField(r,(s,i)=>{s?r!=="password"&&(e.value[r].value=""):e.value[r].value=i[r][0].message})},I=r=>{e.value[r].isShow=!0},z=r=>{p()&&(e.value[r].isShow=!0)},R=r=>{p()&&(e.value[r].isShow=!1)},K=()=>{P.update()},p=()=>window.innerWidth>990,Q=()=>{e.value.global.value=""},Y=r=>{const s=/^(?=.*[a-zA-Z])(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,i=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{12,}$/,m=/^(?:(.)(?!\1{3}))*$/,c=["password","admin","qwerty","asdfgh","xzcvb"];if(m.test(r)&&((r==null?void 0:r.length)>15||!c.some(g=>r.toLowerCase().includes(g)))){if(i.test(r)&&((r==null?void 0:r.length)>25||!c.some(g=>r.toLowerCase().includes(g))))return"Strong";if(s.test(r))return"Medium"}return"Weak"},ss=()=>e.value.password.status==="Medium"?"warning":e.value.password.status==="Strong"?"done":"";return(r,s)=>{const i=os,m=es,c=ts,g=rs;return n(),u("div",$s,[a("div",xs,[a("div",Cs,[a("img",{src:vs,alt:"chevron-left",onClick:s[0]||(s[0]=t=>o(j).go(-1))}),Ms]),Vs,w(g,{ref:"passwordForm",class:"main__form--box","hide-required-asterisk":"",model:o(l),rules:o(X),onSubmit:_s(G,["prevent"])},{default:_(()=>[o(e).global.value?(n(),u("div",Es,[a("div",Ps,[Ts,a("span",null,B(o(e).global.value),1)]),a("span",{class:"clear-error",onClick:Q},"X")])):d("",!0),w(m,{prop:"old_password",class:"password-form-item"},{error:_(()=>[o(e).old_password.isShow&&p()?(n(),u("div",Rs,[a("span",{innerHTML:o(e).old_password.value},null,8,Fs)])):d("",!0),qs]),default:_(()=>[w(i,{id:"old_password",ref:"old_password",modelValue:o(l).old_password,"onUpdate:modelValue":s[6]||(s[6]=t=>o(l).old_password=t),type:o(k)?"text":"password",class:"main__form--box__input",placeholder:"Old password",onBlur:s[7]||(s[7]=t=>L("old_password"))},{suffix:_(()=>[o(l).old_password?(n(),u("div",{key:0,style:{position:"relative"},onClick:s[1]||(s[1]=t=>T("old_password"))},Is)):d("",!0),a("img",{class:M(o(e).old_password.value?"eye_icon":""),src:o(k)?o(q):o(H),alt:"eye_icon",onClick:s[2]||(s[2]=t=>k.value=!o(k))},null,10,zs),o(e).old_password.value?(n(),u("img",{key:1,src:V,alt:"",class:"error_icon",onMouseover:s[3]||(s[3]=t=>z("old_password")),onMouseout:s[4]||(s[4]=t=>R("old_password")),onClick:s[5]||(s[5]=t=>I("old_password"))},null,32)):d("",!0)]),_:1},8,["modelValue","type"])]),_:1}),w(m,{prop:"password",class:"form-item"},{error:_(()=>[o(e).password.isShow&&p()?(n(),u("div",js,[a("span",{innerHTML:o(e).password.value},null,8,Us)])):d("",!0),Ns]),default:_(()=>[w(i,{ref:"password",modelValue:o(l).password,"onUpdate:modelValue":s[13]||(s[13]=t=>o(l).password=t),class:"main__form--box__input",placeholder:"Password",type:o($)?"text":"password",onInput:s[14]||(s[14]=t=>L("password"))},{suffix:_(()=>[o(l).password?(n(),u("div",{key:0,style:{position:"relative"},onClick:s[8]||(s[8]=t=>T("password"))},Ws)):d("",!0),a("img",{class:M(o(e).password.value?"eye_icon":""),src:o($)?o(q):o(H),alt:"eye_icon",onClick:s[9]||(s[9]=t=>$.value=!o($))},null,10,Bs),o(e).password.value?(n(),u("div",{key:1,class:"error_icon",onMouseover:s[10]||(s[10]=t=>z("password")),onMouseout:s[11]||(s[11]=t=>R("password")),onClick:s[12]||(s[12]=t=>I("password"))},[o(e).password.status==="Medium"&&o(l).password?(n(),u("img",Ds)):o(e).password.status==="Strong"&&o(l).password?(n(),u("img",As)):(n(),u("img",Os))],32)):d("",!0),o(l).password&&o(e).password.isShow&&p()?(n(),u("div",{key:2,class:M([ss(),"el-form-item__error strength"])},[a("span",{innerHTML:o(e).password.value},null,8,Zs)],2)):d("",!0)]),_:1},8,["modelValue","type"])]),_:1}),w(m,{prop:"password_confirmation",class:"password-form-item"},{error:_(()=>[o(e).password_confirmation.isShow&&p()?(n(),u("div",Ks,[a("span",{innerHTML:o(e).password_confirmation.value},null,8,Qs)])):d("",!0),Ys]),default:_(()=>[w(i,{id:"password_confirmation",ref:"password_confirmation",modelValue:o(l).password_confirmation,"onUpdate:modelValue":s[20]||(s[20]=t=>o(l).password_confirmation=t),type:o(x)?"text":"password",class:"main__form--box__input",placeholder:"Repeat password",onBlur:s[21]||(s[21]=t=>L("password_confirmation"))},{suffix:_(()=>[o(l).password_confirmation?(n(),u("div",{key:0,style:{position:"relative"},onClick:s[15]||(s[15]=t=>T("password_confirmation"))},Gs)):d("",!0),a("img",{class:M(o(e).password_confirmation.value?"eye_icon":""),src:o(x)?o(q):o(H),alt:"eye_icon",onClick:s[16]||(s[16]=t=>x.value=!o(x))},null,10,Js),o(e).password_confirmation.value?(n(),u("img",{key:1,src:V,alt:"",class:"error_icon",onMouseover:s[17]||(s[17]=t=>z("password_confirmation")),onMouseout:s[18]||(s[18]=t=>R("password_confirmation")),onClick:s[19]||(s[19]=t=>I("password_confirmation"))},null,32)):d("",!0)]),_:1},8,["modelValue","type"])]),_:1}),a("div",so,[w(c,{style:{"font-size":"14px","font-weight":"400"},onClick:J},{default:_(()=>[ps("Forgot Password?")]),_:1})]),w(c,{class:"submit-button","native-type":"submit",loading:o(W)},{default:_(()=>[a("span",oo,B(o(W)?"":"Save"),1)]),_:1},8,["loading"]),o(e).old_password.isShow&&!p()?(n(),h(F,{key:1,dialogVisible:o(e).old_password.isShow&&!p(),"error-text":o(e).old_password.value,onVisible:s[22]||(s[22]=t=>o(e).old_password.isShow=!1)},null,8,["dialogVisible","error-text"])):d("",!0),o(e).password.isShow&&!p()?(n(),h(F,{key:2,dialogVisible:o(e).password.isShow&&!p(),"error-text":o(e).password.value,"text-color":o(e).password.status==="Medium"&&o(l).password?"warning":o(e).password.status==="Strong"&&o(l).password?"done":"weak",onVisible:s[23]||(s[23]=t=>o(e).password.isShow=!1)},null,8,["dialogVisible","error-text","text-color"])):d("",!0),o(e).password_confirmation.isShow&&!p()?(n(),h(F,{key:3,dialogVisible:o(e).password_confirmation.isShow&&!p(),"error-text":o(e).password_confirmation.value,onVisible:s[24]||(s[24]=t=>o(e).password_confirmation.isShow=!1)},null,8,["dialogVisible","error-text"])):d("",!0)]),_:1},8,["model","rules","onSubmit"])]),o(S)?(n(),h(hs,{key:0,email:o(l).email,dialogVisible:o(S),onClose:s[25]||(s[25]=t=>S.value=!1)},null,8,["email","dialogVisible"])):d("",!0),o(b)?(n(),h(ys,{key:1,dialogVisible:o(b),onClose:s[26]||(s[26]=t=>b.value=!1)},null,8,["dialogVisible"])):d("",!0)])}}},ho=ks(eo,[["__scopeId","data-v-35a66696"]]);export{ho as default};
