import{az as b,aA as C,E as B,$ as E,j as I}from"./el-button.efbddc4b.js";/* empty css                        *//* empty css                */import{z as y,s as j,r as h,H,w,q as _,e as z,G as N,bn as V,o as p,f as T,m as i,u as a,h as e,i as n,E as v,k as $,c as G,v as P,x as R}from"./entry.d5ce8ebf.js";import{_ as W}from"./_plugin-vue_export-helper.c27b6911.js";const f=d=>(P("data-v-5daab9d4"),d=d(),R(),d),q={class:"main"},A={class:"main__inner"},D={class:"main__left"},M={key:0,class:"main__button-group"},U=f(()=>i("span",null," Staff ",-1)),F=f(()=>i("span",null," Projects ",-1)),J=f(()=>i("span",null," Tasks ",-1)),K={class:"main__right"},L={__name:"Header",setup(d){const m=y(),{workspacesSuccessData:u}=j(m),k=h(null),t=H(),l=h(+t.params.id);return w(u,s=>{k.value=s}),w(l,()=>{_(`/workspace/staff/${l.value}`)}),z(async()=>{N.get("login_pin_token")&&(u.value?k.value=u.value:await m.getWorkSpaces())}),V(()=>{t.params.id&&(l.value=+t.params.id)}),(s,o)=>{const c=B,S=E,g=I;return p(),T("nav",q,[i("div",A,[i("div",D,[a(t).path.includes("/workspace")?(p(),T("div",M,[e(S,null,{default:n(()=>[e(c,{class:v({active:a(t).path.includes("/staff")}),onClick:o[0]||(o[0]=r=>("navigateTo"in s?s.navigateTo:a(_))(`/workspace/staff/${l.value}`))},{default:n(()=>[U]),_:1},8,["class"]),e(c,{class:v({active:a(t).path.includes("/projects")}),onClick:o[1]||(o[1]=r=>("navigateTo"in s?s.navigateTo:a(_))(`/workspace/projects/${l.value}`))},{default:n(()=>[F]),_:1},8,["class"]),e(c,{class:v({active:a(t).path.includes("/tasks")}),onClick:o[2]||(o[2]=r=>("navigateTo"in s?s.navigateTo:a(_))(`/workspace/tasks/${l.value}`))},{default:n(()=>[J]),_:1},8,["class"])]),_:1})])):$("",!0)]),i("div",K,[e(c,{class:"main__actions"},{default:n(()=>[e(g,null,{default:n(()=>[e(a(b))]),_:1})]),_:1}),a(t).path.includes("/pin")?$("",!0):(p(),G(c,{key:0,class:"main__actions",onClick:o[3]||(o[3]=r=>("navigateTo"in s?s.navigateTo:a(_))("/"))},{default:n(()=>[e(g,null,{default:n(()=>[e(a(C))]),_:1})]),_:1}))])])])}}},x=W(L,[["__scopeId","data-v-5daab9d4"]]);export{x as default};
