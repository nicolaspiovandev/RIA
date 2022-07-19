const productos=[
    {
        codigo:'(2154)',
        name:"TERRAMICINA",
        imgPath:"/multimedia/productos/terramicina.jpg",
        altImg:"terramicina",
        price:2500
    },
    {
        codigo:'(7100)',
        name:"FLOK",
        imgPath:"/multimedia/productos/flok.jpg",
        altImg:"flok",
        price:5200
    },
    {
        codigo:'(145)',
        name:"DECTOMAX",
        imgPath:"/multimedia/productos/dectomax.jpg",
        altImg:"dectomax",
        price:6800
    },
    {
        codigo:'(1580)',
        name:"IVOMEC",
        imgPath:"/multimedia/productos/ivomec.jpg",
        altImg:"ivomec",
        price:5000
    },
    {
        codigo:'(3333)',
        name:"SUPLENUT",
        imgPath:"/multimedia/productos/suplenut.jpg",
        altImg:"suplenut",
        price:7000
    },
    {
        codigo:'(15)',
        name:"BAYMEC",
        imgPath:"/multimedia/productos/baymec.jpg",
        altImg:"baymec",
        price:3500
    }
] 
/*
esquema de objeto producto
codigo
Name
imgPath
altImg 
price
 */


const getProductListNode = () => document.getElementById("lista_productos")

const loadProducts = (data)=> { 
    //referencia al div que contiene la lista de productos
    const productListnode = getProductListNode()

    for (const producto of data) {
        const img = new Image()
        img.src = producto.imgPath
        img.alt = producto.altImg
        img.height = 200
        img.width = 200

        const code = document.createElement("p")
        code.textContent = producto.codigo
        code.className = "articulos"
        
        const title = document.createElement("p")
        title.textContent = producto.name
        title.className = "articulos"
        
        const precio = document.createElement("p")
        precio.textContent = "$"+producto.price
        precio.className = "articulos"
        
        const buyButton = document.createElement("button")
        buyButton.textContent = "COMPRAR"
        buyButton.className = "btn1"
        buyButton.id =`boton${producto.codigo}`
        buyButton.addEventListener("click", () =>{
            btnComprar(producto)
        })  
        
        const containerProduct = document.createElement("div")
        containerProduct.className = "class"

        //agregamos los elementos al div contenedor
        containerProduct.appendChild(img)
        containerProduct.appendChild(code)
        containerProduct.appendChild(title)
        containerProduct.appendChild(precio)
        containerProduct.appendChild(buyButton)

        //agregamos el contenedor de productos (el cual contiene la imagen, título y el botón) al DOM
        productListnode.appendChild(containerProduct)
    }
}
//abstraemos la lógica para borrar elementos dentro del div de la lista de productos en un método
//para poder reutilizarla
const emptyListDiv = () => {
    const productListnode = getProductListNode()
    productListnode.innerHTML= ""//Borra los children de dicho elemento
}

const search = () => {
    const searchTerm = document.getElementById("input_search").value.toLowerCase()
    //si el usuario no ingresa un término de búsqueda terminamos la ejecución de la función
    if (searchTerm =="") return
    
    //filtramos la lista de productos dejando solo los productos que cumplan la condición
    //en este caso la condición es que el producto contenga total o parcialmente el término de búsqueda 
    const listaFiltrada = productos.filter(
        producto => producto.name.toLowerCase().includes(searchTerm)
    )
    console.log("Se han encontrado ", listaFiltrada.length, " productos")
    
    //vaciamos la lista y volvemos a cargar los datos con la lista filtrada
    emptyListDiv()
    loadProducts(listaFiltrada)
}

//abstraemos la lógica para resetear la lista de productos y devolverla al estado inicial
//para poder reutilizarla
const reset = () => {
    emptyListDiv()
    loadProducts(productos)
}

//generamos funcion que handelea el evento ordenar asc
const ordenarPrecioAsc = () => {
    emptyListDiv()
    const lista = productos.slice();//utilizamos slice para generar copia del array y evitar modificar el original
    const listaOrdenada = lista.sort((a,b)=> a.price - b.price);//sort para ordenar 
    loadProducts(listaOrdenada)
}

const ordenarPrecioDesc = () => {
    emptyListDiv()
    const lista = productos.slice();
    const listaOrdenada = lista.sort((a,b)=> b.price - a.price);
    loadProducts(listaOrdenada)
    
}

//obtenemos la referencia de los botones
const btnAsc = document.getElementById("btn_asc");
const btnDesc = document.getElementById("btn_desc");

//escuchamos al evento click y ejecutamos la funcion correspondiente al disparar el evento
btnAsc.addEventListener("click", ordenarPrecioAsc);
btnDesc.addEventListener("click", ordenarPrecioDesc);

//esta llamada se ejecuta ni bien se carga la página mostrando los productos
loadProducts(productos)


