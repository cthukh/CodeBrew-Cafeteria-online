let productos = [
    {
        id: 1,
        nombre: "Cacao Overclock",
        desc: "El combustible perfecto para tus líneas de código. Una fusión equilibrada de nuestro intenso espresso con cacao amargo de alta pureza, coronado con un arte latte en forma de corazón. Textura cremosa, cuerpo denso y el toque amargo exacto para mantenerte enfocado.",
        precio: 2000,
        img: "img/cafe_cacao.png",
        cantidad: 1,
        subTotal: 0
    },
    {
        id: 2,
        nombre: "Topología de Caramelo",
        desc: "Un espresso suave y cremoso coronado con una delicada malla de caramelo dorado. Esta nueva topologia te permitira sincronizar tu conocimiento con el de grandes programadores. Combinando dulzura, textura y energía en un perfecto equilibrio.",
        precio: 2000,
        img: "img/cafe_caramel.png",
        cantidad: 1,
        subTotal: 0
    },
    {
        id: 3,
        nombre: "Choco Full Stack",
        desc: "Feature sobre Feature. Nuestro espresso de la casa servido sobre una base de chocolate, coronado con una generosa pila de crema batida y virutas de chocolate. El mismisimo Full Stack.",
        precio: 2500,
        img: "img/cafe_choco.png",
        cantidad: 1,
        subTotal: 0
    },
    {
        id: 4,
        nombre: "Kernel-Coffee-lts",
        desc: "Un clásico estandarizado. Café filtrado tradicional, balanceado y con el cuerpo ideal para mantener un flujo de trabajo constante. Simple, eficiente y compatible con cualquier rutina.",
        precio: 1000,
        img: "img/cafe-cafe.png",
        cantidad: 1,
        subTotal: 0
    },
    {
        id: 5,
        nombre: "Ctrl + Té",
        desc: "El reinicio mental que necesitas cuando el entorno se llena de bugs. Una infusión herbal milenaria diseñada para alinear tus chakras, limpiar la caché de tu cerebro y restaurar tu estabilidad emocional tras un error de sintaxis inesperado.",
        precio: 1000,
        img: "img/cafe-te.png",
        cantidad: 1,
        subTotal: 0
    },
]


// ------------------------------------------------------- //
const containerCarrousel = document.getElementById("carrousel");
const select = document.getElementById("inputCafe");


function render_carousel_opciones() {

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        
        const slide = document.createElement('div');
        slide.classList.add("slide");
        
        const textSlide = document.createElement("div");
        textSlide.classList.add('text-slide');
        textSlide.classList.add('col-4');
        
        const h2 = document.createElement('h2');
        h2.textContent = producto.nombre;

        const p = document.createElement('p')
        p.textContent = producto.desc;
        
        const img = document.createElement('img');
        img.classList.add('img-slide');
        img.classList.add('col-4');
        img.src = producto.img;
        img.alt = producto.nombre;
        
        textSlide.append(h2,p);
        slide.append(textSlide,img);
        containerCarrousel.append(slide);


        const option = document.createElement('option');
        option.value = producto.id;
        option.text = producto.nombre;
        
        select.append(option);
    }
};

render_carousel_opciones()



// Carrito de compras
let carrito = [ ];
let contadorProductos = 0;
let total = 0;
let coincidencia = false;

function agregar_al_carro() {
    const listaProductos = document.getElementById('listaProductos');
    const select = document.getElementById("inputCafe");
    const tabla = document.getElementById('tablaDatos');
    let opcion = select.value;


    if (opcion >= 1 && opcion <= 5 ) { // Bueno
        console.log("----------------------")
        console.log('Inicio')
        // Ocultar texto
        const texto = document.getElementById('TextOtter');

        if (texto.classList != 'd-none') {
            texto.classList.add('d-none');
        };

        listaProductos.classList.remove('d-none');

        for (let n = 0; n < productos.length; n++) {
            const producto = productos[n];

            if (producto.id == opcion) {
                console.log("Producto encontrado")

                // Verificar si ya esta el producto en el carrito
                if (carrito.length == 0 ) {
                    console.log("Carrito vacio!")
                    agregar_producto(producto,tabla)
                    break
                };

                if (carrito.length > 0) {
                    for (let c = 0; c < carrito.length; c++ ) {
                        const productoInCarrito = carrito[c];
                        console.log("Mostrando productoInCarrito: "+productoInCarrito.nombre)
                        console.log("Mostrando vueltas de ciclo de busqueda en carrito: "+c)

                        if (producto.nombre == productoInCarrito.nombre) {
                            coincidencia = true
                            console.log("Carrito con productos. Se encontra ya un producto en el carro: "+producto.nombre )
                            modificar_cantidad(producto)
                            break
                            
                        } else {
                            coincidencia = false
                            console.log(coincidencia)
                        };
                    };

                    if (coincidencia == false) {
                        console.log("Carrito con productos, pero sin coincidencia: "+producto.nombre )
                        agregar_producto(producto,tabla)
                        break
                    };
                };
            };
        };
    console.log(carrito)
    console.log("fin funcion ------------------------")


    } else { // Sin valor
        alert("Seleccione un producto para agregar al carro.")
        console.log("No se seleccionó Producto.")
    };
};


function modificar_cantidad(producto) {
    console.log("Producto ya en el carro. Modificando cantidad...")

    producto.cantidad = producto.cantidad + 1;
    let id_cant = 'CantidadId'+producto.id;
    const colCant = document.getElementById(id_cant);
    colCant.innerHTML = producto.cantidad;
    
    producto.subTotal = producto.precio * producto.cantidad;
    console.log("Mostrando sub total del producto "+producto.nombre+" sub-total: "+producto.subTotal)
    let id_sub = 'SubTotalId'+producto.id;
    const colSub = document.getElementById(id_sub);
    colSub.innerHTML = producto.subTotal;
};

function agregar_producto(producto,tabla) {
    console.log("Producto no encontrado en carrito. Agregando...")
    let subTotal = producto.precio * producto.cantidad;
    producto.subTotal = subTotal;
    contadorProductos ++;

    const fila = document.createElement('tr');
    fila.id = "Fila"+producto.id;

    const divElim = document.createElement('button');
    divElim.classList.add('btn','btn-danger','divElimBtn');
    divElim.id = 'btnElim'+producto.id;
    divElim.addEventListener('click', () => {
        eliminar_cantidad(producto);
    });

    divElim.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    const colElim = document.createElement('td');
    colElim.classList.add('tdElim');
    colElim.append(divElim);

    const colCantidad = document.createElement('td');
    colCantidad.id = 'CantidadId'+producto.id;
    colCantidad.textContent = producto.cantidad;

    const colNombre = document.createElement('td');
    colNombre.textContent = producto.nombre;

    const colPrecio = document.createElement('td');
    colPrecio.textContent = producto.precio;

    const colSubTotal = document.createElement('td');
    colSubTotal.id = 'SubTotalId'+producto.id
    colSubTotal.textContent = producto.subTotal;

    fila.append(colElim, colCantidad, colNombre, colPrecio, colSubTotal);
    tabla.append(fila);

    carrito.push(producto);
};



function eliminar_cantidad(producto) {
    console.log("Cantidad antigua: "+producto.cantidad)
    producto.cantidad--;

    let id_cant = 'CantidadId'+producto.id;
    const colCant = document.getElementById(id_cant);
    colCant.innerHTML = producto.cantidad;
    console.log("Funcion: eliminar_cantidad: "+producto.nombre)
    console.log("Nueva cantidad: "+ producto.cantidad)
    if (producto.cantidad <= 0) {
        for (let car = 0; car < carrito.length; car++) {
            const prodc = carrito[car];
            if (prodc.nombre == producto.nombre) {
                console.log("Eliminando registro de carrito: "+prodc.nombre)
                
                let id = "Fila"+producto.id;
                const fila = document.getElementById(id);
                fila.remove();
                carrito.splice(car, 1);
                producto.cantidad = 1;
                car--;
                break
            };
        };
    };
    if (carrito.length <= 0) {
        const lista = document.getElementById('listaProductos');
        const texto = document.getElementById('TextOtter');

        if (lista.classList != 'd-none') {
            lista.classList.add('d-none');
        
        };
        texto.classList.remove('d-none')
    };


};