// carrito.setAttribute('href', navigate("/src/pages/client/home/home.html");)

// const cargarCategorias = () => {
//   const listaCategorias = document.querySelector("#lista-categorias");

//   categorias.forEach((categoria) => {
//     const li = document.createElement("li");

//     li.innerHTML = `
//             <a href="#">
//                 ${categoria}
//             </a>
//         `;

//     listaCategorias.appendChild(li);
//   });
// };

// const cargarProductos = (productosAMostrar = productos) => {
//   const contenedorProductos = document.querySelector("#contenedor-productos");

//   contenedorProductos.innerHTML = "";

//   productosAMostrar.forEach((producto) => {
//     const article = document.createElement("article");

//     article.classList.add("producto");

//     article.innerHTML = `
//             <img
//                 src="${producto.imagen}"
//                 alt="${producto.nombre}"
//                 width="250"
//                 height="250"
//             >

//             <h3>${producto.nombre}</h3>

//             <p>${producto.descripcion}</p>

//             <p>$${producto.precio}</p>

//             <button type="button" class="btn-agregar">
//                 Agregar
//             </button>
//         `;

//     const botonAgregar = article.querySelector(".btn-agregar");

//     botonAgregar.addEventListener("click", () => {
//       alert(`Agregaste: ${producto.nombre}`);
//     });

//     contenedorProductos.appendChild(article);
//   });
// };

// cargarCategorias();
// cargarProductos();
