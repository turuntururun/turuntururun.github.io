import{j as y,x as d,y as w,z as g,A as H,e as x,B as S,C as _,D as c}from"./ji6UcOtm.js";import{u as b}from"./BY8grAnf.js";import j from"./_lARviXv.js";import q from"./DR55-Lgh.js";import"./DPI7kPeI.js";import"./Dym_awWQ.js";import"./BBQE3Abr.js";import"./BRFeUzZa.js";import"./qYggdlv5.js";const a=(p,s=y())=>{const e=d(p),f=g();w(()=>d(p),(n=e)=>{if(!s.path||!n)return;const t=Object.assign({},(n==null?void 0:n.head)||{});t.meta=[...t.meta||[]],t.link=[...t.link||[]];const r=t.title||(n==null?void 0:n.title);r&&(t.title=r),f.public.content.host;const u=(t==null?void 0:t.description)||(n==null?void 0:n.description);u&&t.meta.filter(l=>l.name==="description").length===0&&t.meta.push({name:"description",content:u}),t!=null&&t.image||(n==null||n.image),H(()=>b(t))},{immediate:!0})},v=x({name:"ContentDoc",props:{tag:{type:String,required:!1,default:"div"},excerpt:{type:Boolean,default:!1},path:{type:String,required:!1,default:void 0},query:{type:Object,required:!1,default:void 0},head:{type:Boolean,required:!1,default:void 0}},render(p){const{contentHead:s}=g().public.content,e=S(),{tag:f,excerpt:m,path:n,query:t,head:r}=p,u=r===void 0?s:r,l={...t||{},path:n||(t==null?void 0:t.path)||_(y().path),find:"one"},C=(i,o)=>c("pre",null,JSON.stringify({message:"You should use slots with <ContentDoc>",slot:i,data:o},null,2));return c(q,l,{default:e!=null&&e.default?({data:i,refresh:o,isPartial:D})=>{var h;return u&&a(i),(h=e.default)==null?void 0:h.call(e,{doc:i,refresh:o,isPartial:D,excerpt:m,...this.$attrs})}:({data:i})=>(u&&a(i),c(j,{value:i,excerpt:m,tag:f,...this.$attrs},{empty:o=>e!=null&&e.empty?e.empty(o):C("default",i)})),empty:i=>{var o;return((o=e==null?void 0:e.empty)==null?void 0:o.call(e,i))||c("p",null,"Document is empty, overwrite this content with #empty slot in <ContentDoc>.")},"not-found":i=>{var o;return((o=e==null?void 0:e["not-found"])==null?void 0:o.call(e,i))||c("p",null,"Document not found, overwrite this content with #not-found slot in <ContentDoc>.")}})}}),I=v;export{I as default};
