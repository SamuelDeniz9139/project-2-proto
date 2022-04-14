(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("animeMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,n)=>{const r=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),i=await r.json();document.getElementById("animeMessage").classList.add("hidden"),i.error&&t(i.error),i.redirect&&(window.location=i.redirect),n&&n(i)},hideError:()=>{document.getElementById("animeMessage").classList.add("hidden")}}}},t={};function a(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,a),i.exports}(()=>{const e=a(603),t=t=>{t.preventDefault(),e.hideError();let a=t.target.querySelector("#animeName").value,n=t.target.querySelector("#animeGenre").value,r=t.target.querySelector("#animeRating").value;const m=t.target.querySelector("#_csrf").value;if(a||n||r){if(!a||!n||!r)return e.handleError("All fields are required."),!1}else a="Cory In The House",n="Isekai",r="999";return e.sendPost(t.target.action,{name:a,genre:n,rating:r,_csrf:m},i),!1},n=e=>React.createElement("form",{id:"animeForm",onSubmit:t,name:"animeForm",action:"/maker",method:"POST",className:"animeForm"},React.createElement("input",{id:"animeName",type:"text",name:"name",placeholder:"Anime Title"}),React.createElement("input",{id:"animeGenre",type:"text",name:"genre",placeholder:"Genre"}),React.createElement("input",{id:"animeRating",type:"number",min:"0",name:"rating"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"makeAnimeSubmit",type:"submit",value:"Add to your list"})),r=e=>{if(0===e.animes.length)return React.createElement("div",{className:"animeList"},React.createElement("h3",{className:"emptyAnime"},"You don't have a backlog yet."));const t=e.animes.map((e=>React.createElement("div",{key:e._id,className:"anime"},React.createElement("h3",{className:"animeInfo"}," Title: ",e.name,"; Genre: ",e.genre,"; Rating: ",e.rating," "))));return React.createElement("div",{className:"animeList"},t)},i=async()=>{const e=await fetch("/getAnimes"),t=await e.json();ReactDOM.render(React.createElement(r,{animes:t.animes}),document.getElementById("animes"))};window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json();ReactDOM.render(React.createElement(n,{csrf:t.csrfToken}),document.getElementById("makeAnime")),ReactDOM.render(React.createElement(r,{animes:[]}),document.getElementById("animes")),i()}})()})();