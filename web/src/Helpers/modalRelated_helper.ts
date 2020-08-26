import { Data, Action, availableOptions } from "../Types/modalRelated_types";

const initialState = {
  name: "closed" as availableOptions,
  cb: (arg0: boolean) => null,
  payload: {},
};

function modalAction(state: Data, action: Action): Data {
  switch (action.type) {
    case "cart":
      return { name: "cart", payload: {} };

    case "create-address": {
      const { cb } = action;

      return { name: "create-address", cb, payload: {} };
    }

    case "closed":
      return { name: "closed", payload: {} };

    case "update-address": {
      const { payload, cb } = action;

      return { name: "update-address", payload, cb };
    }

    default:
      return state;
  }
}

export { initialState, modalAction };
