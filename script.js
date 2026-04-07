document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.book button');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const contadorCarrito = document.getElementById('contador-carrito');
    const btnCarrito = document.getElementById('btn-carrito');
    const carritoContenedor = document.getElementById('carrito-contenedor');
    const btnFinalizar = document.getElementById('btn-finalizar');
    
    let carrito = {}; 

    btnCarrito.addEventListener('click', () => carritoContenedor.classList.toggle('activo'));

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const padre = e.target.parentElement;
            const titulo = (padre.querySelector('.titulo-libro') || padre.querySelector('h2')).textContent;
            const precioTexto = (padre.querySelector('.precio-libro') || padre.querySelector('p:last-of-type')).textContent;
            const precio = parseFloat(precioTexto.replace(/[^\d.]/g, '')) || 0;

            agregarAlCarrito(titulo, precio);
            carritoContenedor.classList.add('activo');
        });
    });

    function agregarAlCarrito(titulo, precio) {
        if (carrito[titulo]) {
            carrito[titulo].cantidad++;
        } else {
            carrito[titulo] = { precio: precio, cantidad: 1 };
        }
        actualizarDOM();
    }

    function actualizarDOM() {
        listaCarrito.innerHTML = '';
        let total = 0;
        let cuentaArticulos = 0;

        Object.keys(carrito).forEach(titulo => {
            const producto = carrito[titulo];
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;
            cuentaArticulos += producto.cantidad;

            const li = document.createElement('li');
            li.classList.add('item-carrito');
            li.innerHTML = `
                <div>
                    <div style="font-weight:bold">${titulo}</div>
                    <small>$${producto.precio.toFixed(2)} c/u</small>
                </div>
                <div class="controles-cantidad">
                    <button class="btn-control" onclick="modificarCantidad('${titulo}', -1)">-</button>
                    <span>${producto.cantidad}</span>
                    <button class="btn-control" onclick="modificarCantidad('${titulo}', 1)">+</button>
                </div>
            `;
            listaCarrito.appendChild(li);
        });

        totalCarrito.textContent = total.toFixed(2);
        contadorCarrito.textContent = cuentaArticulos;
    }

    window.modificarCantidad = (titulo, cambio) => {
        if (carrito[titulo]) {
            carrito[titulo].cantidad += cambio;
            if (carrito[titulo].cantidad <= 0) {
                delete carrito[titulo];
            }
            actualizarDOM();
        }
    };

    // Botón de finalizar
    btnFinalizar.addEventListener('click', () => {
        if (Object.keys(carrito).length === 0) {
            alert("El carrito está vacío");
        } else {
            alert("¡Gracias por tu compra! Total pagado: $" + totalCarrito.textContent);
            carrito = {};
            actualizarDOM();
            carritoContenedor.classList.remove('activo');
        }
    });
});