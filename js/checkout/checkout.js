// SHOW INPUTS VALUES IN CARD EXAMPLE

let bankName = "BANK NAME";
document.querySelector("#bankName").innerText = bankName;

document.querySelector("#cardNumber").addEventListener("keyup", (event)=>{
    let content = event.target.value;
    changeBankName();
    document.querySelector("#cardNumberExample").innerText = content;
})

document.querySelector("#cardName").addEventListener("keyup", (event)=>{
    let content = (event.target.value).toUpperCase();
    document.querySelector("#cardholderExample").innerText = content;
})

document.querySelector("#expireMonth").addEventListener("keyup", (event)=>{
    let content = event.target.value;
    document.querySelector("#expireMonthExample").innerText = `${content}/`;
})

document.querySelector("#expireYear").addEventListener("keyup", (event)=>{
    let content = event.target.value;
    document.querySelector("#expireYearExample").innerText = ` ${content}`;
})

document.querySelector("#cvvInput").addEventListener("keyup", (event)=>{
    let content = event.target.value;
    document.querySelector("#cvvExample").innerText = content;
})

// CARD COUNTER ICON

function cartCounter() {
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

// // ADDING DEBIT/CREDIT CARD

const payCard = []

function PaymentCard (number, name, expireMonth, expireYear, cvv) {
  this.number = number;
  this.name = name;
  this.expireMonth = expireMonth;
  this.expireYear = expireYear;
  this.cvv = cvv;
};

document.querySelector("#paymentSubmitBtn").addEventListener("click", (e)=>{
    e.preventDefault();
    let numeroTarjeta = document.querySelector("#cardNumber").value;
    let titular = (document.querySelector("#cardName").value).toUpperCase();
    let mesVencimiento = document.querySelector("#expireMonth").value;
    let añoVencimiento = document.querySelector("#expireYear").value;
    let cvv = document.querySelector("#cvvInput").value;
    const userCard = new PaymentCard (numeroTarjeta, titular, mesVencimiento, añoVencimiento, cvv);
    payCard.push(userCard);
    console.log(payCard);
    createPaymentLoadingDiv();
});

// FUNCTION TO CREATE DIV AFTER PAYING

function createPaymentCheckedAdvise (){
    document.querySelector(".payment-main").innerHTML = "";
    const paymentChecked = document.createElement("div");
    paymentChecked.classList.add("payment-done-container")
    paymentChecked.innerHTML = ` <div class="payment-done">
    <p class="payment-done__confirmed"> Pago confirmado <i class="fa-solid fa-circle-check"></i></p>
    <p class="payment-done__thanks"> ¡Gracias por tu compra!</p>
    <p class="payment-done__info"> Estamos preparando tu pedido. Te enviamos un correo electrónico para que puedas seguirlo.</p>
    </div> `
    document.querySelector(".payment-main").append(paymentChecked);  
    setTimeout(() => {clearStorage();refreshCartCounter(); window.location.href ="https://ruizdiegomartin.github.io/LetItBe-JavaScript/index.html";}, 5000); 

}

function createPaymentLoadingDiv() {
    document.querySelector(".payment-main").innerHTML = "";
    const paymentLoading = document.createElement("div");
    paymentLoading.classList.add("loading-circle")
    document.querySelector(".payment-main").append(paymentLoading); 
    setTimeout(() => {createPaymentCheckedAdvise();}, 3500);  
}

// CLEAR CART WHEN BUY FINISH

function clearStorage (){
    //Borra los datos del carrito en el localStorage cuando la compra finaliza, pero mantiene la autenticación para no desloguear forzosamente al usuario.
    localStorage.removeItem("carrito");
    localStorage.removeItem("carrito-counter");
    localStorage.removeItem("precioCompra");
    sessionStorage.removeItem("carrito");
    sessionStorage.removeItem("carrito-counter");
    sessionStorage.removeItem("precioCompra");
}

// FLIP CARD WHEN FOCUS ON CVV INPUT

document.querySelector("#cvvInput").addEventListener("focus", ()=>{
    document.querySelector(".example-credit-card").classList.add("example-credit-card-flip")
})

document.querySelector("#cvvInput").addEventListener("blur", ()=>{
    document.querySelector(".example-credit-card").classList.remove("example-credit-card-flip")
})

// CARD INPUT NUMBER VALIDATION --> CLEAVE

const cleave = new Cleave('#cardNumber', {
    creditCard: true,
    onCreditCardTypeChanged: function (type) {
    }
});


function changeBankName() {
    if (document.querySelector("#bankName").innerText != "" ){
        bankName = (cleave.properties.creditCardType).toUpperCase();
        document.querySelector("#bankName").innerText = bankName || "BANK NAME";
    }
}

// VALIDATE EXPRESIONS

const cardForm = document.querySelector("#cardForm");
const cardInputs = document.querySelectorAll("#cardForm input");

cardInputs.forEach( input => {
    input.addEventListener("keyup", (e)=>{
        formValidate(e);
    })
});

function formValidate(e){
    switch (e.target.name) {
        case "number":

        break;
        case "cardholder":
            if (expresions.cardholder.test(e.target.value)){
                document.querySelector(".name-input i").classList.add("icon-correct");
                document.querySelector(".name-input i").classList.remove("icon-incorrect");
                document.querySelector(".name-input i").classList.remove("d-none");
            } else {
                document.querySelector(".name-input i").classList.remove("d-none");
                document.querySelector(".name-input i").classList.remove("icon-correct");
                document.querySelector(".name-input i").classList.add("icon-incorrect");
                document.querySelector(".name-input i").classList.replace("fa-circle-check","fa-circle-xmark");
            }
        break;
        case "expirationMonth":

        break;
        case "expirationYear":

        break;
        case "cvv":

        break;
    };
};

const expresions = {
    number: /^[\d]$/,
    cardholder: /^[a-zA-Z]+\s+[a-zA-Z]+\s?[a-zA-Z]+\s?[a-zA-Z]+$/,
    month: /^[\d]{2}$/,
    year: /^[\d]{2}$/,
    cvv: /^[\d]{3}$/
};










