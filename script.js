const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const overlay = document.getElementById("modal-overlay");
const modal = document.getElementById("modal-box");
const closeBtn = document.getElementById("close-modal");
const bell = document.getElementById("bell");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function render(){
 list.innerHTML = "";
 tasks.forEach((t,i)=>{
   let li = document.createElement("li");
   li.innerHTML = `${t.text} <span class='del'>✖</span>`;
   if(t.done) li.classList.add("completed");
   li.onclick = ()=> toggle(i);
   li.querySelector(".del").onclick = (e)=>{e.stopPropagation(); del(i)}
   list.appendChild(li);
 });
 checkAllCompleted();
 localStorage.setItem("tasks", JSON.stringify(tasks));
}

function add(){
 let text = input.value.trim();
 if(!text) return;
 tasks.push({text, done:false});
 input.value = "";
 render();
}

function toggle(i){
 tasks[i].done = !tasks[i].done;
 bell.play();
 render();
}

function del(i){
 tasks.splice(i,1);
 render();
}

function checkAllCompleted(){
 if(tasks.length && tasks.every(t=>t.done)){
   celebration();
 }
}

function celebration(){
 overlay.style.display="block";
 modal.style.display="block";

 gsap.from(modal,{scale:0.6,opacity:0,duration:0.5});

 confetti();
 startFireworks();
}

function closeCelebration(){
    stopFireworks();
 gsap.to(modal,{scale:0.7,opacity:0,duration:0.3,onComplete:()=>{
   modal.style.display="none";
 }});
 gsap.to(overlay,{opacity:0,duration:0.3,onComplete:()=>{
   overlay.style.display="none";
   overlay.style.opacity=1;
 }});
}

overlay.onclick = closeCelebration;
closeBtn.onclick = closeCelebration;
addBtn.onclick = add;

render();

