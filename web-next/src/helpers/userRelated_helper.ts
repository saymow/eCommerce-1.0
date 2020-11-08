import { User, Action } from "../types/userRelated_types";

export function userAction(state: User | undefined, action: Action) {
  switch (action.type) {
    case "set-loggedIn": {
      const { email, name } = action.payload;

      return { email, name };
    }
    case "unset-loggedIn": {
      return undefined;
    }

    default: {
      return state;
    }
  }
}
