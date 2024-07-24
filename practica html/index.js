const submit = document.getElementById("submit"),
      password = document.getElementById("password"),
      username = document.getElementById("username"),
      visible = document.getElementById("visible");

visible.addEventListener("change", () => {
    password.type = visible.checked ? "text" : "password";
});

submit.addEventListener("click", (e) => {
    e.preventDefault();
    if (username.value === "admin" && password.value === "tienda") {
        window.location.href = "stocktienda.html"; 
    } else if (username.value === "empleado" && password.value === "123456") {
        window.location.href = "ventasempleado.html"; 
    } else {
        alert("Acceso denegado, datos incorrectos");
    }
});
