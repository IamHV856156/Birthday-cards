document.addEventListener('DOMContentLoaded',()=>{
    const card= document.querySelector('.card');
    const candle= document.querySelector('.candle');
    const insideh1 = document.querySelector('.inside h1');
    const outside = document.querySelector('.outside');
    const cool= document.querySelector('.cool');
    const cake= document.querySelector('.cake');
    const customcursor = document.getElementById('customcursor');
    const colors = ['#FF69B4','#8A2BE2','#00CED1','#FFD700','#FF4500','#32CD32','#1E90FF','#BA55D3','#FF8C00','#ADFF2F','#DA70D6','#40E0D0','#FF1493','#6495ED','#DC143C','#00FF7F','#8B008B','#FFFF00' ];
    const num_confetti=100;

    //Cursor logic
    if(customcursor){
        document.addEventListener('mousemove',(e)=>{
            customcursor.style.left =e.clientX+'px';
            customcursor.style.top =e.clientY+'px';
        });

        document.addEventListener('mousedown',()=>{
            customcursor.classList.add('active');
        });

        document.addEventListener('mouseup',()=>{
            customcursor.classList.remove('active');
        });
    }else{
        console.log("Custom cursor element with ID'customcursor' not Found")
    }

    function createconfetti(){
        if(!cool){
            console.error("Error:'.cool' Element not found in the DOM. Confetti can'nt be created.");
            return[];
        }
        const confettiPieces = [];
        for(let i = 0 ; i < num_confetti; i++){
            
            const svgparticle = document.createElementNS("http://www.w3.org/2000/svg","svg");
            svgparticle.setAttribute("viewBox", "0 0 20 20");
            svgparticle.style.position='absolute';
            svgparticle.style.width='15px';
            svgparticle.style.height='15px';
            svgparticle.classList.add('confetti');

            const randomcolor = colors[Math.floor(Math.random()*colors.length)];
            svgparticle.style.fill=randomcolor;

            const shapetypes =['circle','star','heart'];

            const randomshape = shapetypes[Math.floor(Math.random()*shapetypes.length)];

            let shapeElement;
            if(randomshape === 'star'){
                shapeElement = document.createElementNS("http://www.w3.org/2000/svg","path");
                shapeElement.setAttribute("d","M10 0 L13 6 L20 7 L15 12 L16 20 L10 16 L4 20 L5 12 L0 7 L7 6 Z");
            }else if(randomshape === 'heart'){
                 shapeElement = document.createElementNS("http://www.w3.org/2000/svg","path");
                 shapeElement.setAttribute("d","M10 2.75C10 0 16.5 0 20 5C23.5 10 10 20 10 20S-3.5 10 0 5C3.5 0 10 0 10 2.75Z");
            }else{
                shapeElement = document.createElementNS("http://www.w3.org/2000/svg","circle");
                shapeElement.setAttribute("cx","10");
                shapeElement.setAttribute("cy","10");
                shapeElement.setAttribute("r","10");
            }
            svgparticle.appendChild(shapeElement);
            cool.appendChild(svgparticle);
            confettiPieces.push(svgparticle);
        }
        return confettiPieces;
    }

    const confetti=createconfetti();

    function randomizeconfetti() {
        confetti.forEach((confetti) => {
            const randomcolor= colors[Math.floor(Math.random()*colors.length)];
            confetti.style.backgroundColor=randomcolor;

            const startX_vw = Math.random() * 100; 
            const startY_vh = Math.random() * 100; 

            confetti.style.left = `${startX_vw}vw`;
            confetti.style.top = `${startY_vh}vh`;


            const endX_vw = (Math.random() * 400) - 150;
            const endY_vh = (Math.random() * 400) - 150;

            const moveX= endX_vw-startX_vw;
            const moveY= endY_vh-startY_vh;
            confetti.style.setProperty('--move-x', `${moveX}vw`);
            confetti.style.setProperty('--move-y', `${moveY}vh`);

            const rotation=Math.random()*720-360+'deg';
            confetti.style.setProperty('--rotate',rotation);

            const delay= Math.random()*2.5+'s';
            confetti.style.setProperty('--delay',delay);

            confetti.style.opacity = 0;
            confetti.style.transform = 'scale(0)';
        });
    }
    randomizeconfetti();

    document.body.addEventListener('click',()=>{
        if(candle.classList.contains('flipped')){
            return;
        }
        cool.classList.add('burst');
        confetti.forEach(confetti=>{
            confetti.style.animation='none';
            confetti.offsetHeight;
            confetti.style.animation='';
            confetti.style.opacity=0;
            confetti.style.transform='scale(0)';
        });
        randomizeconfetti();

        const confettitime=(2+2)*1000;
        setTimeout(() => {
       cool.classList.remove('burst');
       confetti.forEach(confetti=>{
        confetti.style.opacity=0;
        confetti.style.transform='scale(0)';
       });
        }, confettitime);
    });
        cake.addEventListener('click',()=>{
        card.classList.add('flipped');
        goback.classList.add('show');
    });

    goback.addEventListener('click',()=>{
        card.classList.remove('flipped');
        cool.classList.remove('burst');
        goback.classList.remove('show');
    });
});