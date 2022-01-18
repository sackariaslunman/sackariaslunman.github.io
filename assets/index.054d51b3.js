import{s as d,j as s,a as r,T as a,m as c,P as u,R as f,b as p}from"./vendor.c1950395.js";const m=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}};m();const y=d.section`
    display: grid;
    overflow-x: hidden;
    grid-template-columns: 2fr 1fr;
    min-height: 80vh;
    background: #1C7293;

    > div {
        padding: 5rem;
        h1 {
            color: white;   
            font-size: 4rem;
            padding-bottom: 2rem;
        }
        p {
            color: white;
            font-size: 2rem;
        }
    }
`,h=()=>s(y,{children:[s("div",{children:[r("h1",{children:r(a,{options:{delay:50,strings:["Sackarias Lunman","Hey sharty, it's your squirt day"],autoStart:!0}})}),r("p",{children:r(a,{options:{delay:50,strings:["Professional web design and entrepreneur","We gonna shitty farty like it's your squirt day"],autoStart:!0}})})]}),r(c.div,{animate:{x:[500,0,-500],rotate:[90,0,-90],opacity:[0,1,0]},transition:{duration:10,delay:1,repeat:1/0},children:r(u,{autoplay:!0,loop:!0,src:"https://assets6.lottiefiles.com/packages/lf20_wX8OA5.json",style:{height:"500px",width:"500px"}})})]}),g=()=>r("main",{children:r(h,{})});f.render(r(p.StrictMode,{children:r(g,{})}),document.getElementById("root"));
