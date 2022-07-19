let carrito = [];

//eventos boton
const btnComprar = (producto) => {
    agregarAlCarrito(producto);
    //SweetAlert
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Has agregado correctamente el producto al carrito',
        color: '#487429',
        showConfirmButton: false,
        timer: 1000
    })
}

//agregar al carrito
function agregarAlCarrito(productoNuevo) {
    const findCarrito = carrito.find(e => e.codigo === productoNuevo.codigo)//verifica si el producto esta en el carrito
    if (!findCarrito) {//si el producto no esta en el carrito
        carrito.push({ codigo: productoNuevo.codigo, name: productoNuevo.name, price: productoNuevo.price, cantidad: 1 });//agrego al carrito un objeto que tambien tiene cantidad
    } else {//si el producto esta en el carrito
        const index = carrito.indexOf(findCarrito)//saca el indice donde esta el producto dentro del carrito
        carrito[index].cantidad++ //cambia la cantidad del producto
    }
    console.log(carrito);

    actualizarCarrito()
}

// saco la funcion actualizar el carrito para poder usar en agregar/eliminar
const actualizarCarrito = () => {
    const tabla = document.getElementById("tablabody")
    tabla.innerHTML = "" //cada vez que se agrega un producto se actualizar el carrito
    carrito.forEach((productoNuevo) => {

        tabla.innerHTML += `
        <tr>
            <td>${productoNuevo.codigo}</td>
            <td>${productoNuevo.name}</td>
            <td>$${productoNuevo.price}</td>
            <td>${productoNuevo.cantidad}</td>
            <td>$${productoNuevo.price * productoNuevo.cantidad}</td>
            <td><button class="btn" id="btnEliminar${productoNuevo.codigo}">eliminar</button></td>
        </tr>
    `;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    });
    //boton eliminar
    carrito.forEach(productoNuevo => {
        document.getElementById(`btnEliminar${productoNuevo.codigo}`).addEventListener('click', function () {
            eliminar(productoNuevo);
        });
    });
    
    //subtotal
    const sumaCarrito = document.getElementById("total")
    // saco el precio y la cantidad a un nuevo array y lo sumo
    const sumarProductos = carrito.map(productoNuevo => productoNuevo.price * productoNuevo.cantidad).reduce((prev, curr) => prev + curr, 0)
    sumaCarrito.innerHTML = ""
    sumaCarrito.innerHTML +=`
        <p>TOTAL: $${sumarProductos}</p>
    
    `
}
//funcion eliminar
const eliminar = (productoNuevo) => {
    const findCarrito = carrito.find(e => e.codigo === productoNuevo.codigo)
    const index = carrito.indexOf(findCarrito)
    carrito.splice(index, 1)
    actualizarCarrito()
}

actualizarCarrito()

//vaciar carrito
const vaciarCarrito = () => {
    carrito = []
    localStorage.removeItem("carrito")
    document.getElementById("tablabody").innerHTML = ""
    document.getElementById("total").innerHTML = ""
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El carrito se ha vaciado',
        showConfirmButton: false,
        color: '#487429',
        timer: 1500
    })
}

document.getElementById("btn-clear-cart").addEventListener("click", vaciarCarrito)

//finalizar compra
const finalizarCompra = () => {
    carrito = []
    localStorage.removeItem("carrito")
    document.getElementById("total").innerHTML = ""
    document.getElementById("tablabody").innerHTML = ""
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Haz finalizado tu compra!',
        showConfirmButton: false,
        color: '#487429',
        timer: 1500
    })
}

document.getElementById("btn-finalizar-compra").addEventListener("click", finalizarCompra)


//traer carrito cuando cierra pestaña o actualiza la pag
const cargarCarrito = () => {
    const carritoJSON = localStorage.getItem("carrito")
    if (carritoJSON) {
        const productos = JSON.parse(carritoJSON);
        for (const producto of productos) {
            agregarAlCarrito(producto);
        }

    }
}

cargarCarrito();