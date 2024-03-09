let carrito = JSON.parse(localStorage.getItem("carro")) || [] ;
const verCarrito = document.getElementById("verCarrito");
const carritoPadre = document.getElementById("carritoPadre");
const cantidadCarrito = document.getElementById("cantidadCarrito");


const getProducts = async() =>{
    const response = await fetch("data.json");
    const data = await response.json();
    console.log(data);

    let contenidoProductos = document.getElementById("contenidoProductos");
for (const producto of data) {
    let elemento = document.createElement("div")
    elemento.className
    elemento.innerHTML = `<div class="card" style="width: 18rem;">
    <img src="${producto.imagen}" class="card-img-top alt="${producto.nombre}">
        <div class="card-body text-center">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$${producto.precio}</p>
            <a href="#" id='botonAnadir' class="btn">Añadir</a>
        </div>
    </div>`
    contenidoProductos.appendChild(elemento);

    elemento.addEventListener("click", () =>{
        let repetido = carrito.some ((repetirProducto) => repetirProducto.id === producto.id); 
        if(repetido){
            carrito.map((prod) =>{
                if(prod.id === producto.id){
                    prod.cantidad ++;
                }
            })
        }else{
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen:producto.imagen,
                cantidad: producto.cantidad,
            });
            carritoNumero();
            guardarLs();
        }
    });
};
}

getProducts();



const carritoFuncion = () =>{
    carritoPadre.innerHTML= "";
    carritoPadre.style.display = "flex";
    const carritoHeader = document.createElement("div");
    carritoHeader.className = "carrito-header";
    carritoHeader.innerHTML = `
    <h1 class="carrito-titulo">Carrito de compras</h1>
    `
    carritoPadre.appendChild(carritoHeader);

    const botonCancelar = document.createElement("h2");
    botonCancelar.innerText = "❌";
    botonCancelar.className = "boton-cancelar";

    botonCancelar.addEventListener("click", ()=>{
        carritoPadre.style.display = "none";
    })

    carritoHeader.appendChild(botonCancelar);

    carrito.forEach((product) =>{
        let carritoContenido = document.createElement("div");
        carritoContenido.className = "carrito-contenido";
        carritoContenido.innerHTML = `
        <img src ="${product.imagen}">
        <h3> ${product.nombre}</h3>
        <p> ${product.precio}$ </p>
        <span class = "restar"> - </span>
        <p> Cantidad: ${product.cantidad}</p>
        <span class = "sumar"> + </span>
        <p> Total: ${product.cantidad * product.precio}</p>
        <span class = "borrar-producto"> ❌ </span>
        `
        
        carritoPadre.append(carritoContenido)

        let restar = carritoContenido.querySelector(".restar")
        restar.addEventListener("click", () =>{
            if(product.cantidad !== 1){
                product.cantidad -- ;
            }
            carritoFuncion();
            guardarLs();
        } )

        let sumar = carritoContenido.querySelector(".sumar");
        sumar.addEventListener("click", () =>{
            product.cantidad ++;
            carritoFuncion();
            guardarLs();
        })

        let eliminar = carritoContenido.querySelector(".borrar-producto");
        eliminar.addEventListener("click", () =>{
            eliminarProducto(product.id);
        })

    })

    const total = carrito.reduce((acc, precio) => acc + precio.precio * precio.cantidad, 0);
    
    const totalCompra = document.createElement("div");
    totalCompra.className = "total-carrito"
    totalCompra.innerHTML = `Total a pagar: ${total} $`;

    carritoPadre.append(totalCompra);

}

verCarrito.addEventListener("click",carritoFuncion);

const eliminarProducto = (id) =>{
    const buscarId = carrito.find((element)=>element.id === id)

    carrito = carrito.filter ((carritoId) => {
        return carritoId !== buscarId;
    })
    carritoNumero();
    guardarLs();
    carritoFuncion();
}

const carritoNumero = () =>{
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength",JSON.stringify(carritoLength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

carritoNumero();

let logo = document.getElementById('logo')
logo.innerHTML= '<img src= https://www.shutterstock.com/image-vector/construction-helmet-drill-shield-logo-600nw-2304274037.jpg>'


const guardarLs = () =>{
    localStorage.setItem("carro", JSON.stringify(carrito));
}


function alerta(){
    Swal.fire({
        title: "¿Quiere finalizar su compra?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Si",
        denyButtonText: 'Seguir comprando'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Compra finalizada con éxito", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Puede seguir comprando", "", "info");
        }
      });
}


let finalizarCompra = document.getElementById("finalizar");

finalizarCompra.className="finalizar-compra";
finalizarCompra.innerHTML= `
<button class = "boton-finalizar">Finalizar compra</button>
`
finalizarCompra.addEventListener("click", alerta);
finalizarCompra.addEventListener








