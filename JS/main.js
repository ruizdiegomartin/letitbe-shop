// USER LOGIN

let userStored = "Diego"
let passwordStored = "Coderhouse";
let userName = prompt("Ingrese su nombre de usuario");

for ( i=0 ; i<3 ; i++) {

    let userPassword = prompt("Ingrese su contraseña");
    
    if (userPassword === passwordStored && userName === userStored) {
        alert("Bienvenido/a "+userName+".");
        break;
    } 
    else {
        alert("La contraseña no coincide con el usuario ingresado. Quedan "+ (2-i) +" intentos.");
    }
    if (i===2){
        alert("Usuario bloqueado: ¡Lo sentimos! Límite de intentos agotado. Revise su correo electrónico para desbloquearlo.");
    }
}
