import{E as le,a as ie,b as ce}from"./el-dropdown.1202e751.js";import{E as ue}from"./el-button.e243c5d4.js";/* empty css                        */import"./el-popper.5c753708.js";import"./el-scrollbar.be1d11a1.js";import{A as _e,B as de,E as pe,a as ve,s as fe,bZ as ge,r as p,b as me,H as he,w as S,f as s,e as ke,C as we,o as v,h as f,p as o,F as O,q as j,i as _,j as c,u as $,G as b,l as H,v as g,P as Se,D as $e,m as be,x as ye,y as xe}from"./entry.a509592d.js";import{d as k}from"./default-user-icon.3cadfaff.js";import{_ as Ae}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.14e866f0.js";const De=""+new URL("search.5b3fea75.svg",import.meta.url).href,Ue=""+new URL("new-chat.d41c9453.svg",import.meta.url).href,Ne=""+new URL("saved-messages.dcdaa155.svg",import.meta.url).href;const u=y=>(ye("data-v-751c42fe"),y=y(),xe(),y),Ce={class:"main"},Ie={class:"users"},Ee={key:0,class:"main__top"},We=["onClick"],Oe=u(()=>o("div",{class:"current__user-selector"},null,-1)),Pe=["src"],Je=u(()=>o("i",{class:"el-icon-caret-bottom"},null,-1)),Le=u(()=>o("span",null,"Logout",-1)),Re=u(()=>o("div",{class:"current__workspace-selector"},null,-1)),Me=["src","title","onClick"],ze={class:"main__bottom"},Be=u(()=>o("div",{class:"main__user-actions--add_button"},[o("span",null,"+")],-1)),Fe={class:"chats-header"},Te=u(()=>o("img",{src:De,alt:"",class:"chats__button-img"},null,-1)),Ve=u(()=>o("span",{class:"chats__button-text"},"Search",-1)),je=u(()=>o("img",{src:Ue,alt:"",class:"chats__button-img"},null,-1)),He=u(()=>o("span",{class:"chats__button-text"},"Create new chat",-1)),Ye=u(()=>o("img",{src:Ne,alt:"",class:"chats__button-img"},null,-1)),qe=u(()=>o("span",{class:"chats__button-text"},"Saved messages",-1)),Ge={__name:"Sidebar",setup(y){const d=_e(),P=de(),J=pe(),L=ve(),{profileSuccessData:C,profileFailureData:Y,editProfileData:q,editFailureData:G,workspacesSuccessData:I}=fe(d),{$myFetch:Z}=ge(),R=$e();p(k);const x=p(!0),K=be(),Q=p(null),A=me(),D=p(!1),t=p(!1),E=he(),n=p(null),m=p(!1),w=p(236),X=e=>{Q.value=e,e!=null&&e.user.avatar&&t.value[n.value]?t.value[n.value].avatarUrl=`${R.public.env.serverUrl}${e.avatarPath}/${e.user.avatar}`:t.value[n.value]&&(t.value[n.value].avatarUrl=`${k}`),localStorage.setItem("accounts",JSON.stringify(t.value))},M=e=>{t.value=JSON.parse(localStorage.getItem("accounts")),t.value[n.value]&&(t.value[n.value].workspaces=e==null?void 0:e.myWorkspaces),localStorage.setItem("accounts",JSON.stringify(t.value))};S(I,e=>M(e)),S(C,e=>{e!=null&&e.user.avatar&&n.value>=0?t.value[n.value].avatarUrl=`${R.public.env.serverUrl}${e.avatarPath}/${e.user.avatar}`:n.value>=0&&(t.value[n.value].avatarUrl=`${k}`),localStorage.setItem("accounts",JSON.stringify(t.value))}),S(G,e=>{(e==null?void 0:e.error)==="You don't have permission to access this resource"&&(s.remove("login_pin_token"),s.remove("settings_pin_token"),e=null,A.go())}),S(Y,e=>{(e==null?void 0:e.error)==="You don't have permission to access this resource"&&(s.remove("login_pin_token"),s.remove("settings_pin_token"),e=null,A.go())}),S(q,e=>{e!=null&&e.user.avatar?t.value[n.value].avatarUrl=`${e.avatarPath}/${e.user.avatar}`:t.value[n.value].avatarUrl=`${k}`,localStorage.setItem("accounts",JSON.stringify(t.value))}),ke(async()=>{{t.value=JSON.parse(localStorage.getItem("accounts")).filter(a=>a.token);const e=window.location.pathname.split("/");isNaN(+e[e.length-1])||(m.value=e[e.length-1],n.value=null)}!m.value&&s.get("currentAccountID")?n.value=+s.get("currentAccountID"):m.value||(n.value=0),s.get("login_pin_token")&&(C.value?X(C.value):d.getProfile(),I.value?M(I.value):await d.getWorkSpaces()),window.addEventListener("resize",ee),window.innerWidth<800&&(x.value=!1,w.value=68)});const z=()=>{D.value="hovered"},B=()=>{D.value=!1},ee=()=>{window.innerWidth<800&&(x.value=!1,w.value=68),K.update()},U=async(e,a)=>{if(m.value=-1,n.value=e,s.set("currentAccountID",e),t.value[e].token===s.get("token")){g("/");return}if(d.$reset(),P.$reset(),J.$reset(),L.$reset(),(Date.parse(t.value[e].token_expires)-Date.now())/864e5<0){t.value.splice(e,1),localStorage.setItem("accounts",JSON.stringify(t.value)),t.value[0]?U(0):(Object.keys(s.get()).forEach(function(r){s.remove(r,neededAttributes)}),A.go());return}s.set("token",t.value[e].token,{expires:(Date.parse(t.value[e].token_expires)-Date.now())/864e5}),s.set("first_login",t.value[e].first_login),t.value[e].settings_pin_token&&s.set("settings_pin_token",t.value[e].settings_pin_token),t.value[e].login_pin_token&&s.set("login_pin_token",t.value[e].login_pin_token,{expires:(Date.parse(t.value[e].login_pin_token_expires)-new Date)/864e5}),localStorage.setItem("accounts",JSON.stringify(t.value)),t.value[e].first_login===!0?g("/pin"):E.path==="/pin"&&g("/"),d.getProfile(),await d.getWorkSpaces(),a||g("/")},te=async(e,a)=>{n.value=a,await U(a),n.value=-1,m.value=e,ae(e)},ae=e=>{g(`/workspace/staff/${e}`)},se=()=>{s.set("currentAccountID",t.value.length),s.set("addAccount",!0),window.open("/login","_blank")},oe=async e=>{t.value.forEach((l,N)=>l.ID=N),U(e),await Z("logout",{method:"post"});const a=t.value.map(l=>(l.ID===e&&(l.token=null,l.token_expires=null,l.first_login=null,l.settings_pin_token=null),l));d.$reset(),P.$reset(),J.$reset(),L.$reset();const r=a.findIndex(l=>l.token);a[r]?Date.parse(a[r].token_expires)-Date.now()>0?(s.set("token",a[r].token,{expires:(Date.parse(a[r].token_expires)-Date.now())/864e5}),a[r].first_login===!0&&s.set("first_login",a[r].first_login),a[r].settings_pin_token&&s.set("settings_pin_token",a[r].settings_pin_token),a[r].login_pin_token&&s.set("login_pin_token",a[r].login_pin_token,{expires:(Date.parse(a[r].login_pin_token_expires)-new Date)/864e5}),s.set("currentAccountID",r),d.getProfile(),await d.getWorkSpaces(),t.value=a,localStorage.setItem("accounts",JSON.stringify(a)),A.go()):a.shift():(s.remove("token"),s.remove("first_login"),s.remove("settings_pin_token"),s.remove("login_pin_token"),localStorage.setItem("accounts",JSON.stringify(a)),t.value=a,g("/login"))},F=(e,a)=>{switch(e){case"u":return a===n.value?"currentUser":!1;default:return a===+m.value?"currentWorkspace":!1}},ne=we(()=>t.value.reduce((e,a)=>(a.token&&e.push(a),e),[])),re=e=>{e.target.parentNode.style.cursor="e-resize",window.addEventListener("mousemove",T,!1),window.addEventListener("mouseup",()=>{e.target.parentNode.style.cursor="auto",window.removeEventListener("mousemove",T,!1)},!1)},T=e=>{w.value=e.x-68,x.value=w.value>85};return(e,a)=>{const r=le,l=ie,N=ce,W=ue;return v(),f("nav",Ce,[o("div",Ie,[t.value?(v(),f("div",Ee,[(v(!0),f(O,null,j(ne.value,i=>{var V;return v(),f(O,{key:i.ID},[_(N,{class:b(["main__user-actions",{currentUser:F("u",i.ID),bordered:(V=i.workspaces)==null?void 0:V.length}])},{dropdown:c(()=>[_(l,null,{default:c(()=>[_(r,{class:"main__user-actions--add_element",onClick:h=>oe(i.ID)},{default:c(()=>[Le]),_:2},1032,["onClick"])]),_:2},1024)]),default:c(()=>[o("div",{class:"main__user-actions--user",onClick:h=>U(i.ID)},[Oe,o("img",{src:i.avatarUrl?i.avatarUrl:$(k),alt:"Avatar",class:"main__user-actions--avatar"},null,8,Pe),Je],8,We)]),_:2},1032,["class"]),(v(!0),f(O,null,j(i.workspaces,h=>(v(),f("div",{key:h.id,class:b(["main__user-workspaces",F("w",h.id)])},[Re,o("img",{src:i.avatarUrl?i.avatarUrl:$(k),alt:"Avatar",class:"main__user-workspaces--avatar",title:h.name,onClick:Ze=>te(h.id,i.ID)},null,8,Me)],2))),128))],64)}),128))])):H("",!0),o("div",ze,[_(N,{class:"main__user-actions-add"},{dropdown:c(()=>[_(l,{class:"main__user-actions--add_actions"},{default:c(()=>[_(r,{class:"main__user-actions--add_element"},{default:c(()=>[o("span",{class:b(D.value),onClick:se,onMouseover:z,onMouseout:B}," Add account ",34)]),_:1}),_(r,{class:"main__user-actions--add_element"},{default:c(()=>[o("span",{class:b(D.value),onClick:a[0]||(a[0]=i=>("navigateTo"in e?e.navigateTo:$(g))("/create-workspace")),onMouseover:z,onMouseout:B}," Add workspace ",34)]),_:1})]),_:1})]),default:c(()=>[Be]),_:1})])]),$(E).path.includes("workspace")||$(E).fullPath=="/"?(v(),f("div",{key:0,class:b(["chats",x.value?"large":"small"]),style:Se({width:w.value+"px"})},[o("div",Fe,[_(W,{class:"chats__search"},{default:c(()=>[Te,Ve]),_:1}),_(W,{class:"chats__create"},{default:c(()=>[je,He]),_:1}),_(W,{class:"chats__saved"},{default:c(()=>[Ye,qe]),_:1})]),o("div",{class:"cursorbefore",onMousedown:re},null,32)],6)):H("",!0)])}}},rt=Ae(Ge,[["__scopeId","data-v-751c42fe"]]);export{rt as default};
