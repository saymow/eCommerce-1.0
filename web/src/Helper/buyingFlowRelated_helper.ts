import { BuyingFlowState, Action } from "../Types/buyingFlowRelated_types";

export function flowAction(
  state: BuyingFlowState,
  action: Action
): BuyingFlowState {
  switch (action.type) {
    case "go-to-step2":
      const { code, deadline, price, type } = action.payload;
      return {
        ...state,
        step: 2,
        deliveryMethod: {
          code,
          deadline,
          price,
          type,
        },
      };

    case "go-to-step3":
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
