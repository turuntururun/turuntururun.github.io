import{f as p,_,o as s,c as r,a as o,F as a,r as l,h as u,B as $,v as m,b as y}from"./ijfy-fo6.js";import{s as b,b as k,g as x,m as M,a as v,h as w,c as F,d as P,o as N}from"./jTL_rliE.js";const j=p({name:"Fretboard",data(){return{yPadding:10,xPadding:10,criterion:Math.ceil}},props:["fingerings"],computed:{strings(){return[1,2,3,4,5,6]},frets(){return[0,1,2,3,4,5,6,7,8,9,10,11,12]}},methods:{toFretPosition(e,n){const c=Math.max(2.5+n*15,5),d=10+e*5;return`translate(${c},${d})`}}}),B={viewBox:"0 0 200 45"},V=["y1","y2"],D=["x1","x2"],O=["cx"],T=["transform"],U=o("circle",{r:"2.5",cx:"0",cy:"0",fill:"white",stroke:"black","stroke-width":"0.5"},null,-1),C=o("text",{x:"-1.5",y:"1.6","font-size":"5","font-weight":"bold","font-family":"monospace"},"X",-1),z=[U,C];function E(e,n,c,d,f,g){return s(),r("svg",B,[o("g",null,[(s(!0),r(a,null,l(e.strings,t=>(s(),r("line",{class:"guitar-strings",x1:"10",y1:10+t*5,x2:"200",y2:10+t*5,stroke:"black","stroke-width":"1"},null,8,V))),256)),(s(!0),r(a,null,l(e.frets,t=>(s(),r("line",{class:"guitar-frets",y1:"15",x1:10+t*15,y2:"40",x2:10+t*15,stroke:"black","stroke-width":"1"},null,8,D))),256)),(s(),r(a,null,l([3,5,7,9,12,15],t=>o("circle",{r:"1",cx:2.5+t*15,cy:"27.5",fill:"gray"},null,8,O)),64))]),(s(!0),r(a,null,l(e.fingerings,(t,i)=>(s(),r("g",{transform:e.toFretPosition(t.string,t.fret),key:i},z,8,T))),128))])}const h=_(j,[["render",E]]),L=p({name:"guitar-proficiency",components:{Fretboard:h},data:()=>({scale:"major",baseNote:48,mode:1}),methods:{},computed:{notes(){let e=b(this.scaleProvider,k(this.mode),N(2),P)(this.baseNote);return x(e)},scaleProvider(){return{major:M,melodicMinor:v,harmonicMinor:w,harmonicMajor:F}[this.scale]}}}),S=o("option",null,"major",-1),X=o("option",null,"melodicMinor",-1),q=o("option",null,"harmonicMinor",-1),A=o("option",null,"harmonicMajor",-1),G=[S,X,q,A],H=o("p",null,"TODO render music notation",-1),I=o("p",null,"TODO show exercise data",-1);function J(e,n,c,d,f,g){const t=h;return s(),r(a,null,[u(o("select",{"onUpdate:modelValue":n[0]||(n[0]=i=>e.scale=i)},G,512),[[$,e.scale]]),u(o("input",{type:"number","onUpdate:modelValue":n[1]||(n[1]=i=>e.baseNote=i)},null,512),[[m,e.baseNote]]),u(o("input",{type:"number","onUpdate:modelValue":n[2]||(n[2]=i=>e.mode=i)},null,512),[[m,e.mode]]),y(t,{fingerings:e.notes},null,8,["fingerings"]),H,I],64)}const R=_(L,[["render",J]]);export{R as default};
