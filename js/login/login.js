

//USER LOGIN

let userStored = "diego-dev";
let passwordStored = "coderhouse";
let loginError = true;
let loginAdvise = 0;
let adviseExist = false;
let autentication = localStorage.getItem("autentication") || [];

checkLoggin();
// createLoggin();

if (autentication == true) {
let loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", userLogin);
} 

function userLogin () {   
  // autentication = localStorage.getItem("autentication")
  // if (autentication === false || autentication === null) {
    let user = document.getElementById("user-input").value;
    let password = document.getElementById("password-input").value; 
    if (password === passwordStored && user === userStored) {
      createLoggedDiv(user);
      loginError = true;
      autentication = true;
      localStorage.setItem("autentication", autentication)
      setTimeout( function() { window.location.href = "https://ruizdiegomartin.github.io/javascript-coder/"; }, 2000 );
    }
    else {
      while (loginError === true) {
      loginAdvise = document.createElement("p");
      loginAdvise.innerHTML = `<p class="login-error"> Usuario y/o contraseña incorrecta. </p>`
      document.getElementById("password-div").append(loginAdvise);
      loginError = false;
      }
    }
  // }
  // else {
  //     if (adviseExist === false) {
  //     loginAdvise = document.createElement("p");
  //     loginAdvise.innerHTML = `<p class="login-error"> Ya se encuentra logueado en su cuenta: ${userStored}. </p>`
  //     document.getElementById("password-div").append(loginAdvise);
  //     adviseExist = true;
  //     }
  // }
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

function checkLoggin () {
  console.log(autentication);
  if (autentication = autentication == false) {
    createLoggin();
  }
  else {
    createLoggout();
  }
}

function createLoggin (){
  const body = document.querySelector(".login-body")
  body.innerHTML = "";
  const logginDiv = document.createElement("form");
  logginDiv.classList.add("form");
  logginDiv.setAttribute("id", "login-form")
  logginDiv.innerHTML = `
  <h1 class="form__title">User Login</h1>
  <p class="form__description">Ingrese a su cuenta para acceder al carrito de compras.</p>
  <div class="form__group">
    <label for="email" class="form__label">Email</label>
    <input id="user-input" type="text" class="form__input" placeholder="" autocomplete="off"> 
  </div>
  <div class="form__group" id="password-div">
    <label for="password" class="form__label">Password</label>
    <input id="password-input" type="password" class="form__input" placeholder="">
  </div>
  <button type="button" id="login-btn" class="form__button">Ingresar</button>
`
  body.append(logginDiv);
}

function createLoggout() {
  document.querySelector(".login-body").innerHTML ="";
  const logoutDiv = document.createElement("div");
  logoutDiv.classList.add("logout-div")
  logoutDiv.innerHTML = `<h3>User: <strong class="user-name">diego-dev</strong>.</h3>
    <p> Agregá los productos que quieras al carrito.<br/>Te regalamos un código de descuento para tu primer compra de -20%: <strong>LET10</strong></p>`
  const addBtn = createLogOutButton();
  logoutDiv.append(addBtn)
  document.querySelector(".login-body").append(logoutDiv);
}
function createLogOutButton () {
const button = document.createElement("button");
button.classList.add("buy-btn");
button.setAttribute("id", "logoutButton")
button.innerText = "Cerrar sesión";
button.addEventListener("click", ()=>{
  localStorage.removeItem("autentication");
  location.reload();
});
return button;
}