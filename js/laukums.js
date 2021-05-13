
var krasinja = ["#ed0e0e", "#21ed0e", "#0e2ced", "#ff73c7",
                "#fff130", "#ff8c19", "#ba02d6", "#ffffff",
                "#000000", "#757575", "#60fcef", "#60fcc3",
                "#964b00", "#b57edc", "#f5e8b0", "#bab86c",
                "#ff7f50", "#ffa07a"];
var vardinjs = ["red",     "green",   "blue",    "pink",
                "yellow",  "orange",  "purple",  "white",
                "black",   "gray",    "aqua",    "mint",
                "brown",   "lavender", "beige",  "olive",
                "coral",   "salmon"];
var mix = [];
var klik = false;
var meta;
var open = [];
var pp = 0;
var sakums; 
var n;

function zimeLaukumu() {
    open = [];
    sakums = new Date().getTime();
    if(document.getElementById("butt").hasChildNodes()){
        document.getElementById("butt").removeChild(document.getElementById("butt").childNodes[0]);
    }
    n = document.getElementById("n").value;
    var diviitis = document.createElement("div");
    miksinjs(n);
    if(n!=3&&n!=5){
        for(var y=0; y<n; y++){
            let rinda = document.createElement("div");
            for(var x=0; x<n; x++){                            
                let poga = document.createElement("button");
                poga.setAttribute("class","podzinja");
                poga.style.background = "";
                let bildite = document.createElement("img");
                bildite.setAttribute("src", "images/background.jpg");
                bildite.setAttribute("class", "bildite");
                poga.appendChild(bildite);
                poga.setAttribute("id", y*n+x);
                poga.onclick = function(){
                    if(open.indexOf(poga.id)==-1){
                        maina(poga.id);
                    }
                }
                rinda.appendChild(poga);                    
            }
            diviitis.appendChild(rinda);
        }
        document.getElementById("butt").appendChild(diviitis);
    }    
}

function miksinjs(k){
    mix = [];
    for(let i=0; i<k*k/2; i++){
        mix.push(krasinja[i]);
        mix.push(vardinjs[i]);
    }
    for(let i=0; i<mix.length; i++){
        var rand = Math.floor(Math.random()*mix.length);
        var tmp = mix[rand];
        mix[rand] = mix[i];
        mix[i] = tmp;
    }
}

function mainaBilditi(g){
        if (klik){
        document.getElementById(g).style.background = "";
        document.getElementById(g).innerHTML = "";
        let bildite = document.createElement("img");
        bildite.setAttribute("src", "images/background.jpg");
        bildite.setAttribute("class", "bildite");
        document.getElementById(g).appendChild(bildite);
    }
    else {
        document.getElementById(g).innerHTML = "";
        if(mix[g].charAt(0)=='#'){
            document.getElementById(g).style.background = mix[g];
        }else document.getElementById(g).innerHTML = mix[g];
    }                
}

function maina(g){
    if(pp==1)return;
    if(!klik){
        meta = g;
        mainaBilditi(g);
        klik = true;
    }
    else{
        if(g==meta){
            mainaBilditi(g);
            klik = false;
        }
        else{
            klik = false;
            mainaBilditi(g);
            let poga1 = mix[meta];
            let poga2 = mix[g];
            if(vardinjs.indexOf(poga1)==krasinja.indexOf(poga2)&&krasinja.indexOf(poga1)==vardinjs.indexOf(poga2)){
                open.push(meta);
                open.push(g);
                if(open.length>=n*n){
                    var beigas = new Date().getTime();
                    var laiks = (beigas - sakums)/1000;
                    if(laiks>60){
                        let min = laiks/60 - (laiks/60)%1;
                        laiks = Math.round((laiks-60*min)*1000)/1000;
                        setTimeout(function(){alert("Tavs laiks: " + min + " min " + laiks + " s");}, 500);
                    }else{
                        setTimeout(function(){alert("Tavs laiks: " + laiks + " s");}, 500);
                    }
                    fetchy();
                }
                meta = -1;
            }else{
                klik = true;
                pp = 1;
                setTimeout(function(){
                    mainaBilditi(g);
                    mainaBilditi(meta);
                    klik = false;
                    pp = 0;                        
                    }, 1000);
            }
        }
    }
}

function fetchy(){
    fetch('https://dog.ceo/api/breeds/image/random', {
          method: 'GET'})
        .then(res => res.json())
        .then(data => {
            let imag = data.message;
            let bb = document.createElement("IMG");
            bb.src = imag;
            document.getElementById("dog").appendChild(bb);
            
        });
}