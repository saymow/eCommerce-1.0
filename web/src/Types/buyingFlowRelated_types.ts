export interface DeliveryMethods {
  type: string;
  code: string;
  price: string;
  deadline: number;
}

export interface Address {
  state: string;
  city: string;
  cep: string;
  number: string;
  street: string;
}

export type Steps = 1 |   2 | 3 | 4;

export interface BuyingFlowState {
  step: Steps;
  deliveryMethod?: DeliveryMethods;
  address?: Address;
}

export interface BuyingFlow extends BuyingFlowState{
  dispatch: (arg0: Action) => void; 
}

export type Action =
  | { type: "go-to-step2"; payload: DeliveryMethods }
  | { type: "go-to-step3"; payload: Address }
