    var button = document.querySelectorAll("button"),
    disp = document.querySelector("input"),
    busy = true,
    hold,
    is_busy,
    delay = 1000,
    change = -1,
    click = null;

    //looping through every button adding the event listeners onmouseup and onmousedown
    for(var i=0; i<button.length; i++){
        button[i].onmousedown = function(e){
            var text = this.getAttribute("data-text").split(""),
            number = this.getAttribute("data-number");
            busy = true;
            clearTimeout(is_busy);
            if(click !== e.target){
                busy = false;
            }
            if(change >= text.length - 1 || click !== e.target){
                change = 0;
                click = e.target;
            }else{
                change = change + 1;
            }
            
            //setting a timeout named hold
            hold = setTimeout(()=>{
                disp.value = disp.value.slice(0, -1) + number;
            }, delay);
            disp.value = busy ? disp.value.slice(0, -1) + text[change] : disp.value + text[change];
        };
        
        button[i].onmouseup = function(e){
            clearTimeout(hold);
            busy = true;
            //setting another timeout is_busy
            is_busy = setTimeout(()=>{
                change = -1;
                busy = false;
                e.target = null;
            },delay);
        };
    }