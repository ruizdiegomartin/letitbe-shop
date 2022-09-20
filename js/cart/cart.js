// CARRITO REFRESH RENDER

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

// RENDER PRODUCTS AMOUNTS STORAGED

cart.forEach(product => {
  document.querySelector(`#numberAmount${product.id}`).value = product.amount;
})

// function saveChangesInAmounts() {

// cart.forEach(product => {
//   document.querySelector(`#numberAmount${product.id}`).addEventListener("change", ()=>{
//     let amountChange = document.querySelector(`#numberAmount${product.id}`).value; 
//     // localStorage.setItem("carrito", JSON.stringify(product.amount = amountChange));   VER COMO SOLUCIONAR ESTO
//   })
// });
// }
// saveChangesInAmounts();

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
    const cartBody = document.querySelector("#cart-body");
    cartBody.removeChild(rows[findIndexOfObject]);
    product.stock = (product.stock)+1;
    modifylocalStorage();
    cartCounter();
    refreshCartCounter();
  }

let finalTotal = 0;
let descuento = 0;
let cantidad = 0;
let productAdded = false;
let shopping = true;
let total = 0;
let readyToPay = false;

function showTotalInTable() {
  let totalForProduct = 0;
  total = 0;
  cart.forEach(product => {   
  totalForProduct = product.amount * product.price;
  total = total + totalForProduct;
  });
  // PROMO DESCUENTO
  let promCode = document.querySelector("#promotionCode").value
  if (promCode === "LET10"){
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

// CALCULATE PRICE BUTTON EVENT

document.querySelector("#finish-btn").addEventListener("click", ()=> {
    console.log("Valor total de la compra: "+total);
    cart.forEach(product => {
      amountCounter (product);
    });
    showTotalInTable();
    document.querySelector("#cart-greeting").innerText = "¡Gracias por tu compra! Esperamos que vuelvas pronto...";
    console.log(cart);
    localStorage.setItem("precioCompra", finalTotal)
    shopping = false;
    readyToPay = true; 
  }) 

// CONTINUE TO PAY BUTTON EVENT

document.querySelector("#continueToPayBtn").addEventListener("click", (e)=>{
  e.preventDefault();
  if (readyToPay === true){
    window.location.href = "https://ruizdiegomartin.github.io/javascript-coder/pages/payment.html"
  }
});

// COUNT THE AMOUNT OF PRODUCT IN EACH ROW

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
  
// SET ITEMS OF CARRITO IN LOCALSTORE

function modifylocalStorage () {
  localStorage.setItem("carrito", JSON.stringify(cart));
}

let cartProductsNumber;
  
//CART COUNTER ICON

function cartCounter() {
  
const carritoAMOUNT = JSON.parse(localStorage.getItem("carrito"));   
let counter = carritoAMOUNT.length;

localStorage.setItem("carrito-counter", counter);
}

// REFRESH CART ICON COUNTER

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



