import{E as rs,_ as T,a as ts,b as as}from"./el-overlay.cd375e8b.js";import{E as is}from"./el-button.8c3cc1e7.js";import{E as ls,s as H,A as ns,b as ds,r as w,w as P,e as us,h as u,p as a,u as o,i as v,j as p,k as ps,c as S,l as d,m as ms,o as n,t as W,G as V,z as _s,x as fs,y as ws,v as vs}from"./entry.44cdae02.js";import{_ as cs}from"./chevron-left.aec22056.js";import{_ as gs,a as bs}from"./good.bc8f78a3.js";import{_ as ys}from"./OvConfirmPasswordChangeModal.1e349ea6.js";import{_ as ks}from"./AccessCheckModal.3b537c45.js";import{E as F}from"./ErrorMassageModal.19be5bf0.js";import{h as R,s as A}from"./eye-close-icon.e4722ace.js";import Ss from"./settingsToken.0001c10a.js";import hs from"./loginToken.1acff8c2.js";import $s from"./auth.bafff1c6.js";import{_ as xs}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.a033cdea.js";import"./email-primary-icon.6a00ece1.js";const c=h=>(fs("data-v-fb4fe2fd"),h=h(),ws(),h),Ms={class:"main"},Es={class:"main__form"},Cs={class:"main__form--title"},Ps=c(()=>a("span",null,"Reset password",-1)),Vs=c(()=>a("div",{class:"main__form--subtitle"},"Fill in the fields to change your password.",-1)),Ts={key:0,class:"el-form-item__global-error-container"},Ls={class:"el-form-item__global-error"},Is=c(()=>a("img",{src:T,alt:""},null,-1)),zs=c(()=>a("span",{for:"old_password",class:"custom_placeholder"}," Old Password ",-1)),Fs=[zs],Rs=["src"],As={key:0,class:"el-form-item__error"},Bs=["innerHTML"],Ds=c(()=>a("div",null,null,-1)),Hs=c(()=>a("span",{for:"password",class:"custom_placeholder"}," New password ",-1)),Ws=[Hs],qs=["src"],Os={key:0,src:gs,alt:""},js={key:1,src:bs,alt:""},Zs={key:2,src:T,alt:""},Us=["innerHTML"],Gs={key:0,class:"el-form-item__error"},Ns=["innerHTML"],Xs=c(()=>a("div",null,null,-1)),Js=c(()=>a("span",{for:"password",class:"custom_placeholder"}," Repeat Password ",-1)),Ks=[Js],Qs=["src"],Ys={key:0,class:"el-form-item__error"},so=["innerHTML"],oo=c(()=>a("div",null,null,-1)),eo={class:"forgot-password"},ro={class:"submit-button__text"},to={__name:"reset",setup(h){const L=ls(),{resetSuccessData:q,resetErrorData:O,resetLoading:B,forgotSuccessData:j,forgotErrorData:Z}=H(L),U=ns(),{profileSuccessData:I}=H(U),$=ms(),G=ds(),g=w(!1),b=w(!1),x=w(!1),M=w(!1),E=w(!1),D=w(!1),N=(r,s,l)=>{s||l(new Error("This field is required"));const f=os(s);f==="Weak"?(l(new Error("Password strength: <b>Weak</b>")),e.value.password.status="Weak"):f==="Medium"?(l(),e.value.password.status="Medium",e.value.password.value="Password strength: <b>Medium</b>"):f==="Strong"&&(l(),e.value.password.status="Strong",e.value.password.value="Password strength: <b>Strong</b>")},X=(r,s,l)=>{s===""?l(new Error("Please input the password again")):s!==i.value.password?l(new Error("Password and confirm password do not match")):l()},i=w({old_password:null,password:null,password_confirmation:null}),e=w({old_password:{value:"",isShow:!1},password:{value:"",isShow:!1},password_confirmation:{value:"",isShow:!1},global:{value:""}}),J=w({old_password:[{required:!0,message:"This field is required.",trigger:"blur"}],password:[{validator:N,trigger:"input"}],password_confirmation:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:X,trigger:"blur"}]});P(O,r=>{for(const s in r)if(typeof r[s]!="string")for(const l in r[s])e.value.global.value=r[s][l];else e.value.global.value=r[s]}),P(q,r=>{vs("/")}),P(Z,r=>{if(!b.value)for(const s in r)if(typeof r[s]!="string")for(const l in r[s])e.value.global.value=r[s][l];else e.value.global.value=r[s]}),P(j,r=>{var s;r&&(i.value.email=(s=I.value)==null?void 0:s.user.email,b.value=!0)}),us(()=>{var r,s;$s(),(r=I.value)!=null&&r.user.email&&(i.value.email=(s=I.value)==null?void 0:s.user.email),g.value=hs(),g.value=Ss(),window.addEventListener("resize",Y)});const K=()=>{L.resetPasswordWithSettings(i.value)},Q=()=>{L.forgotPasswordWithMail(i.value)},z=r=>{$.refs[r].focus()},C=r=>{$.refs.passwordForm.validateField(r,(s,l)=>{s?r!=="password"&&(e.value[r].value=""):e.value[r].value=l[r][0].message}),Object.values(i.value).every(s=>s)&&$.refs.passwordForm.validate(s=>D.value=s)},_=(r,s)=>{m()?e.value[r].isShow=s==="mouseover":s==="click"&&(e.value[r].isShow=!0)},Y=()=>{$.update()},m=()=>window.innerWidth>990,ss=()=>{e.value.global.value=""},os=r=>{const s=/^(?=.*[a-zA-Z])(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,l=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{12,}$/,f=/^(?:(.)(?!\1{3}))*$/,y=["password","admin","qwerty","asdfgh","zxcvb"];if(f.test(r)&&((r==null?void 0:r.length)>15||!y.some(k=>r==null?void 0:r.toLowerCase().includes(k)))){if(l.test(r)&&((r==null?void 0:r.length)>25||!y.some(k=>r==null?void 0:r.toLowerCase().includes(k))))return"Strong";if(s.test(r))return"Medium"}return"Weak"},es=()=>{switch(e.value.password.status){case"Medium":return"warning";case"Strong":return"done";default:return""}};return(r,s)=>{const l=ts,f=as,y=is,k=rs;return n(),u("div",Ms,[a("div",Es,[a("div",Cs,[a("img",{src:cs,alt:"chevron-left",onClick:s[0]||(s[0]=t=>o(G).go(-1))}),Ps]),Vs,v(k,{ref:"passwordForm",class:"main__form--box","hide-required-asterisk":"",model:o(i),rules:o(J),onSubmit:ps(K,["prevent"])},{default:p(()=>[o(e).global.value?(n(),u("div",Ts,[a("div",Ls,[Is,a("span",null,W(o(e).global.value),1)]),a("span",{class:"clear-error",onClick:ss},"X")])):d("",!0),v(f,{prop:"old_password",class:"password-form-item"},{error:p(()=>[o(e).old_password.isShow&&m()?(n(),u("div",As,[a("span",{innerHTML:o(e).old_password.value},null,8,Bs)])):d("",!0),Ds]),default:p(()=>[v(l,{id:"old_password",ref:"old_password",modelValue:o(i).old_password,"onUpdate:modelValue":s[6]||(s[6]=t=>o(i).old_password=t),type:o(x)?"text":"password",class:"main__form--box__input",placeholder:"Old password",onBlur:s[7]||(s[7]=t=>C("old_password"))},{suffix:p(()=>[o(i).old_password?(n(),u("div",{key:0,style:{position:"relative"},onClick:s[1]||(s[1]=t=>z("old_password"))},Fs)):d("",!0),a("img",{class:V(o(e).old_password.value?"eye_icon":""),src:o(x)?o(R):o(A),alt:"eye_icon",onClick:s[2]||(s[2]=t=>x.value=!o(x))},null,10,Rs),o(e).old_password.value?(n(),u("img",{key:1,src:T,alt:"",class:"error_icon",onMouseover:s[3]||(s[3]=t=>_("old_password","mouseover")),onMouseout:s[4]||(s[4]=t=>_("old_password","mouseout")),onClick:s[5]||(s[5]=t=>_("old_password","click"))},null,32)):d("",!0)]),_:1},8,["modelValue","type"])]),_:1}),v(f,{prop:"password",class:"form-item"},{error:p(()=>[!o(i).password&&o(e).password.isShow&&m()?(n(),u("div",Gs,[a("span",{innerHTML:o(e).password.value},null,8,Ns)])):d("",!0),Xs]),default:p(()=>[v(l,{ref:"password",modelValue:o(i).password,"onUpdate:modelValue":s[13]||(s[13]=t=>o(i).password=t),class:"main__form--box__input",placeholder:"Password",type:o(M)?"text":"password",onInput:s[14]||(s[14]=t=>C("password")),onBlur:s[15]||(s[15]=t=>C("password"))},{suffix:p(()=>[o(i).password?(n(),u("div",{key:0,style:{position:"relative"},onClick:s[8]||(s[8]=t=>z("password"))},Ws)):d("",!0),a("img",{class:V(o(e).password.value?"eye_icon":""),src:o(M)?o(R):o(A),alt:"eye_icon",onClick:s[9]||(s[9]=t=>M.value=!o(M))},null,10,qs),o(e).password.value?(n(),u("div",{key:1,class:"error_icon",onMouseover:s[10]||(s[10]=t=>_("password","mouseover")),onMouseout:s[11]||(s[11]=t=>_("password","mouseout")),onClick:s[12]||(s[12]=t=>_("password","click"))},[o(e).password.status==="Medium"&&o(i).password?(n(),u("img",Os)):o(e).password.status==="Strong"&&o(i).password?(n(),u("img",js)):(n(),u("img",Zs))],32)):d("",!0),o(i).password&&o(e).password.isShow&&m()?(n(),u("div",{key:2,class:V([es(),"el-form-item__error strength"])},[a("span",{innerHTML:o(e).password.value},null,8,Us)],2)):d("",!0)]),_:1},8,["modelValue","type"])]),_:1}),v(f,{prop:"password_confirmation",class:"password-form-item"},{error:p(()=>[o(e).password_confirmation.isShow&&m()?(n(),u("div",Ys,[a("span",{innerHTML:o(e).password_confirmation.value},null,8,so)])):d("",!0),oo]),default:p(()=>[v(l,{id:"password_confirmation",ref:"password_confirmation",modelValue:o(i).password_confirmation,"onUpdate:modelValue":s[21]||(s[21]=t=>o(i).password_confirmation=t),type:o(E)?"text":"password",class:"main__form--box__input",placeholder:"Repeat password",onBlur:s[22]||(s[22]=t=>C("password_confirmation"))},{suffix:p(()=>[o(i).password_confirmation?(n(),u("div",{key:0,style:{position:"relative"},onClick:s[16]||(s[16]=t=>z("password_confirmation"))},Ks)):d("",!0),a("img",{class:V(o(e).password_confirmation.value?"eye_icon":""),src:o(E)?o(R):o(A),alt:"eye_icon",onClick:s[17]||(s[17]=t=>E.value=!o(E))},null,10,Qs),o(e).password_confirmation.value?(n(),u("img",{key:1,src:T,alt:"",class:"error_icon",onMouseover:s[18]||(s[18]=t=>_("password_confirmation","mouseover")),onMouseout:s[19]||(s[19]=t=>_("password_confirmation","mouseout")),onClick:s[20]||(s[20]=t=>_("password_confirmation","click"))},null,32)):d("",!0)]),_:1},8,["modelValue","type"])]),_:1}),a("div",eo,[v(y,{style:{"font-size":"14px","font-weight":"400"},onClick:Q},{default:p(()=>[_s("Forgot Password?")]),_:1})]),v(y,{class:"submit-button","native-type":"submit",loading:o(B),disabled:!o(D)},{default:p(()=>[a("span",ro,W(o(B)?"":"Save"),1)]),_:1},8,["loading","disabled"]),o(e).old_password.isShow&&!m()?(n(),S(F,{key:1,"dialog-visible":o(e).old_password.isShow&&!m(),"error-text":o(e).old_password.value,onVisible:s[23]||(s[23]=t=>o(e).old_password.isShow=!1)},null,8,["dialog-visible","error-text"])):d("",!0),o(e).password.isShow&&!m()?(n(),S(F,{key:2,"dialog-visible":o(e).password.isShow&&!m(),"error-text":o(e).password.value,"text-color":o(e).password.status==="Medium"&&o(i).password?"warning":o(e).password.status==="Strong"&&o(i).password?"done":"weak",onVisible:s[24]||(s[24]=t=>o(e).password.isShow=!1)},null,8,["dialog-visible","error-text","text-color"])):d("",!0),o(e).password_confirmation.isShow&&!m()?(n(),S(F,{key:3,"dialog-visible":o(e).password_confirmation.isShow&&!m(),"error-text":o(e).password_confirmation.value,onVisible:s[25]||(s[25]=t=>o(e).password_confirmation.isShow=!1)},null,8,["dialog-visible","error-text"])):d("",!0)]),_:1},8,["model","rules","onSubmit"])]),o(b)?(n(),S(ys,{key:0,email:o(i).email,"dialog-visible":o(b),onClose:s[26]||(s[26]=t=>b.value=!1)},null,8,["email","dialog-visible"])):d("",!0),o(g)?(n(),S(ks,{key:1,"dialog-visible":o(g),onClose:s[27]||(s[27]=t=>g.value=!1)},null,8,["dialog-visible"])):d("",!0)])}}},ko=xs(to,[["__scopeId","data-v-fb4fe2fd"]]);export{ko as default};
