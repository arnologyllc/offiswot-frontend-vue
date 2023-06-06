import{_ as K,b as Q,d as P,M as Re,E as fe,h as me,k as Ne,W as Be,g as Pe,w as De,q as ve}from"./el-button.2cb36390.js";import{c as N,b as Ke,u as ue,E as Le,O as Me,w as de}from"./el-popper.959b0d45.js";import{E as Ae}from"./el-scrollbar.f03ebbd8.js";import{E as g,A as Ge,u as ze,x as ge,F as Ye}from"./focus-trap.7e8c793f.js";import{K as L,R as B,r as h,O as J,M as y,e as Ue,u as T,aa as we,E as O,bp as Je,a5 as U,w as be,ad as E,o as D,c as H,j as I,i as S,n as He,g as Ve,Z as Ie,N as je,L as oe,h as q,ab as We,S as j,B as X,l as x,m as Ee,J as qe,p as Qe,Q as Ze,k as ee,F as Xe,P as xe}from"./entry.3ab378a4.js";const eo=L({inheritAttrs:!1});function oo(e,o,i,t,d,a){return B(e.$slots,"default")}var no=K(eo,[["render",oo],["__file","/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection.vue"]]);const to=L({name:"ElCollectionItem",inheritAttrs:!1});function lo(e,o,i,t,d,a){return B(e.$slots,"default")}var ro=K(to,[["render",lo],["__file","/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection-item.vue"]]);const _e="data-el-collection-item",Ce=e=>{const o=`El${e}Collection`,i=`${o}Item`,t=Symbol(o),d=Symbol(i),a={...no,name:o,setup(){const l=h(null),p=new Map;J(t,{itemMap:p,getItems:()=>{const m=T(l);if(!m)return[];const f=Array.from(m.querySelectorAll(`[${_e}]`));return[...p.values()].sort((n,c)=>f.indexOf(n.ref)-f.indexOf(c.ref))},collectionRef:l})}},r={...ro,name:i,setup(l,{attrs:p}){const v=h(null),m=y(t,void 0);J(d,{collectionItemRef:v}),Ue(()=>{const f=T(v);f&&m.itemMap.set(f,{ref:f,...p})}),we(()=>{const f=T(v);m.itemMap.delete(f)})}};return{COLLECTION_INJECTION_KEY:t,COLLECTION_ITEM_INJECTION_KEY:d,ElCollection:a,ElCollectionItem:r}},so=Q({style:{type:P([String,Array,Object])},currentTabId:{type:P(String)},defaultCurrentTabId:String,loop:Boolean,dir:{type:String,values:["ltr","rtl"],default:"ltr"},orientation:{type:P(String)},onBlur:Function,onFocus:Function,onMousedown:Function}),{ElCollection:io,ElCollectionItem:ao,COLLECTION_INJECTION_KEY:ne,COLLECTION_ITEM_INJECTION_KEY:uo}=Ce("RovingFocusGroup"),te=Symbol("elRovingFocusGroup"),he=Symbol("elRovingFocusGroupItem"),co={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"},po=(e,o)=>{if(o!=="rtl")return e;switch(e){case g.right:return g.left;case g.left:return g.right;default:return e}},fo=(e,o,i)=>{const t=po(e.key,i);if(!(o==="vertical"&&[g.left,g.right].includes(t))&&!(o==="horizontal"&&[g.up,g.down].includes(t)))return co[t]},mo=(e,o)=>e.map((i,t)=>e[(t+o)%e.length]),le=e=>{const{activeElement:o}=document;for(const i of e)if(i===o||(i.focus(),o!==document.activeElement))return},ce="currentTabIdChange",pe="rovingFocusGroup.entryFocus",vo={bubbles:!1,cancelable:!0},go=L({name:"ElRovingFocusGroupImpl",inheritAttrs:!1,props:so,emits:[ce,"entryFocus"],setup(e,{emit:o}){var i;const t=h((i=e.currentTabId||e.defaultCurrentTabId)!=null?i:null),d=h(!1),a=h(!1),r=h(null),{getItems:l}=y(ne,void 0),p=O(()=>[{outline:"none"},e.style]),v=u=>{o(ce,u)},m=()=>{d.value=!0},f=N(u=>{var w;(w=e.onMousedown)==null||w.call(e,u)},()=>{a.value=!0}),_=N(u=>{var w;(w=e.onFocus)==null||w.call(e,u)},u=>{const w=!T(a),{target:M,currentTarget:F}=u;if(M===F&&w&&!T(d)){const A=new Event(pe,vo);if(F==null||F.dispatchEvent(A),!A.defaultPrevented){const b=l().filter(k=>k.focusable),R=b.find(k=>k.active),C=b.find(k=>k.id===T(t)),z=[R,C,...b].filter(Boolean).map(k=>k.ref);le(z)}}a.value=!1}),n=N(u=>{var w;(w=e.onBlur)==null||w.call(e,u)},()=>{d.value=!1}),c=(...u)=>{o("entryFocus",...u)};J(te,{currentTabbedId:Je(t),loop:U(e,"loop"),tabIndex:O(()=>T(d)?-1:0),rovingFocusGroupRef:r,rovingFocusGroupRootStyle:p,orientation:U(e,"orientation"),dir:U(e,"dir"),onItemFocus:v,onItemShiftTab:m,onBlur:n,onFocus:_,onMousedown:f}),be(()=>e.currentTabId,u=>{t.value=u??null}),Ge(r,pe,c)}});function wo(e,o,i,t,d,a){return B(e.$slots,"default")}var bo=K(go,[["render",wo],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group-impl.vue"]]);const Io=L({name:"ElRovingFocusGroup",components:{ElFocusGroupCollection:io,ElRovingFocusGroupImpl:bo}});function Eo(e,o,i,t,d,a){const r=E("el-roving-focus-group-impl"),l=E("el-focus-group-collection");return D(),H(l,null,{default:I(()=>[S(r,He(Ve(e.$attrs)),{default:I(()=>[B(e.$slots,"default")]),_:3},16)]),_:3})}var _o=K(Io,[["render",Eo],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group.vue"]]);const Co=L({components:{ElRovingFocusCollectionItem:ao},props:{focusable:{type:Boolean,default:!0},active:{type:Boolean,default:!1}},emits:["mousedown","focus","keydown"],setup(e,{emit:o}){const{currentTabbedId:i,loop:t,onItemFocus:d,onItemShiftTab:a}=y(te,void 0),{getItems:r}=y(ne,void 0),l=Ie(),p=h(null),v=N(n=>{o("mousedown",n)},n=>{e.focusable?d(T(l)):n.preventDefault()}),m=N(n=>{o("focus",n)},()=>{d(T(l))}),f=N(n=>{o("keydown",n)},n=>{const{key:c,shiftKey:u,target:w,currentTarget:M}=n;if(c===g.tab&&u){a();return}if(w!==M)return;const F=fo(n);if(F){n.preventDefault();let b=r().filter(R=>R.focusable).map(R=>R.ref);switch(F){case"last":{b.reverse();break}case"prev":case"next":{F==="prev"&&b.reverse();const R=b.indexOf(M);b=t.value?mo(b,R+1):b.slice(R+1);break}}je(()=>{le(b)})}}),_=O(()=>i.value===T(l));return J(he,{rovingFocusGroupItemRef:p,tabIndex:O(()=>T(_)?0:-1),handleMousedown:v,handleFocus:m,handleKeydown:f}),{id:l,handleKeydown:f,handleFocus:m,handleMousedown:v}}});function ho(e,o,i,t,d,a){const r=E("el-roving-focus-collection-item");return D(),H(r,{id:e.id,focusable:e.focusable,active:e.active},{default:I(()=>[B(e.$slots,"default")]),_:3},8,["id","focusable","active"])}var yo=K(Co,[["render",ho],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-item.vue"]]);const To=Q({trigger:Ke.trigger,effect:{...ue.effect,default:"light"},type:{type:P(String)},placement:{type:P(String),default:"bottom"},popperOptions:{type:P(Object),default:()=>({})},id:String,size:{type:String,default:""},splitButton:Boolean,hideOnClick:{type:Boolean,default:!0},loop:{type:Boolean,default:!0},showTimeout:{type:Number,default:150},hideTimeout:{type:Number,default:150},tabindex:{type:P([Number,String]),default:0},maxHeight:{type:P([Number,String]),default:""},popperClass:{type:String,default:""},disabled:{type:Boolean,default:!1},role:{type:String,default:"menu"},buttonProps:{type:P(Object)},teleported:ue.teleported}),ye=Q({command:{type:[Object,String,Number],default:()=>({})},disabled:Boolean,divided:Boolean,textValue:String,icon:{type:Re}}),$o=Q({onKeydown:{type:P(Function)}}),Oo=[g.down,g.pageDown,g.home],Te=[g.up,g.pageUp,g.end],Fo=[...Oo,...Te],{ElCollection:ko,ElCollectionItem:So,COLLECTION_INJECTION_KEY:Ro,COLLECTION_ITEM_INJECTION_KEY:No}=Ce("Dropdown"),Z=Symbol("elDropdown"),{ButtonGroup:Bo}=fe,Po=L({name:"ElDropdown",components:{ElButton:fe,ElButtonGroup:Bo,ElScrollbar:Ae,ElDropdownCollection:ko,ElTooltip:Le,ElRovingFocusGroup:_o,ElOnlyChild:Me,ElIcon:me,ArrowDown:Ne},props:To,emits:["visible-change","click","command"],setup(e,{emit:o}){const i=Ee(),t=oe("dropdown"),{t:d}=ze(),a=h(),r=h(),l=h(null),p=h(null),v=h(null),m=h(null),f=h(!1),_=[g.enter,g.space,g.down],n=O(()=>({maxHeight:Be(e.maxHeight)})),c=O(()=>[t.m(b.value)]),u=Ie().value,w=O(()=>e.id||u);be([a,U(e,"trigger")],([s,$],[Y])=>{var se,ie,ae;const Se=qe($)?$:[$];(se=Y==null?void 0:Y.$el)!=null&&se.removeEventListener&&Y.$el.removeEventListener("pointerenter",C),(ie=s==null?void 0:s.$el)!=null&&ie.removeEventListener&&s.$el.removeEventListener("pointerenter",C),(ae=s==null?void 0:s.$el)!=null&&ae.addEventListener&&Se.includes("hover")&&s.$el.addEventListener("pointerenter",C)},{immediate:!0}),we(()=>{var s,$;($=(s=a.value)==null?void 0:s.$el)!=null&&$.removeEventListener&&a.value.$el.removeEventListener("pointerenter",C)});function M(){F()}function F(){var s;(s=l.value)==null||s.onClose()}function A(){var s;(s=l.value)==null||s.onOpen()}const b=Pe();function R(...s){o("command",...s)}function C(){var s,$;($=(s=a.value)==null?void 0:s.$el)==null||$.focus()}function G(){}function z(){const s=T(p);s==null||s.focus(),m.value=null}function k(s){m.value=s}function re(s){f.value||(s.preventDefault(),s.stopImmediatePropagation())}function W(){o("visible-change",!0)}function V(s){(s==null?void 0:s.type)==="keydown"&&p.value.focus()}function ke(){o("visible-change",!1)}return J(Z,{contentRef:p,role:O(()=>e.role),triggerId:w,isUsingKeyboard:f,onItemEnter:G,onItemLeave:z}),J("elDropdown",{instance:i,dropdownSize:b,handleClick:M,commandHandler:R,trigger:U(e,"trigger"),hideOnClick:U(e,"hideOnClick")}),{t:d,ns:t,scrollbar:v,wrapStyle:n,dropdownTriggerKls:c,dropdownSize:b,triggerId:w,triggerKeys:_,currentTabId:m,handleCurrentTabIdChange:k,handlerMainButtonClick:s=>{o("click",s)},handleEntryFocus:re,handleClose:F,handleOpen:A,handleBeforeShowTooltip:W,handleShowTooltip:V,handleBeforeHideTooltip:ke,onFocusAfterTrapped:s=>{var $,Y;s.preventDefault(),(Y=($=p.value)==null?void 0:$.focus)==null||Y.call($,{preventScroll:!0})},popperRef:l,contentRef:p,triggeringElementRef:a,referenceElementRef:r}}});function Do(e,o,i,t,d,a){var r;const l=E("el-dropdown-collection"),p=E("el-roving-focus-group"),v=E("el-scrollbar"),m=E("el-only-child"),f=E("el-tooltip"),_=E("el-button"),n=E("arrow-down"),c=E("el-icon"),u=E("el-button-group");return D(),q("div",{class:X([e.ns.b(),e.ns.is("disabled",e.disabled)])},[S(f,{ref:"popperRef",role:e.role,effect:e.effect,"fallback-placements":["bottom","top"],"popper-options":e.popperOptions,"gpu-acceleration":!1,"hide-after":e.trigger==="hover"?e.hideTimeout:0,"manual-mode":!0,placement:e.placement,"popper-class":[e.ns.e("popper"),e.popperClass],"reference-element":(r=e.referenceElementRef)==null?void 0:r.$el,trigger:e.trigger,"trigger-keys":e.triggerKeys,"trigger-target-el":e.contentRef,"show-after":e.trigger==="hover"?e.showTimeout:0,"stop-popper-mouse-event":!1,"virtual-ref":e.triggeringElementRef,"virtual-triggering":e.splitButton,disabled:e.disabled,transition:`${e.ns.namespace.value}-zoom-in-top`,teleported:e.teleported,pure:"",persistent:"",onBeforeShow:e.handleBeforeShowTooltip,onShow:e.handleShowTooltip,onBeforeHide:e.handleBeforeHideTooltip},We({content:I(()=>[S(v,{ref:"scrollbar","wrap-style":e.wrapStyle,tag:"div","view-class":e.ns.e("list")},{default:I(()=>[S(p,{loop:e.loop,"current-tab-id":e.currentTabId,orientation:"horizontal",onCurrentTabIdChange:e.handleCurrentTabIdChange,onEntryFocus:e.handleEntryFocus},{default:I(()=>[S(l,null,{default:I(()=>[B(e.$slots,"dropdown")]),_:3})]),_:3},8,["loop","current-tab-id","onCurrentTabIdChange","onEntryFocus"])]),_:3},8,["wrap-style","view-class"])]),_:2},[e.splitButton?void 0:{name:"default",fn:I(()=>[S(m,{id:e.triggerId,ref:"triggeringElementRef",role:"button",tabindex:e.tabindex},{default:I(()=>[B(e.$slots,"default")]),_:3},8,["id","tabindex"])])}]),1032,["role","effect","popper-options","hide-after","placement","popper-class","reference-element","trigger","trigger-keys","trigger-target-el","show-after","virtual-ref","virtual-triggering","disabled","transition","teleported","onBeforeShow","onShow","onBeforeHide"]),e.splitButton?(D(),H(u,{key:0},{default:I(()=>[S(_,j({ref:"referenceElementRef"},e.buttonProps,{size:e.dropdownSize,type:e.type,disabled:e.disabled,tabindex:e.tabindex,onClick:e.handlerMainButtonClick}),{default:I(()=>[B(e.$slots,"default")]),_:3},16,["size","type","disabled","tabindex","onClick"]),S(_,j({id:e.triggerId,ref:"triggeringElementRef"},e.buttonProps,{role:"button",size:e.dropdownSize,type:e.type,class:e.ns.e("caret-button"),disabled:e.disabled,tabindex:e.tabindex,"aria-label":e.t("el.dropdown.toggleDropdown")}),{default:I(()=>[S(c,{class:X(e.ns.e("icon"))},{default:I(()=>[S(n)]),_:1},8,["class"])]),_:1},16,["id","size","type","class","disabled","tabindex","aria-label"])]),_:3})):x("v-if",!0)],2)}var Ko=K(Po,[["render",Do],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown.vue"]]);const Lo=L({name:"DropdownItemImpl",components:{ElIcon:me},props:ye,emits:["pointermove","pointerleave","click","clickimpl"],setup(e,{emit:o}){const i=oe("dropdown"),{role:t}=y(Z,void 0),{collectionItemRef:d}=y(No,void 0),{collectionItemRef:a}=y(uo,void 0),{rovingFocusGroupItemRef:r,tabIndex:l,handleFocus:p,handleKeydown:v,handleMousedown:m}=y(he,void 0),f=ge(d,a,r),_=O(()=>t.value==="menu"?"menuitem":t.value==="navigation"?"link":"button"),n=N(c=>{const{code:u}=c;if(u===g.enter||u===g.space)return c.preventDefault(),c.stopImmediatePropagation(),o("clickimpl",c),!0},v);return{ns:i,itemRef:f,dataset:{[_e]:""},role:_,tabIndex:l,handleFocus:p,handleKeydown:n,handleMousedown:m}}}),Mo=["aria-disabled","tabindex","role"];function Ao(e,o,i,t,d,a){const r=E("el-icon");return D(),q(Xe,null,[e.divided?(D(),q("li",j({key:0,role:"separator",class:e.ns.bem("menu","item","divided")},e.$attrs),null,16)):x("v-if",!0),Qe("li",j({ref:e.itemRef},{...e.dataset,...e.$attrs},{"aria-disabled":e.disabled,class:[e.ns.be("menu","item"),e.ns.is("disabled",e.disabled)],tabindex:e.tabIndex,role:e.role,onClick:o[0]||(o[0]=l=>e.$emit("clickimpl",l)),onFocus:o[1]||(o[1]=(...l)=>e.handleFocus&&e.handleFocus(...l)),onKeydown:o[2]||(o[2]=ee((...l)=>e.handleKeydown&&e.handleKeydown(...l),["self"])),onMousedown:o[3]||(o[3]=(...l)=>e.handleMousedown&&e.handleMousedown(...l)),onPointermove:o[4]||(o[4]=l=>e.$emit("pointermove",l)),onPointerleave:o[5]||(o[5]=l=>e.$emit("pointerleave",l))}),[e.icon?(D(),H(r,{key:0},{default:I(()=>[(D(),H(Ze(e.icon)))]),_:1})):x("v-if",!0),B(e.$slots,"default")],16,Mo)],64)}var Go=K(Lo,[["render",Ao],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item-impl.vue"]]);const $e=()=>{const e=y("elDropdown",{}),o=O(()=>e==null?void 0:e.dropdownSize);return{elDropdown:e,_elDropdownSize:o}},zo=L({name:"ElDropdownItem",components:{ElDropdownCollectionItem:So,ElRovingFocusItem:yo,ElDropdownItemImpl:Go},inheritAttrs:!1,props:ye,emits:["pointermove","pointerleave","click"],setup(e,{emit:o,attrs:i}){const{elDropdown:t}=$e(),d=Ee(),a=h(null),r=O(()=>{var n,c;return(c=(n=T(a))==null?void 0:n.textContent)!=null?c:""}),{onItemEnter:l,onItemLeave:p}=y(Z,void 0),v=N(n=>(o("pointermove",n),n.defaultPrevented),de(n=>{if(e.disabled){p(n);return}const c=n.currentTarget;c===document.activeElement||c.contains(document.activeElement)||(l(n),n.defaultPrevented||c==null||c.focus())})),m=N(n=>(o("pointerleave",n),n.defaultPrevented),de(n=>{p(n)})),f=N(n=>{if(!e.disabled)return o("click",n),n.type!=="keydown"&&n.defaultPrevented},n=>{var c,u,w;if(e.disabled){n.stopImmediatePropagation();return}(c=t==null?void 0:t.hideOnClick)!=null&&c.value&&((u=t.handleClick)==null||u.call(t)),(w=t.commandHandler)==null||w.call(t,e.command,d,n)}),_=O(()=>({...e,...i}));return{handleClick:f,handlePointerMove:v,handlePointerLeave:m,textContent:r,propsAndAttrs:_}}});function Yo(e,o,i,t,d,a){var r;const l=E("el-dropdown-item-impl"),p=E("el-roving-focus-item"),v=E("el-dropdown-collection-item");return D(),H(v,{disabled:e.disabled,"text-value":(r=e.textValue)!=null?r:e.textContent},{default:I(()=>[S(p,{focusable:!e.disabled},{default:I(()=>[S(l,j(e.propsAndAttrs,{onPointerleave:e.handlePointerLeave,onPointermove:e.handlePointerMove,onClickimpl:e.handleClick}),{default:I(()=>[B(e.$slots,"default")]),_:3},16,["onPointerleave","onPointermove","onClickimpl"])]),_:3},8,["focusable"])]),_:3},8,["disabled","text-value"])}var Oe=K(zo,[["render",Yo],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item.vue"]]);const Uo=L({name:"ElDropdownMenu",props:$o,setup(e){const o=oe("dropdown"),{_elDropdownSize:i}=$e(),t=i.value,{focusTrapRef:d,onKeydown:a}=y(Ye,void 0),{contentRef:r,role:l,triggerId:p}=y(Z,void 0),{collectionRef:v,getItems:m}=y(Ro,void 0),{rovingFocusGroupRef:f,rovingFocusGroupRootStyle:_,tabIndex:n,onBlur:c,onFocus:u,onMousedown:w}=y(te,void 0),{collectionRef:M}=y(ne,void 0),F=O(()=>[o.b("menu"),o.bm("menu",t==null?void 0:t.value)]),A=ge(r,v,d,f,M),b=N(C=>{var G;(G=e.onKeydown)==null||G.call(e,C)},C=>{const{currentTarget:G,code:z,target:k}=C;if(G.contains(k),g.tab===z&&C.stopImmediatePropagation(),C.preventDefault(),k!==T(r)||!Fo.includes(z))return;const W=m().filter(V=>!V.disabled).map(V=>V.ref);Te.includes(z)&&W.reverse(),le(W)});return{size:t,rovingFocusGroupRootStyle:_,tabIndex:n,dropdownKls:F,role:l,triggerId:p,dropdownListWrapperRef:A,handleKeydown:C=>{b(C),a(C)},onBlur:c,onFocus:u,onMousedown:w}}}),Jo=["role","aria-labelledby"];function Ho(e,o,i,t,d,a){return D(),q("ul",{ref:e.dropdownListWrapperRef,class:X(e.dropdownKls),style:xe(e.rovingFocusGroupRootStyle),tabindex:-1,role:e.role,"aria-labelledby":e.triggerId,onBlur:o[0]||(o[0]=(...r)=>e.onBlur&&e.onBlur(...r)),onFocus:o[1]||(o[1]=(...r)=>e.onFocus&&e.onFocus(...r)),onKeydown:o[2]||(o[2]=ee((...r)=>e.handleKeydown&&e.handleKeydown(...r),["self"])),onMousedown:o[3]||(o[3]=ee((...r)=>e.onMousedown&&e.onMousedown(...r),["self"]))},[B(e.$slots,"default")],46,Jo)}var Fe=K(Uo,[["render",Ho],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-menu.vue"]]);const xo=De(Ko,{DropdownItem:Oe,DropdownMenu:Fe}),en=ve(Oe),on=ve(Fe);export{en as E,on as a,xo as b};
