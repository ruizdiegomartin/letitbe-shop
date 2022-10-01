// VARIABLES

let total = 0;
let subTotal = 0;
let readyToPay = false;
// let cantidad;
// let productAdded = false;

// CARRITO RENDER
const cart = JSON.parse(localStorage.getItem("carrito")) || [];
cart.forEach(product => {
      const {id, img, name, price, stock} = product
      const newProductRow = document.createElement("tr");
      newProductRow.classList.add("new-row-product");
      newProductRow.innerHTML = `
      <td class="tbody"> <div class="cart-product-item"><img src="../img/${img}"> <p>${name}</p> </div></td>
      <td class="tbody"> <p class="unit-price">$${price}</p></td>
      <td class="tbody"> <input id="numberAmount${id}" class="number-amount" type="number" min="1" max="${stock}"> </td>
      <td class="tbody" id="subtotalPrice${id}"> </td>
      `
      const deleteButton = createDeleteButton(product);
      newProductRow.append(deleteButton);
      document.querySelector("#cart-body").append(newProductRow);          
});

// PRODUCTS AMOUNTS RENDER 
cart.forEach(product => {
  document.querySelector(`#numberAmount${product.id}`).value = product.amount;
  document.querySelector(`#subtotalPrice${product.id}`).innerText = `$${parseInt(product.amount*product.price)}`;
});

// EVENT PRODUCT AMOUNT INPUT
cart.forEach(product => {
  document.querySelector(`#numberAmount${product.id}`).addEventListener("change", ()=>{
    product.amount = parseInt(document.querySelector(`#numberAmount${product.id}`).value);
    document.querySelector(`#subtotalPrice${product.id}`).innerText = `$${parseInt(product.amount*product.price)}`;
    updateLocalStorage();
  });
});

// CALCULATE PRICE BUTTON EVENT
document.querySelector("#finish-btn").addEventListener("click", ()=> {
  calculateTotalsInResume();
  console.log(cart);
  localStorage.setItem("precioCompra", total);
  readyToPay = true; 
}); 

// CONTINUE SHOPPING BUTTON

document.querySelector("#continueShoppingBtn").addEventListener("click", (e)=>{
  e.preventDefault();
  window.location.href = "https://ruizdiegomartin.github.io/LetItBe-JavaScript/index.html";
});

// CONTINUE TO PAY BUTTON EVENT
document.querySelector("#continueToPayBtn").addEventListener("click", (e)=>{
  e.preventDefault();
  if (readyToPay === true && total > 0){
    window.location.href = "https://ruizdiegomartin.github.io/LetItBe-JavaScript/pages/payment-method.html"
  }
  else{
    adviseAlert (".cart-main", "Carrito vacío o compra sin calcular.");
  }
});

// CALCULATE TOTAL AND SUBTOTAL IN RESUME
function calculateTotalsInResume() {
  let totalForEachProduct = 0;
  subTotal = 0;
  cart.forEach(product => {   
  totalForEachProduct = product.amount * product.price;
  subTotal = subTotal + totalForEachProduct;
  });
  console.log(...cart);
  // PROMO DESCUENT
  applyDiscount(20, "LET10");
  // RENDER TOTAL AND SUBTOTAL PRICES
  document.querySelector("#total-price").innerText = ` $${subTotal}`;
  document.querySelector("#summarySubtotal").innerText = ` $${total}`
}

// ADD DISCOUNT CODE
function applyDiscount (discount, code) {
  total = subTotal;
  let promCode = document.querySelector("#promotionCode").value
  if (promCode === code){
    let discountApplied = total * (discount/100);
    total = subTotal - discountApplied;
    document.querySelector("#discount").classList.replace("display-hide","display-show");
    document.querySelector("#discount").innerHTML = `<p class="discount-number"> Descuento: -$${discountApplied}</p>`
  }
  else {
  document.querySelector("#discount").classList.replace("display-show","display-hide"); 
  total = subTotal;
  };
}; 

// REFRESH CARRITO IN LOCALSTORE
function updateLocalStorage () {
  localStorage.setItem("carrito", JSON.stringify(cart));
};

//CART PRODUCTS COUNTER
function cartProductsCount() {
const carritoAMOUNT = JSON.parse(localStorage.getItem("carrito"));   
let counter = carritoAMOUNT.length;
localStorage.setItem("carrito-counter", counter);
};

// REFRESH CART COUNTER ICON 
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
}; refreshCartCounter();

// DELETE PRODUCT BUTTON AND FUNCTION
function createDeleteButton (product) {
  //Crea el boton para borrar un producto de la fila del carrito.
    const eraseBtn = document.createElement("button");
    eraseBtn.classList.add("delete-btn")
    eraseBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
    eraseBtn.addEventListener("click", () => {
      deleteCartProduct(product);
    })
    return eraseBtn;
}; 
function deleteCartProduct (product) {
  //Función que borra el producto del carrito, y de la fila de la tabla.
  const productIndex = cart.indexOf(product);
  cart.splice(productIndex, 1);
  const rows = document.querySelectorAll(".new-row-product");
  const cartBody = document.querySelector("#cart-body");
  cartBody.removeChild(rows[productIndex]);
  updateLocalStorage();
  cartProductsCount();
  refreshCartCounter();
};

// SCREEN ALERT
function adviseAlert (contenedorPadre, msj) {
  // Crea un mensaje de alerta en pantalla que dura dos segundos.
  const userLoginRequired = document.createElement("div");
    userLoginRequired.classList.add("alert-div");
    userLoginRequired.innerHTML = ` <div class="user-login-required"><p class="login-advise-required">${msj}</p></div>`
    document.querySelector(contenedorPadre).append(userLoginRequired)
    setTimeout( function() { document.querySelector(contenedorPadre).removeChild(userLoginRequired) }, 2000 )
};









