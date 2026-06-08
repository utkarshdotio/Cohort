let allElem=document.querySelectorAll('.elem')

allElem.forEach(function(elem){
    elem.childNodes[3].addEventListener('click',()=>{

        let x=elem.childNodes[3]; //childNodes[3] => Button 

        if (x.innerHTML=='Add Friend'){
                x.innerHTML='Remove Friend'
        }
        else{
            x.innerHTML='Add Friend'
        }

    })
})