var grow=0;

var btn=document.querySelector('button')
var h2=document.querySelector('h2')
var bar=document.querySelector('.inner')

btn.addEventListener('click',()=>{
    btn.style.pointerEvents='none'
    var int=setInterval(()=>{
        grow++
        h2.innerHTML=grow+'%'
        bar.style.width=grow+'%'
    },50);

    setTimeout(()=>{
        clearInterval(int)
        btn.innerHTML='Downloaded'
        btn.style.opacity=0.5
    },5000);
})