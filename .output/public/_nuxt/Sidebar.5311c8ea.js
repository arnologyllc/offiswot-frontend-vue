import{E as ie,a as ce,b as ue}from"./el-dropdown.0e1579b1.js";import{E as _e}from"./el-button.a59501ca.js";/* empty css                        */import"./el-popper.38382e49.js";import"./el-scrollbar.91546cb9.js";import{A as pe,D as ve,G as de,a as fe,s as ge,bY as me,r as f,b as he,H as ke,w as C,f as o,e as we,E as Se,o as g,h as m,i as n,F as P,q as H,j as _,k as c,u as w,B as I,m as V,y as v,P as be,C as De,p as Ie,v as $e,x as ye}from"./entry.893479c5.js";import{d as $}from"./default-user-icon.caf5890c.js";import{_ as xe}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.57815629.js";const Ae=""+new URL("search.5b3fea75.svg",import.meta.url).href,Ue=""+new URL("new-chat.d41c9453.svg",import.meta.url).href,Ne=""+new URL("saved-messages.dcdaa155.svg",import.meta.url).href;const u=y=>($e("data-v-02bb208b"),y=y(),ye(),y),Ce={class:"main"},Ee={class:"users"},We={key:0,class:"main__top"},Oe=["onClick"],Pe=u(()=>n("div",{class:"current__user-selector"},null,-1)),Je=["src"],Le=u(()=>n("i",{class:"el-icon-caret-bottom"},null,-1)),Re=u(()=>n("span",null,"Logout",-1)),Me=u(()=>n("div",{class:"current__workspace-selector"},null,-1)),ze=["src","title","onClick"],Be={class:"main__bottom"},Fe=u(()=>n("div",{class:"main__user-actions--add_button"},[n("span",null,"+")],-1)),Te={class:"chats-header"},Ye=u(()=>n("img",{src:Ae,alt:"",class:"chats__button-img"},null,-1)),je=u(()=>n("span",{class:"chats__button-text"},"Search",-1)),He=u(()=>n("img",{src:Ue,alt:"",class:"chats__button-img"},null,-1)),Ve=u(()=>n("span",{class:"chats__button-text"},"Create new chat",-1)),qe=u(()=>n("img",{src:Ne,alt:"",class:"chats__button-img"},null,-1)),Ge=u(()=>n("span",{class:"chats__button-text"},"Saved messages",-1)),Ke={__name:"Sidebar",setup(y){const p=pe(),J=ve(),L=de(),R=fe(),{profileSuccessData:E,profileFailureData:q,editProfileData:G,editFailureData:K,workspacesSuccessData:W}=ge(p),{$myFetch:Q}=me(),M=De(),x=f(!1),X=Ie(),Z=f(null),A=he(),U=f(!1),t=f(!1),S=ke(),s=f(null),d=f(!1),b=f(68),ee=e=>{Z.value=e,e!=null&&e.user.avatar&&t.value[s.value]?t.value[s.value].avatarUrl=`${M.public.env.serverUrl}${e.avatarPath}/${e.user.avatar}`:t.value[s.value]&&(t.value[s.value].avatarUrl=`${$}`),localStorage.setItem("accounts",JSON.stringify(t.value))},z=e=>{t.value=JSON.parse(localStorage.getItem("accounts")),t.value[s.value]&&(t.value[s.value].workspaces=[...e==null?void 0:e.myWorkspaces,...e==null?void 0:e.inviteWorkspaces]),localStorage.setItem("accounts",JSON.stringify(t.value))};C(E,e=>{s.value=+o.get("currentAccountID"),e!=null&&e.user.avatar&&s.value>=0?t.value[s.value].avatarUrl=`${M.public.env.serverUrl}${e.avatarPath}/${e.user.avatar}`:s.value>=0&&(t.value[s.value].avatarUrl=`${$}`),localStorage.setItem("accounts",JSON.stringify(t.value))}),C(K,e=>{(e==null?void 0:e.error)==="You don't have permission to access this resource"&&(o.remove("login_pin_token"),o.remove("settings_pin_token"),e=null,A.go())}),C(q,e=>{(e==null?void 0:e.error)==="You don't have permission to access this resource"&&(o.remove("login_pin_token"),o.remove("settings_pin_token"),e=null,A.go())}),C(G,e=>{e!=null&&e.user.avatar?t.value[s.value].avatarUrl=`${e.avatarPath}/${e.user.avatar}`:t.value[s.value].avatarUrl=`${$}`,localStorage.setItem("accounts",JSON.stringify(t.value))}),we(async()=>{{t.value=JSON.parse(localStorage.getItem("accounts")).filter(a=>a.token);const e=window.location.pathname.split("/");isNaN(+e[e.length-1])||(d.value=e[e.length-1],s.value=null)}!d.value&&o.get("currentAccountID")?s.value=+o.get("currentAccountID"):d.value||(s.value=0),o.get("login_pin_token")&&(E.value?ee(E.value):p.getProfile(),W.value||await p.getWorkSpaces(),z(W.value)),window.addEventListener("resize",te),window.innerWidth<800&&(x.value=!1,b.value=68)});const B=()=>{U.value="hovered"},F=()=>{U.value=!1},te=()=>{window.innerWidth<800&&(x.value=!1,b.value=68),X.update()},N=async(e,a,...r)=>{if(d.value="",s.value=t.value.findIndex(l=>l.email===e),o.set("currentAccountID",s.value),t.value[s.value].token===o.get("token")){v("/");return}if(p.$reset(),J.$reset(),L.$reset(),R.$reset(),(Date.parse(t.value[s.value].token_expires)-Date.now())/864e5<0){t.value.splice(s.value,1),localStorage.setItem("accounts",JSON.stringify(t.value)),t.value[0]?N(0):(Object.keys(o.get()).forEach(function(l){o.remove(l,neededAttributes)}),A.go());return}o.set("token",t.value[s.value].token,{expires:(Date.parse(t.value[s.value].token_expires)-Date.now())/864e5}),o.set("remember_token",t.value[s.value].remember_token),o.set("first_login",t.value[s.value].first_login),t.value[s.value].settings_pin_token?o.set("settings_pin_token",t.value[s.value].settings_pin_token):o.remove("settings_pin_token"),t.value[s.value].login_pin_token?o.set("login_pin_token",t.value[s.value].login_pin_token,{expires:(Date.parse(t.value[s.value].login_pin_token_expires)-new Date)/864e5}):o.remove("login_pin_token"),localStorage.setItem("accounts",JSON.stringify(t.value)),t.value[s.value].first_login===!0?v("/pin"):S.path==="/pin"&&v("/"),p.getProfile(),await p.getWorkSpaces(),a||v("/")},ae=async(e,a)=>{await N(a),s.value=-1,d.value=e,se(e)},se=e=>{e===+S.path.split("/").pop()?v(`/workspace/staff/${e}`):v(`/workspace/staff/${e}`)},oe=()=>{o.set("currentAccountID",t.value.length),o.set("addAccount",!0),window.open("/login","_blank")},ne=async e=>{t.value.forEach((l,h)=>l.ID=h),N(e),await Q("logout",{method:"post"});const a=t.value.map(l=>(l.ID===e&&(l.token=null,l.token_expires=null,l.first_login=null,l.settings_pin_token=null),l));p.$reset(),J.$reset(),L.$reset(),R.$reset();const r=a.findIndex(l=>l.token);a[r]?Date.parse(a[r].token_expires)-Date.now()>0?(o.set("token",a[r].token,{expires:(Date.parse(a[r].token_expires)-Date.now())/864e5}),a[r].first_login===!0&&o.set("first_login",a[r].first_login),a[r].settings_pin_token&&o.set("settings_pin_token",a[r].settings_pin_token),a[r].login_pin_token&&o.set("login_pin_token",a[r].login_pin_token,{expires:(Date.parse(a[r].login_pin_token_expires)-new Date)/864e5}),o.set("currentAccountID",r),p.getProfile(),a!=null&&a.workspaces[0]||await p.getWorkSpaces(),t.value=a,localStorage.setItem("accounts",JSON.stringify(a)),A.go()):a.shift():(o.remove("token"),o.remove("first_login"),o.remove("settings_pin_token"),o.remove("login_pin_token"),localStorage.setItem("accounts",JSON.stringify(a)),t.value=a,v("/login"))},T=(e,a,r)=>{const l=+o.get("currentAccountID"),h=O.value.findIndex(D=>D.ID===l);switch(e){case"u":return a===+s.value&&!d.value?"currentUser":!1;default:return a===+d.value&&O.value[h].email===r?"currentWorkspace":!1}},O=Se(()=>t.value.reduce((e,a)=>(a.token&&e.push(a),e),[])),re=e=>{e.target.parentNode.style.cursor="e-resize",window.addEventListener("mousemove",Y,!1),window.addEventListener("mouseup",()=>{e.target.parentNode.style.cursor="auto",window.removeEventListener("mousemove",Y,!1)},!1)},Y=e=>{b.value=e.x-68,x.value=b.value>85};return(e,a)=>{const r=ie,l=ce,h=ue,D=_e;return g(),m("nav",Ce,[n("div",Ee,[t.value?(g(),m("div",We,[(g(!0),m(P,null,H(O.value,(i,le)=>{var j;return g(),m(P,{key:i.ID},[_(h,{class:I(["main__user-actions",{currentUser:T("u",le),bordered:(j=i.workspaces)==null?void 0:j.length}])},{dropdown:c(()=>[_(l,null,{default:c(()=>[_(r,{class:"main__user-actions--add_element",onClick:k=>ne(i.ID)},{default:c(()=>[Re]),_:2},1032,["onClick"])]),_:2},1024)]),default:c(()=>[n("div",{class:"main__user-actions--user",onClick:k=>N(i.email)},[Pe,n("img",{src:i.avatarUrl?i.avatarUrl:w($),alt:"Avatar",class:"main__user-actions--avatar"},null,8,Je),Le],8,Oe)]),_:2},1032,["class"]),(g(!0),m(P,null,H(i.workspaces,k=>(g(),m("div",{key:k.id,class:I(["main__user-workspaces",T("w",k.id,i.email)])},[Me,n("img",{src:i.avatarUrl?i.avatarUrl:w($),alt:"Avatar",class:"main__user-workspaces--avatar",title:k.name,onClick:Qe=>ae(k.id,i.email)},null,8,ze)],2))),128))],64)}),128))])):V("",!0),n("div",Be,[_(h,{class:"main__user-actions-add"},{dropdown:c(()=>[_(l,{class:"main__user-actions--add_actions"},{default:c(()=>[_(r,{class:"main__user-actions--add_element"},{default:c(()=>[n("span",{class:I(U.value),onClick:oe,onMouseover:B,onMouseout:F}," Add account ",34)]),_:1}),_(r,{class:"main__user-actions--add_element"},{default:c(()=>[n("span",{class:I(U.value),onClick:a[0]||(a[0]=i=>("navigateTo"in e?e.navigateTo:w(v))("/profile/choose-account")),onMouseover:B,onMouseout:F}," Add workspace ",34)]),_:1})]),_:1})]),default:c(()=>[Fe]),_:1})])]),w(S).path.includes("workspace")&&!w(S).path.includes("create-workspace")||w(S).fullPath=="/"?(g(),m("div",{key:0,class:I(["chats",x.value?"large":"small"]),style:be({width:b.value+"px"})},[n("div",Te,[_(D,{class:"chats__search"},{default:c(()=>[Ye,je]),_:1}),_(D,{class:"chats__create"},{default:c(()=>[He,Ve]),_:1}),_(D,{class:"chats__saved"},{default:c(()=>[qe,Ge]),_:1})]),n("div",{class:"cursorbefore",onMousedown:re},null,32)],6)):V("",!0)])}}},lt=xe(Ke,[["__scopeId","data-v-02bb208b"]]);export{lt as default};