import{a as f,S as m,i as a}from"./assets/vendor-CaRFiM55.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const h="51560534-ee0888e2507fe11f794ee77c8";function y(n){return f("https://pixabay.com/api/",{params:{key:h,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r.data.hits)}function g(n){const r=n.map(({webformatURL:o,largeImageURL:s,tags:e,likes:t,views:i,comments:p,downloads:d})=>`
        <li>
            <a href="${s}">
            <img src="${o}" alt="${e}" width="360"/></a>
            <div class="descr">
                <p><span>Likes</span> ${t}</p>
                <p><span>Views</span> ${i}</p>
                <p><span>Comments</span> ${p}</p>
                <p><span>Downloads</span> ${d}</p>
            </div>
        </li>
    `).join("");u.insertAdjacentHTML("beforeend",r),c.refresh()}const c=new m(".gallery a",{captionsData:"alt",captionsDelay:250});function L(){u.innerHTML="",c.refresh()}const l=document.querySelector(".loader");function b(){l.classList.remove("hidden")}function S(){l.classList.add("hidden")}const v=document.querySelector(".form"),w=document.querySelector("input"),u=document.querySelector(".gallery");v.addEventListener("submit",q);function q(n){n.preventDefault();const r=w.value.toLowerCase().trim();if(!r){a.warning({title:"Warning",message:"Fill in the field!",position:"topRight"});return}b(),L(),y(r).then(o=>{o.length===0?a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):g(o)}).catch(o=>{console.log(o)}).finally(()=>{S()})}
//# sourceMappingURL=index.js.map
