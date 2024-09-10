// script.js
document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.book button');
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            alert('¡Libro añadido al carrito!');
        });
    });
});
