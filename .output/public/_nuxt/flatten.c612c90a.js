import{k as l,n as r}from"./el-overlay.303db8d7.js";import{S as e,f as h}from"./focus-trap.a4932e6f.js";var m=e?e.isConcatSpreadable:void 0;function S(n){return h(n)||l(n)||!!(m&&n&&n[m])}function b(n,o,i,s,f){var a=-1,g=n.length;for(i||(i=S),f||(f=[]);++a<g;){var t=n[a];o>0&&i(t)?o>1?b(t,o-1,i,s,f):r(f,t):s||(f[f.length]=t)}return f}function F(n){var o=n==null?0:n.length;return o?b(n,1):[]}export{F as f};