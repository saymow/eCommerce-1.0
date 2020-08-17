export interface CartData {
  totalCart: number;
  totalCartConverted: string;
  cart: Product[];
}

export interface CartManager extends CartData {
  dispatch: (arg0: Action) => void;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  convertedPrice: string;
  qntd: number;
}

export interface DetailedProduct extends Product {
  description: string;
}

export type Action =
  | { type: "add-product"; payload: Product }
  | { type: "delete-product"; payload: { id: number } }
  | { type: "refresh-totalCart" }
  | { type: "reset-cart" };
