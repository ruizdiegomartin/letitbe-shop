// // PRODUCTS ARRAY
const productsCatalogue = [];
// productsCatalogue.push(product1, product2, product3, product4, product5, product6, product7, product8, product9);
let showAdvise = true;

async function getProductsFromJson () {
  try {
    const response = await fetch("./js/data/products.json")
    const data = await response.json();
    data.forEach(el => {
      productsCatalogue.push(el)
    })
    showProducts(data);
  } catch (error) {
    console.log(error);
  }  
};

getProductsFromJson();
console.log(productsCatalogue);

// VARIABLES
const cart = JSON.parse(localStorage.getItem("carrito")) || [];
const categories = ["limpieza", "velas", "difusores", "otros"];
const checkboxInputs = document.querySelectorAll(`input[type="checkbox"]`);
let searchIdNotFound = false;

// SHOW PRODUCTS

function showProducts (array) {
  // Renderiza las cards de productos, en el array que entra por parámetro.
  document.querySelector("#main-container").innerHTML = "";
  array.forEach(product => {
    const productCard = document.createElement("article");
    productCard.classList.add("product-card");
    const {id, img, name, price, category, stock, amount} = product;
    productCard.innerHTML = 
      `<img class="product-card__img" src="./img/${img}" alt="${name}">
       <h2 class="product-card__title">${name}</h2>
       <p class="product-card__description">Vela hecha a base de soja, en cuenco de madera. Variedad de aromas.</p>
       <p class="product-card__price"> $${price} </p>`; 
    const buyButton = createBuyButton(product);
    productCard.append(buyButton);
    document.querySelector("#main-container").append(productCard); 
  });
};
// showProducts(productsCatalogue);

function createBuyButton (product) {
  // Crea el botón de añadir al carrito de las cards de los productos.
  const button = document.createElement("button");
  button.classList.add("buy-btn");
  button.innerText = "Añadir al carrito";
  button.addEventListener("click", ()=>{
    addToCart(product);
  })
  return button;
};


// ADD TO CART 

function addToCart (productToAdd) {
  // Añade un producto al array de carrito.
  let localAutentication = localStorage.getItem("autentication") || false;
  let sessionAutentication = sessionStorage.getItem("autentication") || false;
  if (localAutentication == "true" || sessionAutentication == "true") {
    if (productToAdd.stock === 0) {
      createOutOfStockBanner(productToAdd);
    } 
    else {
      const findProductInCartStoraged = cart.find (el => el.id === productToAdd.id)
      const existInStorage = cart.includes(findProductInCartStoraged);
      if (existInStorage === false) {
      cart.push(productToAdd);
      // Swal.fire(
      //   'Producto añadido al carrito',
      //   '<i style="font-size: 3rem" class="fa-solid fa-cart-plus">',
      //   'success'
      // )
      notificationAlert("#main-container", `Producto agregado al carrito <i class="fa-solid fa-cart-plus"></i>`);
      }
      else {
        showAdviseAlreadyInCart(productToAdd);
      }
      updateLocalStorage();
      cartCounter();
      refreshCartCounter ();
    } 
  } 
  else {
    adviseAlert("#main-container","Ingrese a su cuenta para acceder al carrito de compras.")
  }  
};

// UPDATE CART IN LOCAL STORAGE

function updateLocalStorage () {
  localStorage.setItem("carrito", JSON.stringify(cart));
};

//SHOW/HIDE FILTERS

let showFilters = false; 
document.querySelector("#showFilters").addEventListener("click", ()=>{
  if (showFilters === false) {
  document.querySelector(".filters-container").classList.remove("d-none");
  showFilters = true;
  }
  else {document.querySelector(".filters-container").classList.add("d-none");
  showFilters = false;}
  showProducts(productsCatalogue);
});

// CATEGORIES FILTER

function categoryFilter (arr,filter) {
  const filtered = arr.filter((el)=>{
   return el.category.includes(filter)
  })
  return filtered;
 }

categories.forEach(category => {
filterCategory(category);
});

function filterCategory(category) {
  let categorySelected = document.querySelector(`#${category}Check`);
  categorySelected.addEventListener("change", ()=>{
    if (categorySelected.checked) {
      const categoryFiltered = categoryFilter(productsCatalogue, `${category}`);
      showProducts(categoryFiltered);
    }
    else {
      showProducts(productsCatalogue);
    } 
  });
};

// CATEGORY FILTER CHECKBOXS EVENT

checkboxInputs.forEach(checkbox => {
  checkbox.addEventListener("change", ()=>{
      selectOneCheck(checkbox);   
  })
});

function selectOneCheck(input){
  if (input.checked === true) {
      checkboxInputs.forEach(el =>{
          if (el === input) {
              el.checked = true;
          }
          else {
              el.checked = false;
          }
      })
  }
};
   
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
};

document.querySelector("#priceRangeBtn").addEventListener("click", ()=>{
  let lowRangeValue = parseFloat(document.querySelector("#lowerRange").value);
  let highRangeValue = parseFloat(document.querySelector("#higherRange").value);
  priceRangeFilter(lowRangeValue, highRangeValue);
});

function priceRangeFilter(lowValue,highValue) {
  if ( !isNaN(lowValue) && isNaN(highValue) ){
    const lowRangeArray = (priceFilter(productsCatalogue, 1, lowValue));
    showProducts(lowRangeArray);
    createGoBackBtn();
    document.querySelector("#priceRangeBtn").classList.replace("d-show", "d-none");
  }
  else if ( isNaN(lowValue) && !isNaN(highValue) ){
    const highRangeArray = (priceFilter(productsCatalogue, 2, highValue));
    showProducts(highRangeArray);
    createGoBackBtn();
    document.querySelector("#priceRangeBtn").classList.replace("d-show", "d-none");
  };
};

function createGoBackBtn () {
  const goBackButton = document.createElement("button");
  goBackButton.classList.add("go-back-button","buy-btn")
  goBackButton.innerText = "Volver";
  document.querySelector(".filters-container__price-filter").append(goBackButton);

  goBackButton.addEventListener("click", ()=>{
    showProducts(productsCatalogue);
    document.querySelector(".filters-container__price-filter").removeChild(goBackButton);
    document.querySelector("#priceRangeBtn").classList.replace("d-none", "d-show");
  })
};

// ID SEARCH

document.querySelector("#findProductIdBtn").addEventListener("click", ()=>{
  let idInput = parseInt(document.querySelector("#findProductId").value);
  searchId(idInput);
});

function searchId(id) {
  if (!isNaN(id) && id > 0 && id < productsCatalogue.length) { 
    const idFound = productsCatalogue.find((el)=> el.id === id);
    const arrayForFound = []
    arrayForFound.push(idFound);
    showProducts(arrayForFound);
    createSearchIDGoBackBtn();
    document.querySelector("#findProductIdBtn").classList.replace("d-show", "d-none");
    }
  else { 
    if (searchIdNotFound === false){
      const idNotFound = document.createElement("p");
      idNotFound.classList.add("id-search-error")
      idNotFound.innerText = "ID no encontrado."
      document.querySelector(".filters-container__find-product-id").append(idNotFound);
      searchIdNotFound = true;
      setTimeout( function() { document.querySelector(".filters-container__find-product-id").removeChild(idNotFound); searchIdNotFound = false; }, 1000 );
    }
    else{};
  };
};

function createSearchIDGoBackBtn () {
  const goBackButton = document.createElement("button");
  goBackButton.classList.add("go-back-button","buy-btn")
  goBackButton.innerText = "Volver";
  document.querySelector(".filters-container__find-product-id").append(goBackButton);

  goBackButton.addEventListener("click", ()=>{
    showProducts(productsCatalogue);
    document.querySelector(".filters-container__find-product-id").removeChild(goBackButton);
    document.querySelector("#findProductIdBtn").classList.replace("d-none", "d-show");
  })
};

// CART ICON COUNTER

function cartCounter() {
  // Cuenta los productos que hay en el STORAGE del array carrito, y actualiza el contador del STORAGE.
  const carritoAMOUNT = JSON.parse(localStorage.getItem("carrito"));  
  let counter = carritoAMOUNT.length;
  
  localStorage.setItem("carrito-counter", counter);
};

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
};
refreshCartCounter();

//FUNCION ALERT
function adviseAlert (contenedorPadre, msj) {
  // Crea un mensaje de alerta en pantalla que dura dos segundos.
  const userLoginRequired = document.createElement("div");
  userLoginRequired.classList.add("alert-div");
  userLoginRequired.innerHTML = ` <div class="user-login-required"><p class="login-advise-required">${msj}</p></div>`
  document.querySelector(contenedorPadre).append(userLoginRequired)
  setTimeout( function() { document.querySelector(contenedorPadre).removeChild(userLoginRequired) }, 2000 )
};

// FUNCTION NOTIFICATION ALERT
function notificationAlert (contenedorPadre, msj) {
  // Crea una notificacion en la esquina superior derecha en pantalla.
  const notification = document.createElement("div");
  notification.classList.add("notification-div");
  notification.innerHTML = ` <div class="notification-msj"><p>${msj}</p></div>`
  document.querySelector(contenedorPadre).append(notification)
  setTimeout( function() { document.querySelector(contenedorPadre).removeChild(notification) }, 1000 )
};

const ProductAlreadyInCart = async function recover (productToAdd) {
  const response = await fetch("./js/data/products.json")
  const data = await response.json();
  (showAdvise === true) && createAdviseAlreadyInCart(productToAdd);
};

//FUNCTION SHOW MESSAGE WHEN PRODUCT IS ALREADY IN CART
// let showAdvise = true;
// function alertProductAlreadyInCart(productToAdd) {
//   if (showAdvise === true){
//     createAdviseAlreadyInCart(productToAdd);
//   }
//   else{};
// };

const showAdviseAlreadyInCart = async function recover (productToAdd) {
  const response = await fetch("./js/data/products.json")
  const data = await response.json();
  createAdviseAlreadyInCart (data, productToAdd);
};

function createAdviseAlreadyInCart (arr, productToAdd){
  let foundProduct = arr.find(el=> el.id === productToAdd.id);
  let indexFounded = arr.indexOf(foundProduct);
  const cards = document.querySelectorAll(".product-card");
  const targetCard = cards[indexFounded];
  if (showAdvise === true){
    const advise = document.createElement("p");
    advise.classList.add("product-advise");
    advise.innerText = "Este producto ya se encuentra en el carrito."
    targetCard.append(advise);
    showAdvise = false;
    setTimeout( function() { targetCard.removeChild(advise); showAdvise = true}, 1000 );
  };
};

// FUNCTION TO CREATE BANNER WHEN PRODUCT IS OUT OF STOCK

const createOutOfStockBanner = async function recover (productToAdd) {
  const response = await fetch("./js/data/products.json")
  const data = await response.json();
  createBanner(data, productToAdd)
};


let bannerShow = true;
function createBanner (arr, productToAdd){
  if (bannerShow === true){
    let founded = arr.find(el=> el.id === productToAdd.id);
    const indexCard = arr.indexOf(founded)
    const cards = document.querySelectorAll(".product-card");
    const targetCard = cards[indexCard];
    const banner = document.createElement("div");
    banner.classList.add("out-of-stock-banner-div");
    banner.innerHTML = `<p> PRODUCTO AGOTADO </p>`
    targetCard.append(banner);
    bannerShow = false;
    setTimeout( function() { targetCard.removeChild(banner); showAdvise = true; bannerShow = true;}, 1000);
  }
  else{};
};

// // FUNCION CONSTRUCTORA
// function Product (id, img, product, price, category, stock, amount) {
//   this.id = id;
//   this.img = img;
//   this.name = product;
//   this.price = price;
//   this.category = category;
//   this.stock = stock;
//   this.amount = amount;getDataFromJsongetDataFromJson
// }

// // PRODUCTS
// const product1 = new Product (1,"product_soy-candle.jpg", "Vela de soja", 600, "velas", 20, 1);
// const product2 = new Product (2,"product_difusor.jpg", "Difusor aromático", 500, "difusores", 35, 1);
// const product3 = new Product (3,"product-bolsa-aromatizadora.JPG", "Bolsa aromática", 300, "difusores", 15, 1);
// const product4 = new Product (4,"product_splash.jpg", "Splash difusor", 700, "difusores", 25, 1);
// const product5 = new Product (5,"product_liquid-soap.jpg", "Jabón líquido", 650, "limpieza", 23, 1);
// const product6 = new Product (6,"product_nordic-blanket.jpg", "Manta nórdica", 5000, "otros", 0, 1);
// const product7 = new Product (7,"product-aromatizador-auto.JPG", "Difusor de auto", 450, "difusores", 15, 1);
// const product8 = new Product (8,"vela-silver.png", "Vela silver", 750, "velas", 20, 1);
// const product9 = new Product (9,"product_bubble-candle.jpg", "Vela burbuja", 700, "velas", 22, 1);
