import{E as A}from"./el-input.7fd03793.js";import{E as G,_ as C,a as J}from"./el-overlay.64de5399.js";import{E as K,a as Q}from"./el-select.83ffbcdd.js";import{E as Y}from"./el-button.6d07ff3a.js";import"./el-form-item.4ed993c7.js";import"./el-scrollbar.70347ffa.js";import"./el-popper.a26bebaf.js";import{a as Z,s as ee,b as oe,r as g,w as h,e as se,f as m,h as i,i as l,u as o,j as te,c as y,k as c,l as ae,o as n,m as r,t as $,F as re,p as le,q as ne,v as ie,x as ue,y as me}from"./entry.1c65c56b.js";import{_ as ce}from"./chevron-icon.1bc5d74d.js";import{_ as _e}from"./AccessCheckModal.46cf6b5b.js";import{E as de}from"./ErrorMassageModal.180b4dfd.js";import pe from"./settingsToken.644b8451.js";import fe from"./loginToken.3edc705a.js";import ve from"./auth.3b6594a0.js";import{_ as ge}from"./_plugin-vue_export-helper.c27b6911.js";import"./focus-trap.cf142168.js";import"./refs.6073550b.js";import"./isEqual.90c5f9f6.js";import"./debounce.c98c1dff.js";import"./js.cookie.edb2da2a.js";import"./nuxt-storage.min.d80392db.js";import"./_commonjsHelpers.042e6b4d.js";import"./email-primary-icon.754ea29f.js";import"./eye-close-icon.f5ebd9e6.js";const _=f=>(ue("data-v-73c5070c"),f=f(),me(),f),be={class:"main"},ke=_(()=>r("div",{class:"main__title"},"Create workspace",-1)),we=_(()=>r("div",{class:"main__subtitle"},"Please fill the forms to register",-1)),he={key:0,class:"el-form-item__global-error-container"},ye={class:"el-form-item__global-error"},Ee=_(()=>r("img",{src:C,alt:""},null,-1)),Se=_(()=>r("span",{for:"name",class:"custom_placeholder"}," Workspace Name ",-1)),xe=[Se],$e={key:0,class:"el-form-item__error"},Ce=["innerHTML"],Ie=_(()=>r("div",null,null,-1)),Ve={class:"main__form--actions"},We={class:"submit-button__text"},Fe=_(()=>r("img",{src:ce,alt:"arrow"},null,-1)),Le={__name:"create-workspace",setup(f){const b=Z(),{isLoadingIndustries:I,industriesList:V,industriesError:W,isLoadingSubmit:E,createWorkspaceSuccess:F,createWorkspaceError:L}=ee(b),v=ae(),M=oe(),u=g({name:null,industry_id:null}),T=g({name:{required:!0,message:"Please input workspace name",trigger:"blur"}}),t=g({name:{value:"",isShow:!1},global:{value:""}}),d=g(!1);h(F,e=>{e&&ie("/profile")}),h(L,e=>{e&&(t.value.global.value=e)}),h(W,e=>{e&&(t.value.global.value=e)}),se(async()=>{ve(),d.value=fe(),d.value=pe(),window.addEventListener("resize",D),await b.getIndustries()});const B=()=>{v.refs.createForm.validate(e=>{if(e)b.createWorkspace(u.value);else return t.value.global.value="Please fill empty areas",!1})},N=e=>{v.refs[e].focus()},P=e=>{v.refs.createForm.validateField(e,(s,k)=>{s?t.value[e].value="":t.value[e].value=k[e][0].message})},q=e=>{t.value[e].isShow=!0},R=e=>{p()&&(t.value[e].isShow=!0)},z=e=>{p()&&(t.value[e].isShow=!1)},D=()=>{v.update()},p=()=>window.innerWidth>990,H=()=>{t.value.global.value=""};return(e,s)=>{const k=A,w=J,O=K,U=Q,S=Y,j=G;return n(),m("div",be,[i(j,{ref:"createForm",class:"main__form","hide-required-asterisk":"",rules:o(T),model:o(u),onSubmit:te(B,["prevent"])},{default:l(()=>[ke,we,o(t).global.value?(n(),m("div",he,[r("div",ye,[Ee,r("span",null,$(o(t).global.value),1)]),r("span",{class:"clear-error",onClick:H},"X")])):c("",!0),i(w,{prop:"name"},{error:l(()=>[o(t).name.isShow&&p()?(n(),m("div",$e,[r("span",{innerHTML:o(t).name.value},null,8,Ce)])):c("",!0),Ie]),default:l(()=>[i(k,{modelValue:o(u).name,"onUpdate:modelValue":s[4]||(s[4]=a=>o(u).name=a),class:"main__form--input",placeholder:"Workspace name",onBlur:s[5]||(s[5]=a=>P("name"))},{suffix:l(()=>[o(u).name?(n(),m("div",{key:0,style:{position:"relative"},onClick:s[0]||(s[0]=a=>N("name"))},xe)):c("",!0),o(t).name.value?(n(),m("img",{key:1,src:C,alt:"",class:"error_icon",onMouseover:s[1]||(s[1]=a=>R("name")),onMouseout:s[2]||(s[2]=a=>z("name")),onClick:s[3]||(s[3]=a=>q("name"))},null,32)):c("",!0)]),_:1},8,["modelValue"])]),_:1}),i(w,{prop:"industry_id"},{default:l(()=>[i(U,{modelValue:o(u).industry_id,"onUpdate:modelValue":s[6]||(s[6]=a=>o(u).industry_id=a),loading:o(I),class:"main__form--input",placeholder:"Select Industry"},{default:l(()=>{var a;return[(n(!0),m(re,null,le((a=o(V))==null?void 0:a.industries,(x,X)=>(n(),y(O,{key:`option_${X}`,value:x.id,label:x.name},null,8,["value","label"]))),128))]}),_:1},8,["modelValue","loading"])]),_:1}),i(w,{class:"main__form--footer"},{default:l(()=>[r("div",Ve,[i(S,{class:"main__form--actions__text-btn",onClick:s[7]||(s[7]=a=>o(M).push("/profile"))},{default:l(()=>[ne("Cancel")]),_:1}),i(S,{"native-type":"submit",loading:o(E),class:"submit-button"},{default:l(()=>[r("span",null,[r("span",We,$(o(E)?"":"Next"),1),Fe])]),_:1},8,["loading"])])]),_:1}),o(t).name.isShow&&!p()?(n(),y(de,{key:1,"dialog-visible":o(t).name.isShow&&!p(),"error-text":o(t).name.value,onVisible:s[8]||(s[8]=a=>o(t).name.isShow=!1)},null,8,["dialog-visible","error-text"])):c("",!0)]),_:1},8,["rules","model","onSubmit"]),o(d)?(n(),y(_e,{key:0,"dialog-visible":o(d),onClose:s[9]||(s[9]=a=>d.value=!1)},null,8,["dialog-visible"])):c("",!0)])}}},to=ge(Le,[["__scopeId","data-v-73c5070c"]]);export{to as default};