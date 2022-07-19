//GETJSON
function obtenerJson() {
    const URLJSON = "masproductos.json";
    //agregamos un boton 
    document.querySelector("#verMasProductos").innerHTML = '<button id="cargarMasProductos">Ver mas</button>';
    //evento para el boton
    document.querySelector("#cargarMasProductos").onclick = () => {
        fetch(URLJSON)
            .then((respuesta) => respuesta.json())
            .then((data) => {
                console.log(data);
                let verMasProductos = data.masArticulos;
                for (const verM of verMasProductos) {
                    document.querySelector("#verMasProductos").innerHTML += `
                <div>   
                <img src="${verM.imgPath}" width="150" height="150" class="articulos" alt="${verM.altImg}">
                    <p class="articulos">${verM.codigo}</p>
                    <p class="articulos">${verM.name}</p>
                    <p class="articulos">$${verM.price}</p> 
                    <button class="btn" id='btn${verM.codigo}'>COMPRAR</button>
                </div>
                `;

                }
                //eventos boton
                verMasProductos.forEach(verM => {
                    document.getElementById(`btn${verM.codigo}`).addEventListener("click", function () {
                        agregarAlCarrito(verM);
                        //SweetAlert
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Has agregado correctamente el producto al carrito',
                            color: '#487429',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
                });
            })
    }
}

obtenerJson();

