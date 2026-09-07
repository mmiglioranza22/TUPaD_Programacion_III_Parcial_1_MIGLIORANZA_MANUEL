import type { Carrito, ICartItem, IProduct } from "../types/product";

const CART_KEY = "cart";

/**
 * Obtiene el carrito completo desde localStorage.
 */
export function getCart(): Carrito {
  const cart = localStorage.getItem(CART_KEY);

  if (!cart) {
    return {
      items: [],
      total: 0,
    };
  }

  try {
    return JSON.parse(cart);
  } catch {
    return {
      items: [],
      total: 0,
    };
  }
}

/**
 * Calcula el total a partir de los items.
 */
function calculateCartTotal(items: ICartItem[]): number {
  return items.reduce(
    (total, item) => total + item.product.precio * item.cantidad,
    0,
  );
}

/**
 * Guarda el carrito completo en localStorage.
 */
function saveCart(items: ICartItem[]): Carrito {
  const carrito: Carrito = {
    items,
    total: calculateCartTotal(items),
  };

  localStorage.setItem(CART_KEY, JSON.stringify(carrito));

  return carrito;
}

/**
 * Agrega un producto al carrito.
 *
 * Si ya existe, aumenta su cantidad.
 */
export function addToCart(product: IProduct, cantidad: number = 1): Carrito {
  // verifica que la cantidad sea posible, el producto esté disponible, no haya sido eliminado y tenga stock
  // si no cumple con alguna de esas, devuelve el carrito actual.
  if (
    cantidad <= 0 ||
    !product.disponible ||
    product.eliminado ||
    product.stock <= 0
  ) {
    return getCart();
  }

  const carrito = getCart();

  // busca si existe el item ya en el carrito para actualizar unicamente la cantidad y no agregarlo 2 veces
  const existingItem = carrito.items.find(
    (item) => item.product.id === product.id,
  );

  if (existingItem) {
    existingItem.cantidad = Math.min(
      existingItem.cantidad + cantidad,
      product.stock,
    );

    // Actualizamos los datos del producto
    existingItem.product = product;
  } else {
    // lo agrega por primera vez al carrito
    carrito.items.push({
      product,
      cantidad: Math.min(cantidad, product.stock), // nunca la cantidad puede exceder más allá del stock disponible, un carrito puede tener, como máximo, el total del stock de un producto, pero no más
    });
  }

  return saveCart(carrito.items);
}

/**
 * Elimina un producto del carrito.
 */
export function removeFromCart(productId: number): Carrito {
  const carrito = getCart();

  const items = carrito.items.filter((item) => item.product.id !== productId);

  return saveCart(items);
}

/**
 * Vacía el carrito.
 */
export function clearCart(): void {
  localStorage.setItem(
    CART_KEY,
    JSON.stringify({
      items: [],
      total: 0,
    }),
  );
}

// incrementa por 1 la cantidad del producto
export function increaseQuantity(productId: number): Carrito {
  const carrito = getCart();

  const item = carrito.items.find((item) => item.product.id === productId);

  if (!item) {
    return carrito;
  }

  if (item.cantidad >= item.product.stock) {
    return carrito;
  }

  item.cantidad++;

  return saveCart(carrito.items);
}

// reduce por 1 la cantidad del producto
export function decreaseQuantity(productId: number): Carrito {
  const carrito = getCart();

  const item = carrito.items.find((item) => item.product.id === productId);

  if (!item) {
    return carrito;
  }

  if (item.cantidad <= 1) {
    return carrito;
  }

  item.cantidad--;

  return saveCart(carrito.items);
}

// Indicador visual carrito
export function updateCartIndicator(): void {
  const cartLink = document.querySelector<HTMLElement>("#cart-link");

  const cartCount = document.querySelector<HTMLElement>("#cart-count");

  if (!cartLink || !cartCount) {
    return;
  }

  const cart = getCart();

  const quantity = cart.items.reduce((total, item) => total + item.cantidad, 0);

  cartCount.textContent = quantity.toString();

  cartLink.classList.toggle("has-items", quantity > 0);
}
