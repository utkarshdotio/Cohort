var box=document.querySelector('#box');
var btn=document.querySelector('#btn');
var h2=document.querySelector('#h2');

btn.addEventListener('click',function(){
    var c1=Math.floor(Math.random()*256)
    var c2=Math.floor(Math.random()*256)
    var c3=Math.floor(Math.random()*256)
    console.log(c1,c2,c3);
    var colCode= `${c1},${c2},${c3}`    
    h2.innerHTML=colCode
    
    box.style.backgroundColor=`rgb(${c1},${c2},${c3})`

})