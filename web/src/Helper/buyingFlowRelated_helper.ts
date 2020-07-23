import {
  BuyingFlowState,
  Action,
  Steps,
} from "../Types/buyingFlowRelated_types";

export function flowAction(
  state: BuyingFlowState,
  action: Action
): BuyingFlowState {
  if (state.step > 4 || state.step < 1) return state;

  let step = (state.step + 1) as Steps;

  switch (action.type) {
    case "set-delivery":
      const { cep, Codigo, Metodo, PrazoEntrega, Valor } = action.payload;

      return {
        ...state,
        step,
        deliveryMethod: {
          cep,
          code: Codigo,
          deadline: PrazoEntrega,
          price: Valor,
          type: Metodo,
        },
      };

    case "set-address":
      const {
        state: Lstate,
        city,
        neighborhood,
        street,
        number,
      } = action.payload;

      return {
        ...state,
        step,
        address: {
          state: Lstate,
          city,
          neighborhood,
          street,
          number,
        },
      };

    case "set-logged": {
      return {
        ...state,
        step,
      };
    }

    case "set-reset-flow":
      return {
        ...state,
        step: 1,
      };

    default:
      return state;
  }
}
