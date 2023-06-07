import{E as ie,a as ce,b as ue}from"./el-dropdown.514bac59.js";import{E as _e}from"./el-button.d70bea62.js";/* empty css                        */import"./el-popper.6e59a4e2.js";import"./el-scrollbar.a334b7e4.js";import{A as pe,D as de,G as ve,a as fe,s as ge,bY as me,r as g,b as he,H as ke,w as E,f as o,e as we,E as Se,o as m,h,i as n,F as P,q as H,j as _,k as c,u as w,B as b,m as V,y as d,P as De,C as Ie,p as be,v as $e,x as ye}from"./entry.5f1d1580.js";import{d as $}from"./default-user-icon.44f1b9ba.js";import{_ as xe}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.6fbf02b7.js";const Ae=""+new URL("search.5b3fea75.svg",import.meta.url).href,Ue=""+new URL("new-chat.d41c9453.svg",import.meta.url).href,Ne=""+new URL("saved-messages.dcdaa155.svg",import.meta.url).href;const u=y=>($e("data-v-a250089f"),y=y(),ye(),y),Ce={class:"main"},Ee={class:"users"},We={key:0,class:"main__top"},Oe=["onClick"],Pe=u(()=>n("div",{class:"current__user-selector"},null,-1)),Je=["src"],Le=u(()=>n("i",{class:"el-icon-caret-bottom"},null,-1)),Re=u(()=>n("span",null,"Logout",-1)),Me=u(()=>n("div",{class:"current__workspace-selector"},null,-1)),ze=["src","title","onClick"],Be={class:"main__bottom"},Fe=u(()=>n("div",{class:"main__user-actions--add_button"},[n("span",null,"+")],-1)),Te={class:"chats-header"},Ye=u(()=>n("img",{src:Ae,alt:"",class:"chats__button-img"},null,-1)),je=u(()=>n("span",{class:"chats__button-text"},"Search",-1)),He=u(()=>n("img",{src:Ue,alt:"",class:"chats__button-img"},null,-1)),Ve=u(()=>n("span",{class:"chats__button-text"},"Create new chat",-1)),qe=u(()=>n("img",{src:Ne,alt:"",class:"chats__button-img"},null,-1)),Ge=u(()=>n("span",{class:"chats__button-text"},"Saved messages",-1)),Ke={__name:"Sidebar",setup(y){const p=pe(),J=de(),L=ve(),R=fe(),{profileSuccessData:W,profileFailureData:q,editProfileData:G,editFailureData:K,workspacesSuccessData:O}=ge(p),{$myFetch:Q}=me(),M=Ie(),x=g(!1),X=be(),Z=g(null),A=he(),U=g(!1),t=g(!1),S=ke(),s=g(null),v=g(!1),D=g(68),ee=e=>{Z.value=e,e!=null&&e.user.avatar&&t.value[s.value]?t.value[s.value].avatarUrl=`${M.public.env.serverUrl}${e.avatarPath}/${e.user.avatar}`:t.value[s.value]&&(t.value[s.value].avatarUrl=`${$}`),localStorage.setItem("accounts",JSON.stringify(t.value))},z=e=>{t.value=JSON.parse(localStorage.getItem("accounts")),t.value[s.value]&&(t.value[s.value].workspaces=[...e==null?void 0:e.myWorkspaces,...e==null?void 0:e.inviteWorkspaces]),localStorage.setItem("accounts",JSON.stringify(t.value))};E(W,e=>{s.value=+o.get("currentAccountID"),e!=null&&e.user.avatar&&s.value>=0?t.value[s.value].avatarUrl=`${M.public.env.serverUrl}${e.avatarPath}/${e.user.avatar}`:s.value>=0&&(t.value[s.value].avatarUrl=`${$}`),localStorage.setItem("accounts",JSON.stringify(t.value))}),E(K,e=>{(e==null?void 0:e.error)==="You don't have permission to access this resource"&&(o.remove("login_pin_token"),o.remove("settings_pin_token"),e=null,A.go())}),E(q,e=>{(e==null?void 0:e.error)==="You don't have permission to access this resource"&&(o.remove("login_pin_token"),o.remove("settings_pin_token"),e=null,A.go())}),E(G,e=>{e!=null&&e.user.avatar?t.value[s.value].avatarUrl=`${e.avatarPath}/${e.user.avatar}`:t.value[s.value].avatarUrl=`${$}`,localStorage.setItem("accounts",JSON.stringify(t.value))}),we(async()=>{{t.value=JSON.parse(localStorage.getItem("accounts")).filter(a=>a.token);const e=window.location.pathname.split("/");isNaN(+e[e.length-1])||(v.value=e[e.length-1],s.value=null)}!v.value&&o.get("currentAccountID")?s.value=+o.get("currentAccountID"):v.value||(s.value=0),o.get("login_pin_token")&&(W.value?ee(W.value):p.getProfile(),O.value||await p.getWorkSpaces(),z(O.value)),window.addEventListener("resize",te),window.innerWidth<800&&(x.value=!1,D.value=68)});const B=()=>{U.value="hovered"},F=()=>{U.value=!1},te=()=>{window.innerWidth<800&&(x.value=!1,D.value=68),X.update()},N=async(e,a,...r)=>{if(v.value="",s.value=t.value.findIndex(l=>l.email===e),o.set("currentAccountID",s.value),t.value[s.value].token===o.get("token")){d("/");return}if(p.$reset(),J.$reset(),L.$reset(),R.$reset(),(Date.parse(t.value[s.value].token_expires)-Date.now())/864e5<0){t.value.splice(s.value,1),localStorage.setItem("accounts",JSON.stringify(t.value)),t.value[0]?N(0):(Object.keys(o.get()).forEach(function(l){o.remove(l,neededAttributes)}),A.go());return}o.set("token",t.value[s.value].token,{expires:(Date.parse(t.value[s.value].token_expires)-Date.now())/864e5}),o.set("remember_token",t.value[s.value].remember_token),o.set("first_login",t.value[s.value].first_login),t.value[s.value].settings_pin_token?o.set("settings_pin_token",t.value[s.value].settings_pin_token):o.remove("settings_pin_token"),t.value[s.value].login_pin_token?o.set("login_pin_token",t.value[s.value].login_pin_token,{expires:(Date.parse(t.value[s.value].login_pin_token_expires)-new Date)/864e5}):o.remove("login_pin_token"),localStorage.setItem("accounts",JSON.stringify(t.value)),t.value[s.value].first_login===!0?d("/pin"):S.path==="/pin"&&d("/"),p.getProfile(),await p.getWorkSpaces(),a||d("/")},ae=async(e,a)=>{await N(a),s.value=-1,v.value=e,se(e)},se=e=>{e===+S.path.split("/").pop()?d(`/workspace/staff/${e}`):d(`/workspace/staff/${e}`)},oe=()=>{o.set("currentAccountID",t.value.length),o.set("addAccount",!0),window.open("/login","_blank")},ne=async e=>{t.value.forEach((l,f)=>l.ID=f),N(e),await Q("logout",{method:"post"});const a=t.value.map(l=>(l.ID===e&&(l.token=null,l.token_expires=null,l.first_login=null,l.settings_pin_token=null),l));p.$reset(),J.$reset(),L.$reset(),R.$reset();const r=a.findIndex(l=>l.token);a[r]?Date.parse(a[r].token_expires)-Date.now()>0?(o.set("token",a[r].token,{expires:(Date.parse(a[r].token_expires)-Date.now())/864e5}),a[r].first_login===!0&&o.set("first_login",a[r].first_login),a[r].settings_pin_token&&o.set("settings_pin_token",a[r].settings_pin_token),a[r].login_pin_token&&o.set("login_pin_token",a[r].login_pin_token,{expires:(Date.parse(a[r].login_pin_token_expires)-new Date)/864e5}),o.set("currentAccountID",r),p.getProfile(),a!=null&&a.workspaces[0]||await p.getWorkSpaces(),t.value=a,localStorage.setItem("accounts",JSON.stringify(a)),A.go()):a.shift():(o.remove("token"),o.remove("first_login"),o.remove("settings_pin_token"),o.remove("login_pin_token"),localStorage.setItem("accounts",JSON.stringify(a)),t.value=a,d("/login"))},T=(e,a,r)=>{const l=+o.get("currentAccountID"),f=C.value.findIndex(I=>I.ID===l);switch(e){case"u":return C.value[f].email===r&&!v.value?"currentUser":!1;default:return a===+v.value&&C.value[f].email===r?"currentWorkspace":!1}},C=Se(()=>t.value.reduce((e,a)=>(a.token&&e.push(a),e),[])),re=e=>{e.target.parentNode.style.cursor="e-resize",window.addEventListener("mousemove",Y,!1),window.addEventListener("mouseup",()=>{e.target.parentNode.style.cursor="auto",window.removeEventListener("mousemove",Y,!1)},!1)},Y=e=>{D.value=e.x-68,x.value=D.value>85};return(e,a)=>{const r=ie,l=ce,f=ue,I=_e;return m(),h("nav",Ce,[n("div",Ee,[t.value?(m(),h("div",We,[(m(!0),h(P,null,H(C.value,(i,le)=>{var j;return m(),h(P,{key:i.ID},[_(f,{class:b(["main__user-actions",{currentUser:T("u",le,i.email),bordered:(j=i.workspaces)==null?void 0:j.length}])},{dropdown:c(()=>[_(l,null,{default:c(()=>[_(r,{class:"main__user-actions--add_element",onClick:k=>ne(i.ID)},{default:c(()=>[Re]),_:2},1032,["onClick"])]),_:2},1024)]),default:c(()=>[n("div",{class:"main__user-actions--user",onClick:k=>N(i.email)},[Pe,n("img",{src:i.avatarUrl?i.avatarUrl:w($),alt:"Avatar",class:"main__user-actions--avatar"},null,8,Je),Le],8,Oe)]),_:2},1032,["class"]),(m(!0),h(P,null,H(i.workspaces,k=>(m(),h("div",{key:k.id,class:b(["main__user-workspaces",T("w",k.id,i.email)])},[Me,n("img",{src:i.avatarUrl?i.avatarUrl:w($),alt:"Avatar",class:"main__user-workspaces--avatar",title:k.name,onClick:Qe=>ae(k.id,i.email)},null,8,ze)],2))),128))],64)}),128))])):V("",!0),n("div",Be,[_(f,{class:"main__user-actions-add"},{dropdown:c(()=>[_(l,{class:"main__user-actions--add_actions"},{default:c(()=>[_(r,{class:"main__user-actions--add_element"},{default:c(()=>[n("span",{class:b(U.value),onClick:oe,onMouseover:B,onMouseout:F}," Add account ",34)]),_:1}),_(r,{class:"main__user-actions--add_element"},{default:c(()=>[n("span",{class:b(U.value),onClick:a[0]||(a[0]=i=>("navigateTo"in e?e.navigateTo:w(d))("/profile/choose-account")),onMouseover:B,onMouseout:F}," Add workspace ",34)]),_:1})]),_:1})]),default:c(()=>[Fe]),_:1})])]),w(S).path.includes("workspace")&&!w(S).path.includes("create-workspace")||w(S).fullPath=="/"?(m(),h("div",{key:0,class:b(["chats",x.value?"large":"small"]),style:De({width:D.value+"px"})},[n("div",Te,[_(I,{class:"chats__search"},{default:c(()=>[Ye,je]),_:1}),_(I,{class:"chats__create"},{default:c(()=>[He,Ve]),_:1}),_(I,{class:"chats__saved"},{default:c(()=>[qe,Ge]),_:1})]),n("div",{class:"cursorbefore",onMousedown:re},null,32)],6)):V("",!0)])}}},lt=xe(Ke,[["__scopeId","data-v-a250089f"]]);export{lt as default};
