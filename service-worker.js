if(!self.define){let e,s={};const r=(r,n)=>(r=new URL(r+".js",n).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(n,i)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const c=e=>r(e,o),l={module:{uri:o},exports:t,require:c};s[o]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(i(...e),t)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"ehr_frontend"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/app.97de4efa.css",revision:null},{url:"/index.html",revision:"e043aad29ca7b6285d748d1bcbe5dddc"},{url:"/js/about.5937ec72.js",revision:null},{url:"/js/app.5ba5405b.js",revision:null},{url:"/js/chunk-vendors.c79a767f.js",revision:null},{url:"/manifest.json",revision:"1658089f5ec75cbb162585183ced3247"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map