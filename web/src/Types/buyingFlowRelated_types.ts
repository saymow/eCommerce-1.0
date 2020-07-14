export interface DeliveryMethods {
  Codigo: string;
  PrazoEntrega: string;
  Valor: string;
  Metodo: string | undefined;
}

interface DeliveryState {
  code: string;
  deadline: string;
  price: string;
  type?: string;
}

export interface Address {
  state: string;
  city: string;
  cep: string;
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
  | { type: "set-address"; payload: Address }
  | { type: "set-logged";}
  | { type: "set-reset-flow";};
