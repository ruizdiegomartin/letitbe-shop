// SHOW INPUTS VALUES IN CARD EXAMPLE

document.querySelector("#cardNumber").addEventListener("keyup", (event)=>{
    let nameWritted = event.target.value;
    document.querySelector("#cardNumberExample").innerText = nameWritted;
})

document.querySelector("#cardName").addEventListener("keyup", (event)=>{
    let nameWritted = (event.target.value).toUpperCase();
    document.querySelector("#cardholderExample").innerText = nameWritted;
})

document.querySelector("#expireInput").addEventListener("keyup", (event)=>{
    let nameWritted = event.target.value;
    document.querySelector("#expireExample").innerText = nameWritted;
})

document.querySelector("#cvvInput").addEventListener("keyup", (event)=>{
    let nameWritted = event.target.value;
    document.querySelector("#cvvExample").innerText = nameWritted;
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

function PaymentCard (number, name, expireDate, cvv, dni) {
  this.number = number;
  this.name = name;
  this.expireDate = expireDate;
  this.cvv = cvv;
}

document.querySelector("#paymentSubmitBtn").addEventListener("click", (e)=>{
    e.preventDefault();
    let numeroTarjeta = document.querySelector("#cardNumber").value;
    let titular = (document.querySelector("#cardName").value).toUpperCase();
    let fechaVencimiento = document.querySelector("#expireInput").value;
    let cvv = document.querySelector("#cvvInput").value;
    const userCard = new PaymentCard (numeroTarjeta, titular, fechaVencimiento, cvv);
    payCard.push(userCard);
    console.log(payCard);
    createPaymentCheckedAdvise();
    localStorage.clear();
    refreshCartCounter();
})

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
}












