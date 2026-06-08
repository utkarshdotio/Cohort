let box1=document.querySelector('#box1')
let box2=document.querySelector('#box2')

box1.addEventListener('mouseenter',function(){
    console.log("AAya");
    box1.style.backgroundImage='url(https://images.unsplash.com/photo-1574539602047-548bf9557352?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
    box1.style.backgroundSize='cover'; 
    box1.innerHTML=''
    
    
})
box1.addEventListener('mouseleave',function(){
    console.log("Gaya");
    box1.style.backgroundImage='none'
    box1.innerHTML='Aaao Naa'

 
    
})


box1.addEventListener('mousemove',function(){
    console.log("BKL");
 
    
})

