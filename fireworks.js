let fwCanvas, fwCtx, fwParticles = [], fwRunning = false;

function startFireworks(){
    if(fwRunning) return;
    fwRunning = true;

    // create canvas
    fwCanvas = document.createElement("canvas");
    fwCanvas.style.position = "fixed";
    fwCanvas.style.top = 0;
    fwCanvas.style.left = 0;
    fwCanvas.style.pointerEvents = "none";
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
    document.body.appendChild(fwCanvas);

    fwCtx = fwCanvas.getContext("2d");
    animateFireworks();
}

function animateFireworks(){
    if(!fwRunning) return;

    requestAnimationFrame(animateFireworks);

    fwCtx.fillStyle = "rgba(0,0,0,0.15)";
    fwCtx.fillRect(0,0,fwCanvas.width,fwCanvas.height);

    if(Math.random() < 0.05){
        createFirework();
    }

    fwParticles.forEach((p,i)=>{
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.life--;

        if(p.life <= 0){
            fwParticles.splice(i,1);
        }

        fwCtx.beginPath();
        fwCtx.fillStyle = `hsl(${p.color},100%,55%)`;
        fwCtx.arc(p.x,p.y,p.size,0,Math.PI*2);
        fwCtx.fill();
    });
}

function createFirework(){
    let x = Math.random()*fwCanvas.width;
    let y = Math.random()*fwCanvas.height*0.5;
    let count = 30;

    for(let i=0;i<count;i++){
        let speed = Math.random()*3+1;
        let angle = (Math.PI*2*(i/count));
        fwParticles.push({
            x:x,
            y:y,
            vx:Math.cos(angle)*speed,
            vy:Math.sin(angle)*speed,
            size:2,
            color:Math.floor(Math.random()*360),
            life:50 + Math.random()*20
        });
    }
}

function stopFireworks(){
    fwRunning = false;
    if(fwCanvas){
        fwCanvas.remove();
        fwCanvas = null;
        fwCtx = null;
        fwParticles = [];
    }
}

window.addEventListener("resize",()=>{
    if(!fwCanvas) return;
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
});
