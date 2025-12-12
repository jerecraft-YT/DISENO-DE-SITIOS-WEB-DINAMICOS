function logear(){
    let usuario = document.getElementById("usuario").value;
    let contra = document.getElementById("contra").value;
    let msg = document.getElementById("msg");

    if (usuario == "peter" && contra == "peter"){
        msg.innerText = "Bienvenido";
        msg.style.color = "black";
        msg.style.transition = "color 2.5s easing"
    }
    else{
        msg.innerText = "Datos no validos";
        msg.style.color = "black";
        msg.style.transition = "color 2.5s easing"
    }
}