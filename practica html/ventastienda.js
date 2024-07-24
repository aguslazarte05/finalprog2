window.onload = function() {
    mostrarData();
    
    document.getElementById('id').addEventListener('input', convertToUpperCase);
    document.getElementById('prenda').addEventListener('input', convertToUpperCase);
    document.getElementById('talle').addEventListener('input', convertToUpperCase);
    document.getElementById('marca').addEventListener('input', convertToUpperCase);
}

function convertToUpperCase(event) {
    event.target.value = event.target.value.toUpperCase();
}

function limpiarFormulario() {
    document.getElementById('id').value = "";
    document.getElementById('prenda').value = "";
    document.getElementById('talle').value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("precio").value = "";
}

function mostrarData() {
    var tablaVentas;
    if (localStorage.getItem('tablaVentas') == null) {
        tablaVentas = [];
    } else {
        tablaVentas = JSON.parse(localStorage.getItem('tablaVentas'));
    }
    var html = ""; 
    tablaVentas.forEach(function (elemento, index) {
        html += "<tr>";
        html += "<td>" + elemento.id + "</td>";
        html += "<td>" + elemento.prenda + "</td>";
        html += "<td>" + elemento.talle + "</td>";
        html += "<td>" + elemento.cantidad + "</td>";
        html += "<td>" + elemento.marca + "</td>";
        html += "<td>" + elemento.precio + "</td>";
        html += "<td><button class='btn btn-dark' onclick='editar(" + index + ")'>Editar</button> " +
                "<button class='btn btn-danger' onclick='eliminar(" + index + ")'>Eliminar</button></td>";
        html += "</tr>";
    });
    document.getElementById('tablaVentas').getElementsByTagName('tbody')[0].innerHTML = html;
}

function guardarVenta() {
    let id = document.getElementById('id').value;
    let prenda = document.getElementById('prenda').value;
    let talle = document.getElementById('talle').value;
    let cantidad = document.getElementById('cantidad').value;
    let precio = document.getElementById('precio').value;
    let marca = document.getElementById('marca').value;
    var tablaVentas;
    
    if (localStorage.getItem('tablaVentas') == null) {
        tablaVentas = [];
    } else {
        tablaVentas = JSON.parse(localStorage.getItem('tablaVentas'));
    }

    const idExists = tablaVentas.some(venta => venta.id === id);
    if (idExists) {
        alert('Este ID ya pertenece a una prenda');
        return;
    }

    tablaVentas.push({
        id: id,
        prenda: prenda,
        talle: talle,
        cantidad: cantidad,
        marca: marca,
        precio: precio,
    });
    localStorage.setItem('tablaVentas', JSON.stringify(tablaVentas));

    
    actualizarStock(talle, cantidad);

    mostrarData();
    limpiarFormulario();
}

function actualizarStock(talle, cantidad) {
    var listaStock;
    
    if (localStorage.getItem('listaStock') == null) {
        listaStock = [];
    } else {
        listaStock = JSON.parse(localStorage.getItem('listaStock'));
    }

    const stockIndex = listaStock.findIndex(item => item.talle === talle);

    if (stockIndex !== -1) {
        listaStock[stockIndex].cantidad -= cantidad;
        localStorage.setItem('listaStock', JSON.stringify(listaStock));
    }
}

function eliminar(index) {
    var tablaVentas;
    if (localStorage.getItem('tablaVentas') == null) {
        tablaVentas = [];
    } else {
        tablaVentas = JSON.parse(localStorage.getItem('tablaVentas'));
    }
    tablaVentas.splice(index, 1); 
    localStorage.setItem('tablaVentas', JSON.stringify(tablaVentas));
    mostrarData();
}

function editar(index) {
    document.getElementById('btnGuardar').style.display = 'none';
    document.getElementById('btnActualizar').style.display = 'block';
    var tablaVentas;
    if (localStorage.getItem('tablaVentas') == null) {
        tablaVentas = [];
    } else {
        tablaVentas = JSON.parse(localStorage.getItem('tablaVentas'));
    }
    document.getElementById('id').value = tablaVentas[index].id;
    document.getElementById('prenda').value = tablaVentas[index].prenda;
    document.getElementById('talle').value = tablaVentas[index].talle;
    document.getElementById('cantidad').value = tablaVentas[index].cantidad;
    document.getElementById('marca').value = tablaVentas[index].marca;
    document.getElementById('precio').value = tablaVentas[index].precio;

    document.querySelector('#btnActualizar').onclick = function() {
        tablaVentas[index].id = document.getElementById('id').value;
        tablaVentas[index].prenda = document.getElementById('prenda').value;
        tablaVentas[index].talle = document.getElementById('talle').value;
        tablaVentas[index].cantidad = document.getElementById('cantidad').value;
        tablaVentas[index].marca = document.getElementById('marca').value;
        tablaVentas[index].precio = document.getElementById('precio').value;
        localStorage.setItem('tablaVentas', JSON.stringify(tablaVentas));
        mostrarData();
        document.getElementById('btnGuardar').style.display = 'block';
        document.getElementById('btnActualizar').style.display = 'none';
        limpiarFormulario();
    }
}

function finalizarcompra() {
    alert('Compra realizada con éxito');
    limpiarTabla();
}

function limpiarTabla() {
    localStorage.removeItem('tablaVentas');
    mostrarData();
}

function iralstock() {
    window.location.href = "stocktienda.html";
}

function cerrarsesion() {
    window.location.href = "index.html";
}
