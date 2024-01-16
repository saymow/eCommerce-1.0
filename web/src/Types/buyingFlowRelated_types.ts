export enum DeliveryType  {
  Standard = "Standard",
  Express = "Express"
}

export interface Delivery {
  code: string;
  type: DeliveryType;
  deadline: string;
  price: string;
}

export interface Address {
  id?: number;
  state: string;
  city: string;
  postalCode: string;
  neighborhood: string;
  number: string;
  street: string;
}

export type Steps = 1 | 2 | 3 | 4 | 5;

export interface Cart {
  step: Steps;
  deliveryMethod?: Delivery;
  address?: Address;
}

export interface CartState extends Cart {
  dispatch: (arg0: Action) => void;
}

export type Action =
  | { type: "set-delivery"; payload: Delivery }
  | { type: "update-delivery"; payload: Delivery }
  | { type: "set-address"; payload: Address }
  | { type: "set-logged" }
  | { type: "set-finished-buy" }
  | { type: "set-reset-flow" };
