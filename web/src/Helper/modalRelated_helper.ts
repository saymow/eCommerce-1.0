import { Data, Action } from "../Types/modalRelated_types";

const initialState = {
  name: "closed",
  cb: (arg0: boolean) => null,
};

function modalAction(state: Data, action: Action): Data {
  switch (action.type) {
    case "cart":
      return { name: "cart" };

    case "create-address":
      const { cb, type } = action;

      return { cb, name: type };

    case "closed":
      return { name: "closed" };

    default:
      return state;
  }
}

export { initialState, modalAction };
