export interface CartData {
  totalCart: string;
  cart: Product[];
}

export interface CartManager extends CartData {
  dispatch: (arg0: Action) => void;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  qntd: number;
}

export interface DetailedProduct extends Product{
  description: string;
}

export type Action =
  | { type: "add-product"; payload: Product }
  | { type: "delete-product"; payload: { id: number } }
  | { type: "refresh-totalCart" };