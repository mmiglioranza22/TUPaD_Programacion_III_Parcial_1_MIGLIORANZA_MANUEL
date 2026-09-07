import { categorias, PRODUCTS } from "../../../data/data";
import type { ICategoria } from "../../../types/categoria";
import type { IProduct } from "../../../types/product";
import { addToCart, updateCartIndicator } from "../../../utils/cart";

let productoBuscado = "";

const cargarCategorias = (): void => {
  const listaCategorias = document.querySelector(
    "#lista-categorias",
  ) as HTMLLIElement;

  // Crear "Todas las categorias"

  const li = document.createElement("li");

  li.innerHTML = `
            <a href="">
                Todas las categorías
            </a>
        `;

  li.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    cargarProductos();
  });
  listaCategorias.appendChild(li);

  categorias.forEach((categoria: ICategoria) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <a href="">
                ${categoria.nombre}
            </a>
        `;

    li.addEventListener("click", (e: MouseEvent) => {
      // evitar refrescar la página
      e.preventDefault();
      // invocar función filtrar productos
      filtrarProductos(categoria.id);
    });
    listaCategorias.appendChild(li);
  });
};

const cargarProductos = (productosAMostrar: IProduct[] = PRODUCTS): void => {
  const contenedorProductos = document.querySelector(
    "#contenedor-productos",
  ) as HTMLElement;

  contenedorProductos.innerHTML = "";

  productosAMostrar.forEach((producto) => {
    const article = document.createElement("article");

    article.classList.add("producto");

    article.innerHTML = `
						<div id="${producto.id}" class="producto_${producto.disponible ? "disponible" : "no_disponible"}">		
							<img
									src="${producto.imagen}"
									alt="${producto.nombre}"
									width="250"
									height="250"
							>

							<h3>${producto.nombre}</h3>

							<p>${producto.descripcion}</p>

							<p>$${producto.precio}</p>

							<button type="button" class="btn-agregar">
									Agregar
							</button>
						</div>
        `;

    const botonAgregar = article.querySelector(
      ".btn-agregar",
    ) as HTMLButtonElement;

    botonAgregar.addEventListener("click", () => {
      addToCart(producto);
      // Actualizar indicador visual
      updateCartIndicator();
    });

    contenedorProductos.appendChild(article);
  });
};

const filtrarProductos = (idCategoria: number): void => {
  const contenedorProductos = document.querySelector(
    "#contenedor-productos",
  ) as HTMLElement;

  // se computa cada vez que listado de productos filtrados es seleccionado
  const productosFiltrados = PRODUCTS.filter((producto) =>
    producto.categorias.some((categoria) => categoria.id === idCategoria),
  );

  // limpiar los productos previos
  contenedorProductos.innerHTML = "";

  productosFiltrados.forEach((producto) => {
    const article = document.createElement("article");

    article.classList.add("producto");

    article.innerHTML = `
  					<div id="${producto.id}" class="producto_${producto.disponible ? "disponible" : "no_disponible"}">
  						<img
  								src="${producto.imagen}"
  								alt="${producto.nombre}"
  								width="250"
  								height="250"
  						>

  						<h3>${producto.nombre}</h3>

  						<p>${producto.descripcion}</p>

  						<p>$${producto.precio}</p>

  						<button type="button" class="btn-agregar">
  								Agregar
  						</button>
  					</div>
        `;

    const botonAgregar = article.querySelector(
      ".btn-agregar",
    ) as HTMLButtonElement;

    botonAgregar.addEventListener("click", () => {
      alert(`Agregaste: ${producto.nombre}`);
    });
    contenedorProductos.appendChild(article);
  });
};

const buscarProductos = (): void => {
  const form = document.querySelector<HTMLFormElement>("#busqueda-productos");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const productoBuscado = formData.get("busqueda") as string;

    const productos = PRODUCTS.filter((producto) =>
      producto.nombre
        .toLocaleLowerCase()
        .includes(productoBuscado.toLocaleLowerCase()),
    );
    cargarProductos(productos);
  });
};

cargarCategorias();
cargarProductos();
// Invocado por si se hizo logout y hay items en el carrito desde localStorage
updateCartIndicator();
buscarProductos();
