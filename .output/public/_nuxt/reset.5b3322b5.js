import{E as O,_ as F,a as J,b as K}from"./el-overlay.6ca4e62b.js";import"./el-button.e243c5d4.js";import"./el-form-item.4ed993c7.js";import{E as Q,s as X,H as Y,r as c,e as N,f as P,w as L,h as d,p as i,i as v,j as u,u as o,k as ss,c as T,l as p,m as os,o as l,G as b,x as es,y as rs,v as ts}from"./entry.a509592d.js";import{_ as q}from"./lock-icon.1e084bec.js";import{_ as as,a as ns}from"./good.d6317ff5.js";import{L as is}from"./LoginButtons.6907801a.js";import{E as V}from"./ErrorMassageModal.1c89c491.js";import{h as I,s as z}from"./eye-close-icon.545039e0.js";import{_ as ls}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.14e866f0.js";import"./chevron-icon.91af5d67.js";const w=h=>(es("data-v-78fe5c0d"),h=h(),rs(),h),ds={class:"main"},us={class:"main__form"},ps=w(()=>i("div",{class:"main__form--title"},"Reset password",-1)),ms=w(()=>i("div",{class:"main__form--subtitle"},"Please fill the forms to reset password",-1)),_s=w(()=>i("img",{src:q,alt:"password_icon"},null,-1)),ws=w(()=>i("span",{for:"password",class:"custom_placeholder"}," Password ",-1)),fs=[ws],cs=["src"],vs={key:0,src:as,alt:""},gs={key:1,src:ns,alt:""},hs={key:2,src:F,alt:""},ys=["innerHTML"],ks={key:0,class:"el-form-item__error"},Ss=["innerHTML"],xs=w(()=>i("div",null,null,-1)),bs=w(()=>i("img",{src:q,alt:"password_icon"},null,-1)),$s=w(()=>i("span",{for:"password_confirmation",class:"custom_placeholder"}," Confirm Password ",-1)),Ms=[$s],Es=["src"],Cs={key:0,class:"el-form-item__error"},Ps=["innerHTML"],Ls=w(()=>i("div",null,null,-1)),Ts={__name:"reset",setup(h){const $=Q(),{resetSuccessData:A,resetErrorData:B,resetLoading:H}=X($),g=os(),M=Y(),E=c(!1),R=(r,s,n)=>{s||n(new Error("This field is required"));const _=D(s);_==="Weak"?(n(new Error("Password strength: <b>Weak</b>")),e.value.password.status="Weak"):_==="Medium"?(n(),e.value.password.status="Medium",e.value.password.value="Password strength: <b>Medium</b>"):_==="Strong"&&(n(),e.value.password.status="Strong",e.value.password.value="Password strength: <b>Strong</b>")},W=(r,s,n)=>{s===""?n(new Error("Please input the password again")):s!==a.value.password?n(new Error("Password and confirm password do not match")):n()},a=c({password:null,password_confirmation:null,pinToken:null,email:null}),y=c(!1),k=c(!1),Z=c({password:[{validator:R,trigger:"input"}],password_confirmation:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:W,trigger:"blur"}]}),e=c({password:{value:"",status:null,isShow:!1},password_confirmation:{value:"",isShow:!1}});N(()=>{for(a.value.pinToken=M.query.token,a.value.email=M.query.email;P.get("token");)P.remove("token");window.addEventListener("resize",j)});const C=r=>{g.refs[r].focus()},x=r=>{g.refs.resetForm.validateField(r,(s,n)=>{s?r!=="password"&&(e.value[r].value=""):e.value[r].value=n[r][0].message}),Object.values(a.value).every(s=>s)&&g.refs.resetForm.validate(s=>E.value=s)},f=(r,s)=>{m()?e.value[r].isShow=s==="mouseover":s==="click"&&(e.value[r].isShow=!0)},j=()=>{g.update()},m=()=>window.innerWidth>990,D=r=>{const s=/^(?=.*[a-zA-Z])(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,n=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{12,}$/,_=/^(?:(.)(?!\1{3}))*$/,S=["password","admin","qwerty","asdfgh","xzcvb"];if(_.test(r)&&((r==null?void 0:r.length)>15||!S.some(t=>r.toLowerCase().includes(t)))){if(n.test(r)&&((r==null?void 0:r.length)>25||!S.some(t=>r.toLowerCase().includes(t))))return"Strong";if(s.test(r))return"Medium"}return"Weak"},U=()=>{switch(e.value.password.status){case"Medium":return"warning";case"Strong":return"done";default:return""}};L(A,r=>{r&&(a.value.password=null,a.value.password_confirmation=null,ts("/login"))}),L(B,r=>{});const G=()=>{g.refs.resetForm.validate(r=>{if(r)$.resetPassword(a._value);else return e.value.global.value="Please fill empty areas",!1})};return(r,s)=>{const n=J,_=K,S=O;return l(),d("div",ds,[i("div",us,[ps,ms,v(S,{ref:"resetForm",class:"main__form--box","hide-required-asterisk":"",model:o(a),rules:o(Z),onSubmit:ss(G,["prevent"])},{default:u(()=>[v(_,{prop:"password",class:"form-item"},{error:u(()=>[!o(a).password&&o(e).password.isShow&&m()?(l(),d("div",ks,[i("span",{innerHTML:o(e).password.value},null,8,Ss)])):p("",!0),xs]),default:u(()=>[v(n,{ref:"password",modelValue:o(a).password,"onUpdate:modelValue":s[5]||(s[5]=t=>o(a).password=t),class:"main__form--box__input",placeholder:"Password",type:o(y)?"text":"password",onInput:s[6]||(s[6]=t=>x("password")),onBlur:s[7]||(s[7]=t=>x("password"))},{prefix:u(()=>[_s]),suffix:u(()=>[o(a).password?(l(),d("div",{key:0,style:{position:"relative"},onClick:s[0]||(s[0]=t=>C("password"))},fs)):p("",!0),i("img",{class:b(o(e).password.value?"eye_icon":""),src:o(y)?o(I):o(z),alt:"eye_icon",onClick:s[1]||(s[1]=t=>y.value=!o(y))},null,10,cs),o(e).password.value?(l(),d("div",{key:1,class:"error_icon",onMouseover:s[2]||(s[2]=t=>f("password","mouseover")),onMouseout:s[3]||(s[3]=t=>f("password","mouseout")),onClick:s[4]||(s[4]=t=>f("password","click"))},[o(e).password.status==="Medium"&&o(a).password?(l(),d("img",vs)):o(e).password.status==="Strong"&&o(a).password?(l(),d("img",gs)):(l(),d("img",hs))],32)):p("",!0),o(a).password&&o(e).password.isShow&&m()?(l(),d("div",{key:2,class:b([U(),"el-form-item__error strength"])},[i("span",{innerHTML:o(e).password.value},null,8,ys)],2)):p("",!0)]),_:1},8,["modelValue","type"])]),_:1}),v(_,{prop:"password_confirmation",class:"form-item"},{error:u(()=>[o(e).password_confirmation.isShow&&m()?(l(),d("div",Cs,[i("span",{innerHTML:o(e).password_confirmation.value},null,8,Ps)])):p("",!0),Ls]),default:u(()=>[v(n,{ref:"password_confirmation",modelValue:o(a).password_confirmation,"onUpdate:modelValue":s[13]||(s[13]=t=>o(a).password_confirmation=t),class:"main__form--box__input",placeholder:"Confirm password",type:o(k)?"text":"password",onBlur:s[14]||(s[14]=t=>x("password_confirmation"))},{prefix:u(()=>[bs]),suffix:u(()=>[o(a).password_confirmation?(l(),d("div",{key:0,style:{position:"relative"},onClick:s[8]||(s[8]=t=>C("password_confirmation"))},Ms)):p("",!0),i("img",{class:b(o(e).password_confirmation.value?"eye_icon":""),src:o(k)?o(I):o(z),alt:"eye_icon",onClick:s[9]||(s[9]=t=>k.value=!o(k))},null,10,Es),o(e).password_confirmation.value?(l(),d("img",{key:1,src:F,alt:"",class:"error_icon",onMouseover:s[10]||(s[10]=t=>f("password_confirmation","mouseover")),onMouseout:s[11]||(s[11]=t=>f("password_confirmation","mouseout")),onClick:s[12]||(s[12]=t=>f("password_confirmation","click"))},null,32)):p("",!0)]),_:1},8,["modelValue","type"])]),_:1}),v(is,{"login-title":"Next","is-valid":o(E),"show-social":!1,"login-loading":o(H)},null,8,["is-valid","login-loading"])]),_:1},8,["model","rules","onSubmit"])]),o(e).password.isShow&&!m()?(l(),T(V,{key:0,"dialog-visible":o(e).password.isShow&&!m(),"error-text":o(e).password.value,"text-color":o(e).password.status==="Medium"&&o(a).password?"warning":o(e).password.status==="Strong"&&o(a).password?"done":"weak",onVisible:s[15]||(s[15]=t=>o(e).password.isShow=!1)},null,8,["dialog-visible","error-text","text-color"])):p("",!0),o(e).password_confirmation.isShow&&!m()?(l(),T(V,{key:1,"dialog-visible":o(e).password_confirmation.isShow&&!m(),"error-text":o(e).password_confirmation.value,onVisible:s[16]||(s[16]=t=>o(e).password_confirmation.isShow=!1)},null,8,["dialog-visible","error-text"])):p("",!0)])}}},Ds=ls(Ts,[["__scopeId","data-v-78fe5c0d"]]);export{Ds as default};
