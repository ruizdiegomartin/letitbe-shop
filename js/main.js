
//USER LOGIN

alert("BIENVENIDO. Acceda en su cuenta para continuar.");

let userStored = "Diego10";
let passwordStored = "coderhouse";
let autentication = false;

for (i=0 ; i<3 ; i++) {
  let user = prompt("Ingrese su usuario");
  let password = prompt("Ingrese su contraseña");
  if (password === passwordStored && user === userStored) {
    alert("Usuario autentificado. Bienvenido "+user+".")
    autentication = true;
    break;
  }
  else {
    alert("La contraseña no coincide con el usuario ingresado. Le quedan "+ (2 - i) +" intentos.")
  }
  
}
if (i === 3) {
  alert("Usuario bloqueado. Ha llegado al límite de intentos. Para desbloquear su usuario espere 24hs o comuníquese con soporte.")
}


// PRODUCTOS Y PRECIOS
let vela = 800;
let jabonLiquido = 500;
let splash = 700;
let difusor = 400;
let bolsaAromatica = 300;

//VALORES SUBTOTALES Y TOTALES

let subtotal = 0;
let impuesto = 0;
let valorTotal = 0;
const iva = 0.21;

//FUNCIONES

function sumarProductos (producto) {
 subtotal = producto + subtotal  
}
function calcularImpuestos (precio) {
 impuesto = precio * iva; 
}
function calcularTotal (parcial, impuestos) {
 valorTotal = parcial + impuestos ;
}
function financiamiento (cuotas) {
  return valorTotal / cuotas;
}

// EXPLICACIÓN DE COMO INGRESAR PRODUCTOS AL CARRITO Y CÓMO FINALIZAR LA COMPRA.

let comprar = true;
let carritoFinalizado = false;

// CARRITO DE COMPRA

while (comprar && autentication) {
 
 let producto = prompt("Ingrese el nombre del producto que desea agregar al carrito:\nVELA\nJABON LIQUIDO\nDIFUSOR\nSPLASH\nBOLSA AROMATICA\nPara finalizar la compra escriba:\nFINALIZAR COMPRA");

 if (producto === "FINALIZAR COMPRA" || producto === "finalizar compra" || producto === "Finalizar compra" ) {
   calcularImpuestos (subtotal);
   calcularTotal (subtotal, impuesto);
   alert("El valor total de la compra es de $" + subtotal + " + IVA ($"+impuesto+"). El valor final por lo tanto es de $" + valorTotal +".")
   comprar = false;
   carritoFinalizado = true;
 }
 else if (producto === "VELA" || producto === "vela" || producto === "Vela" ) {
   sumarProductos (vela);
   console.log("Producto añadido: "+producto+ ". Subtotal = $"+subtotal);
   alert("Vela agregada al carrito")
 }
 else if (producto === "JABON LIQUIDO" || producto === "jabon liquido" || producto === "Jabon liquido" ) {
   sumarProductos (jabonLiquido);
   console.log("Producto añadido: "+producto+ ". Subtotal = $"+subtotal);
   alert("Jabón líquido agregado al carrito")
 }
 else if (producto === "SPLASH" || producto === "splash" || producto === "Splash" ) {
   sumarProductos (splash);
   console.log("Producto añadido: "+producto+ ". Subtotal = $"+subtotal);
   alert("Splash agregado al carrito")
 }
 else if (producto === "DIFUSOR" || producto === "difusor" || producto === "Difusor" ) {
   sumarProductos (difusor);
   console.log("Producto añadido: "+producto+ ". Subtotal = $"+subtotal);
   alert("Difusor agregado al carrito")
 }
 else if (producto === "BOLSA AROMATICA" || producto === "bolsa aromatica" || producto === "Bolsa aromatica" ) {
   sumarProductos (bolsaAromatica);
   console.log("Producto añadido: "+producto+ ". Subtotal = $"+subtotal);
   alert("Bolsa aromática agregada al carrito")
 }
 else { 
   alert("El producto ingresado es incorrecto. Por favor, vuelva a ingresar producto.")
 }

}

//SELECCIONAR FORMAS DE PAGO

if (carritoFinalizado) {

let formaPago = prompt("Seleccione como desea abonar su compra, usando la palabra correspondiente: \n DEBITO \n CREDITO \n CUOTAS");
while (formaPago !== "DEBITO" && formaPago !== "CREDITO" && formaPago !== "CUOTAS") {
  formaPago = prompt("Ingrese una forma de pago válida:\nDEBITO\nCREDITO\nCUOTAS");
}

switch (formaPago) {
  case "DEBITO":
  alert("Se debitará de su tarjeta de débito el siguiente monto: $"+valorTotal+".");  
  break;  
  case "CREDITO":
  alert("Se acreditará un pago de $"+valorTotal+" en su tarjeta de crédito");
  break;
  case "CUOTAS":
  let cuotas = 0;
  let cuotasAprobado = true;
  cuotas = parseInt(prompt("Ingrese cantidad de cuotas: \n3\n6\n12"));
  while (cuotasAprobado) {
  if (cuotas === 3 || cuotas === 6 || cuotas === 12 ) {
    alert("Su pago será acreditado en "+cuotas+" cuotas de $"+financiamiento(cuotas)+"." );
    cuotasAprobado= false;
  }
  else {
    cuotas = parseInt(prompt("Ingrese un número de cuotas válido: 3, 6 o 12 cuotas."));
  }
}
  break;
}

let creditCard = prompt("Ingrese número de tarjeta de crédito");

alert("Pago rechazado. Su tarjeta "+creditCard+" tiene fondos insuficientes.");

}


