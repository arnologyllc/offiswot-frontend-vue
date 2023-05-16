import{E as G}from"./el-input.7fd03793.js";import{E as O,_ as b,a as X}from"./el-overlay.64de5399.js";import"./el-button.6d07ff3a.js";import"./el-form-item.4ed993c7.js";import{z as J,s as K,r as w,e as Q,w as L,f as u,m as i,h as v,i as d,u as s,j as N,c as y,k as m,l as ee,o as a,t as q,A as P,x as se,y as oe,q as re}from"./entry.1c65c56b.js";import{_ as te}from"./email-icon.c4998d4e.js";import{_ as ie,a as ne}from"./OvConfirmEmailModal.662adde1.js";import{_ as B,a as ae}from"./good.bc837e5d.js";import{_ as A}from"./lock-icon.b44fcfe9.js";import{L as le}from"./LoginButtons.107bf4a0.js";import{E as T}from"./ErrorMassageModal.180b4dfd.js";import{h as U,s as z}from"./eye-close-icon.f5ebd9e6.js";import{_ as ue}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.cf142168.js";import"./refs.6073550b.js";import"./email-primary-icon.754ea29f.js";import"./chevron-icon.1bc5d74d.js";const p=h=>(se("data-v-e0a54351"),h=h(),oe(),h),me={class:"main"},de={class:"main__form"},pe=p(()=>i("div",{class:"main__form--title"},"Register",-1)),_e=p(()=>i("div",{class:"main__form--subtitle"},"Please fill the forms to register",-1)),fe={key:0,class:"el-form-item__global-error-container"},ve={class:"el-form-item__global-error"},ge=p(()=>i("img",{src:b,alt:""},null,-1)),we=p(()=>i("img",{src:te,alt:"email_icon"},null,-1)),ce=p(()=>i("span",{for:"email",class:"custom_placeholder"}," Email ",-1)),ye=[ce],be={key:0,class:"el-form-item__error"},he=p(()=>i("div",null,null,-1)),Se=p(()=>i("img",{src:ne,alt:"user_icon"},null,-1)),xe={key:0,src:B,alt:""},ke={key:1,src:b,alt:""},$e={key:2,class:"el-form-item__error strength warning"},Me=["innerHTML"],Ee=p(()=>i("div",null,null,-1)),Ce={key:0,class:"el-form-item__error"},Ve=["innerHTML"],Pe=p(()=>i("div",null,null,-1)),Te=p(()=>i("img",{src:A,alt:"password_icon"},null,-1)),Ie=p(()=>i("span",{for:"password",class:"custom_placeholder"}," Password ",-1)),Le=[Ie],qe=["src"],Ue={key:0,src:B,alt:""},ze={key:1,src:ae,alt:""},Be={key:2,src:b,alt:""},Ae=["innerHTML"],Fe=p(()=>i("div",null,null,-1)),He=p(()=>i("img",{src:A,alt:"password_icon"},null,-1)),Re=p(()=>i("span",{for:"password_confirmation",class:"custom_placeholder"}," Confirm Password ",-1)),We=[Re],Ze=["src"],De={key:0,class:"el-form-item__error"},Ye=["innerHTML"],je=p(()=>i("div",null,null,-1)),Ge=p(()=>i("div",{class:"terms"},[i("span",null,[re("By signing up you agree on our "),i("u",null,"Term and Conditions")])],-1)),Oe={__name:"register",setup(h){const I=J(),{registerFailureData:F,registerSuccessData:H}=K(I),S=ee(),x=w(!1),k=w(!1),c=w(!1),l=w({email:null,username:null,password:null,password_confirmation:null}),o=w({email:{value:"",isShow:!1},username:{value:"",status:null,isShow:!1},password:{value:"",status:null,isShow:!1},password_confirmation:{value:"",isShow:!1},global:{value:null}}),R=w({email:[{required:!0,message:"This field is required.",trigger:"blur"},{type:"email",message:"Email is not valid.",trigger:"blur"}],username:[{required:!0,message:"This field is required.",trigger:"blur"},{min:3,message:`Username is improperly formatted.<br />
                      <span class="error_info">Your username must be at least 3 characters long.</span>
                      `,trigger:"blur"},{validator:(r,e,n)=>{/^[A-Za-z0-9_.]*$/g.test(e)?n():n(new Error(`<span>Username is improperly formatted.<br></span>
            <ul class="error_info">
              <li>Your handle can't exceed 30 characters. </li>
              <li>It can only contain letters, numbers, underscores and dots. </li>
              <li>It can't contain symbols or punctuation marks. </li>
              <li>It needs to be unique.</li>
            </ul>`))},trigger:"blur"},{validator:(r,e,n)=>{(e==null?void 0:e.length)===30?(o.value.username.value="Your handle can't exceed 30 characters.",o.value.username.status="Medium",n()):(e==null?void 0:e.length)>0&&(e==null?void 0:e.length)<30?(o.value.username.value="",o.value.username.status=null,n()):(o.value.username.value="This field is required",o.value.username.status=null,n(new Error("This field is required")))},trigger:"change"}],password:[{validator:(r,e,n)=>{e||n(new Error("This field is required"));const f=Y(e);f==="Weak"?(n(new Error("Password strength: <b>Weak</b>")),o.value.password.status="Weak"):f==="Medium"?(n(),o.value.password.status="Medium",o.value.password.value="Password strength: <b>Medium</b>"):f==="Strong"&&(n(),o.value.password.status="Strong",o.value.password.value="Password strength: <b>Strong</b>")},trigger:"input"}],password_confirmation:[{required:!0,message:"This field is required.",trigger:"blur"},{validator:(r,e,n)=>{e===""?n(new Error("Please input the password again")):e!==l.value.password?n(new Error("Password and confirm password do not match")):n()},trigger:"blur"}]});Q(()=>{window.addEventListener("resize",Z)});const W=()=>{S.refs.registerForm.validate(r=>{if(r)I.registerUser(l.value);else return o.value.global.value="Please fill empty areas",!1})},$=r=>{S.refs[r].focus()},g=r=>{S.refs.registerForm.validateField(r,(e,n)=>{(o.value[r].status!=="Medium"&&r==="username"||r!=="username")&&(e?r!=="password"&&(o.value[r].value=""):o.value[r].value=n[r][0].message)})},M=r=>{o.value[r].isShow=!0},E=r=>{_()&&(o.value[r].isShow=!0)},C=r=>{_()&&(o.value[r].isShow=!1)},Z=()=>{S.update()},_=()=>window.innerWidth>990,D=()=>{o.value.global.value=""},Y=r=>{const e=/^(?=.*[a-zA-Z])(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,n=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{12,}$/,f=/^(?:(.)(?!\1{3}))*$/,V=["password","admin","qwerty","asdfgh","xzcvb"];if(f.test(r)&&((r==null?void 0:r.length)>15||!V.some(t=>r==null?void 0:r.toLowerCase().includes(t)))){if(n.test(r)&&((r==null?void 0:r.length)>25||!V.some(t=>r.toLowerCase().includes(t))))return"Strong";if(e.test(r))return"Medium"}return"Weak"},j=()=>o.value.password.status==="Medium"?"warning":o.value.password.status==="Strong"?"done":"";return L(H,r=>{c.value=!0}),L(F,r=>{if(r==="Account exists, please login."&&(o.value.global.value=r),r==="Email already exists but is not verified."&&(c.value=!0),typeof r!="string")for(const e in r)if(typeof r[e]!="string")for(const n in r[e])o.value.global.value=r[e][n];else o.value.global.value=r[e];else o.value.global.value=r}),(r,e)=>{const n=G,f=X,V=O;return a(),u("div",me,[i("div",de,[pe,_e,v(V,{ref:"registerForm",class:"main__form--box","hide-required-asterisk":"",autocomplate:"new-password",model:s(l),rules:s(R),onSubmit:N(W,["prevent"])},{default:d(()=>[s(o).global.value?(a(),u("div",fe,[i("div",ve,[ge,i("span",null,q(s(o).global.value),1)]),i("span",{class:"clear-error",onClick:D},"X")])):m("",!0),v(f,{prop:"email",class:"form-item"},{error:d(()=>[s(o).email.isShow&&_()?(a(),u("div",be,[i("span",null,q(s(o).email.value),1)])):m("",!0),he]),default:d(()=>[v(n,{ref:"email",modelValue:s(l).email,"onUpdate:modelValue":e[4]||(e[4]=t=>s(l).email=t),class:"main__form--box__input",placeholder:"E-mail",onInput:e[5]||(e[5]=t=>g("email")),onBlur:e[6]||(e[6]=t=>g("email"))},{prefix:d(()=>[we]),suffix:d(()=>[s(l).email?(a(),u("div",{key:0,style:{position:"relative"},onClick:e[0]||(e[0]=t=>$("email"))},ye)):m("",!0),s(o).email.value?(a(),u("img",{key:1,class:"error_icon",src:b,alt:"",onMouseover:e[1]||(e[1]=t=>E("email")),onMouseout:e[2]||(e[2]=t=>C("email")),onClick:e[3]||(e[3]=t=>M("email"))},null,32)):m("",!0)]),_:1},8,["modelValue"])]),_:1}),v(f,{prop:"username",class:"form-item"},{error:d(()=>[s(o).username.isShow&&_()?(a(),u("div",Ce,[i("span",{innerHTML:s(o).username.value},null,8,Ve)])):m("",!0),Pe]),default:d(()=>[v(n,{ref:"username",modelValue:s(l).username,"onUpdate:modelValue":e[11]||(e[11]=t=>s(l).username=t),class:"main__form--box__input",placeholder:"Username",maxlength:"30",onInput:e[12]||(e[12]=t=>g("username")),onBlur:e[13]||(e[13]=t=>g("username"))},{prefix:d(()=>[Se]),suffix:d(()=>[s(l).username?(a(),u("div",{key:0,style:{position:"relative"},onClick:e[7]||(e[7]=t=>$("username"))},[i("span",{for:"username",class:P(["custom_placeholder",s(l).username?"active":""])}," Username ",2)])):m("",!0),s(o).username.value||s(o).username.status?(a(),u("div",{key:1,class:"error_icon",onMouseover:e[8]||(e[8]=t=>E("username")),onMouseout:e[9]||(e[9]=t=>C("username")),onClick:e[10]||(e[10]=t=>M("username"))},[s(o).username.status==="Medium"&&s(l).username?(a(),u("img",xe)):s(o).username.value?(a(),u("img",ke)):m("",!0)],32)):m("",!0),s(o).username.status==="Medium"&&s(o).username.isShow&&_()?(a(),u("div",$e,[i("span",{innerHTML:s(o).username.value},null,8,Me)])):m("",!0),Ee]),_:1},8,["modelValue"])]),_:1}),v(f,{prop:"password",class:"form-item"},{error:d(()=>[Fe]),default:d(()=>[v(n,{ref:"password",modelValue:s(l).password,"onUpdate:modelValue":e[19]||(e[19]=t=>s(l).password=t),class:"main__form--box__input",placeholder:"Password",type:s(x)?"text":"password",onInput:e[20]||(e[20]=t=>g("password")),onBlur:e[21]||(e[21]=t=>g("password"))},{prefix:d(()=>[Te]),suffix:d(()=>[s(l).password?(a(),u("div",{key:0,style:{position:"relative"},onClick:e[14]||(e[14]=t=>$("password"))},Le)):m("",!0),i("img",{class:P(s(o).password.value?"eye_icon":""),src:s(x)?s(U):s(z),alt:"eye_icon",onClick:e[15]||(e[15]=t=>x.value=!s(x))},null,10,qe),s(o).password.value?(a(),u("div",{key:1,class:"error_icon",onMouseover:e[16]||(e[16]=t=>E("password")),onMouseout:e[17]||(e[17]=t=>C("password")),onClick:e[18]||(e[18]=t=>M("password"))},[s(o).password.status==="Medium"&&s(l).password?(a(),u("img",Ue)):s(o).password.status==="Strong"&&s(l).password?(a(),u("img",ze)):(a(),u("img",Be))],32)):m("",!0)]),_:1},8,["modelValue","type"]),s(o).password.isShow&&_()?(a(),u("div",{key:0,class:P([j(),"el-form-item__error strength"])},[i("span",{innerHTML:s(o).password.value},null,8,Ae)],2)):m("",!0)]),_:1}),v(f,{prop:"password_confirmation",class:"form-item"},{error:d(()=>[s(o).password_confirmation.isShow&&_()?(a(),u("div",De,[i("span",{innerHTML:s(o).password_confirmation.value},null,8,Ye)])):m("",!0),je]),default:d(()=>[v(n,{ref:"password_confirmation",modelValue:s(l).password_confirmation,"onUpdate:modelValue":e[27]||(e[27]=t=>s(l).password_confirmation=t),class:"main__form--box__input",placeholder:"Confirm password",type:s(k)?"text":"password",onBlur:e[28]||(e[28]=t=>g("password_confirmation"))},{prefix:d(()=>[He]),suffix:d(()=>[s(l).password_confirmation?(a(),u("div",{key:0,style:{position:"relative"},onClick:e[22]||(e[22]=t=>$("password_confirmation"))},We)):m("",!0),i("img",{class:P(s(o).password_confirmation.value?"eye_icon":""),src:s(k)?s(U):s(z),alt:"eye_icon",onClick:e[23]||(e[23]=t=>k.value=!s(k))},null,10,Ze),s(o).password_confirmation.value?(a(),u("img",{key:1,src:b,alt:"",class:"error_icon",onMouseover:e[24]||(e[24]=t=>E("password_confirmation")),onMouseout:e[25]||(e[25]=t=>C("password_confirmation")),onClick:e[26]||(e[26]=t=>M("password_confirmation"))},null,32)):m("",!0)]),_:1},8,["modelValue","type"])]),_:1}),Ge,v(le,{"login-title":"Register","login-loading":s(I).registerLoading,"social-title":"Sign up with Google"},null,8,["login-loading"])]),_:1},8,["model","rules","onSubmit"])]),s(c)?(a(),y(ie,{key:0,email:s(l).email,"dialog-visible":s(c),onClose:e[29]||(e[29]=t=>c.value=!1)},null,8,["email","dialog-visible"])):m("",!0),s(o).email.isShow&&!_()?(a(),y(T,{key:1,"dialog-visible":s(o).email.isShow&&!_(),"error-text":s(o).email.value,onVisible:e[30]||(e[30]=t=>s(o).email.isShow=!1)},null,8,["dialog-visible","error-text"])):m("",!0),s(o).username.isShow&&!_()?(a(),y(T,{key:2,"dialog-visible":s(o).username.isShow&&!_(),"error-text":s(o).username.value,"text-color":s(o).username.status==="Medium"&&s(l).username?"warning":"weak",onVisible:e[31]||(e[31]=t=>s(o).username.isShow=!1)},null,8,["dialog-visible","error-text","text-color"])):m("",!0),s(o).password.isShow&&!_()?(a(),y(T,{key:3,"dialog-visible":s(o).password.isShow&&!_(),"error-text":s(o).password.value,"text-color":s(o).password.status==="Medium"&&s(l).password?"warning":s(o).password.status==="Strong"&&s(l).password?"done":"weak",onVisible:e[32]||(e[32]=t=>s(o).password.isShow=!1)},null,8,["dialog-visible","error-text","text-color"])):m("",!0),s(o).password_confirmation.isShow&&!_()?(a(),y(T,{key:4,"dialog-visible":s(o).password_confirmation.isShow&&!_(),"error-text":s(o).password_confirmation.value,onVisible:e[33]||(e[33]=t=>s(o).password_confirmation.isShow=!1)},null,8,["dialog-visible","error-text"])):m("",!0)])}}},gs=ue(Oe,[["__scopeId","data-v-e0a54351"]]);export{gs as default};
