export interface DeliveryMethods {
  cep: string;
  Codigo: string;
  PrazoEntrega: string;
  Valor: string;
  Metodo: string | undefined;
}

export interface DeliveryState {
  cep: string;
  code: string;
  deadline: string;
  price: string;
  type?: string;
}

export interface Address {
  id?: number; 
  state: string;
  city: string;
  neighborhood: string;
  number: string;
  street: string;
}

export type Steps = 1 | 2 | 3 | 4 | 5;

export interface BuyingFlowState {
  step: Steps;
  deliveryMethod?: DeliveryState;
  address?: Address;
}

export interface BuyingFlow extends BuyingFlowState {
  dispatch: (arg0: Action) => void;
}

export type Action =
  | { type: "set-delivery"; payload: DeliveryMethods }
  | { type: "set-logged" }
  | { type: "set-address"; payload: Address }
  | { type: "set-finished-buy"}
  | { type: "set-reset-flow" };
