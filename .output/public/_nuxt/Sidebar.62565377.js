import{_ as Z,b as fe,d as j,J as We,E as we,j as Re,l as He,a as Ve,ao as je,h as qe,w as Ze,r as Fe}from"./el-button.baafa5c6.js";import{c as z,b as Qe,u as $e,E as Xe,O as xe,w as Se}from"./el-popper.7aced4bd.js";import{E as eo}from"./el-scrollbar.08335f11.js";import{E as S,e as oo,c as De,F as no}from"./focus-trap.f351b08e.js";import{M as Q,S as Y,r as y,Q as ae,O as M,e as Pe,u as O,ad as Ae,C as K,bq as to,a5 as re,w as ee,a8 as A,o as F,c as ie,j as v,i as k,n as so,g as lo,Z as Le,P as ro,N as he,h as J,aj as ao,T as ce,G as q,l as ue,m as be,L as io,p as $,R as co,k as ge,F as pe,J as uo,A as po,B as fo,E as mo,a as vo,s as _o,bZ as go,b as wo,H as ho,f as w,q as Te,v as x,D as bo,x as Io,y as ko}from"./entry.1cc0a497.js";/* empty css                        */import{d as le}from"./default-user-icon.bd41c5a3.js";import{_ as Eo}from"./_plugin-vue_export-helper.c27b6911.js";const yo=Q({inheritAttrs:!1});function Co(e,o,c,s,f,d){return Y(e.$slots,"default")}var $o=Z(yo,[["render",Co],["__file","/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection.vue"]]);const So=Q({name:"ElCollectionItem",inheritAttrs:!1});function To(e,o,c,s,f,d){return Y(e.$slots,"default")}var Oo=Z(So,[["render",To],["__file","/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection-item.vue"]]);const Me="data-el-collection-item",Be=e=>{const o=`El${e}Collection`,c=`${o}Item`,s=Symbol(o),f=Symbol(c),d={...$o,name:o,setup(){const r=y(null),_=new Map;ae(s,{itemMap:_,getItems:()=>{const I=O(r);if(!I)return[];const g=Array.from(I.querySelectorAll(`[${Me}]`));return[..._.values()].sort((t,m)=>g.indexOf(t.ref)-g.indexOf(m.ref))},collectionRef:r})}},a={...Oo,name:c,setup(r,{attrs:_}){const h=y(null),I=M(s,void 0);ae(f,{collectionItemRef:h}),Pe(()=>{const g=O(h);g&&I.itemMap.set(g,{ref:g,..._})}),Ae(()=>{const g=O(h);I.itemMap.delete(g)})}};return{COLLECTION_INJECTION_KEY:s,COLLECTION_ITEM_INJECTION_KEY:f,ElCollection:d,ElCollectionItem:a}},No=fe({style:{type:j([String,Array,Object])},currentTabId:{type:j(String)},defaultCurrentTabId:String,loop:Boolean,dir:{type:String,values:["ltr","rtl"],default:"ltr"},orientation:{type:j(String)},onBlur:Function,onFocus:Function,onMousedown:Function}),{ElCollection:Ro,ElCollectionItem:Fo,COLLECTION_INJECTION_KEY:Ie,COLLECTION_ITEM_INJECTION_KEY:Do}=Be("RovingFocusGroup"),ke=Symbol("elRovingFocusGroup"),Ke=Symbol("elRovingFocusGroupItem"),Po={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"},Ao=(e,o)=>{if(o!=="rtl")return e;switch(e){case S.right:return S.left;case S.left:return S.right;default:return e}},Lo=(e,o,c)=>{const s=Ao(e.key,c);if(!(o==="vertical"&&[S.left,S.right].includes(s))&&!(o==="horizontal"&&[S.up,S.down].includes(s)))return Po[s]},Mo=(e,o)=>e.map((c,s)=>e[(s+o)%e.length]),Ee=e=>{const{activeElement:o}=document;for(const c of e)if(c===o||(c.focus(),o!==document.activeElement))return},Oe="currentTabIdChange",Ne="rovingFocusGroup.entryFocus",Bo={bubbles:!1,cancelable:!0},Ko=Q({name:"ElRovingFocusGroupImpl",inheritAttrs:!1,props:No,emits:[Oe,"entryFocus"],setup(e,{emit:o}){var c;const s=y((c=e.currentTabId||e.defaultCurrentTabId)!=null?c:null),f=y(!1),d=y(!1),a=y(null),{getItems:r}=M(Ie,void 0),_=K(()=>[{outline:"none"},e.style]),h=u=>{o(Oe,u)},I=()=>{f.value=!0},g=z(u=>{var b;(b=e.onMousedown)==null||b.call(e,u)},()=>{d.value=!0}),E=z(u=>{var b;(b=e.onFocus)==null||b.call(e,u)},u=>{const b=!O(d),{target:l,currentTarget:D}=u;if(l===D&&b&&!O(f)){const N=new Event(Ne,Bo);if(D==null||D.dispatchEvent(N),!N.defaultPrevented){const C=r().filter(B=>B.focusable),U=C.find(B=>B.active),R=C.find(B=>B.id===O(s)),V=[U,R,...C].filter(Boolean).map(B=>B.ref);Ee(V)}}d.value=!1}),t=z(u=>{var b;(b=e.onBlur)==null||b.call(e,u)},()=>{f.value=!1}),m=(...u)=>{o("entryFocus",...u)};ae(ke,{currentTabbedId:to(s),loop:re(e,"loop"),tabIndex:K(()=>O(f)?-1:0),rovingFocusGroupRef:a,rovingFocusGroupRootStyle:_,orientation:re(e,"orientation"),dir:re(e,"dir"),onItemFocus:h,onItemShiftTab:I,onBlur:t,onFocus:E,onMousedown:g}),ee(()=>e.currentTabId,u=>{s.value=u??null}),oo(a,Ne,m)}});function Uo(e,o,c,s,f,d){return Y(e.$slots,"default")}var Go=Z(Ko,[["render",Uo],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group-impl.vue"]]);const Jo=Q({name:"ElRovingFocusGroup",components:{ElFocusGroupCollection:Ro,ElRovingFocusGroupImpl:Go}});function zo(e,o,c,s,f,d){const a=A("el-roving-focus-group-impl"),r=A("el-focus-group-collection");return F(),ie(r,null,{default:v(()=>[k(a,so(lo(e.$attrs)),{default:v(()=>[Y(e.$slots,"default")]),_:3},16)]),_:3})}var Yo=Z(Jo,[["render",zo],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group.vue"]]);const Wo=Q({components:{ElRovingFocusCollectionItem:Fo},props:{focusable:{type:Boolean,default:!0},active:{type:Boolean,default:!1}},emits:["mousedown","focus","keydown"],setup(e,{emit:o}){const{currentTabbedId:c,loop:s,onItemFocus:f,onItemShiftTab:d}=M(ke,void 0),{getItems:a}=M(Ie,void 0),r=Le(),_=y(null),h=z(t=>{o("mousedown",t)},t=>{e.focusable?f(O(r)):t.preventDefault()}),I=z(t=>{o("focus",t)},()=>{f(O(r))}),g=z(t=>{o("keydown",t)},t=>{const{key:m,shiftKey:u,target:b,currentTarget:l}=t;if(m===S.tab&&u){d();return}if(b!==l)return;const D=Lo(t);if(D){t.preventDefault();let C=a().filter(U=>U.focusable).map(U=>U.ref);switch(D){case"last":{C.reverse();break}case"prev":case"next":{D==="prev"&&C.reverse();const U=C.indexOf(l);C=s.value?Mo(C,U+1):C.slice(U+1);break}}ro(()=>{Ee(C)})}}),E=K(()=>c.value===O(r));return ae(Ke,{rovingFocusGroupItemRef:_,tabIndex:K(()=>O(E)?0:-1),handleMousedown:h,handleFocus:I,handleKeydown:g}),{id:r,handleKeydown:g,handleFocus:I,handleMousedown:h}}});function Ho(e,o,c,s,f,d){const a=A("el-roving-focus-collection-item");return F(),ie(a,{id:e.id,focusable:e.focusable,active:e.active},{default:v(()=>[Y(e.$slots,"default")]),_:3},8,["id","focusable","active"])}var Vo=Z(Wo,[["render",Ho],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-item.vue"]]);const jo=fe({trigger:Qe.trigger,effect:{...$e.effect,default:"light"},type:{type:j(String)},placement:{type:j(String),default:"bottom"},popperOptions:{type:j(Object),default:()=>({})},id:String,size:{type:String,default:""},splitButton:Boolean,hideOnClick:{type:Boolean,default:!0},loop:{type:Boolean,default:!0},showTimeout:{type:Number,default:150},hideTimeout:{type:Number,default:150},tabindex:{type:j([Number,String]),default:0},maxHeight:{type:j([Number,String]),default:""},popperClass:{type:String,default:""},disabled:{type:Boolean,default:!1},role:{type:String,default:"menu"},buttonProps:{type:j(Object)},teleported:$e.teleported}),Ue=fe({command:{type:[Object,String,Number],default:()=>({})},disabled:Boolean,divided:Boolean,textValue:String,icon:{type:We}}),qo=fe({onKeydown:{type:j(Function)}}),Zo=[S.down,S.pageDown,S.home],Ge=[S.up,S.pageUp,S.end],Qo=[...Zo,...Ge],{ElCollection:Xo,ElCollectionItem:xo,COLLECTION_INJECTION_KEY:en,COLLECTION_ITEM_INJECTION_KEY:on}=Be("Dropdown"),me=Symbol("elDropdown"),{ButtonGroup:nn}=we,tn=Q({name:"ElDropdown",components:{ElButton:we,ElButtonGroup:nn,ElScrollbar:eo,ElDropdownCollection:Xo,ElTooltip:Xe,ElRovingFocusGroup:Yo,ElOnlyChild:xe,ElIcon:Re,ArrowDown:He},props:jo,emits:["visible-change","click","command"],setup(e,{emit:o}){const c=be(),s=he("dropdown"),{t:f}=Ve(),d=y(),a=y(),r=y(null),_=y(null),h=y(null),I=y(null),g=y(!1),E=[S.enter,S.space,S.down],t=K(()=>({maxHeight:je(e.maxHeight)})),m=K(()=>[s.m(C.value)]),u=Le().value,b=K(()=>e.id||u);ee([d,re(e,"trigger")],([i,L],[n])=>{var p,T,P;const te=io(L)?L:[L];(p=n==null?void 0:n.$el)!=null&&p.removeEventListener&&n.$el.removeEventListener("pointerenter",R),(T=i==null?void 0:i.$el)!=null&&T.removeEventListener&&i.$el.removeEventListener("pointerenter",R),(P=i==null?void 0:i.$el)!=null&&P.addEventListener&&te.includes("hover")&&i.$el.addEventListener("pointerenter",R)},{immediate:!0}),Ae(()=>{var i,L;(L=(i=d.value)==null?void 0:i.$el)!=null&&L.removeEventListener&&d.value.$el.removeEventListener("pointerenter",R)});function l(){D()}function D(){var i;(i=r.value)==null||i.onClose()}function N(){var i;(i=r.value)==null||i.onOpen()}const C=qe();function U(...i){o("command",...i)}function R(){var i,L;(L=(i=d.value)==null?void 0:i.$el)==null||L.focus()}function H(){}function V(){const i=O(_);i==null||i.focus(),I.value=null}function B(i){I.value=i}function oe(i){g.value||(i.preventDefault(),i.stopImmediatePropagation())}function ne(){o("visible-change",!0)}function X(i){(i==null?void 0:i.type)==="keydown"&&_.value.focus()}function ve(){o("visible-change",!1)}return ae(me,{contentRef:_,role:K(()=>e.role),triggerId:b,isUsingKeyboard:g,onItemEnter:H,onItemLeave:V}),ae("elDropdown",{instance:c,dropdownSize:C,handleClick:l,commandHandler:U,trigger:re(e,"trigger"),hideOnClick:re(e,"hideOnClick")}),{t:f,ns:s,scrollbar:h,wrapStyle:t,dropdownTriggerKls:m,dropdownSize:C,triggerId:b,triggerKeys:E,currentTabId:I,handleCurrentTabIdChange:B,handlerMainButtonClick:i=>{o("click",i)},handleEntryFocus:oe,handleClose:D,handleOpen:N,handleBeforeShowTooltip:ne,handleShowTooltip:X,handleBeforeHideTooltip:ve,onFocusAfterTrapped:i=>{var L,n;i.preventDefault(),(n=(L=_.value)==null?void 0:L.focus)==null||n.call(L,{preventScroll:!0})},popperRef:r,contentRef:_,triggeringElementRef:d,referenceElementRef:a}}});function sn(e,o,c,s,f,d){var a;const r=A("el-dropdown-collection"),_=A("el-roving-focus-group"),h=A("el-scrollbar"),I=A("el-only-child"),g=A("el-tooltip"),E=A("el-button"),t=A("arrow-down"),m=A("el-icon"),u=A("el-button-group");return F(),J("div",{class:q([e.ns.b(),e.ns.is("disabled",e.disabled)])},[k(g,{ref:"popperRef",role:e.role,effect:e.effect,"fallback-placements":["bottom","top"],"popper-options":e.popperOptions,"gpu-acceleration":!1,"hide-after":e.trigger==="hover"?e.hideTimeout:0,"manual-mode":!0,placement:e.placement,"popper-class":[e.ns.e("popper"),e.popperClass],"reference-element":(a=e.referenceElementRef)==null?void 0:a.$el,trigger:e.trigger,"trigger-keys":e.triggerKeys,"trigger-target-el":e.contentRef,"show-after":e.trigger==="hover"?e.showTimeout:0,"stop-popper-mouse-event":!1,"virtual-ref":e.triggeringElementRef,"virtual-triggering":e.splitButton,disabled:e.disabled,transition:`${e.ns.namespace.value}-zoom-in-top`,teleported:e.teleported,pure:"",persistent:"",onBeforeShow:e.handleBeforeShowTooltip,onShow:e.handleShowTooltip,onBeforeHide:e.handleBeforeHideTooltip},ao({content:v(()=>[k(h,{ref:"scrollbar","wrap-style":e.wrapStyle,tag:"div","view-class":e.ns.e("list")},{default:v(()=>[k(_,{loop:e.loop,"current-tab-id":e.currentTabId,orientation:"horizontal",onCurrentTabIdChange:e.handleCurrentTabIdChange,onEntryFocus:e.handleEntryFocus},{default:v(()=>[k(r,null,{default:v(()=>[Y(e.$slots,"dropdown")]),_:3})]),_:3},8,["loop","current-tab-id","onCurrentTabIdChange","onEntryFocus"])]),_:3},8,["wrap-style","view-class"])]),_:2},[e.splitButton?void 0:{name:"default",fn:v(()=>[k(I,{id:e.triggerId,ref:"triggeringElementRef",role:"button",tabindex:e.tabindex},{default:v(()=>[Y(e.$slots,"default")]),_:3},8,["id","tabindex"])])}]),1032,["role","effect","popper-options","hide-after","placement","popper-class","reference-element","trigger","trigger-keys","trigger-target-el","show-after","virtual-ref","virtual-triggering","disabled","transition","teleported","onBeforeShow","onShow","onBeforeHide"]),e.splitButton?(F(),ie(u,{key:0},{default:v(()=>[k(E,ce({ref:"referenceElementRef"},e.buttonProps,{size:e.dropdownSize,type:e.type,disabled:e.disabled,tabindex:e.tabindex,onClick:e.handlerMainButtonClick}),{default:v(()=>[Y(e.$slots,"default")]),_:3},16,["size","type","disabled","tabindex","onClick"]),k(E,ce({id:e.triggerId,ref:"triggeringElementRef"},e.buttonProps,{role:"button",size:e.dropdownSize,type:e.type,class:e.ns.e("caret-button"),disabled:e.disabled,tabindex:e.tabindex,"aria-label":e.t("el.dropdown.toggleDropdown")}),{default:v(()=>[k(m,{class:q(e.ns.e("icon"))},{default:v(()=>[k(t)]),_:1},8,["class"])]),_:1},16,["id","size","type","class","disabled","tabindex","aria-label"])]),_:3})):ue("v-if",!0)],2)}var ln=Z(tn,[["render",sn],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown.vue"]]);const rn=Q({name:"DropdownItemImpl",components:{ElIcon:Re},props:Ue,emits:["pointermove","pointerleave","click","clickimpl"],setup(e,{emit:o}){const c=he("dropdown"),{role:s}=M(me,void 0),{collectionItemRef:f}=M(on,void 0),{collectionItemRef:d}=M(Do,void 0),{rovingFocusGroupItemRef:a,tabIndex:r,handleFocus:_,handleKeydown:h,handleMousedown:I}=M(Ke,void 0),g=De(f,d,a),E=K(()=>s.value==="menu"?"menuitem":s.value==="navigation"?"link":"button"),t=z(m=>{const{code:u}=m;if(u===S.enter||u===S.space)return m.preventDefault(),m.stopImmediatePropagation(),o("clickimpl",m),!0},h);return{ns:c,itemRef:g,dataset:{[Me]:""},role:E,tabIndex:r,handleFocus:_,handleKeydown:t,handleMousedown:I}}}),an=["aria-disabled","tabindex","role"];function cn(e,o,c,s,f,d){const a=A("el-icon");return F(),J(pe,null,[e.divided?(F(),J("li",ce({key:0,role:"separator",class:e.ns.bem("menu","item","divided")},e.$attrs),null,16)):ue("v-if",!0),$("li",ce({ref:e.itemRef},{...e.dataset,...e.$attrs},{"aria-disabled":e.disabled,class:[e.ns.be("menu","item"),e.ns.is("disabled",e.disabled)],tabindex:e.tabIndex,role:e.role,onClick:o[0]||(o[0]=r=>e.$emit("clickimpl",r)),onFocus:o[1]||(o[1]=(...r)=>e.handleFocus&&e.handleFocus(...r)),onKeydown:o[2]||(o[2]=ge((...r)=>e.handleKeydown&&e.handleKeydown(...r),["self"])),onMousedown:o[3]||(o[3]=(...r)=>e.handleMousedown&&e.handleMousedown(...r)),onPointermove:o[4]||(o[4]=r=>e.$emit("pointermove",r)),onPointerleave:o[5]||(o[5]=r=>e.$emit("pointerleave",r))}),[e.icon?(F(),ie(a,{key:0},{default:v(()=>[(F(),ie(co(e.icon)))]),_:1})):ue("v-if",!0),Y(e.$slots,"default")],16,an)],64)}var un=Z(rn,[["render",cn],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item-impl.vue"]]);const Je=()=>{const e=M("elDropdown",{}),o=K(()=>e==null?void 0:e.dropdownSize);return{elDropdown:e,_elDropdownSize:o}},dn=Q({name:"ElDropdownItem",components:{ElDropdownCollectionItem:xo,ElRovingFocusItem:Vo,ElDropdownItemImpl:un},inheritAttrs:!1,props:Ue,emits:["pointermove","pointerleave","click"],setup(e,{emit:o,attrs:c}){const{elDropdown:s}=Je(),f=be(),d=y(null),a=K(()=>{var t,m;return(m=(t=O(d))==null?void 0:t.textContent)!=null?m:""}),{onItemEnter:r,onItemLeave:_}=M(me,void 0),h=z(t=>(o("pointermove",t),t.defaultPrevented),Se(t=>{if(e.disabled){_(t);return}const m=t.currentTarget;m===document.activeElement||m.contains(document.activeElement)||(r(t),t.defaultPrevented||m==null||m.focus())})),I=z(t=>(o("pointerleave",t),t.defaultPrevented),Se(t=>{_(t)})),g=z(t=>{if(!e.disabled)return o("click",t),t.type!=="keydown"&&t.defaultPrevented},t=>{var m,u,b;if(e.disabled){t.stopImmediatePropagation();return}(m=s==null?void 0:s.hideOnClick)!=null&&m.value&&((u=s.handleClick)==null||u.call(s)),(b=s.commandHandler)==null||b.call(s,e.command,f,t)}),E=K(()=>({...e,...c}));return{handleClick:g,handlePointerMove:h,handlePointerLeave:I,textContent:a,propsAndAttrs:E}}});function pn(e,o,c,s,f,d){var a;const r=A("el-dropdown-item-impl"),_=A("el-roving-focus-item"),h=A("el-dropdown-collection-item");return F(),ie(h,{disabled:e.disabled,"text-value":(a=e.textValue)!=null?a:e.textContent},{default:v(()=>[k(_,{focusable:!e.disabled},{default:v(()=>[k(r,ce(e.propsAndAttrs,{onPointerleave:e.handlePointerLeave,onPointermove:e.handlePointerMove,onClickimpl:e.handleClick}),{default:v(()=>[Y(e.$slots,"default")]),_:3},16,["onPointerleave","onPointermove","onClickimpl"])]),_:3},8,["focusable"])]),_:3},8,["disabled","text-value"])}var ze=Z(dn,[["render",pn],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item.vue"]]);const fn=Q({name:"ElDropdownMenu",props:qo,setup(e){const o=he("dropdown"),{_elDropdownSize:c}=Je(),s=c.value,{focusTrapRef:f,onKeydown:d}=M(no,void 0),{contentRef:a,role:r,triggerId:_}=M(me,void 0),{collectionRef:h,getItems:I}=M(en,void 0),{rovingFocusGroupRef:g,rovingFocusGroupRootStyle:E,tabIndex:t,onBlur:m,onFocus:u,onMousedown:b}=M(ke,void 0),{collectionRef:l}=M(Ie,void 0),D=K(()=>[o.b("menu"),o.bm("menu",s==null?void 0:s.value)]),N=De(a,h,f,g,l),C=z(R=>{var H;(H=e.onKeydown)==null||H.call(e,R)},R=>{const{currentTarget:H,code:V,target:B}=R;if(H.contains(B),S.tab===V&&R.stopImmediatePropagation(),R.preventDefault(),B!==O(a)||!Qo.includes(V))return;const ne=I().filter(X=>!X.disabled).map(X=>X.ref);Ge.includes(V)&&ne.reverse(),Ee(ne)});return{size:s,rovingFocusGroupRootStyle:E,tabIndex:t,dropdownKls:D,role:r,triggerId:_,dropdownListWrapperRef:N,handleKeydown:R=>{C(R),d(R)},onBlur:m,onFocus:u,onMousedown:b}}}),mn=["role","aria-labelledby"];function vn(e,o,c,s,f,d){return F(),J("ul",{ref:e.dropdownListWrapperRef,class:q(e.dropdownKls),style:uo(e.rovingFocusGroupRootStyle),tabindex:-1,role:e.role,"aria-labelledby":e.triggerId,onBlur:o[0]||(o[0]=(...a)=>e.onBlur&&e.onBlur(...a)),onFocus:o[1]||(o[1]=(...a)=>e.onFocus&&e.onFocus(...a)),onKeydown:o[2]||(o[2]=ge((...a)=>e.handleKeydown&&e.handleKeydown(...a),["self"])),onMousedown:o[3]||(o[3]=ge((...a)=>e.onMousedown&&e.onMousedown(...a),["self"]))},[Y(e.$slots,"default")],46,mn)}var Ye=Z(fn,[["render",vn],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-menu.vue"]]);const _n=Ze(ln,{DropdownItem:ze,DropdownMenu:Ye}),gn=Fe(ze),wn=Fe(Ye);const hn=""+new URL("search.5b3fea75.svg",import.meta.url).href,bn=""+new URL("new-chat.d41c9453.svg",import.meta.url).href,In=""+new URL("saved-messages.dcdaa155.svg",import.meta.url).href;const W=e=>(Io("data-v-5b7a1c21"),e=e(),ko(),e),kn={class:"main"},En={class:"users"},yn={key:0,class:"main__top"},Cn=["onClick"],$n=W(()=>$("div",{class:"current__user-selector"},null,-1)),Sn=["src"],Tn=W(()=>$("i",{class:"el-icon-caret-bottom"},null,-1)),On=W(()=>$("span",null,"Logout",-1)),Nn=W(()=>$("div",{class:"current__workspace-selector"},null,-1)),Rn=["src","title","onClick"],Fn={class:"main__bottom"},Dn=W(()=>$("div",{class:"main__user-actions--add_button"},[$("span",null,"+")],-1)),Pn={class:"chats-header"},An=W(()=>$("img",{src:hn,alt:"",class:"chats__button-img"},null,-1)),Ln=W(()=>$("span",{class:"chats__button-text"},"Search",-1)),Mn=W(()=>$("img",{src:bn,alt:"",class:"chats__button-img"},null,-1)),Bn=W(()=>$("span",{class:"chats__button-text"},"Create new chat",-1)),Kn=W(()=>$("img",{src:In,alt:"",class:"chats__button-img"},null,-1)),Un=W(()=>$("span",{class:"chats__button-text"},"Saved messages",-1)),Gn={__name:"Sidebar",setup(e){const o=po(),c=fo(),s=mo(),f=vo(),{profileSuccessData:d,profileFailureData:a,editProfileData:r,editFailureData:_,workspacesSuccessData:h}=_o(o),{$myFetch:I}=go(),g=bo();y(le);const E=y(!0),t=be(),m=y(null),u=wo(),b=y(!1),l=y(!1),D=ho(),N=y(w.get("currentAccountID")?+w.get("currentAccountID"):0),C=y(!1),U=n=>{m.value=n,n!=null&&n.user.avatar?l.value[N.value].avatarUrl=`${g.public.env.serverUrl}${n.avatarPath}/${n.user.avatar}`:l.value[N.value].avatarUrl=`${le}`,localStorage.setItem("accounts",JSON.stringify(l.value))},R=n=>{l.value=JSON.parse(localStorage.getItem("accounts")),l.value[N.value].workspaces=n==null?void 0:n.myWorkspaces,localStorage.setItem("accounts",JSON.stringify(l.value))};ee(h,n=>R(n)),ee(d,n=>{n!=null&&n.user.avatar?l.value[N.value].avatarUrl=`${g.public.env.serverUrl}${n.avatarPath}/${n.user.avatar}`:l.value[N.value].avatarUrl=`${le}`,localStorage.setItem("accounts",JSON.stringify(l.value))}),ee(_,n=>{(n==null?void 0:n.error)==="You don't have permission to access this resource"&&(w.remove("login_pin_token"),w.remove("settings_pin_token"),n=null,u.go())}),ee(a,n=>{(n==null?void 0:n.error)==="You don't have permission to access this resource"&&(w.remove("login_pin_token"),w.remove("settings_pin_token"),n=null,u.go())}),ee(r,n=>{n!=null&&n.user.avatar?l.value[N.value].avatarUrl=`${n.avatarPath}/${n.user.avatar}`:l.value[N.value].avatarUrl=`${le}`,localStorage.setItem("accounts",JSON.stringify(l.value))}),Pe(async()=>{l.value=JSON.parse(localStorage.getItem("accounts")).filter(n=>n.token),w.get("login_pin_token")&&(d.value?U(d.value):o.getProfile(),h.value?R(h.value):await o.getWorkSpaces()),window.addEventListener("resize",B)});const H=()=>{b.value="hovered"},V=()=>{b.value=!1},B=()=>{window.innerWidth<800&&(E.value=!1),t.update()},oe=async n=>{if(C.value=-1,N.value=n,w.set("currentAccountID",n),l.value[n].token===w.get("token")){x("/");return}if(o.$reset(),c.$reset(),s.$reset(),f.$reset(),(Date.parse(l.value[n].token_expires)-Date.now())/864e5<0){l.value.splice(n,1),localStorage.setItem("accounts",JSON.stringify(l.value)),l.value[0]?oe(0):(Object.keys(w.get()).forEach(function(p){w.remove(p,neededAttributes)}),u.go());return}w.set("token",l.value[n].token,{expires:(Date.parse(l.value[n].token_expires)-Date.now())/864e5}),w.set("first_login",l.value[n].first_login),l.value[n].settings_pin_token&&w.set("settings_pin_token",l.value[n].settings_pin_token),l.value[n].login_pin_token&&w.set("login_pin_token",l.value[n].login_pin_token,{expires:(Date.parse(l.value[n].login_pin_token_expires)-new Date)/864e5}),localStorage.setItem("accounts",JSON.stringify(l.value)),l.value[n].first_login===!0?x("/pin"):D.path==="/pin"&&x("/"),o.getProfile(),await o.getWorkSpaces(),x("/")},ne=n=>{N.value=-1,C.value=n,X(n)},X=n=>{x(`/workspace/staff/${n}`)},ve=()=>{w.set("currentAccountID",l.value.length),w.set("addAccount",!0),window.open("/login","_blank")},ye=async n=>{l.value.forEach((P,te)=>P.ID=te),oe(n),await I("logout",{method:"post"});const p=l.value.map(P=>(P.ID===n&&(P.token=null,P.token_expires=null,P.first_login=null,P.settings_pin_token=null),P));o.$reset(),c.$reset(),s.$reset(),f.$reset();const T=p.findIndex(P=>P.token);p[T]?Date.parse(p[T].token_expires)-Date.now()>0?(w.set("token",p[T].token,{expires:(Date.parse(p[T].token_expires)-Date.now())/864e5}),p[T].first_login===!0&&w.set("first_login",p[T].first_login),p[T].settings_pin_token&&w.set("settings_pin_token",p[T].settings_pin_token),p[T].login_pin_token&&w.set("login_pin_token",p[T].login_pin_token,{expires:(Date.parse(p[T].login_pin_token_expires)-new Date)/864e5}),w.set("currentAccountID",T),o.getProfile(),await o.getWorkSpaces(),l.value=p,localStorage.setItem("accounts",JSON.stringify(p)),u.go()):p.shift():(w.remove("token"),w.remove("first_login"),w.remove("settings_pin_token"),w.remove("login_pin_token"),localStorage.setItem("accounts",JSON.stringify(p)),l.value=p,x("/login"))},_e=(n,p)=>{switch(n){case"u":return p===N.value?"currentUser":!1;default:return p===+C.value?"currentWorkspace":!1}},i=n=>{window.innerWidth>800?E.value=!E.value:E.value=!1},L=K(()=>l.value.reduce((n,p)=>(p.token&&n.push(p),n),[]));return(n,p)=>{const T=gn,P=wn,te=_n,de=we;return F(),J("nav",kn,[$("div",En,[l.value?(F(),J("div",yn,[(F(!0),J(pe,null,Te(L.value,G=>{var Ce;return F(),J(pe,{key:G.ID},[k(te,{class:q(["main__user-actions",{currentUser:_e("u",G.ID),bordered:(Ce=G.workspaces)==null?void 0:Ce.length}])},{dropdown:v(()=>[k(P,null,{default:v(()=>[k(T,{class:"main__user-actions--add_element",onClick:se=>ye(G.ID)},{default:v(()=>[On]),_:2},1032,["onClick"])]),_:2},1024)]),default:v(()=>[$("div",{class:"main__user-actions--user",onClick:se=>oe(G.ID)},[$n,$("img",{src:G.avatarUrl?G.avatarUrl:O(le),alt:"Avatar",class:"main__user-actions--avatar"},null,8,Sn),Tn],8,Cn)]),_:2},1032,["class"]),(F(!0),J(pe,null,Te(G.workspaces,se=>(F(),J("div",{key:se.id,class:q(["main__user-workspaces",_e("w",se.id)])},[Nn,$("img",{src:G.avatarUrl?G.avatarUrl:O(le),alt:"Avatar",class:"main__user-workspaces--avatar",title:se.name,onClick:Jn=>ne(se.id)},null,8,Rn)],2))),128))],64)}),128))])):ue("",!0),$("div",Fn,[k(te,{class:"main__user-actions-add"},{dropdown:v(()=>[k(P,{class:"main__user-actions--add_actions"},{default:v(()=>[k(T,{class:"main__user-actions--add_element"},{default:v(()=>[$("span",{class:q(b.value),onClick:ve,onMouseover:H,onMouseout:V}," Add account ",34)]),_:1}),k(T,{class:"main__user-actions--add_element"},{default:v(()=>[$("span",{class:q(b.value),onClick:p[0]||(p[0]=G=>("navigateTo"in n?n.navigateTo:O(x))("/create-workspace")),onMouseover:H,onMouseout:V}," Add workspace ",34)]),_:1})]),_:1})]),default:v(()=>[Dn]),_:1})])]),O(D).path.includes("workspace")||O(D).fullPath=="/"?(F(),J("div",{key:0,class:q(["chats",E.value?"large":"small"])},[$("div",Pn,[k(de,{class:"chats__search"},{default:v(()=>[An,Ln]),_:1}),k(de,{class:"chats__create"},{default:v(()=>[Mn,Bn]),_:1}),k(de,{class:"chats__saved"},{default:v(()=>[Kn,Un]),_:1})]),k(de,{class:q(["chats-button",E.value?"right":"left"]),onClick:i},null,8,["class"])],2)):ue("",!0)])}}},Qn=Eo(Gn,[["__scopeId","data-v-5b7a1c21"]]);export{Qn as default};