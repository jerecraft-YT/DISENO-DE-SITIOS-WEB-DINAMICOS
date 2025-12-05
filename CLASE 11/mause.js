
const caja= document.getElementById ("caja");
const log = document.getElementById ("log"); 


function escribir(texto) {
    log.textContent += texto + "\n";
    log.scrollTop = log.scrollHeight; 
} 




caja.addEventListener("mouseenter", ()=> escribir ("mause enter  : el mause entro al area "));
caja.addEventListener("mouseleave", ()=> escribir ("mause leave : el mause salio del area ")); 
caja.addEventListener("mousemove", ()=> escribir ("mause move  : el mause se esta moviendo ")); 
caja.addEventListener("mouseup", ()=> escribir ("mause up  : el  boton del mause fue soltado "));
caja.addEventListener("mousedown", ()=> escribir ("mause down : el boton de mause fue presionado ")); 
caja.addEventListener("click", ()=> escribir ("click  :  hiciste click !! ")); 



