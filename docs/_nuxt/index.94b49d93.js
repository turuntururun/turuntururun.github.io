import{_ as g}from"./Tile.744ce090.js";import{_ as f}from"./nuxt-link.525f5fe0.js";import{a as l,s as c}from"./global.cafc2166.js";import{f as h,_ as y,c as o,a,b as n,w as d,i as p,g as x,t as u,F as S,o as s,d as m,p as v,e as k}from"./entry.9df53dfd.js";const b=h({name:"FalconGameIndex",data:()=>({message:{type:"info",text:"Loading...",target:""}}),mounted(){l.get(c+"/actuator/health").then(e=>{e.status==200&&e.data.status=="UP"?this.message.text="":this.message.text="Service unavailable"}).catch(e=>{this.message.text="Service unavailable"})},methods:{requestMultiplayerSession(){l.post(c+"/board").then(e=>{if(e.status==201){const t=e.data;this.message.type="success",this.message.text='Session "'+t+'" created',this.message.target="/falcon/board/"+t}})}}});const F=e=>(v("data-v-56145814"),e=e(),k(),e),I=F(()=>a("h1",null,"Falcon",-1)),B={class:"container"},C={key:2};function $(e,t,M,N,V,q){const i=g,r=f;return s(),o(S,null,[I,a("div",B,[a("span",null,[n(i,{content:"🕺",size:"5"}),n(r,{to:"/falcon/singleplayer"},{default:d(()=>[m(" Single Player Board")]),_:1})]),a("span",null,[n(i,{content:"👯",size:"5"}),e.message.text?p("",!0):(s(),o("button",{key:0,onClick:t[0]||(t[0]=(..._)=>e.requestMultiplayerSession&&e.requestMultiplayerSession(..._))}," Create Multiplayer Session")),e.message.type==="success"?(s(),x(r,{key:1,to:e.message.target},{default:d(()=>[m(u(e.message.text),1)]),_:1},8,["to"])):e.message.text?(s(),o("span",C,u(e.message.text),1)):p("",!0)])])],64)}const U=y(b,[["render",$],["__scopeId","data-v-56145814"]]);export{U as default};
