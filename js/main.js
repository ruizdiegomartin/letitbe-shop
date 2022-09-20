
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

// PRODUCTS ARRAY

productsCatalog = [];
productsCatalog.push(product1, product2, product3, product4, product5, product6, product7, product8, product9);

// CARRITO REFRESH IN VARIABLE

const cart = JSON.parse(localStorage.getItem("carrito")) || [];
console.log(cart);

// CART ICON COUNTER

function refreshCartCounter () {
// Actualiza el contador de productos en el carrito, del icono del NAV.
let counter = localStorage.getItem("carrito-counter");
if (counter>0) {
  const cartCounterNumber = document.querySelector(".cart-counter");
  cartCounterNumber.innerText = counter;
  }
}
refreshCartCounter();

// SHOW PRODUCTS CARDS

function showProducts (array) {
  // Renderiza las cards de productos.
  document.querySelector("#main-container").innerHTML = "";
  array.forEach(product => {
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
  // Crea el botón de añadir al carrito de las cards.
  const button = document.createElement("button");
  button.classList.add("buy-btn")
  button.innerText = "Añadir al carrito";
  button.addEventListener("click", ()=>{
    addToCart(product);
  })
  return button;
}

function addToCart (productToAdd) {
  // Añade un producto al array de carrito.
  let autentication = localStorage.getItem("autentication");
  console.log(autentication);
  if (autentication) {
    const findProductInCartStoraged = cart.find (el => el.id === productToAdd.id)
    const existInStorage = cart.includes(findProductInCartStoraged);
    if (productToAdd.stock === 0 || productToAdd.amount > productToAdd.stock) {
      createOutOfStockBanner(productToAdd);
    } 
    else {
      if (existInStorage === false) {
      cart.push(productToAdd);
      productAdded = true; 
      }
      else {
        const findProductAmount = cart.find(el => el.id === productToAdd.id)
        findProductAmount.amount++;
      }
      modifylocalStorage();
      cartCounter();
      refreshCartCounter ();
    } 
  } 
  else {
    const userLoginRequired = document.createElement("div");
    userLoginRequired.classList.add("user-login-required");
    userLoginRequired.innerHTML = ` <p class="login-advise-required"> Debe loguearse para acceder al carrito de compras. </p>`
    document.querySelector("#main-container").append(userLoginRequired)
    setTimeout( function() { document.querySelector("#main-container").removeChild(userLoginRequired) }, 3000 );
  }  
}

function createDeleteButton (product) {
  // Crea el boton para borrar la fila del producto en el carrito html, y en el array del carrito.
  const eraseBtn = document.createElement("button");
  eraseBtn.classList.add("delete-btn")
  eraseBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
  eraseBtn.addEventListener("click", () => {
    deleteCartProduct(product);
  })
  return eraseBtn;
}

function deleteCartProduct (product) {
  // Borra el producto del array del carrito, y despues borra la fila del producto en el html. Funciona buscando el índice del producto en el array que coincide con el que ingresa por parámetro, y luego lo corta del array.
  const findIndexOfObject = cart.indexOf(product);
  cart.splice(findIndexOfObject, 1);
  const rows = document.querySelectorAll(".newRow-product");
  console.log(cart);
  const cartBody = document.querySelector("#cart-body");
  cartBody.removeChild(rows[findIndexOfObject]);
  product.stock = (product.stock)+1;
  modifylocalStorage();
  cartCounter ()
}

// SHOW PRODUCT CALL

showProducts(productsCatalog);

// FUNCTIONS OF AMOUNT IMPUTS OF CART

function amountCounter (product) {
  // Actualiza el amount de productos de acuerdo a lo ingresado por el input number de la tabla, y luego lo actualiza en storage.
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

function modifylocalStorage () {
  localStorage.setItem("carrito", JSON.stringify(cart));
}

function cartCounter() {
  // Cuenta los productos que hay en el STORAGE del array carrito, y actualiza el contador del STORAGE.
  const carritoAMOUNT = JSON.parse(localStorage.getItem("carrito"));  
  let counter = carritoAMOUNT.length;
  
  localStorage.setItem("carrito-counter", counter);
}

function refreshCartCounter () {
  // Actualiza el contador de productos en el carrito, del icono del NAV.
  let counter = localStorage.getItem("carrito-counter");
  if (counter>0) {
    const cartCounterNumber = document.querySelector(".cart-counter");
    cartCounterNumber.classList.remove("d-none")
    cartCounterNumber.innerText = counter;
    }
  else {
      const cartCounterNumber = document.querySelector(".cart-counter");
      cartCounterNumber.innerText = "0";
      cartCounterNumber.classList.add("d-none")
  }
}
refreshCartCounter();

//FILTERS

let displayFilters = false; 
document.querySelector("#showFilters").addEventListener("click", ()=>{
  if (displayFilters === false) {
  document.querySelector(".filters-container").classList.remove("d-none");
  displayFilters = true;
  }
  else {document.querySelector(".filters-container").classList.add("d-none");
  displayFilters = false;}
})

// CATEGORIES FILTER

function categoryFilter (arr,filter) {
  const filtered = arr.filter((el)=>{
   return el.category.includes(filter)
  })
  return filtered;
 }

 
let limpieza = document.querySelector("#limpiezaCheck");
limpieza.addEventListener("change", ()=>{
  if (limpieza.checked) {
    const categoryFiltered = categoryFilter(productsCatalog, "limpieza");
    showProducts(categoryFiltered);
  }
  else {
    showProducts(productsCatalog);
  } 
});

let velas = document.querySelector("#velasCheck");
velas.addEventListener("change", ()=>{
  if (velas.checked) {
    const categoryFiltered = categoryFilter(productsCatalog, "velas");
    showProducts(categoryFiltered);
  }
  else {
    showProducts(productsCatalog);
  } 
});

let difusores = document.querySelector("#difusoresCheck");
difusores.addEventListener("change", ()=>{
  if (difusores.checked) {
    const categoryFiltered = categoryFilter(productsCatalog, "difusores");
    showProducts(categoryFiltered);
  }
  else {
    showProducts(productsCatalog);
  } 
});

let otros = document.querySelector("#otrosCheck");
otros.addEventListener("change", ()=>{
  if (otros.checked) {
    const categoryFiltered = categoryFilter(productsCatalog, "otros");
    showProducts(categoryFiltered);
  }
  else {
    showProducts(productsCatalog);
  } 
});
   
// PRICE FILTER

function priceFilter (arr, comparación, valor) {
  return arr.filter((el)=> {
    switch (comparación) {
      case 1: 
      return el.price>valor;
      case 2: 
      return el.price<valor;
    }
  })
}

document.querySelector("#priceRangeBtn").addEventListener("click", ()=>{
  let lowRangeValue = parseFloat(document.querySelector("#lowerRange").value);
  let higherRangeValue = parseFloat(document.querySelector("#higherRange").value);
 
  if ( !isNaN(lowRangeValue) && isNaN(higherRangeValue) ){
    const lowRangeArray = (priceFilter(productsCatalog, 1, lowRangeValue));
    showProducts(lowRangeArray);
    createGoBackBtn();
    document.querySelector("#priceRangeBtn").classList.replace("d-show", "d-none");
  }
  else if ( isNaN(lowRangeValue) && !isNaN(higherRangeValue) ){
    const highRangeArray = (priceFilter(productsCatalog, 2, higherRangeValue));
    showProducts(highRangeArray);
    createGoBackBtn();
    document.querySelector("#priceRangeBtn").classList.replace("d-show", "d-none");
  }
});

function createGoBackBtn () {
  const goBackButton = document.createElement("button");
  goBackButton.classList.add("go-back-button","buy-btn")
  goBackButton.innerText = "Volver";
  document.querySelector(".filters-container__price-filter").append(goBackButton);

  goBackButton.addEventListener("click", ()=>{
    showProducts(productsCatalog);
    document.querySelector(".filters-container__price-filter").removeChild(goBackButton);
    document.querySelector("#priceRangeBtn").classList.replace("d-none", "d-show");
  })
}

// ID SEARCH

document.querySelector("#findProductIdBtn").addEventListener("click", ()=>{
  let idInput = parseInt(document.querySelector("#findProductId").value);

  if (!isNaN(idInput) && idInput > 0 && idInput < productsCatalog.length) { 
    const idFound = productsCatalog.find((el)=> el.id === idInput);
    const arrayForFound = []
    arrayForFound.push(idFound);
    showProducts(arrayForFound);
    createSearchIDGoBackBtn();
    document.querySelector("#findProductIdBtn").classList.replace("d-show", "d-none");
    }
  else { 
    const idNotFound = document.createElement("p");
    idNotFound.classList.add("id-search-error")
    idNotFound.innerText = "ID no encontrado."
    document.querySelector(".filters-container__find-product-id").append(idNotFound);
    setTimeout( function() { document.querySelector(".filters-container__find-product-id").removeChild(idNotFound); }, 5000 );
  }
})

function createSearchIDGoBackBtn () {
  const goBackButton = document.createElement("button");
  goBackButton.classList.add("go-back-button","buy-btn")
  goBackButton.innerText = "Volver";
  document.querySelector(".filters-container__find-product-id").append(goBackButton);

  goBackButton.addEventListener("click", ()=>{
    showProducts(productsCatalog);
    document.querySelector(".filters-container__find-product-id").removeChild(goBackButton);
    document.querySelector("#findProductIdBtn").classList.replace("d-none", "d-show");
  })
}


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

