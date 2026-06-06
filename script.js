let productos = [
    {
        id: 1,
        nombre: "Cacao Overclock",
        desc: "El combustible perfecto para tus líneas de código. Una fusión equilibrada de nuestro intenso espresso con cacao amargo de alta pureza, coronado con un arte latte en forma de corazón. Textura cremosa, cuerpo denso y el toque amargo exacto para mantenerte enfocado.",
        precio: 2000,
        img: "img/cafe_cacao.png"
    },
    {
        id: 2,
        nombre: "Topología de Caramelo",
        desc: "Un espresso suave y cremoso coronado con una delicada malla de caramelo dorado. Esta nueva topologia te permitira sincronizar tu conocimiento con el de grandes programadores. Combinando dulzura, textura y energía en un perfecto equilibrio.",
        precio: 2000,
        img: "img/cafe_caramel.png"
    },
    {
        id: 3,
        nombre: "Choco Full Stack",
        desc: "Feature sobre Feature. Nuestro espresso de la casa servido sobre una base de chocolate, coronado con una generosa pila de crema batida y virutas de chocolate. El mismisimo Full Stack.",
        precio: 2500,
        img: "img/cafe_choco.png"
    },
    {
        id: 4,
        nombre: "Kernel-Coffee-lts",
        desc: "Un clásico estandarizado. Café filtrado tradicional, balanceado y con el cuerpo ideal para mantener un flujo de trabajo constante. Simple, eficiente y compatible con cualquier rutina.",
        precio: 1000,
        img: "img/cafe-cafe.png"
    },
    {
        id: 5,
        nombre: "Ctrl + Té",
        desc: "El reinicio mental que necesitas cuando el entorno se llena de bugs. Una infusión herbal milenaria diseñada para alinear tus chakras, limpiar la caché de tu cerebro y restaurar tu estabilidad emocional tras un error de sintaxis inesperado.",
        precio: 1000,
        img: "img/cafe-te.png"
    },
]


// ------------------------------------------------------- //
const containerCarrousel = document.getElementById("carrousel");
const select = document.getElementById("inputCafe");


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

const btnComprar = document.getElementById('buttonSelectCafe');
btnComprar.addEventListener('click', function () {
    let select = document.getElementById('inputCafe');
    let opcion = select.value;
    if (opcion >= 1 && opcion <= 5 ) { // Bueno
        console.log('valido')
        const texto = document.getElementById('TextOtter');
        for (let n = 0; n < productos.length; n++) {
            const producto = productos[n];
            if (producto.id == opcion) {
                texto.innerHTML = `producto: ${producto.nombre}`;
            }
        }
        

    } else { // Malo
        console.log("MAlo")
    };
});