// map always returns a brand new array.


let p=document.querySelector('p');
let text=p.innerText

let characters ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let iteration=0
function randomizer(){
    let str=text.split('').map((char,index)=>{
        if (index<iteration){
            return char
        }

    return characters.split('')[Math.floor(Math.random()*52)]
}).join('')

    iteration+=0.25
    p.innerText=str
    console.log(str);

    if (iteration >= text.length) {
        clearInterval(interval)
        console.log("done!")
    }

}


//METHOD 1

// setInterval(()=>{
//        let str=text.split('').map(()=>{
//     return char.split('')[Math.floor(Math.random()*52)]
// }).join('')

//     p.innerText=str
//     console.log(str); 
// },100)

//METHOD 2

let interval=setInterval(randomizer,30)


