
//USER LOGIN

let main = document.querySelector("main");
let userStored = "diego-dev";
let passwordStored = "coderhouse";
let loginError = false;
let checkboxChecked;
let loginCreated = false;
let autenticated = false;
let localAutentication = localStorage.getItem("autentication") || false;
let sessionAutentication = sessionStorage.getItem("autentication") || false;

document.querySelector(".navAccountButton").addEventListener("click", checkLoggin);

// createLoggin();

// CHECK IF USER IS LOGGED AND CREATE LOGGIN/LOGOUT FORM
function checkLoggin () {
  if (localAutentication == false && sessionAutentication == false) { 
  createLoggin(main);
  document.querySelector("#loginCloseButton").addEventListener("click",()=>{
    main.removeChild(document.querySelector(".form-container"));
  });
  document.querySelector("#rememberMe").addEventListener("change", ()=>{
    checkboxChecked = document.querySelector("#rememberMe").checked;
  });
  document.querySelector("#login-btn").addEventListener("click", userLogin);
  }
  else {
    createLoggout(main);
    document.querySelector("#closeLogoutButton").addEventListener("click",()=>{
      main.removeChild(document.querySelector(".logout-container"));
    });
  }  
}


// // CREATE LOGGIN FORM

// function createLoggin (){
//   const body = document.querySelector(".login-body")
//   body.innerHTML = "";
//   const logginDiv = document.createElement("form");
//   logginDiv.classList.add("form");
//   logginDiv.setAttribute("id", "login-form")
//   logginDiv.innerHTML = `
//   <h1 class="form__title">User Login</h1>
//   <p class="form__description">Ingrese a su cuenta para acceder al carrito de compras.</p>
//   <div class="form__group">
//     <label for="user-input" class="form__label">Usuario</label>
//     <input id="user-input" type="text" class="form__input" placeholder="" autocomplete="off"> 
//   </div>
//   <div class="form__group" id="password-div">
//     <label for="password-input" class="form__label">Password</label>
//     <input id="password-input" type="password" class="form__input" placeholder="">
//   </div>
//   <div class="remember-me-group"><input type="checkbox" id="rememberMe"> <label for="rememberMe">Recordarme</label></div>
//   <button type="button" id="login-btn" class="form__button">Ingresar</button>
// `
//   body.append(logginDiv);
// }

// CREATE LOGGIN FORM 

function createLoggin (containerQuery){
  // const body = document.querySelector(containerQuery)
  // body.innerHTML = "";
  const logginDiv = document.createElement("div");
  logginDiv.classList.add("form-container");
  logginDiv.innerHTML = `<form class="form" id="loginForm">
  <h1 class="form__title">User Login</h1>
  <button class="close-button" id="loginCloseButton"><i class="fa-solid fa-circle-xmark"></i></button>
  <p class="form__description">Ingrese a su cuenta para acceder al carrito de compras.</p>
  <div class="form__group">
    <label for="user-input" class="form__label">Usuario</label>
    <input id="user-input" type="text" class="form__input" placeholder="" autocomplete="off"> 
  </div>
  <div class="form__group" id="password-div">
    <label for="password-input" class="form__label">Password</label>
    <input id="password-input" type="password" class="form__input" placeholder="">
  </div>
  <div class="remember-me-group"><input type="checkbox" id="rememberMe"> <label for="rememberMe">Recordarme</label></div>
  <button type="button" id="login-btn" class="form__button">Ingresar</button>
  </form>
`
  containerQuery.append(logginDiv);
}


// // GRAB AND PUT EVENT ON LOGIN BUTTON, IF LOGGIN FORM EXIST

// if (loginCreated === true) {
// (localAutentication == false && sessionAutentication == false) && document.querySelector("#login-btn").addEventListener("click", userLogin);
// };

function removeLogginFormFromScreen(containerQuery){
  containerQuery.removeChild(document.querySelector("#login-form"));
}

// document.querySelector("#loginCloseButton").addEventListener("click",()=>{
//   main.removeChild(document.querySelector(".form-container"));
// })


// LOGIN FUNCTION
function userLogin () {   
    let user = document.querySelector("#user-input").value;
    let password = document.querySelector("#password-input").value; 
    if (password === passwordStored && user === userStored) {
        // createLoggedDiv(userStored);
        createLoadingDiv()
        autenticated = true;
        loginError = false;
        // autentication = true;
        (checkboxChecked === true ) ? localStorage.setItem("autentication", autenticated) : sessionStorage.setItem("autentication", autenticated);
        // removeLogginFormFromScreen(main);
    }
    else {
      (loginError === false) && createLogginErrorMessage(); 
    }
}

// CREATE LOGIN ERROR MESSAGE

function createLogginErrorMessage (){
  const loginFailAdvise = document.createElement("p");
  loginFailAdvise.innerHTML = `<p class="login-error"> Usuario y/o contraseña incorrecta. </p>`
  document.getElementById("password-div").append(loginFailAdvise);
  loginError = true;
  setTimeout( function() {document.querySelector("#password-div").removeChild(loginFailAdvise); loginError = false;}, 1000 );
}

// // REMEMBER CHECKBOX EVENT SETTING, WHEN AUTENTICATION IS FALSE
// if (loginCreated === true) {
//   console.log(loginCreated);
// (localAutentication == false && sessionAutentication == false) && document.querySelector("#rememberMe").addEventListener("change", ()=>{
//   checkboxChecked = document.querySelector("#rememberMe").checked;});
// }
// CREATE LOGGED DIV

function createLoggedDiv(user) {
  document.querySelector(".form-container").innerHTML ="";
  // main.removeChild(document.querySelector(".form-container"));
  let welcomeDiv = document.createElement("div");
  welcomeDiv.innerHTML = `<div class="hi-form"> <h3> ¡Hola <strong class="user-name">${user}</strong>! </h3>
  <p> LET IT BE te da la bienvenida. </p> </div>`
  document.querySelector(".form-container").append(welcomeDiv);
  // main.append(welcomeDiv);
  setTimeout( function() {location.reload()}, 2500 ); 
}

function createLoadingDiv() {
  document.querySelector(".form-container").innerHTML ="";
  // main.removeChild(document.querySelector(".form-container"));
  let loadingDiv = document.createElement("div");
  loadingDiv.classList.add("loading-circle");
  document.querySelector(".form-container").append(loadingDiv);
  // main.append(welcomeDiv);
  setTimeout( function() {createLoggedDiv(userStored);}, 3000 ); 
}

// CREATE LOGGOUT FORM

function createLoggout(containerQuery) {
  // document.querySelector(containerQuery).innerHTML ="";
  const logoutDiv = document.createElement("div");
  logoutDiv.classList.add("logout-container")
  logoutDiv.innerHTML = `<form class="logout-div"><h3>User: <strong class="user-name">diego-dev</strong>.</h3>
    <p> Agregá los productos que quieras al carrito.<br/>Te regalamos un código de descuento para tu primer compra de -20%: <strong>LET10</strong></p><button class="close-button" id="closeLogoutButton"><i class="fa-solid fa-circle-xmark"></i></button></form>`
  const addBtn = createLogOutButton();
  logoutDiv.append(addBtn)
  containerQuery.append(logoutDiv);
}

function createLogOutButton () {
const button = document.createElement("button");
button.classList.add("pink-btn");
button.setAttribute("id", "logoutButton")
button.innerText = "Cerrar sesión";
button.addEventListener("click", ()=>{
  localStorage.clear();
  sessionStorage.clear();
  main.removeChild(document.querySelector(".logout-container"));
  location.reload();
});
return button;
}

// CART COUNTER REFRESH

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