let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let alertaValidacionesTexto = document.getElementById("alertaValidacionesTexto");
let alertaValidaciones = document.getElementById("alertValidaciones");


btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3){
        txtName.style.border="solid 3px red";
        alertaValidacionesTexto.innerHTML="<strong>El Nombre del producto no es correcto </strong>";
        alertaValidaciones.style.display="block";
    }
    
});