import{B as G,s as L,r as d,w as S,o as r,c as P,i as a,u as t,f as h,m as e,h as i,q as k,k as v,l as F,x as M,y as U,j as Z,b as ee,e as te,v as Y}from"./entry.1c65c56b.js";import{_ as oe}from"./chevron-left.49d1d463.js";import{E as O}from"./el-button.6d07ff3a.js";import{E as K}from"./el-input.7fd03793.js";import{a as z,E as j,b as H}from"./el-overlay.64de5399.js";import"./el-form-item.4ed993c7.js";import{h as J,s as Q}from"./eye-close-icon.f5ebd9e6.js";import{_ as B}from"./_plugin-vue_export-helper.c27b6911.js";import{E as se}from"./el-checkbox.a01c856e.js";import{_ as le}from"./AccessCheckModal.46cf6b5b.js";import ne from"./loginToken.3edc705a.js";import ie from"./settingsToken.644b8451.js";import ae from"./auth.3b6594a0.js";import"./focus-trap.cf142168.js";import"./refs.6073550b.js";import"./isEqual.90c5f9f6.js";import"./flatten.0b3b173a.js";import"./js.cookie.edb2da2a.js";import"./nuxt-storage.min.d80392db.js";import"./_commonjsHelpers.042e6b4d.js";import"./email-primary-icon.754ea29f.js";const W=""+new URL("chevron-right.40e3c89f.svg",import.meta.url).href,ce=""+new URL("remove.71691837.svg",import.meta.url).href,N=""+new URL("delete.496cebb1.svg",import.meta.url).href;const x=s=>(M("data-v-bd1eaeee"),s=s(),U(),s),de={key:0},re={class:"dialog-footer"},ue=x(()=>e("div",{class:"dialog-footer-icon"},[e("img",{src:ce,alt:"deactivate-profile"})],-1)),_e=x(()=>e("div",{class:"dialog-footer-question"},[e("div",null,"Are you sure you want to"),e("div",{class:"warning"},"deactivate"),e("div",null,"your account?")],-1)),pe=x(()=>e("div",{class:"dialog-footer-title"},[e("h4",null," Deactivating your account will disable your profile and will remove your name and photo from all workspaces. "),e("div",{class:"dialog-footer-subtitle"},[e("p",null,[k(" You can reactivate your profile in login page by trying to login with your current email or username within 3 months after deactivation. After that the account will be permanently deleted. Check account "),e("span",null," deactivation and account deletion policy.")])])],-1)),me={key:1,class:"dialog__pin"},ve=x(()=>e("div",{class:"dialog__pin-icon"},[e("img",{src:N,alt:"delete-profile"})],-1)),fe=x(()=>e("h4",null,"Please Enter your PIN.",-1)),ge=["src"],be=x(()=>e("h5",null,"Press OKAY to delete your account.",-1)),ye={__name:"DeactivateModal",props:{dialogVisible:{type:Boolean,required:!1}},setup(s){const b=s,u=F(),_=G(),{deactivateFailureData:p,deactivateProfileData:g}=L(_),o=d(0),l=d({pin:null}),w=d({pin:[{required:!0,message:"This field is required.",trigger:"blur"}]}),V=d(!1);S(p,C=>{}),S(g,C=>{u.emit("visible"),setTimeout(()=>{o.value=0},200)});const I=()=>{_.deactivateProfile(l.value)},R=()=>{o.value+=1};return(C,c)=>{const n=O,E=K,D=z,T=j,A=H;return r(),P(A,{modelValue:b.dialogVisible,"onUpdate:modelValue":c[2]||(c[2]=y=>b.dialogVisible=y),title:t(o)>2?null:"Deactivate account",width:"30%","align-center":"",class:"dialog",onClose:c[3]||(c[3]=y=>t(u).emit("visible"))},{footer:a(()=>[t(o)===0?(r(),h("span",de,[e("div",re,[ue,_e,pe,i(n,{type:"danger",class:"dialog-footer-button",plain:"",onClick:R},{default:a(()=>[k("I AGREE")]),_:1})])])):v("",!0),t(o)===1?(r(),h("span",me,[ve,i(T,{class:"dialog__form",rules:t(w)},{default:a(()=>[fe,i(D,{prop:"pin"},{default:a(()=>[i(E,{ref:"pin",modelValue:t(l).pin,"onUpdate:modelValue":c[1]||(c[1]=y=>t(l).pin=y),class:"dialog__form--box__input",placeholder:"PIN",type:t(V)?"text":"password"},{suffix:a(()=>[e("img",{src:t(V)?t(J):t(Q),alt:"eye_icon",onClick:c[0]||(c[0]=y=>V.value=!t(V))},null,8,ge)]),_:1},8,["modelValue","type"])]),_:1}),be,i(n,{type:"danger",class:"dialog__pin-button",plain:"",onClick:I},{default:a(()=>[k(" I AGREE ")]),_:1})]),_:1},8,["rules"])])):v("",!0)]),_:1},8,["modelValue","title"])}}},he=B(ye,[["__scopeId","data-v-bd1eaeee"]]),q=""+new URL("active.ff1496c8.svg",import.meta.url).href,ke=""+new URL("confirm-icon.2f842ff2.svg",import.meta.url).href;const f=s=>(M("data-v-d941829c"),s=s(),U(),s),$e={key:0},we={class:"content"},Ve=f(()=>e("div",{class:"content__icon"},[e("img",{src:N,alt:"delete-profile"})],-1)),Ie=f(()=>e("div",{class:"content__question question"},[e("div",null,"Are you sure you want to"),e("div",{class:"warning"},"permanently delete"),e("div",null,"your account?")],-1)),Ee=f(()=>e("div",{class:"content__body"},[e("div",{class:"content__body-title"}," This can not be undone. By deleting this account you agree that: "),e("div",{class:"content__body-subtitle"},[e("img",{src:q,alt:"active"}),e("p",null," No one will be able to use this username ever, including yourself. ")]),e("div",{class:"content__body-subtitle"},[e("img",{src:q,alt:"active"}),e("p",null," All of your workspaces will be permanently deleted, including chats, files and other data. ")]),e("div",{class:"content__body-subtitle"},[e("img",{src:q,alt:"active"}),e("p",null," You will be removed from the workspaces that you have been member of. It will be unrecoverable. ")])],-1)),xe={key:1},Ce={class:"content"},Pe=f(()=>e("div",{class:"content__icon"},[e("img",{src:N,alt:"delete-profile"})],-1)),De=f(()=>e("div",{class:"content__question question"}," Please choose why you want to delete you ",-1)),Se={class:"content__body"},Ne={class:"content__body-checkboxes"},Re={key:2,class:"dialog__pin"},Te=f(()=>e("div",{class:"dialog__pin-icon"},[e("img",{src:N,alt:"delete-profile"})],-1)),Ae=f(()=>e("h4",null,"Please Enter your PIN.",-1)),qe=["src"],Me=f(()=>e("h5",null,"Press OKAY to delete your account.",-1)),Ue={key:3,class:"dialog__success"},Be=f(()=>e("div",{class:"modal__content"},[e("img",{src:ke,alt:"confirm-icon"}),e("h5",null,"All done!")],-1)),Ye={__name:"DeleteModal",props:{dialogVisible:{type:Boolean,required:!1}},setup(s){const b=s,u=F(),_=G(),{deleteProfileData:p,deleteFailureData:g}=L(_),o=d(0),l=d({checked1:!1,checked2:!1}),w=d({pin:null}),V=d({pin:[{required:!0,message:"This field is required.",trigger:"blur"}]}),I=d(!1);S(g,c=>{}),S(p,c=>{u.emit("visible"),setTimeout(()=>{o.value=0},200)});const R=()=>{_.deleteProfile(w.value)},C=()=>{o.value+=1};return(c,n)=>{const E=O,D=se,T=K,A=z,y=j,X=H;return r(),P(X,{modelValue:b.dialogVisible,"onUpdate:modelValue":n[4]||(n[4]=m=>b.dialogVisible=m),title:t(o)>2?null:"Delete account",width:"30%","align-center":"",onClose:n[5]||(n[5]=m=>t(u).emit("visible"))},{footer:a(()=>[t(o)===0?(r(),h("span",$e,[e("div",we,[Ve,Ie,Ee,i(E,{type:"danger",class:"btn content__button",plain:"",onClick:C},{default:a(()=>[k("I AGREE")]),_:1})])])):v("",!0),t(o)===1?(r(),h("span",xe,[e("div",Ce,[Pe,De,e("div",Se,[e("div",Ne,[i(D,{modelValue:t(l).checked1,"onUpdate:modelValue":n[0]||(n[0]=m=>t(l).checked1=m),label:"No one will be able to use this username ever, including yourself.",size:"large"},null,8,["modelValue"]),i(D,{modelValue:t(l).checked2,"onUpdate:modelValue":n[1]||(n[1]=m=>t(l).checked2=m),label:"No one will be able to use this username ever, including yourself.",size:"large"},null,8,["modelValue"])])]),i(E,{type:"danger",class:"btn content__button",plain:"",onClick:C},{default:a(()=>[k("I AGREE")]),_:1})])])):v("",!0),t(o)===2?(r(),h("span",Re,[Te,i(y,{class:"dialog__form",rules:t(V),model:t(w),onSubmit:Z(R,["prevent"])},{default:a(()=>[Ae,i(A,{prop:"pin"},{default:a(()=>[i(T,{ref:"pin",modelValue:t(w).pin,"onUpdate:modelValue":n[3]||(n[3]=m=>t(w).pin=m),class:"dialog__form--box__input",placeholder:"PIN",type:t(I)?"text":"password"},{suffix:a(()=>[e("img",{src:t(I)?t(J):t(Q),alt:"eye_icon",onClick:n[2]||(n[2]=m=>I.value=!t(I))},null,8,qe)]),_:1},8,["modelValue","type"])]),_:1}),Me,i(E,{type:"danger",class:"dialog__pin-button btn",plain:"","native-type":"submit"},{default:a(()=>[k("I AGREE")]),_:1})]),_:1},8,["rules","model","onSubmit"])])):v("",!0),t(o)===3?(r(),h("span",Ue,[Be,i(E,{type:"danger",class:"modal__content-button",plain:"",onClick:c.closeModal},{default:a(()=>[k("OKAY")]),_:1},8,["onClick"])])):v("",!0)]),_:1},8,["modelValue","title"])}}},Ge=B(Ye,[["__scopeId","data-v-d941829c"]]);const $=s=>(M("data-v-2d0f9115"),s=s(),U(),s),Le={class:"container_account"},Fe={class:"account"},Oe={class:"account__title"},Ke=$(()=>e("span",null,"Security",-1)),ze={class:"account__body"},je=$(()=>e("div",{class:""},[e("div",{class:"reset"},"Reset password"),e("div",{class:"reset_text"}," You can change your password here. ")],-1)),He=$(()=>e("div",null,[e("img",{src:W,alt:"chevron-right"})],-1)),Je=[je,He],Qe=$(()=>e("div",null,[e("div",{class:"reset"},"Reset PIN"),e("div",{class:"reset_text"},"You can change your PIN here.")],-1)),We=$(()=>e("div",null,[e("img",{src:W,alt:"chevron-right"})],-1)),Xe=[Qe,We],Ze=$(()=>e("div",null,[e("div",{class:"deactivate"},"Deactivate my account"),e("div",{class:"reset_text"}," You can deactivate your account up to 3 months. ")],-1)),et=[Ze],tt=$(()=>e("div",{class:""},[e("div",{class:"delete"},"Delete my account"),e("div",{class:"reset_text"}," You can permanently delete you account. ")],-1)),ot=[tt],st={__name:"index",setup(s){const b=ee(),u=d(!1),_=d(!1),p=d(!1);return p.value=ne(),p.value=ie(),te(()=>{ae()}),(g,o)=>(r(),h("div",null,[e("div",null,[e("div",Le,[e("div",Fe,[e("div",null,[e("div",Oe,[e("img",{src:oe,alt:"chevron-left",onClick:o[0]||(o[0]=l=>t(b).go(-1))}),Ke]),e("div",ze,[e("div",{class:"account__body-block",onClick:o[1]||(o[1]=l=>("navigateTo"in g?g.navigateTo:t(Y))("/profile-settings/reset"))},Je),e("div",{class:"account__body-block",onClick:o[2]||(o[2]=l=>("navigateTo"in g?g.navigateTo:t(Y))("/profile-settings/update-pin"))},Xe),e("div",{class:"account__body-block",onClick:o[3]||(o[3]=l=>_.value=!0)},et),e("div",{class:"account__body-block",onClick:o[4]||(o[4]=l=>u.value=!0)},ot)])])])])]),t(_)?(r(),P(he,{key:0,"dialog-visible":t(_),onVisible:o[5]||(o[5]=l=>_.value=!1)},null,8,["dialog-visible"])):v("",!0),t(u)?(r(),P(Ge,{key:1,"dialog-visible":t(u),onVisible:o[6]||(o[6]=l=>u.value=!1)},null,8,["dialog-visible"])):v("",!0),t(p)?(r(),P(le,{key:2,"dialog-visible":t(p),onClose:o[7]||(o[7]=l=>p.value=!1)},null,8,["dialog-visible"])):v("",!0)]))}},It=B(st,[["__scopeId","data-v-2d0f9115"]]);export{It as default};