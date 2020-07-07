import { BuyingFlowState, Action } from "../Types/buyingFlowRelated_types";

export function flowAction(
  state: BuyingFlowState,
  action: Action
): BuyingFlowState {
  switch (action.type) {
    case "set-delivery":
      const { Codigo, Metodo, PrazoEntrega, Valor } = action.payload;
      return {
        ...state,
        step: 2,
        deliveryMethod: {
          code: Codigo,
          deadline: PrazoEntrega,
          price: Valor,
          type: Metodo,
        },
      };

    case "set-address":
      const { cep, city, number, street } = action.payload;
      const Lstate = action.payload.state;

      return {
        ...state,
        step: 3,
        address: {
          number,
          street,
          cep,
          city,
          state: Lstate
        },
      };

    default:
      return state;
  }
}
