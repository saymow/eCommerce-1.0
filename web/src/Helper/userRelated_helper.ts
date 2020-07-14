import { User, Action } from "../Types/userRelated_types";

export function userAction(state: User | false, action: Action) {
  switch (action.type) {
    case "set-user": {
      const { email, name } = action.payload;

      return { email, name };
    }

    default: {
      return state;
    }
  }
}
