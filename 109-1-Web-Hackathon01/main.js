var cells = document.getElementsByClassName("date")
var input = document.getElementById("cal-input")
var color = document.getElementById("cal-color")
var button = document.getElementById("cal-button")
input.value = ''
color.value = '#b0b0b0'


let itemcnt = 0; //當前id

function init(){
    let main = document.getElementById("Cal-main");
    
    for (var i = 0; i < cells.length; i++) {
        cells[i].setAttribute("id", i);
        cells[i].setAttribute("onClick", "clickCell(this)");
        cells[i].addEventListener('mouseenter', event => {
            for (var i = 0; i < cells.length; i++) {
                if(i!=itemcnt){
                    document.getElementById(i).style.background = "white";
                    document.getElementById(i).style.color = "black";
                }
            }
      
            if(event.target.id!=itemcnt){
                event.target.style.background = "rgba(0, 0, 0, 0.103)";
            }
          
        });
    }
	document.getElementById(0).style.background = "#000000";
    document.getElementById(0).style.color = "white";
}


button.onclick = clickButton;

function clickButton(e) {
    let contentNow = document.getElementById("cal-input").value;
    contentChange(itemcnt, contentNow, color.value);
}


input.addEventListener('keyup', event => {
    if (event.code === 'Enter' && event.target.value !== '')  {        
        contentChange(itemcnt, event.target.value, color.value);
        event.target.value = '';
    }
});

function contentChange(itemcnt, context, selectColor){
    let selectitem = document.getElementById(itemcnt);
    selectitem.innerHTML =itemcnt+4 + "</br>";
    let detail = document.createElement("span");
    detail.innerHTML = context; 
    detail.setAttribute("style","color:" + selectColor);
    selectitem.appendChild(detail);
    console.log(selectColor);

}

function clickCell(e){
    let cells = document.getElementsByClassName("date");
    for (var i = 0; i < cells.length; i++) {
        if( i != e.id ){
            document.getElementById(i).style.background = "white";
            document.getElementById(i).style.color = "black";

        } else {
            itemcnt = i;
            document.getElementById(i).style.background = "#000000";
            document.getElementById(i).style.color = "white";

        }   
    }
}




//Sets the page's theme. No need to modify
var themeButton = document.getElementsByClassName("ChooseTheme")
for(var i=0; i<themeButton.length; ++i) {
    themeButton[i].addEventListener('click', e => {
        document.body.setAttribute('class', e.target.id)
    }, false)
}