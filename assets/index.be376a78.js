import{s as l,j as d,R as a,a as s,b as u}from"./vendor.a4cbdc90.js";const f=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}};f();l.section`
    display: grid;
    overflow: hidden;
    min-height: 90vh;
    width: 100vw;
    background: #054A91;

    > div.text {
        padding: 5rem;
        z-index: 10;
        h1 {
            color: white;   
            font-size: 4rem;
            padding-bottom: 2rem;
        }
        h2 {
            color: white;
            font-size: 2rem;
        }
    }
    > div.slide {
        position: absolute;
        bottom: 5rem;
        right: 10rem;
    }
`;const m=[{job:"engineer",color:"#FFC085"},{job:"full-stack developer",color:"#FFE070"},{job:"student in mechatronics",color:"#F49690"}];m.map(t=>`I'm ${t.job[0].match(/[aeiou]/gi)?"an":"a"} <span style="color: ${t.color}">${t.job}</span>.`);const p=()=>d("main",{children:["under construction",null]});a.render(s(u.StrictMode,{children:s(p,{})}),document.getElementById("root"));
