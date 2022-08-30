


// // PRODUCTOS Y PRECIOS
// let vela = 800;
// let jabonLiquido = 500;
// let splash = 700;
// let difusor = 400;
// let bolsaAromatica = 300;

// //VALORES SUBTOTALES Y TOTALES

// let subtotal = 0;
// let impuesto = 0;
// let valorTotal = 0;
// const iva = 0.21;

// //FUNCIONES

// function sumarProductos (producto) {
//  subtotal = producto + subtotal  
// }
// function calcularImpuestos (precio) {
//  impuesto = precio * iva; 
// }
// function calcularTotal (parcial, impuestos) {
//  valorTotal = parcial + impuestos ;
// }


// // EXPLICACIÓN DE COMO INGRESAR PRODUCTOS AL CARRITO Y CÓMO FINALIZAR LA COMPRA.





// // TYPEOF

// let numero = 15;
// let palabra = "texto";
// const userLogin = () => {
//   alert("Acceda a su cuenta")
// }
// let aprobado = true;

// console.log(typeof numero);
// console.log(typeof palabra);
// console.log(typeof userLogin);
// console.log(typeof aprobado);




//FUNCION CONSTRUCTORA

function Product (product,price, type, stock) {
  this.name = product;
  this.price = price;
  this.type = type;
  this.stock = stock;
  this.addToCart = (amount) => {
    for (i=0 ; i<amount; i++ ) {
    console.log("Producto añadido: "+this.name+". Cantidad: "+amount+".");
    cart.push(product);
    this.stock = --stock;
    total = total + this.price;
    }
  }
}

// PRODUCTS

const product1 = new Product ("Vela de soja", 600, "Velas", 20);
const product2 = new Product ("Difusor aromático", 500, "Difusores", 35);
const product3 = new Product ("Bolsa aromática", 300, "Difusores", 15);
const product4 = new Product ("Splash difusor", 700, "Difusores", 25)
const product5 = new Product ("Jabón líquido", 650, "Limpieza", 23)

//USER LOGIN

alert("BIENVENIDO A LET IT BE SHOP.\nAcceda a su cuenta para continuar.");

let userStored = "diego-dev";
let passwordStored = "coderhouse";
let autentication = false;
let user = 0;
let pass = 0;

const userLogin = () => { 

  user = prompt("Ingrese su usuario");
  password = prompt("Ingrese su contraseña");
  while (password !== passwordStored && user !== userStored) {
    alert("Usuario y/o contraseña incorrecta, inténtelo nuevamente.")
    user = prompt("Ingrese su usuario");
    password = prompt("Ingrese su contraseña");  
    }
    alert("Usuario autentificado. Bienvenido "+user+".")
    autentication = true;
  }

userLogin();

// CART ARRAY 

const cart = []
let total = 0;

// SHOPPING

let shopping = true;
let pay = false;
let cantidad = 0;

// CARRITO DE COMPRA

while (shopping && autentication) {
 
  let producto = prompt("Ingrese el nombre del producto que desea agregar al carrito:\nVELA\nJABON LIQUIDO\nDIFUSOR\nSPLASH\nBOLSA AROMATICA\nPara finalizar la compra escriba:\nFINALIZAR COMPRA");
  
 if (producto === "FINALIZAR COMPRA" || producto === "finalizar compra" || producto === "Finalizar compra" ) {
   alert("El valor total de su compra es de $"+total+".")
   alert("Usted lleva los siguientes productos:\n"+cart.join("\n")+".")
   shopping = false;
   pay = true;
 }
 else if (producto === "VELA" || producto === "vela" || producto === "Vela" ) {
  cantidad = parseInt(prompt("Ingrese la cantidad que desea llevar"));
  product1.addToCart(cantidad);
  alert(product1.name+" agregado al carrito")
 }
 else if (producto === "DIFUSOR" || producto === "difusor" || producto === "Difusor" ) {
  cantidad = parseInt(prompt("Ingrese la cantidad que desea llevar"));
  product2.addToCart(cantidad);
  alert(product2.name+" agregado al carrito")
 }
 else if (producto === "BOLSA AROMATICA" || producto === "bolsa aromatica" || producto === "Bolsa aromatica" ) {
  cantidad = parseInt(prompt("Ingrese la cantidad que desea llevar"));
  product3.addToCart(cantidad);
  alert(product3.name+" agregado al carrito")
 }
 else if (producto === "SPLASH" || producto === "splash" || producto === "Splash" ) {
  cantidad = parseInt(prompt("Ingrese la cantidad que desea llevar"));
  product4.addToCart(cantidad);
  alert(product4.name+" agregado al carrito")
 }
 else if (producto === "JABON LIQUIDO" || producto === "jabon liquido" || producto === "Jabon liquido" ) {
  cantidad = parseInt(prompt("Ingrese la cantidad que desea llevar"));
  product5.addToCart(cantidad);
  alert(product5.name+" agregado al carrito")
 }
 else { 
   alert("El producto ingresado es incorrecto. Por favor, vuelva a ingresar producto.")
 }
}

// FORMAS DE PAGO

const financing = (cuotas) => {
  return total / cuotas;
}
let cuotas = 0;
let cuotasAprobado = true;

if (pay) {

let paymentSelect = parseInt(prompt("Seleccione como desea abonar su compra, colocando el número correspondiente:\n1.Débito en un pago.\n2.Crédito en un pago.\n3.Tarjeta de crédito en cuotas."));
while (paymentSelect  !== 1 && paymentSelect  !== 2 && paymentSelect  !== 3) {
  paymentSelect = prompt("Ingrese una forma de pago válida:\n1.Débito en un pago.\n2.Crédito en un pago.\n3.Tarjeta de crédito en cuotas");
}

switch (paymentSelect ) {
  case 1:
  alert("¡Gracias por elegirnos!\nSe debitará de su tarjeta de débito el siguiente monto: $"+total+".");  
  break;  
  case 2:
  alert("¡Gracias por elegirnos!\nSe acreditará un pago de $"+total+" en su tarjeta de crédito");
  break;
  case 3:
  cuotas = parseInt(prompt("Ingrese cantidad de cuotas: \n3\n6\n12"));
  while (cuotasAprobado) {
  if (cuotas === 3 || cuotas === 6 || cuotas === 12 ) {
    alert("¡Gracias por elegirnos!\nSu pago será acreditado en "+cuotas+" cuotas de $"+financing(cuotas)+"." );
    cuotasAprobado= false;
  }
  else {
    cuotas = parseInt(prompt("Ingrese un número de cuotas válido: 3, 6 o 12 cuotas."));
  }
}
  break;
}

// ADDING DEBIT/CREDIT CARD

function PaymentCard (number, cvv, expireDate, name, dni) {
  this.number = number;
  this.cvv = cvv;
  this.expireDate = expireDate;
  this.name = name;
  this.dni = dni;
}

const newCard = () => {

let numeroTarjeta = prompt("Ingrese el número de su tarjeta");
let cvv = prompt("Ingrese el código de seguridad");
let fechaVencimiento = prompt("Ingrese la fecha de expiración de su tarjeta.");
let titular = prompt ("Ingrese el nombre del titular, tal cual figura en la tarjeta.")
let dni = prompt("Ingrese el DNI del titular.")

const userCreditCard = new PaymentCard (numeroTarjeta, cvv, fechaVencimiento, titular, dni);

}

newCard();
console.log(userCreditCard);

alert("Su pago ha sido procesado correctamente.\nEl pedido se está preparando, nos comunicaremos con usted para coordinar la entrega.");

}
