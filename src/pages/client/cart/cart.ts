import {
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../../../utils/cart";

// El carrito y todo lo que contiene (productos, cantidades, subtotales) se calcula de forma dinámica desde localStorage

const cartContainer = document.querySelector<HTMLDivElement>(
  "#cart-container",
) as HTMLElement;

// debug
if (!cartContainer) {
  alert("No se encontró su carrito, comuníquese con el administrador");
}

// formateo del precio
function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);
}

function getCategories(item: any): string {
  // esto nunca debería fallar porque siempre se agregan categorias a los productos, es simplemente un fallback
  if (!item.product.categorias || item.product.categorias.length === 0) {
    return "Sin categoría";
  }

  return item.product.categorias
    .map((categoria: any) => categoria.nombre)
    .join(", ");
}

function renderCart(): void {
  const carrito = getCart();

  if (carrito.items.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <h2>Tu carrito está vacío</h2>
        <p>No hay productos agregados al carrito.</p>
      </div>
    `;

    return;
  }

  // cada item del carrito se renderiza como un innerHTML (texto) por lo que se le hace un join("") justamente para que se puedan concatenar los elementos html (articles)

  cartContainer.innerHTML = `
    <div class="cart-layout">

      <section class="cart-items">
        ${carrito.items.map((item) => renderCartItem(item)).join("")}
      </section>

      ${renderSummary(carrito.total, carrito.items)}

    </div>
  `;

  // cada vez que se actualiza o modifica la lista del carrito, deben registrarse todos los listeners de los botones
  registerEvents();
}

function renderCartItem(item: any): string {
  const product = item.product;

  const subtotal = product.precio * item.cantidad;

  // se guarda el id del producto en el dataset del elemento html (data-*)
  // lo que permite acceder al mismo para manipularlo más fácilmente (es como un id)
  // y no tener que buscarlo a la par dentro del carrito del localStorage

  return `
    <article
      class="cart-item"
      data-product-id="${product.id}"
    >

      <img
        class="product-image"
        src="${product.imagen}"
        alt="${product.nombre}"
      >

      <div class="product-info">

        <h2>
          ${product.nombre}
        </h2>

        <p class="category">
          Categoría:
          ${getCategories(item)}
        </p>

        <p class="price">
          ${formatPrice(product.precio)}
        </p>

        <div class="quantity-controls">
 
          <button
            type="button"
            class="decrease-button"
            data-product-id="${product.id}"
          >
            −
          </button>

          <span class="quantity">
            ${item.cantidad}
          </span>

          <button
            type="button"
            class="increase-button"
            data-product-id="${product.id}"
          >
            +
          </button>

        </div>

      </div>

      <div class="item-actions">

        <p class="subtotal">
          ${formatPrice(subtotal)}
        </p>

        <button
          type="button"
          class="remove-button"
          data-product-id="${product.id}"
        >
          Eliminar
        </button>

      </div>

    </article>
  `;
}

// resumen de la compra
function renderSummary(total: number, items: any[]): string {
  const quantity = items.reduce((total, item) => total + item.cantidad, 0);

  return `
    <aside class="cart-summary">

      <h2>Resumen de compra</h2>

      <div class="summary-row">
        <span>Productos</span>
        <span>${quantity}</span>
      </div>

      <div class="summary-row total-row">
        <span>Total</span>
        <strong>
          ${formatPrice(total)}
        </strong>
      </div>

      <button
        type="button"
        id="clear-cart-button"
        class="clear-cart-button"
      >
        Vaciar carrito
      </button>

    </aside>
  `;
}

function registerEvents(): void {
  const increaseButtons =
    document.querySelectorAll<HTMLButtonElement>(".increase-button");

  const decreaseButtons =
    document.querySelectorAll<HTMLButtonElement>(".decrease-button");

  const removeButtons =
    document.querySelectorAll<HTMLButtonElement>(".remove-button");

  const clearButton =
    document.querySelector<HTMLButtonElement>("#clear-cart-button");

  increaseButtons.forEach((button) => {
    // busca el id del producto dentro del dataset (DOMStringMap) de cada button
    // data-product-id es el atribute que contiene el id del producto agregado a cada button al momento de renderizarlo con renderCartItem
    // lo que permite acceder más facilmente a dicho producto al momento de filtrarlo (sin necesidad de iterar nuevamente en el carrito del localStorage)
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.productId);

      increaseQuantity(productId);

      renderCart();
    });
  });

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.productId);

      decreaseQuantity(productId);

      renderCart();
    });
  });

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.productId);

      removeFromCart(productId);

      renderCart();
    });
  });

  clearButton?.addEventListener("click", () => {
    clearCart();

    renderCart();
  });
}

renderCart();
