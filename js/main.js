
// FUNCION CONSTRUCTORA

function Product (id, img, product, price, category, stock, amount) {
  this.id = id;
  this.img = img;
  this.name = product;
  this.price = price;
  this.category = category;
  this.stock = stock;
  this.amount = amount;
}

// PRODUCTS

const product1 = new Product (1,"./img/product_soy-candle.jpg", "Vela de soja", 600, "velas", 20, 1);
const product2 = new Product (2,"./img/product_difusor.jpg", "Difusor aromático", 500, "difusores", 35, 1);
const product3 = new Product (3,"./img/product-bolsa-aromatizadora.JPG", "Bolsa aromática", 300, "difusores", 15, 1);
const product4 = new Product (4,"./img/product_splash.jpg", "Splash difusor", 700, "difusores", 25, 1);
const product5 = new Product (5,"./img/product_liquid-soap.jpg", "Jabón líquido", 650, "limpieza", 23, 1);
const product6 = new Product (6,"./img/product_nordic-blanket.jpg", "Manta nórdica", 5000, "otros", 10, 1);
const product7 = new Product (7,"./img/product-aromatizador-auto.JPG", "Difusor de auto", 450, "difusores", 15, 1);
const product8 = new Product (8,"./img/vela-silver.png", "Vela silver", 750, "velas", 20, 1);
const product9 = new Product (9,"./img/product_bubble-candle.jpg", "Vela burbuja", 700, "velas", 22, 1);

const cart = JSON.parse(localStorage.getItem("carrito")) || [];
cart.forEach(product => {
      const newProductRow = document.createElement("tr");
      newProductRow.classList.add("newRow-product");
      newProductRow.innerHTML = `
      <td class="tbody"> ${product.name} </td>
      <td class="tbody"> $${product.price} </td>
      <td class="tbody"> <input id="numberAmount${product.id}" class="number-amount" type="number" min="0" max="${product.stock}"> </td>
      <td class="tbody"> $${parseInt(product.price)} </td>
      `
      const deleteButton = createDeleteButton(product);
      newProductRow.append(deleteButton);
      
      document.querySelector("#cart-body").append(newProductRow);
           
});
cart.forEach(product => {
  document.querySelector(`#numberAmount${product.id}`).value = product.amount;
})
console.log(cart);

productsCatalog = [];
productsCatalog.push(product1, product2, product3, product4, product5, product6, product7, product8, product9);

function showProducts (products) {
  document.querySelector("#main-container").innerHTML = "";
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

    document.querySelector("#main-container").append(productCard);
    
  });
}

function createBuyButton (product) {
  const button = document.createElement("button");
  button.classList.add("buy-btn")
  button.innerText = "Añadir al carrito";
  button.addEventListener("click", ()=>{
    showInTable(product);
    addToCart(product);
    
  })
  return button;
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



let tableExample = true;

function showInTable(product) {
  // const productExist = cart.includes(product);
  const findProductInCartStoraged = cart.find (el => el.id === product.id)
  const existInStorage = cart.includes(findProductInCartStoraged);

  if (product.stock > 0 && existInStorage === false ) {
      const newProductRow = document.createElement("tr");
      newProductRow.classList.add("newRow-product");
      newProductRow.innerHTML = `
      <td class="tbody"> ${product.name} </td>
      <td class="tbody"> $${product.price} </td>
      <td class="tbody"> <input id="numberAmount${product.id}" class="number-amount" type="number" min="0" max="${product.stock}"> </td>
      <td class="tbody"> $${parseInt(product.price)} </td>
      `
      const deleteButton = createDeleteButton(product);
      newProductRow.append(deleteButton);

      document.querySelector("#cart-body").append(newProductRow);
  } 
  else {}
}

function amountCounter (product) {
  const amountModifier = parseInt(document.querySelector(`#numberAmount${product.id}`).value);
  const productFoundToModify = cart.find(el => el.id === product.id);
  if (amountModifier <= product.stock) {
    productFoundToModify.amount = amountModifier;
    productFoundToModify.stock = productFoundToModify.stock - amountModifier;
  }
  else {
    productFoundToModify.amount = product.stock;
    document.querySelector(`#numberAmount${product.id}`).value = product.stock;
  }
  modifylocalStorage();
}

// function modifyAmount (product) {
//   productsCatalog.forEach(product => { 
//     document.querySelector(`numberAmount${product.id}`).value
//     });

// }

function modifylocalStorage () {
  localStorage.setItem("carrito", JSON.stringify(cart));
}

function addToCart (productToAdd) {
  
  const findProductInCartStoraged = cart.find (el => el.id === productToAdd.id)
  const existInStorage = cart.includes(findProductInCartStoraged);
  // console.log();
  // const productExist = cart.includes(productToAdd);
  // console.log(cart);
  // console.log(productToAdd);
  // console.log(productExist);

  
  if (productToAdd.stock === 0 || productToAdd.amount > productToAdd.stock) {
    createOutOfStockBanner(productToAdd);
  } 
  else {

    if (existInStorage === false) {
    cart.push(productToAdd);
    document.querySelector(`#numberAmount${productToAdd.id}`).value = 1;
    
    console.log(cart);
    productAdded = true; 
    }
    else {
      const findProductAmount = cart.find(el => el.id === productToAdd.id)
      findProductAmount.amount++;
      document.querySelector(`#numberAmount${productToAdd.id}`).value = parseInt(findProductAmount.amount);
    }
    modifylocalStorage();
  }
    // }
  // }    
}
   


function createOutOfStockBanner (productToAdd) {

  
  const outOfStockBanner = document.createElement("div");
    outOfStockBanner.classList.add("out-of-stock-banner-div");
    outOfStockBanner.innerHTML = `<p class="out-of-stock-banner"> SIN STOCK </p>`
    const findIndexOfObject = productsCatalog.indexOf(productToAdd);
    const cards = document.querySelectorAll(".product-card");
    // cartBody.removeChild(rows[findIndexOfObject]);
    const cardSelected = cards[findIndexOfObject]
    cardSelected.prepend(outOfStockBanner);
    
  
}



function createDeleteButton (product) {
  const eraseBtn = document.createElement("button");
  eraseBtn.classList.add("delete-btn")
  eraseBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
  eraseBtn.addEventListener("click", () => {
    deleteCartProduct(product);
  })
  return eraseBtn;
}

function deleteCartProduct (product) {
  const findIndexOfObject = cart.indexOf(product);
  cart.splice(findIndexOfObject, 1);
  const rows = document.querySelectorAll(".newRow-product");
  console.log(cart);
  const cartBody = document.querySelector("#cart-body");
  cartBody.removeChild(rows[findIndexOfObject]);
  product.stock = (product.stock)+1;
  modifylocalStorage();
}

function showTotalInTable() {
  let totalForProduct = 0;
  total = 0;
  cart.forEach(product => {
    
    totalForProduct = product.amount * product.price;
    total = total + totalForProduct;
  });

  let promCode = document.querySelector("#promotionCode").value
  if (promCode === "ABC12"){
    descuento = total * 0.2;
    finalTotal = total - descuento;
    document.querySelector("#discount").classList.replace("display-hide","display-show")
    document.querySelector("#discount").innerHTML = `<p class="discount-number"> Descuento: -$${descuento}</p>`
  }
  else {
    finalTotal = total;
  }
  let totalPrice = document.querySelector("#total-price");
  totalPrice.innerText = ` $${total}`

  document.querySelector("#summarySubtotal").innerText = ` $${finalTotal}`
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



// SHOPPING

let finalTotal = 0;
let descuento = 0;
let cantidad = 0;
let productAdded = false;
let shopping = true;
let total = 0;
let pay = false;

// CARRITO DE COMPRA

// while (shopping && autentication) {   MODIFICAR ESTO DESPUES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  // let producto = prompt("Ingrese el nombre del producto que desea agregar al carrito:\nVELA\nJABON LIQUIDO\nDIFUSOR\nSPLASH\nBOLSA AROMATICA\nPara filtrar un producto escriba: FILTRAR\nPara buscar por ID escriba: buscarID\nPara finalizar la compra escriba: FINALIZAR COMPRA");
  
  document.querySelector("#finish-btn").addEventListener("click", ()=> {
    
    console.log("Valor total de la compra: "+total);
    cart.forEach(product => {
      amountCounter (product);
    });
    showTotalInTable();
    document.querySelector("#cart-greeting").innerText = "¡Gracias por tu compra! Esperamos que vuelvas pronto...";
    console.log(cart);
    shopping = false;
    pay = true;
    
  }) 
  
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
