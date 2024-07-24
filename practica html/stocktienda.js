function toUpperCaseInput(element) {
    element.value = element.value.toUpperCase();
}

window.onload = function() {
    mostrarData();
}

function limpiarFormulario() {
    document.getElementById('id').value = "";
    document.getElementById('prenda').value = "";
    document.getElementById('talle').value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("preciodecosto").value = "";
}

function mostrarData() {
    var listaStock;
    if (localStorage.getItem('listaStock') == null) {
        listaStock = [];
    } else {
        listaStock = JSON.parse(localStorage.getItem('listaStock'));
    }
    var html = ""; 
    listaStock.forEach(function (elemento, index) {
        html += "<tr>";
        html += "<td>" + elemento.id + "</td>";
        html += "<td>" + elemento.prenda + "</td>";
        html += "<td>" + elemento.talle + "</td>";
        html += "<td>" + elemento.cantidad + "</td>";
        html += "<td>" + elemento.marca + "</td>";
        html += "<td>" + elemento.preciodecosto + "</td>";
        html += "<td><button class='btn btn-dark' onclick='editar(" + index + ")'>Editar</button> " +
                "<button class='btn btn-danger' onclick='eliminar(" + index + ")'>Eliminar</button></td>";
        html += "</tr>";
    });
    document.getElementById('tablaStock').getElementsByTagName('tbody')[0].innerHTML = html;
}

function cargarfaltante() {
    let id = document.getElementById('id').value;
    let prenda = document.getElementById('prenda').value;
    let talle = document.getElementById('talle').value;
    let cantidad = document.getElementById('cantidad').value;
    let marca = document.getElementById('marca').value;
    let preciodecosto = document.getElementById('preciodecosto').value;
    var listaStock;
    
    if (localStorage.getItem('listaStock') == null) {
        listaStock = [];
    } else {
        listaStock = JSON.parse(localStorage.getItem('listaStock'));
    }

    
    const idExists = listaStock.some(stock => stock.id === id);
    if (idExists) {
        alert('Este id ya pertenece a una prenda');
        return;
    }

    listaStock.push({
       id: id,
       prenda: prenda,
       talle: talle,
       cantidad: cantidad,
       marca: marca,
       preciodecosto: preciodecosto,
    });
    localStorage.setItem('listaStock', JSON.stringify(listaStock));
    mostrarData();
    limpiarFormulario();
}

function eliminar(index) {
    var listaStock;
    if (localStorage.getItem('listaStock') == null) {
        listaStock = [];
    } else {
        listaStock = JSON.parse(localStorage.getItem('listaStock'));
    }
    listaStock.splice(index, 1); 
    localStorage.setItem('listaStock', JSON.stringify(listaStock));
    mostrarData();
}

function editar(index){
    document.getElementById('btnGuardar').style.display = 'none';
    document.getElementById('btnActualizar').style.display= 'block';
    var listaStock;
    if (localStorage.getItem('listaStock') == null) {
        listaStock = [];
    } else {
        listaStock = JSON.parse(localStorage.getItem('listaStock'));
    }
    document.getElementById('id').value = listaStock[index].id;
    document.getElementById('prenda').value= listaStock[index].prenda;
    document.getElementById('talle').value= listaStock[index].talle;
    document.getElementById("cantidad").value= listaStock[index].cantidad;
    document.getElementById("marca").value= listaStock[index].marca;
    document.getElementById("preciodecosto").value= listaStock[index].preciodecosto;

    document.querySelector('#btnActualizar').onclick = function() {
        listaStock[index].id = document.getElementById('id').value;
        listaStock[index].prenda = document.getElementById('prenda').value;
        listaStock[index].talle = document.getElementById('talle').value;
        listaStock[index].cantidad = document.getElementById('cantidad').value;
        listaStock[index].marca = document.getElementById('marca').value;
        listaStock[index].preciodecosto = document.getElementById('preciodecosto').value;
        localStorage.setItem('listaStock', JSON.stringify(listaStock));
        mostrarData();
        document.getElementById('btnGuardar').style.display = 'block';
        document.getElementById('btnActualizar').style.display = 'none';
        limpiarFormulario();
    }
}

function realizarventa(){
    window.location.href = "ventastienda.html";
}

function cerrarsesion(){
    window.location.href = "index.html";
}
