import {
  Cart,
  Action,
  Steps,
} from "../Types/buyingFlowRelated_types";

function flowAction(state: Cart, action: Action): Cart {
  if (state.step > 5 || state.step < 1) return state;

  let step = (state.step + 1) as Steps;

  switch (action.type) {
    case "set-delivery": {
      return {
        ...state,
        step,
        deliveryMethod: { ...action.payload },
      };
    }
    case "update-delivery": {
      return {
        ...state,
        deliveryMethod: { ...action.payload },
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
