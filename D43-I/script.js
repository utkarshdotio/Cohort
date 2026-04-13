var arr=[
    {
        team: 'CSK',
        primary: 'yellow',
        secondary: 'blue'
    },
    {
        team: 'RCB',
        primary: 'red',
        secondary: 'black'
    },
    {
        team: 'MI',
        primary: 'blue',
        secondary: 'silver'
    }
]

var h1=document.querySelector('h1');
var btn=document.querySelector('button')
var main=document.querySelector('main')

btn.addEventListener('click',function(){
var winner=arr[Math.floor(Math.random()*arr.length)]
h1.innerHTML=winner.team;
main.style.backgroundColor=winner.primary
h1.style.backgroundColor=winner.secondary
})



