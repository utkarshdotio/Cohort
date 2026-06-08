let main=document.querySelector('main')
let body=document.querySelector('body')

main.addEventListener('mousemove',function(e){
    console.log('hi');

main.style.setProperty('--x',e.x+'px')
main.style.setProperty('--y',e.y+'px')

})