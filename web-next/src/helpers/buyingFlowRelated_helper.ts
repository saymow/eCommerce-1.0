import {
  BuyingFlowState,
  Action,
  Steps,
} from "../types/buyingFlowRelated_types";

function flowAction(state: BuyingFlowState, action: Action): BuyingFlowState {
  if (state.step > 5 || state.step < 1) return state;

  let step = (state.step + 1) as Steps;

  switch (action.type) {
    case "set-delivery": {
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
    }
    case "update-delivery": {
      const { cep, Codigo, Metodo, PrazoEntrega, Valor } = action.payload;

      return {
        ...state,
        deliveryMethod: {
          cep,
          code: Codigo,
          deadline: PrazoEntrega,
          price: Valor,
          type: Metodo,
        },
      };
    }
    case "set-address":
      const {
        state: Lstate,
        city,
        neighborhood,
        street,
        number,
        id,
        postalCode,
      } = action.payload;

      return {
        ...state,
        step,
        address: {
          id,
          state: Lstate,
          city,
          neighborhood,
          street,
          number,
          postalCode,
        },
      };

    case "set-logged": {
      return {
        ...state,
        step,
      };
    }

    case "set-finished-buy": {
      return {
        step,
      };
    }

    case "set-reset-flow":
      return {
        step: 1,
      };

    default:
      return state;
  }
}

export { flowAction };
