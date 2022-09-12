
//FUNCION CONSTRUCTORA

function Product (id, img, product, price, category, stock) {
  this.id = id;
  this.img = img;
  this.name = product;
  this.price = price;
  this.category = category;
  this.stock = stock;
}

// PRODUCTS

const product1 = new Product (1,"./img/product_soy-candle.jpg", "Vela de soja", 600, "velas", 20);
const product2 = new Product (2,"./img/product_difusor.jpg", "Difusor aromático", 500, "difusores", 35);
const product3 = new Product (3,"./img/product-bolsa-aromatizadora.JPG", "Bolsa aromática", 300, "difusores", 15);
const product4 = new Product (4,"./img/product_splash.jpg", "Splash difusor", 700, "difusores", 25);
const product5 = new Product (5,"./img/product_liquid-soap.jpg", "Jabón líquido", 650, "limpieza", 23);
const product6 = new Product (6,"./img/product_nordic-blanket.jpg", "Manta nórdica", 5000, "otros", 10);
const product7 = new Product (7,"./img/product-aromatizador-auto.JPG", "Difusor de auto", 450, "difusores", 15);
const product8 = new Product (8,"./img/vela-silver.png", "Vela silver", 750, "velas", 20);
const product9 = new Product (9,"./img/product_bubble-candle.jpg", "Vela burbuja", 700, "velas", 22);

productsCatalog = [];
productsCatalog.push(product1, product2, product3, product4, product5, product6, product7, product8, product9);

// for (const products of productsCatalog) {
//   let productCard = document.createElement("article");
//   productCard.innerHTML = 
//     `<article class="product-card">
//       <img class="product-card__img" src="./img/product_soy-candle.jpg" alt="Vela de soja en cuenco de madera">
//       <h2 class="product-card__title">${products.name}</h2>
//       <p class="product-card__description">Vela hecha a base de soja, en cuenco de madera. Variedad de aromas.</p>
//       <p class="product-card__price"> $${products.price} </p>
//     </article>`
//   document.querySelector("#main-container").append(productCard);
// }

function createBuyButton (product) {
  const button = document.createElement("button");
  button.classList.add("buy-btn")
  button.innerText = "Añadir al carrito";
  button.addEventListener("click", ()=>{
    addToCart(product);
    showInTable(product);
  })
  return button;
}

function showProducts (products) {
  // const productsContainer = document.querySelector("main-container");
  // productsContainer.innerHTML = "";
  productsCatalog.forEach(product => {
    const productCard = document.createElement("article");
    productCard.classList.add("product-card")
    productCard.innerHTML = 
      ` <img class="product-card__img" src="${product.img}" alt="${product.name}">
        <h2 class="product-card__title">${product.name}</h2>
        <p class="product-card__description">Vela hecha a base de soja, en cuenco de madera. Variedad de aromas.</p>
        <p class="product-card__price"> $${product.price} </p>
      ` 
    const buyButton = createBuyButton(product);
    productCard.append(buyButton);

    document.querySelector("#main-container").prepend(productCard);
  });
}

showProducts();

// for (const elements of productsCatalog) {
//   createBuyButton(elements.id);
// }

// function createBuyButton (productID) {
//   let buyButton = document.createElement("button");
//   buyButton.innerText ="Añadir al carrito";
//   buyButton.setAttribute("id", productID);
//   buyButton.classList.add("boton-de-compra-clase");
//   productCard.append(buyButton);
// }

// addToChartBtn = document.querySelector("add.btn")


// FUNCTION

function addToCart (productToAdd) {
    // if (productToAdd.stock === 0) {
    //   alert("Producto fuera de stock.")
    // } 
    // else if (this.stock < amount){
    //   alert("La cantidad ingresada supera la disponibilidad que hay en stock de este producto.\nEl stock actual de este producto es de: "+this.stock+" unidades.")
    // }
    // else {
      // for (let i=0 ; i<amount; i++ ) {
      cart.push(productToAdd);
      // (productToAdd).stock = --stock;
      total = total + parseInt((productToAdd).price);
      productAdded = true; 
      // }
    // }    
}

let tableExample = true;

function showInTable(product) {
  
  if (tableExample === true) {
    const tableRowExample = document.querySelector("#table-example");
    document.querySelector("#cart-body").removeChild(tableRowExample);
    tableExample = false;
  }
  const newRow = document.createElement("tr");
      newRow.classList.add("newRow-product");
      newRow.innerHTML = `
      <td class="tbody"> ${product.name} </td>
      <td class="tbody"> $${product.price} </td>
      <td class="tbody"> <input class="number-amount" type="number"> </td>
      <td class="tbody"> $${parseInt(product.price)} </td>
      <td class="tbody row-delete"><button class="delete-btn"><i class="fa-solid fa-trash"></i></button></td>
      `

      document.querySelector("#cart-body").append(newRow);
}


function showTotalInTable() {
  // let newRow = document.createElement("tr");
  //     newRow.innerHTML = ` <tr>
  //     <td class="theader"> </td>
  //     <td class="theader"> </td>
  //     <td class="theader"> </td>
  //     <td class="theader"> Total: $${total}</td>
  //     </tr> `
  //     document.querySelector("#cart-foot").append(newRow);
  let totalPrice = document.querySelector("#total-price");
  totalPrice.innerText = ` $${total}`
}

// FILTERS

function categoryFilter (arr,filter) {
  const filtered = arr.filter((el)=>{
   return el.category.includes(filter)
  })
  return filtered;
 }

function priceFilter (arr, comparación, valor) {
  return arr.filter((el)=> {
    switch (comparación) {
      case 1: 
      return el.price>=valor;
      case 2: 
      return el.price<=valor;
    }
  })
}


// CART ARRAY 

const cart = []

// SHOPPING

let cantidad = 0;
let productAdded = false;
let shopping = true;
let total = 0;
let pay = false;

// CARRITO DE COMPRA

// while (shopping && autentication) {   MODIFICAR ESTO DESPUES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  // let producto = prompt("Ingrese el nombre del producto que desea agregar al carrito:\nVELA\nJABON LIQUIDO\nDIFUSOR\nSPLASH\nBOLSA AROMATICA\nPara filtrar un producto escriba: FILTRAR\nPara buscar por ID escriba: buscarID\nPara finalizar la compra escriba: FINALIZAR COMPRA");
  
  document.querySelector("#finish-btn").addEventListener("click", ()=> {
    while (pay === false) {
    console.log("Valor total de la compra: "+total);
    showTotalInTable();
    document.querySelector("#cart-greeting").innerText = "¡Gracias por tu compra! Esperamos que vuelvas pronto...";
    console.log(cart);
    shopping = false;
    pay = true;
    }
  }) 
  
  // document.querySelector("#buy-btn1").addEventListener("click", ()=>{
  //   // cantidad = document.querySelector("#buy-amount1").value;
  //   addToCart(productsCatalog[0]);
  //   if (productAdded === true){
  //     showInTable(product1);
  //     productAdded = false;    
  //   }
  // })
  
  // document.querySelector("#buy-btn2").addEventListener("click", ()=>{
  //   // cantidad = document.querySelector("#buy-amount2").value;
  //   addToCart(productsCatalog[1]);
  //   if (productAdded === true){
  //     showInTable(product2);
  //     productAdded = false;    
  //   }
  // })

  // document.querySelector("#buy-btn3").addEventListener("click", ()=>{
  //   // cantidad = document.querySelector("#buy-amount3").value;
  //   addToCart(productsCatalog[2]);
  //   if (productAdded === true){
  //     showInTable(product4);
  //     productAdded = false;    
  //   }
  // })

  // document.querySelector("#buy-btn4").addEventListener("click", ()=>{
  //   // cantidad = document.querySelector("#buy-amount4").value;
  //   addToCart(productsCatalog[3]);
  //   if (productAdded === true){
  //     showInTable(product4);
  //     productAdded = false;    
  //   }
  // })

  // document.querySelector("#buy-btn5").addEventListener("click", ()=>{
  //   cantidad = document.querySelector("#buy-amount5").value;
  //   addToCart(productsCatalog[4]);
  //   if (productAdded === true){
  //     showInTable(product5);
  //     productAdded = false;    
  //   }
  // })

  // document.querySelector("#buy-btn6").addEventListener("click", ()=>{
  //   cantidad = document.querySelector("#buy-amount6").value;
  //   addToCart(productsCatalog[5]);
  //   if (productAdded === true){
  //     showInTable(product6);
  //     productAdded = false;    
  //   }
  // })

  // document.querySelector("#buy-btn7").addEventListener("click", ()=>{
  //   cantidad = document.querySelector("#buy-amount7").value;
  //   addToCart(productsCatalog[6]);
  //   if (productAdded === true){
  //     showInTable(product7);
  //     productAdded = false;    
  //   }
  // })

  // document.querySelector("#buy-btn8").addEventListener("click", ()=>{
  //   cantidad = document.querySelector("#buy-amount8").value;
  //   addToCart(productsCatalog[7]);
  //   if (productAdded === true){
  //     showInTable(product8);
  //     productAdded = false;    
  //   }
  // })

  // document.querySelector("#buy-btn9").addEventListener("click", ()=>{
  //   cantidad = document.querySelector("#buy-amount9").value;
  //   addToCart(productsCatalog[8]);
  //   if (productAdded === true){
  //     showInTable(product9);
  //     productAdded = false;    
  //   }
  // })

  
//   else if (producto === "filtrar" || producto === "FILTRAR" || producto === "Filtrar") {
//     let userSelection = parseInt(prompt("Seleccione la opción:\n1) Filtrar productos por categoría.\n2) Filtrar productos por precio."))
//     switch (userSelection) {
//       case 1: 
//         let filter = prompt("Ingrese la categoría que desea filtrar.\nCategorías: difusores, velas, limpieza.");
//         console.log(categoryFilter(productsCatalog, filter));
//         break;
//       case 2: 
//         let priceComparation = parseInt(prompt("Ingrese que filtro desea usar:\n1) Mayor o igual que...\n2) Menor o igual que..."))
//         let valueComparation = parseInt(prompt("Ingrese el precio de comparación."));
//         const precioFiltrado = priceFilter(productsCatalog, priceComparation, valueComparation);
//         console.log(precioFiltrado);
//         break;
//     }
//   }
//   else if (producto === "buscarID" || producto === "buscarId" || producto === "BUSCARID" || producto === "buscarid" || producto === "BuscarID") {
//     let searchId = parseInt(prompt("Ingrese el ID del producto que desea buscar..."));
//     while ((searchId === "" || isNaN(searchId) || searchId <= 0  || searchId > productsCatalog.length)) {
//       searchId = parseInt(prompt("Error en la búsqueda, vuelva a ingresar el ID. (Número entre 1 y 5)"));
//     }
//     const found = productsCatalog.find((el)=> el.id === searchId);
//     console.log(found);}
//   else { 
//     alert("El producto ingresado es incorrecto. Por favor, vuelva a ingresar producto.");
//   }
// }

// // FORMAS DE PAGO

// const financing = (cuotas) => {
//   return total / cuotas;
// }
// let cuotas = 0;
// let cuotasAprobado = true;

// if (pay) {

// let paymentSelect = parseInt(prompt("Seleccione como desea abonar su compra, colocando el número correspondiente:\n1.Débito en un pago.\n2.Crédito en un pago.\n3.Tarjeta de crédito en cuotas."));
// while (paymentSelect  !== 1 && paymentSelect  !== 2 && paymentSelect  !== 3) {
//   paymentSelect = prompt("Ingrese una forma de pago válida:\n1) Débito en un pago.\n2) Crédito en un pago.\n3) Tarjeta de crédito en cuotas");
// }

// switch (paymentSelect ) {
//   case 1:
//   alert("¡Gracias por elegirnos!\nSe debitará de su tarjeta de débito el siguiente monto: $"+total+".");  
//   break;  
//   case 2:
//   alert("¡Gracias por elegirnos!\nSe acreditará un pago de $"+total+" en su tarjeta de crédito");
//   break;
//   case 3:
//   cuotas = parseInt(prompt("Ingrese cantidad de cuotas: \n3\n6\n12"));
//   while (cuotasAprobado) {
//   if (cuotas === 3 || cuotas === 6 || cuotas === 12 ) {
//     alert("¡Gracias por elegirnos!\nSu pago será acreditado en "+cuotas+" cuotas de $"+financing(cuotas)+"." );
//     cuotasAprobado= false;
//   }
//   else {
//     cuotas = parseInt(prompt("Ingrese un número de cuotas válido: 3, 6 o 12 cuotas."));
//   }
// }
//   break;
// }

// // ADDING DEBIT/CREDIT CARD

// const Cards = []

// function PaymentCard (number, cvv, expireDate, name, dni) {
//   this.number = number;
//   this.cvv = cvv;
//   this.expireDate = expireDate;
//   this.name = name;
//   this.dni = dni;
// }

// const newCard = () => {
// let numeroTarjeta = prompt("Ingrese el número de su tarjeta");
// let cvv = prompt("Ingrese el código de seguridad");
// let fechaVencimiento = prompt("Ingrese la fecha de expiración de su tarjeta.");
// let titular = prompt ("Ingrese el nombre del titular, tal cual figura en la tarjeta.")
// let dni = prompt("Ingrese el DNI del titular.")
// const userCard = new PaymentCard (numeroTarjeta, cvv, fechaVencimiento, titular, dni);
// Cards.push(userCard);
// }

// alert("Ya casi estamos listos... seleccioná tu tarjeta para pagar.")
// newCard();
// console.log(Cards);

// alert("Su pago ha sido procesado correctamente.\nEl pedido se está preparando... nos pondremos en contacto para coordinar la entrega.");






















































  
  














