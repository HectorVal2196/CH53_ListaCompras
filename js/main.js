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
let datos = new Array(); // [] almacena los elementos de la tabla

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
        let elemento = {
                        "cont" : cont,
                        "nombre": txtName.value,
                        "cantidad": txtNumber.value,
                        "precio": precio
                        };
        datos.push(elemento);

        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend",row);

        costoTotal += precio * Number(txtNumber.value); // Suma precio
        precioTotal.innerText = "$" + costoTotal.toFixed(2); // Suma de precio total
        totalEnProductos += Number(txtNumber.value); 
        productosTotal.innerText = totalEnProductos; 
        contadorProductos.innerText = cont; 
        let resumen = {
            "cont":cont,
            "totalEnProductos":totalEnProductos,
            "costoTotal":costoTotal
        };
        localStorage.setItem("resumen", JSON.stringify(resumen));
        txtName.value = ("");
        txtNumber.value = ("");
        txtName.focus();
    }//if isValid

}); //btnAgregar
window.addEventListener("load",function(event){
    event.preventDefault();
    if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }//datos !=null

    datos.forEach((d) => {
        let row = `<tr>
                    <td>${d.cont}</td>
                    <td>${d.nombre}</td>
                    <td>${d.cantidad}</td>
                    <td>${d.precio}</td>
                    </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    })

    if(this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;

    }//resumen !=null
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;
}); //window.addEventListener load

//Agregar la funcionalidad del botón limpiar todo
//Resumen
//Tabla
//Campos
//Alerta
//localstorage
const btnLimpiarTodo = document.getElementById("btnClear");

btnLimpiarTodo.addEventListener("click", function(event) {
    event.preventDefault();

    // Limpiar variables
    cont = 0;
    costoTotal = 0;
    totalEnProductos = 0;
    datos = [];

    // Limpiar resumen
    contadorProductos.innerText = "";
    productosTotal.innerText = "";
    precioTotal.innerText = "$";
    
    // Limpiar tabla
    cuerpoTabla.innerHTML = "";

    // Limpiar campos del formulario
    txtName.value = "";
    txtName.style.border = "";
    txtNumber.value = "";
    txtNumber.style.border = "";

    // Limpisr alertas
    alertaValidacionesTexto.innerHTML = "";
    alertaValidaciones.style.display = "none";

    // Limpiar localStorage
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");
});
