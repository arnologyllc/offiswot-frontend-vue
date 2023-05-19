import{E as J}from"./el-button.efbddc4b.js";import{E as M,v as Y}from"./el-loading.1f6c7acc.js";import{z as G,s as H,r as s,w as x,e as K,B as Q,f as i,I as X,u as a,m as o,J as D,t as b,k as h,c as I,i as T,h as W,l as Z,o as r,q as L,y as ee,v as ae,x as te,C as oe}from"./entry.d5ce8ebf.js";import{_ as se}from"./edit-icon.0a45addc.js";import{d as C}from"./default-user-icon.85f3aaa4.js";import{_ as re}from"./AccessCheckModal.40b6ab47.js";import ne from"./settingsToken.4f8f73e6.js";import ie from"./loginToken.1dcf96fb.js";import le from"./auth.a45746ca.js";import{_ as ue}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.2184c8ed.js";import"./el-overlay.cc8d7c8f.js";import"./el-form-item.4ed993c7.js";import"./email-primary-icon.83ef1c2c.js";import"./eye-close-icon.225f2d95.js";const ce=""+new URL("email1-icon.ced79935.svg",import.meta.url).href,de=""+new URL("phone-icon.1b07dd61.svg",import.meta.url).href;const $=m=>(ae("data-v-9bea09b4"),m=m(),te(),m),me={class:"main"},pe={class:"main__user-container"},_e=$(()=>o("div",{class:"user-box__title"},"Your Profile",-1)),fe={class:"user-box__user-info"},ve={class:"user-box__user-fullname user-box__title"},ge={key:0,class:"user-box__user-fullname-span"},be=$(()=>o("span",null,"Edit Profile",-1)),he={key:0,class:"user-box__specialty"},ye={class:"user-box__flex-box"},we=$(()=>o("img",{src:ce,alt:"email_icon"},null,-1)),ke={class:"user-box__flex-box"},xe={key:0,style:{"margin-bottom":"3px"},src:de,alt:"phone_icon"},Te={__name:"edit",setup(m){const p=G(),{profileLoading:N,profileSuccessData:y,editProfileData:E,workspacesSuccessData:R}=H(p),V=Z(),B=oe(),w=s(null),_=s({avatar:null}),l=s(null),u=s(null),k=s(null),O=s(null),c=s(null),S=s(null),j=s(null),f=s(C),z=s(null),P=e=>{var t;if(e){e.user.avatar?f.value=`${B.public.env.serverUrl}${e.avatarPath}/${e.user.avatar}`:f.value=C;const[d,v,g]=[e.user.name?e.user.name:"",e.user.lastname?e.user.lastname:"",e.user.surname?e.user.surname:""];(d||v||g)&&(u.value=`${d} ${v} ${g}`),k.value=e.user.phone_number,O.value=e.user.invite_workspaces.length,S.value=e.user.email,c.value=(t=e.specialties.find(n=>n.id===e.user.speciality_id))==null?void 0:t.name}},A=e=>{w.value=e};x(y,e=>P(e)),x(E,e=>{e.user.avatar?f.value=`${e.avatarPath}/${e.user.avatar}`:f.value=C}),x(R,e=>A(e)),K(async()=>{le(),l.value=ie(),l.value=ne(),!y.value||E.value?p.getProfile():P(y.value),await p.getWorkSpaces(),window.addEventListener("resize",F),j.value=U()}),Q(()=>w.value&&w.value.myWorkspaces.length);const F=()=>{j.value=U(),V.update()},U=()=>window.innerWidth>935?`Thanks for joining Offiswot!<br /><br />
            Create a workspace for your team or company using our productivity platform.<br/>Enjoy collaborating with each other easily and managing yourteam members and the projects effectively.`:window.innerWidth<=935&&window.innerWidth>628?`Thanks for joining Offiswot!<br /><br />
            Create a workspace for your team or company using our productivity platform. Enjoy collaborating with each other easily and managing yourteam members and the projects effectively.`:`Thanks for<br /> joining Offiswot!<br /><br />
            Create a workspace for your team or company using our productivity platform. Enjoy collaborating with each other easily and managing yourteam members and the projects effectively.`,q=(e,t)=>{_.value.avatar=t.raw,z.value=URL.createObjectURL(t.raw),p.editProfile(_.value)};return(e,t)=>{const d=J,v=M,g=Y;return r(),i("div",null,[X((r(),i("div",me,[o("div",pe,[_e,o("div",{style:D(a(u)&&a(c)?"":"align-items:center;"),class:"user-box__info"},[o("div",fe,[o("div",ve,[a(u)?(r(),i("span",ge,b(a(u)),1)):h("",!0),a(u)?(r(),i("img",{key:1,class:"user-box__user-edit-icon",src:se,alt:"edit_icon",onClick:t[0]||(t[0]=n=>("navigateTo"in e?e.navigateTo:a(L))("/profile/edit"))})):(r(),I(d,{key:2,class:"user-box__user-edit-btn",onClick:t[1]||(t[1]=n=>("navigateTo"in e?e.navigateTo:a(L))("/profile/edit"))},{default:T(()=>[be]),_:1}))]),a(c)?(r(),i("div",he,b(a(c)),1)):h("",!0),o("div",{class:"user-box__credentials",style:D(a(c)?"padding-top:30px":"padding-top:15px")},[o("div",ye,[we,o("div",null,b(a(S)),1)]),o("div",ke,[a(k)?(r(),i("img",xe)):h("",!0),o("div",null,b(a(k)),1)])],4)])],4),W(v,{modelValue:a(_).avatar,"onUpdate:modelValue":t[2]||(t[2]=n=>a(_).avatar=n),"show-file-list":!1,class:"main__form--upload",action:"#",accept:"image/*","on-success":q},{default:T(()=>[W(d,{class:"change-picture"},{default:T(()=>[ee("Change picture")]),_:1})]),_:1},8,["modelValue"])])])),[[g,a(N),void 0,{fullscreen:!0,lock:!0}]]),a(l)?(r(),I(re,{key:0,"dialog-visible":a(l),onClose:t[3]||(t[3]=n=>l.value=!1)},null,8,["dialog-visible"])):h("",!0)])}}},Oe=ue(Te,[["__scopeId","data-v-9bea09b4"]]);export{Oe as default};
