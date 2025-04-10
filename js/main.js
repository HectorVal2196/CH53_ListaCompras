const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertaValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertaValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos =document.getElementById("contadorProductos");
const productosTotal =document.getElementById("productosTotal");
const precioTotal =document.getElementById("precioTotal");

// Numeración de l aprimera columna d ela tabla
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;

function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    }//length<=0

    if(isNaN(txtNumber.value)){
        return false;
    }// isNaN

    if (Number(txtNumber.value)<=0){
        return false;
    }//<=0

    return true;
}// Validar Cantidad

function getPrecio(){
    return Math.round((Math.random()*10000)) / 100;
}// get precio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    let isValid = true;

    alertaValidacionesTexto.innerHTML="";
    alertaValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3){
        txtName.style.border="solid 3px red";
        alertaValidacionesTexto.innerHTML="<strong>El Nombre del producto no es correcto. </strong>";
        alertaValidaciones.style.display="block";
        isValid = false;
    } //length>=3

    if(! validarCantidad()){
        txtNumber.style.border="solid 3px red";
        alertaValidacionesTexto.innerHTML +="</br><strong>La cantidad no es correcta. </strong>";
        alertaValidaciones.style.display="block";
        isValid = false;
    } //validarCantidad
    
    if(isValid){ // si paso las validaciones
        cont++; // Primera columna
        let precio =getPrecio();
        let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                    </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        costoTotal += precio * Number(txtNumber.value); // Suma precio
        precioTotal.innerText = "$" + costoTotal.toFixed(2); // Suma de precio total
        totalEnProductos += Number(txtNumber.value); 
        productosTotal.innerText = totalEnProductos; 
        

        contadorProductos.innerText = cont; 


        txtName.value = ("");
        txtNumber.value = ("");
        txtName.focus();
    }//if isValid

}); //btnAgregar