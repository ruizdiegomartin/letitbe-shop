// //USER LOGIN

// let userStored = "diego-dev";
// let passwordStored = "coderhouse";
// let autentication = false;
// let showError = true;
// let loginAdvise = 0;

// let loginBtn = document.getElementById("login-btn");
// loginBtn.addEventListener("click", userLogin)

// function userLogin () {   
  
//   let user = document.getElementById("user-input").value;
//   let password = document.getElementById("password-input").value; 
//   if (password === passwordStored && user === userStored) {
//     alert("Usuario autentificado. Bienvenido "+user+".")
//     while (showError === false) {
//       document.querySelector("#password-div").removeChild(loginAdvise);
//       showError = true;
//     }
//     autentication = true;
//   }
//   else {
//     while (showError === true) {
//     loginAdvise = document.createElement("p");
//     loginAdvise.innerHTML = `<p class="login-error"> Usuario y/o contraseña incorrecta. </p>`
//     document.getElementById("password-div").append(loginAdvise);
//     showError = false;
//     }
//   }
// }

//USER LOGIN

let userStored = "diego-dev";
let passwordStored = "coderhouse";
let autentication = false;
let showError = true;
let loginAdvise = 0;
let adviseExist = false;

let loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", userLogin)

function userLogin () {   
  autentication = localStorage.getItem("autentication")
  if (autentication === false) {
  
    let user = document.getElementById("user-input").value;
    let password = document.getElementById("password-input").value; 
    if (password === passwordStored && user === userStored) {
      let loginForm = document.querySelector("#login-form");
      document.querySelector(".login-body").removeChild(loginForm);
      let welcomeDiv = document.createElement("div");
      welcomeDiv.innerHTML = `<div class="hi-form"> <h3> ¡Hola <strong class="user-name">${user}</strong>! </h3>
          <p> LET IT BE te da la bienvenida. </p> </div>`
      document.querySelector(".login-body").append(welcomeDiv);
      showError = true;
      autentication = true;
      localStorage.setItem("autentication", autentication)
      setTimeout( function() { window.location.href = "https://ruizdiegomartin.github.io/javascript-coder/"; }, 3000 );
    }
    else {
      while (showError === true) {
      loginAdvise = document.createElement("p");
      loginAdvise.innerHTML = `<p class="login-error"> Usuario y/o contraseña incorrecta. </p>`
      document.getElementById("password-div").append(loginAdvise);
      showError = false;
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