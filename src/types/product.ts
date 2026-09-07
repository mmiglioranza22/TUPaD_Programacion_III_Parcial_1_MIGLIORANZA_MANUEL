import type { ICategoria } from "./categoria";

export interface IProduct {
  id: number;
  eliminado: boolean;
  createdAt: string;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  imagen: string;
  disponible: boolean;
  categorias: ICategoria[];
}

export interface ICartItem {
  product: Omit<IProduct, "descripcion">;
  cantidad: number;
}

export interface Carrito {
  items: ICartItem[];
  total: number;
}
