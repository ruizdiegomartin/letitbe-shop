// USER LOGIN

// let userStored = "Diego"
// let passwordStored = "Coderhouse";
// let userName = prompt("Ingrese su nombre de usuario");

// for ( i=0 ; i<3 ; i++) {

//     let userPassword = prompt("Ingrese su contraseña");
    
//     if (userPassword === passwordStored && userName === userStored) {
//         alert("Bienvenido/a "+userName+".");
//         break;
//     } 
//     else {
//         alert("La contraseña no coincide con el usuario ingresado. Quedan "+ (2-i) +" intentos.");
//     }
//     if (i===2){
//         alert("Usuario bloqueado: ¡Lo sentimos! Límite de intentos agotado. Revise su correo electrónico para desbloquearlo.");
//     }
// }

// let destino1 = "cordoba";
// let destino2 = "santa fe";
// let destino3 = "buenos aires";
// let condition = true;

// let compraPasaje = prompt("Ingrese donde quiere ir")

// while (condition) {
//     if (compraPasaje === destino1) {
//         alert("pasaje reservado");
//         condition= false;
//     }
//     else if (compraPasaje === destino2) {
//         alert("pasaje reservado");
//         condition= false;

//     }
//     else if (compraPasaje === destino3) {
//         alert("pasaje reservado");
//         condition= false;
//     }
//     else {
//         compraPasaje = prompt("Destino no encontrado. Vuelva a ingresar destino")
//     }
// }


// function sumar(parametro1, parametro2) {
//     if ( isNaN(parametro1) || isNaN(parametro2) ) {
//       alert("No puedes tener campos vacios");
//     } else {
//       alert(parametro1 + parametro2);
//     }
//   }

//     let num1 = parseFloat(prompt("Ingresa el primer numero"));
//     let num2 = parseFloat(prompt("Ingresa el segundo numero"));

  
//   sumar(num1, num2);
 let vela = 800;
 let jabonLiquido = 500;
 let splash = 700;
 let difusor = 400;
 let bolsaAromatica = 300;
 let valorParcial = 0;
 const iva = 0.21;
 let valorImpuesto = 0;
 let valorTotal = 0;
 let comprar = true;
 let producto = "";

function sumarProductos (producto) {
  valorParcial = producto + valorParcial  
}
function calcularImpuestos (ValorParcial) {
  valorImpuesto = valorParcial * iva; 
}
function calcularTotal (parcial, impuestos) {
  valorTotal = parcial + impuestos ;
}

while (comprar) {
  
  let producto = prompt("Ingrese el nombre del producto");

  if (producto === "Finalizar compra") {
    calcularImpuestos (valorParcial);
    console.log(valorImpuesto);
    calcularTotal (valorParcial, valorImpuesto);
    console.log(valorTotal);
    alert("El valor total de la compra es de $" + valorParcial + " + IVA ($"+valorImpuesto+"). El valor final por lo tanto es de $" + valorTotal +".")
    comprar = false;
  }
  else if (producto === "vela") {
    sumarProductos (vela);
    alert("Vela agregada al carrito")
  }
  else if (producto === "jabon liquido") {
    sumarProductos (jabonLiquido);
    alert("Jabón líquido agregado al carrito")
  }
  else if (producto === "splash") {
    sumarProductos (splash);
    alert("Splash agregado al carrito")
  }
  else if (producto === "difusor") {
    sumarProductos (difusor);
    alert("Difusor agregado al carrito")
  }
  else if (producto === "bolsa aromatica") {
    sumarProductos (bolsaAromatica);
    alert("Bolsa aromática agregada al carrito")
  }
  else { 
    alert("El producto ingresado es incorrecto. Por favor, vuelva a ingresar producto.")
  }
  // Mostrar en consola la suma parcial
  console.log(valorParcial);

  


}

