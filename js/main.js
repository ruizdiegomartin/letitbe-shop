let vela = 800;
let jabonLiquido = 500;
let splash = 700;
let difusor = 400;
let bolsaAromatica = 300;
let subtotal = 0;
const iva = 0.21;
let valorImpuesto = 0;
let valorTotal = 0;
let comprar = true;
let producto = "";

function sumarProductos (producto) {
 subtotal = producto + subtotal  
}
function calcularImpuestos (precio) {
 valorImpuesto = precio * iva; 
}
function calcularTotal (parcial, impuestos) {
 valorTotal = parcial + impuestos ;
}
function financiamiento (cuotas) {
  return valorTotal / cuotas;
}

alert("Ingrese el nombre del producto para añadirlo al carrito: \n VELA \n JABON LIQUIDO \n DIFUSOR \n SPLASH \n BOLSA AROMATICA \n Para finalizar la compra escriba: FINALIZAR COMPRA ")

while (comprar) {
 
 let producto = prompt("Ingrese el nombre del producto");

 if (producto === "FINALIZAR COMPRA" || producto === "finalizar compra" || producto === "Finalizar compra" ) {
   calcularImpuestos (subtotal);
   calcularTotal (subtotal, valorImpuesto);
   alert("El valor total de la compra es de $" + subtotal + " + IVA ($"+valorImpuesto+"). El valor final por lo tanto es de $" + valorTotal +".")
   comprar = false;
 }
 else if (producto === "VELA" || producto === "vela" || producto === "Vela" ) {
   sumarProductos (vela);
   alert("Vela agregada al carrito")
 }
 else if (producto === "JABON LIQUIDO" || producto === "jabon liquido" || producto === "Jabon liquido" ) {
   sumarProductos (jabonLiquido);
   alert("Jabón líquido agregado al carrito")
 }
 else if (producto === "SPLASH" || producto === "splash" || producto === "Splash" ) {
   sumarProductos (splash);
   alert("Splash agregado al carrito")
 }
 else if (producto === "DIFUSOR" || producto === "difusor" || producto === "Difusor" ) {
   sumarProductos (difusor);
   alert("Difusor agregado al carrito")
 }
 else if (producto === "BOLSA AROMATICA" || producto === "bolsa aromatica" || producto === "Bolsa aromatica" ) {
   sumarProductos (bolsaAromatica);
   alert("Bolsa aromática agregada al carrito")
 }
 else { 
   alert("El producto ingresado es incorrecto. Por favor, vuelva a ingresar producto.")
 }
 // Mostrar en consola la suma parcial
 console.log(subtotal);

}

//TEST 2

let formaPago = prompt("Seleccione como desea abonar su compra, usando la palabra correspondiente: \n DEBITO \n CREDITO \n CUOTAS");

switch (formaPago) {
  case "DEBITO":
  alert("Se debitará de su tarjeta de débito el siguiente monto: $"+valorTotal+".")  
  break;  
  case "CREDITO":
  alert("Se acreditará un pago de $"+valorTotal+" en su tarjeta de crédito")
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