// RESUME CARD

const productsList = document.querySelector("#buyListResume");
const resumePrice = document.querySelector("#priceResume");

let totalPriceFromStorage = localStorage.getItem("precioCompra")
resumePrice.innerHTML = `$${totalPriceFromStorage}<span>.00</span>`

const cart = JSON.parse(localStorage.getItem("carrito"));
console.log(cart);

// = cart[0];
// console.log(name);
// console.log(amount);

cart.forEach(product => {
    const {img, name, amount} = product;
    createListItemProduct(img, name, amount);
});

function createListItemProduct (img, name, amount) {
    let li = document.createElement("li");
    li.classList.add("product-li");
    li.innerHTML = `<img class="product-img-item" src="../img/${img}" alt="${name}"> <div class="list-data"> <p>${name}</p> <p>Cantidad: <strong>${amount}</strong></p> </div>`;
    productsList.append(li);
}

const cash = document.querySelector("#cashPay");
const card = document.querySelector("#cardPay");
const cuotas = document.querySelector("#installmentsPay");

const checkInputs = document.querySelectorAll(`input[type="checkbox"]`);

// CHECKBOX EVENT

checkInputs.forEach(checkbox => {
    checkbox.addEventListener("change", ()=>{
        selectOneCheck(checkbox);   
    })
});

function selectOneCheck(input){
    if (input.checked === true) {
        checkInputs.forEach(el =>{
            if (el === input) {
                el.checked = true;
            }
            else {
                el.checked = false;
            }
        })
    }
}

const confirmButton = document.querySelector("#confirmBuyButton");
confirmButton.addEventListener("click", ()=>{
    if (cash.checked) {
        createBancaryPayDiv(); 
        clearStorage();
    }
    else if (card.checked) {
        window.location.href = "https://ruizdiegomartin.github.io/javascript-coder/pages/payment.html"
    }
    else if (cuotas.checked) {
        window.location.href = "https://ruizdiegomartin.github.io/javascript-coder/pages/payment.html"
    }
    else {
        adviseAlert("main","Seleccione una forma de pago para continuar");
    }
});

function adviseAlert (contenedorPadre, msj) {
    const userLoginRequired = document.createElement("div");
      userLoginRequired.classList.add("user-login-required");
      userLoginRequired.innerHTML = ` <p class="login-advise-required">${msj}</p>`
      document.querySelector(contenedorPadre).append(userLoginRequired)
      setTimeout( function() { document.querySelector(contenedorPadre).removeChild(userLoginRequired) }, 2000);
}

function createBancaryPayDiv (){
    document.querySelector("main").innerHTML = "";
    const bancaryPay = document.createElement("div");
    bancaryPay.classList.add("bancary-pay-div");
    bancaryPay.innerHTML = `<h3> Pedido procesado <i class="fa-solid fa-circle-check"></i></h3> <p> <span>¡Gracias por elegirnos!</span><br> Tu pedido fue procesado correctamente y será preparado una vez que se efectivice la transferencia bancaria. Luego, recibirás un correo electrónico explicando los pasos a seguir.</p>`;
    document.querySelector("main").append(bancaryPay);
}

function clearStorage (){
    localStorage.removeItem("carrito");
    localStorage.removeItem("carrito-counter");
    localStorage.removeItem("precioCompra");
}