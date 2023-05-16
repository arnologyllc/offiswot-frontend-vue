import{E as ts}from"./el-input.7fd03793.js";import{E as is,_ as P,a as as}from"./el-overlay.64de5399.js";import{E as ls}from"./el-button.6d07ff3a.js";import"./el-form-item.4ed993c7.js";import{z as ns,s as W,B as ds,b as us,r as v,w as M,e as ps,f as u,m as i,u as o,h as w,i as m,j as ms,c as b,k as d,l as _s,o as n,t as A,A as C,q as ws,x as fs,y as vs,v as cs}from"./entry.1c65c56b.js";import{_ as gs}from"./chevron-left.49d1d463.js";import{_ as ys,a as bs}from"./good.bc837e5d.js";import{_ as hs}from"./OvConfirmPasswordChangeModal.0182abfe.js";import{_ as Ss}from"./AccessCheckModal.46cf6b5b.js";import{E as R}from"./ErrorMassageModal.180b4dfd.js";import{h as q,s as D}from"./eye-close-icon.f5ebd9e6.js";import ks from"./settingsToken.644b8451.js";import $s from"./loginToken.3edc705a.js";import xs from"./auth.3b6594a0.js";import{_ as Es}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.cf142168.js";import"./refs.6073550b.js";import"./email-primary-icon.754ea29f.js";import"./js.cookie.edb2da2a.js";import"./nuxt-storage.min.d80392db.js";import"./_commonjsHelpers.042e6b4d.js";const f=h=>(fs("data-v-de9e9519"),h=h(),vs(),h),Ms={class:"main"},Cs={class:"main__form"},Ps={class:"main__form--title"},Ts=f(()=>i("span",null,"Reset password",-1)),Vs=f(()=>i("div",{class:"main__form--subtitle"}," Fill in the fields to change your password. ",-1)),Ls={key:0,class:"el-form-item__global-error-container"},Is={class:"el-form-item__global-error"},zs=f(()=>i("img",{src:P,alt:""},null,-1)),Bs=f(()=>i("span",{for:"old_password",class:"custom_placeholder"}," Old Password ",-1)),Fs=[Bs],Rs=["src"],qs={key:0,class:"el-form-item__error"},Ds=["innerHTML"],Hs=f(()=>i("div",null,null,-1)),Ws=f(()=>i("span",{for:"password",class:"custom_placeholder"}," New password ",-1)),As=[Ws],Os=["src"],Zs={key:0,src:ys,alt:""},js={key:1,src:bs,alt:""},Us={key:2,src:P,alt:""},Ns=["innerHTML"],Xs={key:0,class:"el-form-item__error"},Gs=["innerHTML"],Js=f(()=>i("div",null,null,-1)),Ks=f(()=>i("span",{for:"password",class:"custom_placeholder"}," Repeat Password ",-1)),Qs=[Ks],Ys=["src"],so={key:0,class:"el-form-item__error"},oo=["innerHTML"],eo=f(()=>i("div",null,null,-1)),ro={class:"forgot-password"},to={class:"submit-button__text"},io={__name:"reset",setup(h){const T=ns(),{resetSuccessData:O,resetErrorData:Z,resetLoading:H,forgotSuccessData:j,forgotErrorData:U}=W(T),N=ds(),{profileSuccessData:V}=W(N),L=_s(),X=us(),c=v(!1),S=v(!1),k=v(!1),$=v(!1),x=v(!1),G=(e,s,l)=>{s||l(new Error("This field is required"));const _=es(s);_==="Weak"?(l(new Error("Password strength: <b>Weak</b>")),r.value.password.status="Weak"):_==="Medium"?(l(),r.value.password.status="Medium",r.value.password.value="Password strength: <b>Medium</b>"):_==="Strong"&&(l(),r.value.password.status="Strong",r.value.password.value="Password strength: <b>Strong</b>")},J=(e,s,l)=>{s===""?l(new Error("Please input the password again")):s!==a.value.password?l(new Error("Password and confirm password do not match")):l()},a=v({old_password:null,password:null,password_confirmation:null}),r=v({old_password:{value:"",isShow:!1},password:{value:"",isShow:!1},password_confirmation:{value:"",isShow:!1},global:{value:""}}),K=v({old_password:[{required:!0,message:"This field is required.",trigger:"blur"}],password:[{validator:G,trigger:"input"}],password_confirmation:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:J,trigger:"blur"}]});M(Z,e=>{for(const s in e)if(typeof e[s]!="string")for(const l in e[s])r.value.global.value=e[s][l];else r.value.global.value=e[s]}),M(O,e=>{cs("/")}),M(U,e=>{for(const s in e)if(typeof e[s]!="string")for(const l in e[s])r.value.global.value=e[s][l];else r.value.global.value=e[s]}),M(j,e=>{var s;e&&(a.value.email=(s=V.value)==null?void 0:s.user.email,S.value=!0)}),ps(()=>{var e,s;xs(),(e=V.value)!=null&&e.user.email&&(a.value.email=(s=V.value)==null?void 0:s.user.email),c.value=$s(),c.value=ks(),window.addEventListener("resize",ss)});const Q=()=>{T.resetPasswordWithSettings(a.value)},Y=()=>{T.forgotPasswordWithMail(a.value)},I=e=>{L.refs[e].focus()},E=e=>{L.refs.passwordForm.validateField(e,(s,l)=>{s?e!=="password"&&(r.value[e].value=""):r.value[e].value=l[e][0].message})},z=e=>{r.value[e].isShow=!0},B=e=>{p()&&(r.value[e].isShow=!0)},F=e=>{p()&&(r.value[e].isShow=!1)},ss=()=>{L.update()},p=()=>window.innerWidth>990,os=()=>{r.value.global.value=""},es=e=>{const s=/^(?=.*[a-zA-Z])(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,l=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{12,}$/,_=/^(?:(.)(?!\1{3}))*$/,g=["password","admin","qwerty","asdfgh","xzcvb"];if(_.test(e)&&((e==null?void 0:e.length)>15||!g.some(y=>e==null?void 0:e.toLowerCase().includes(y)))){if(l.test(e)&&((e==null?void 0:e.length)>25||!g.some(y=>e==null?void 0:e.toLowerCase().includes(y))))return"Strong";if(s.test(e))return"Medium"}return"Weak"},rs=()=>r.value.password.status==="Medium"?"warning":r.value.password.status==="Strong"?"done":"";return(e,s)=>{const l=ts,_=as,g=ls,y=is;return n(),u("div",Ms,[i("div",Cs,[i("div",Ps,[i("img",{src:gs,alt:"chevron-left",onClick:s[0]||(s[0]=t=>o(X).go(-1))}),Ts]),Vs,w(y,{ref:"passwordForm",class:"main__form--box","hide-required-asterisk":"",model:o(a),rules:o(K),onSubmit:ms(Q,["prevent"])},{default:m(()=>[o(r).global.value?(n(),u("div",Ls,[i("div",Is,[zs,i("span",null,A(o(r).global.value),1)]),i("span",{class:"clear-error",onClick:os},"X")])):d("",!0),w(_,{prop:"old_password",class:"password-form-item"},{error:m(()=>[o(r).old_password.isShow&&p()?(n(),u("div",qs,[i("span",{innerHTML:o(r).old_password.value},null,8,Ds)])):d("",!0),Hs]),default:m(()=>[w(l,{id:"old_password",ref:"old_password",modelValue:o(a).old_password,"onUpdate:modelValue":s[6]||(s[6]=t=>o(a).old_password=t),type:o(k)?"text":"password",class:"main__form--box__input",placeholder:"Old password",onBlur:s[7]||(s[7]=t=>E("old_password"))},{suffix:m(()=>[o(a).old_password?(n(),u("div",{key:0,style:{position:"relative"},onClick:s[1]||(s[1]=t=>I("old_password"))},Fs)):d("",!0),i("img",{class:C(o(r).old_password.value?"eye_icon":""),src:o(k)?o(q):o(D),alt:"eye_icon",onClick:s[2]||(s[2]=t=>k.value=!o(k))},null,10,Rs),o(r).old_password.value?(n(),u("img",{key:1,src:P,alt:"",class:"error_icon",onMouseover:s[3]||(s[3]=t=>B("old_password")),onMouseout:s[4]||(s[4]=t=>F("old_password")),onClick:s[5]||(s[5]=t=>z("old_password"))},null,32)):d("",!0)]),_:1},8,["modelValue","type"])]),_:1}),w(_,{prop:"password",class:"form-item"},{error:m(()=>[!o(a).password&&o(r).password.isShow&&p()?(n(),u("div",Xs,[i("span",{innerHTML:o(r).password.value},null,8,Gs)])):d("",!0),Js]),default:m(()=>[w(l,{ref:"password",modelValue:o(a).password,"onUpdate:modelValue":s[13]||(s[13]=t=>o(a).password=t),class:"main__form--box__input",placeholder:"Password",type:o($)?"text":"password",onInput:s[14]||(s[14]=t=>E("password")),onBlur:s[15]||(s[15]=t=>E("password"))},{suffix:m(()=>[o(a).password?(n(),u("div",{key:0,style:{position:"relative"},onClick:s[8]||(s[8]=t=>I("password"))},As)):d("",!0),i("img",{class:C(o(r).password.value?"eye_icon":""),src:o($)?o(q):o(D),alt:"eye_icon",onClick:s[9]||(s[9]=t=>$.value=!o($))},null,10,Os),o(r).password.value?(n(),u("div",{key:1,class:"error_icon",onMouseover:s[10]||(s[10]=t=>B("password")),onMouseout:s[11]||(s[11]=t=>F("password")),onClick:s[12]||(s[12]=t=>z("password"))},[o(r).password.status==="Medium"&&o(a).password?(n(),u("img",Zs)):o(r).password.status==="Strong"&&o(a).password?(n(),u("img",js)):(n(),u("img",Us))],32)):d("",!0),o(a).password&&o(r).password.isShow&&p()?(n(),u("div",{key:2,class:C([rs(),"el-form-item__error strength"])},[i("span",{innerHTML:o(r).password.value},null,8,Ns)],2)):d("",!0)]),_:1},8,["modelValue","type"])]),_:1}),w(_,{prop:"password_confirmation",class:"password-form-item"},{error:m(()=>[o(r).password_confirmation.isShow&&p()?(n(),u("div",so,[i("span",{innerHTML:o(r).password_confirmation.value},null,8,oo)])):d("",!0),eo]),default:m(()=>[w(l,{id:"password_confirmation",ref:"password_confirmation",modelValue:o(a).password_confirmation,"onUpdate:modelValue":s[21]||(s[21]=t=>o(a).password_confirmation=t),type:o(x)?"text":"password",class:"main__form--box__input",placeholder:"Repeat password",onBlur:s[22]||(s[22]=t=>E("password_confirmation"))},{suffix:m(()=>[o(a).password_confirmation?(n(),u("div",{key:0,style:{position:"relative"},onClick:s[16]||(s[16]=t=>I("password_confirmation"))},Qs)):d("",!0),i("img",{class:C(o(r).password_confirmation.value?"eye_icon":""),src:o(x)?o(q):o(D),alt:"eye_icon",onClick:s[17]||(s[17]=t=>x.value=!o(x))},null,10,Ys),o(r).password_confirmation.value?(n(),u("img",{key:1,src:P,alt:"",class:"error_icon",onMouseover:s[18]||(s[18]=t=>B("password_confirmation")),onMouseout:s[19]||(s[19]=t=>F("password_confirmation")),onClick:s[20]||(s[20]=t=>z("password_confirmation"))},null,32)):d("",!0)]),_:1},8,["modelValue","type"])]),_:1}),i("div",ro,[w(g,{style:{"font-size":"14px","font-weight":"400"},onClick:Y},{default:m(()=>[ws("Forgot Password?")]),_:1})]),w(g,{class:"submit-button","native-type":"submit",loading:o(H)},{default:m(()=>[i("span",to,A(o(H)?"":"Save"),1)]),_:1},8,["loading"]),o(r).old_password.isShow&&!p()?(n(),b(R,{key:1,"dialog-visible":o(r).old_password.isShow&&!p(),"error-text":o(r).old_password.value,onVisible:s[23]||(s[23]=t=>o(r).old_password.isShow=!1)},null,8,["dialog-visible","error-text"])):d("",!0),o(r).password.isShow&&!p()?(n(),b(R,{key:2,"dialog-visible":o(r).password.isShow&&!p(),"error-text":o(r).password.value,"text-color":o(r).password.status==="Medium"&&o(a).password?"warning":o(r).password.status==="Strong"&&o(a).password?"done":"weak",onVisible:s[24]||(s[24]=t=>o(r).password.isShow=!1)},null,8,["dialog-visible","error-text","text-color"])):d("",!0),o(r).password_confirmation.isShow&&!p()?(n(),b(R,{key:3,"dialog-visible":o(r).password_confirmation.isShow&&!p(),"error-text":o(r).password_confirmation.value,onVisible:s[25]||(s[25]=t=>o(r).password_confirmation.isShow=!1)},null,8,["dialog-visible","error-text"])):d("",!0)]),_:1},8,["model","rules","onSubmit"])]),o(S)?(n(),b(hs,{key:0,email:o(a).email,"dialog-visible":o(S),onClose:s[26]||(s[26]=t=>S.value=!1)},null,8,["email","dialog-visible"])):d("",!0),o(c)?(n(),b(Ss,{key:1,"dialog-visible":o(c),onClose:s[27]||(s[27]=t=>c.value=!1)},null,8,["dialog-visible"])):d("",!0)])}}},Co=Es(io,[["__scopeId","data-v-de9e9519"]]);export{Co as default};
