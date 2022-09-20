
//USER LOGIN

let userStored = "diego-dev";
let passwordStored = "coderhouse";
let autentication = false;
let loginError = true;
let loginAdvise = 0;
let adviseExist = false;

let loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", userLogin)

function userLogin () {   
  autentication = localStorage.getItem("autentication")
  if (autentication === false || autentication === null) {
    let user = document.getElementById("user-input").value;
    let password = document.getElementById("password-input").value; 
    if (password === passwordStored && user === userStored) {
      createLoggedDiv(user);
      loginError = true;
      autentication = true;
      localStorage.setItem("autentication", autentication)
      setTimeout( function() { window.location.href = "https://ruizdiegomartin.github.io/javascript-coder/"; }, 3000 );
    }
    else {
      while (loginError === true) {
      loginAdvise = document.createElement("p");
      loginAdvise.innerHTML = `<p class="login-error"> Usuario y/o contraseña incorrecta. </p>`
      document.getElementById("password-div").append(loginAdvise);
      loginError = false;
      }
    }
  }
  else {
      if (adviseExist === false) {
      loginAdvise = document.createElement("p");
      loginAdvise.innerHTML = `<p class="login-error"> Ya se encuentra logueado en su cuenta: ${userStored}. </p>`
      document.getElementById("password-div").append(loginAdvise);
      adviseExist = true;
      }
  }
}

function createLoggedDiv(user) {
  let loginForm = document.querySelector("#login-form");
  document.querySelector(".login-body").removeChild(loginForm);
  let welcomeDiv = document.createElement("div");
  welcomeDiv.innerHTML = `<div class="hi-form"> <h3> ¡Hola <strong class="user-name">${user}</strong>! </h3>
  <p> LET IT BE te da la bienvenida. </p> </div>`
  document.querySelector(".login-body").append(welcomeDiv);
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