function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./_KJRY21I.js","./ijfy-fo6.js","./DGcR8IoK.js","./DzsT06qt.js","./BsYmvPZw.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{u as m}from"./BWA3hvKo.js";import{G as v,R as l,S as d,T as g,y,f as h,s as _,U as w,H as C,J as p}from"./ijfy-fo6.js";import{h as f,u as P}from"./DzsT06qt.js";import{q as $,w as c,e as x,s as N,j as T,u as E}from"./DGcR8IoK.js";import{_ as S}from"./Pif_hRkD.js";const j=async t=>{const{content:e}=v().public;typeof(t==null?void 0:t.params)!="function"&&(t=$(t));const n=t.params(),o=e.experimental.stripQueryParameters?c(`/navigation/${`${f(n)}.${e.integrity}`}/${x(n)}.json`):c(`/navigation/${f(n)}.${e.integrity}.json`);if(N())return(await l(()=>import("./_KJRY21I.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(i=>i.generateNavigation))(n);const a=await $fetch(o,{method:"GET",responseType:"json",params:e.experimental.stripQueryParameters?void 0:{_params:T(n),previewToken:P().getPreviewToken()}});if(typeof a=="string"&&a.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return a},R="$s";function b(...t){const e=typeof t[t.length-1]=="string"?t.pop():void 0;typeof t[0]!="string"&&t.unshift(e);const[n,o]=t;if(!n||typeof n!="string")throw new TypeError("[nuxt] [useState] key must be a string: "+n);if(o!==void 0&&typeof o!="function")throw new Error("[nuxt] [useState] init must be a function: "+o);const a=R+n,r=y(),i=d(r.payload.state,a);if(i.value===void 0&&o){const s=o();if(g(s))return r.payload.state[a]=s,s;i.value=s}return i}const D=h({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(t){const{query:e}=_(t),n=w(()=>{var a;return typeof((a=e.value)==null?void 0:a.params)=="function"?e.value.params():e.value});if(!n.value&&b("dd-navigation").value){const{navigation:a}=E();return{navigation:a}}const{data:o}=await m(`content-navigation-${f(n.value)}`,()=>j(n.value));return{navigation:o}},render(t){const e=C(),{navigation:n}=t,o=i=>p(S,{to:i._path},()=>i.title),a=(i,s)=>p("ul",s?{"data-level":s}:null,i.map(u=>u.children?p("li",null,[o(u),a(u.children,s+1)]):p("li",null,o(u)))),r=i=>a(i,0);return e!=null&&e.default?e.default({navigation:n,...this.$attrs}):r(n)}}),G=D;export{G as default};
