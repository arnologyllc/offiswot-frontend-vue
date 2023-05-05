import{E as A}from"./focus-trap.04464a06.js";import{_ as C,E as G,a as J}from"./error.3564d58a.js";import{E as K,a as Q}from"./index.5016a931.js";import{E as Y}from"./index.9ce43428.js";import{a as Z,s as ee,b as oe,e as se,f as te,r as g,w as h,h as ae,o as l,i as m,j as i,k as n,u as o,l as r,t as x,m as d,F as re,p as le,c as y,q as ne,v as ie,x as ue,y as me,z as de}from"./entry.dabfc507.js";import{_ as _e}from"./chevron-icon.ef3f9a72.js";import{C as ce}from"./AccessCheckModal.b359da57.js";import{E as pe}from"./ErrorMassageModal.8c97b422.js";import fe from"./settingsToken.812dd4cb.js";import ve from"./auth.0edab5ad.js";import{_ as ge}from"./_plugin-vue_export-helper.c27b6911.js";import"./index.a986b334.js";import"./index.66b6d77a.js";import"./isEqual.5d82a5a0.js";import"./email-primary-icon.1455806e.js";import"./eye-close-icon.eaa88d21.js";const _=p=>(me("data-v-d0e8f667"),p=p(),de(),p),be={class:"main"},ke=_(()=>r("div",{class:"main__title"},"Create workspace",-1)),we=_(()=>r("div",{class:"main__subtitle"},"Please fill the forms to register",-1)),he={key:0,class:"el-form-item__global-error-container"},ye={class:"el-form-item__global-error"},Ee=_(()=>r("img",{src:C,alt:""},null,-1)),Se=_(()=>r("span",{for:"name",class:"name_placeholder"}," Workspace Name ",-1)),Ve=[Se],xe={key:0,class:"el-form-item__error"},Ce=["innerHTML"],Ie=_(()=>r("div",null,null,-1)),We={class:"main__form--actions"},$e={class:"submit-button__text"},Fe=_(()=>r("img",{src:_e,alt:"arrow"},null,-1)),Me={__name:"create-workspace",setup(p){const b=Z(),{isLoadingIndustries:I,industriesList:W,industriesError:$,isLoadingSubmit:E,createWorkspaceSuccess:F,createWorkspaceError:M}=ee(b),f=oe();se();const L=te(),u=g({name:null,industry_id:null}),B=g({name:{required:!0,message:"Please input workspace name",trigger:"blur"}}),t=g({name:{value:"",isShow:!1},global:{value:""}}),v=g(!1);h(F,e=>{e&&ue("/profile")}),h(M,e=>{e&&(t.value.global.value=e)}),h($,e=>{e&&(t.value.global.value=e)}),ae(async()=>{ve(),v.value=fe(),window.addEventListener("resize",D),await b.getIndustries()});const T=()=>{f.refs.createForm.validate(e=>{if(e)b.createWorkspace(u.value);else return t.value.global.value="Please fill empty areas",!1})},N=e=>{f.refs[e].focus()},P=e=>{f.refs.createForm.validateField(e,(s,k)=>{s?t.value[e].value="":t.value[e].value=k[e][0].message})},R=e=>{t.value[e].isShow=!0},q=e=>{c()&&(t.value[e].isShow=!0)},z=e=>{c()&&(t.value[e].isShow=!1)},D=()=>{f.update()},c=()=>window.innerWidth>990,H=()=>{t.value.global.value=""};return(e,s)=>{const k=A,w=G,O=K,U=Q,S=Y,j=J;return l(),m("div",be,[i(j,{ref:"createForm",class:"main__form","hide-required-asterisk":"",rules:o(B),model:o(u),onSubmit:ie(T,["prevent"])},{default:n(()=>[ke,we,o(t).global.value?(l(),m("div",he,[r("div",ye,[Ee,r("span",null,x(o(t).global.value),1)]),r("span",{class:"clear-error",onClick:H},"X")])):d("",!0),i(w,{prop:"name"},{error:n(()=>[o(t).name.isShow&&c()?(l(),m("div",xe,[r("span",{innerHTML:o(t).name.value},null,8,Ce)])):d("",!0),Ie]),default:n(()=>[i(k,{modelValue:o(u).name,"onUpdate:modelValue":s[4]||(s[4]=a=>o(u).name=a),class:"main__form--input",placeholder:"Workspace name",onBlur:s[5]||(s[5]=a=>P("name"))},{suffix:n(()=>[o(u).name?(l(),m("div",{key:0,style:{position:"relative"},onClick:s[0]||(s[0]=a=>N("name"))},Ve)):d("",!0),o(t).name.value?(l(),m("img",{key:1,src:C,alt:"",class:"error_icon",onMouseover:s[1]||(s[1]=a=>q("name")),onMouseout:s[2]||(s[2]=a=>z("name")),onClick:s[3]||(s[3]=a=>R("name"))},null,32)):d("",!0)]),_:1},8,["modelValue"])]),_:1}),i(w,{prop:"industry_id"},{default:n(()=>[i(U,{modelValue:o(u).industry_id,"onUpdate:modelValue":s[6]||(s[6]=a=>o(u).industry_id=a),loading:o(I),class:"main__form--input",placeholder:"Select Industry"},{default:n(()=>{var a;return[(l(!0),m(re,null,le((a=o(W))==null?void 0:a.industries,(V,X)=>(l(),y(O,{key:`option_${X}`,value:V.id,label:V.name},null,8,["value","label"]))),128))]}),_:1},8,["modelValue","loading"])]),_:1}),i(w,{class:"main__form--footer"},{default:n(()=>[r("div",We,[i(S,{class:"main__form--actions__text-btn",onClick:s[7]||(s[7]=a=>o(L).push("/profile"))},{default:n(()=>[ne("Cancel")]),_:1}),i(S,{"native-type":"submit",loading:o(E),class:"submit-button"},{default:n(()=>[r("span",null,[r("span",$e,x(o(E)?"":"Next"),1),Fe])]),_:1},8,["loading"])])]),_:1}),o(t).name.isShow&&!c()?(l(),y(pe,{key:1,dialogVisible:o(t).name.isShow&&!c(),"error-text":o(t).name.value,onVisible:s[8]||(s[8]=a=>o(t).name.isShow=!1)},null,8,["dialogVisible","error-text"])):d("",!0)]),_:1},8,["rules","model","onSubmit"]),o(v)?(l(),y(ce,{key:0,dialogVisible:o(v),onClose:s[9]||(s[9]=a=>v.value=!1)},null,8,["dialogVisible"])):d("",!0)])}}},Je=ge(Me,[["__scopeId","data-v-d0e8f667"]]);export{Je as default};
