// RESUME CARD

const productsList = document.querySelector("#buyListResume");
const resumePrice = document.querySelector("#priceResume");

const totalPriceFromStorage = parseInt(localStorage.getItem("precioCompra"));
resumePrice.innerHTML = `$${totalPriceFromStorage}<span>.00</span>`

const cart = JSON.parse(localStorage.getItem("carrito"));
console.log(cart);


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
        } 
    else if (card.checked) {
        window.location.href = "https://ruizdiegomartin.github.io/LetItBe-JavaScript/pages/checkout.html"
    }
    else if (cuotas.checked) {
        document.querySelector(".payment-container").classList.add("d-none");
    //  CREATE DIV TO CHOOSE FINANCING
        createFinancingChooseDiv();
        calculateCuotas();
        //CREATE BUTTONS EVENT
        const allButtons = document.querySelectorAll(".financing-button");
        allButtons.forEach(button => {
            button.addEventListener("click",()=>{
                // SAVE DATA IN LOCALSTORAGE
                createPaymentObjectInStorage (button)
                // REDIRECT TO CARD INFO
                window.location.href = "https://ruizdiegomartin.github.io/LetItBe-JavaScript/pages/checkout.html";
            })
        });
    }
    else {
        adviseAlert("main","Seleccione una forma de pago para continuar");
    }
});

function adviseAlert (contenedorPadre, msj) {
    // Crea un mensaje de alerta en pantalla que dura dos segundos.
    const userLoginRequired = document.createElement("div");
      userLoginRequired.classList.add("alert-div");
      userLoginRequired.innerHTML = ` <div class="user-login-required"><p class="login-advise-required">${msj}</p></div>`
      document.querySelector(contenedorPadre).append(userLoginRequired)
      setTimeout( function() { document.querySelector(contenedorPadre).removeChild(userLoginRequired) }, 2000 )
}

function createBancaryPayDiv (){
    document.querySelector("main").innerHTML = "";
    const bancaryPay = document.createElement("div");
    bancaryPay.classList.add("bancary-pay-div");
    bancaryPay.innerHTML = `<h3> Pedido procesado <i class="fa-solid fa-circle-check"></i></h3> <p> <span>¡Gracias por elegirnos!</span><br> Tu pedido fue procesado correctamente y será preparado una vez que se efectivice la transferencia bancaria. Luego, recibirás un correo electrónico explicando los pasos a seguir.</p>`;
    document.querySelector("main").append(bancaryPay);
    setTimeout( function() { clearStorage(); window.location.href = "https://ruizdiegomartin.github.io/LetItBe-JavaScript/index.html";}, 5000 );
}

function clearStorage (){
    localStorage.removeItem("carrito");
    localStorage.removeItem("carrito-counter");
    localStorage.removeItem("precioCompra");
}

function createFinancingChooseDiv() {
    const chooseFinancingDiv = document.createElement("div");
    chooseFinancingDiv.classList.add("financing-div");
    chooseFinancingDiv.innerHTML = `<button class="financing-button" id="financingButton1"> <span class="financing-amount">1x</span><p class="pay-amount" id="monthlyPay1">$350</p><span class="decimals">.00</span> <p class="pay-amount-total" id="financingTotalEach1"></span></p><span class="decimals">.00</span> </button>
    <button class="financing-button" id="financingButton2"> <span class="financing-amount">3x</span><p class="pay-amount" id="monthlyPay2">$350</p><span class="decimals">.00</span> <p class="pay-amount-total" id="financingTotalEach2"></p><span class="decimals">.00</span> </button>
    <button class="financing-button" id="financingButton3"> <span class="financing-amount">6x</span><p class="pay-amount" id="monthlyPay3">$350</p><span class="decimals">.00</span> <p class="pay-amount-total" id="financingTotalEach3"></p><span class="decimals">.00</span> </button>
    <button class="financing-button" id="financingButton4"> <span class="financing-amount">12x</span><p class="pay-amount" id="monthlyPay4">$350</p><span class="decimals">.00</span> <p class="pay-amount-total" id="financingTotalEach4"></p><span class="decimals">.00</span> </button>`
    document.querySelector(".payments-wrapper").prepend(chooseFinancingDiv);
}

// FINANCING CODE
let totalFor1;
let totalFor2;
let totalFor3;
let totalFor4;
let cuotas1;
let cuotas2;
let cuotas3;
let cuotas4;


function calculateCuotas(){
    // CALCULATE TOTALS
    totalFor1 = totalPriceFromStorage;
    totalFor2 = totalPriceFromStorage*1.20;
    totalFor3 = totalPriceFromStorage*1.40;
    totalFor4 = totalPriceFromStorage*1.60;
    //CALCULATE CUOTAS CON INTERÉS
    cuotas1 = totalFor1;
    cuotas2 = Math.round((totalFor2 / 3));
    cuotas3 = Math.round((totalFor3 / 6));
    cuotas4 = Math.round((totalFor4 / 12));
    //SHOW PRECIO CUOTAS
    document.querySelector("#monthlyPay1").innerText =`$${cuotas1}`
    document.querySelector("#monthlyPay2").innerText =`$${cuotas2}`
    document.querySelector("#monthlyPay3").innerText =`$${cuotas3}`
    document.querySelector("#monthlyPay4").innerText =`$${cuotas4}`
    // SHOW PRECIO TOTAL
    document.querySelector("#financingTotalEach1").innerText =`$${totalFor1}`
    document.querySelector("#financingTotalEach2").innerText =`$${totalFor2}`
    document.querySelector("#financingTotalEach3").innerText =`$${totalFor3}`
    document.querySelector("#financingTotalEach4").innerText =`$${totalFor4}`
}
function createPaymentObjectInStorage (button) {
    // Crea un objeto en el Storage con la información de pago que eligió el usuario: número de cuotas, precio de cuota y precio total.
    if (button === document.querySelector("#financingButton1")) {
        const financiamiento = {number: 1, monthlyPay: cuotas1, totalAmount: totalFor1}
        localStorage.setItem("formaDePago", JSON.stringify(financiamiento));
    }
    else if (button === document.querySelector("#financingButton2")) {
        const financiamiento = {number: 3, monthlyPay: cuotas2, totalAmount: totalFor2}
        localStorage.setItem("formaDePago", JSON.stringify(financiamiento));
    }
    else if (button === document.querySelector("#financingButton3")) {
        const financiamiento = {number: 6, monthlyPay: cuotas3, totalAmount: totalFor3}
        localStorage.setItem("formaDePago", JSON.stringify(financiamiento));
    }
    else if (button === document.querySelector("#financingButton4")) {
        const financiamiento = {number: 12, monthlyPay: cuotas4, totalAmount: totalFor4}
        localStorage.setItem("formaDePago", JSON.stringify(financiamiento));
    }
    else{}
}