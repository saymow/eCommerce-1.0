import { User, Action } from "../Types/userRelated_types";

export function userAction(state: User | false | undefined, action: Action) {
  switch (action.type) {
    case "set-loggedIn": {
      const { email, name } = action.payload;

      return { email, name };
    }
    case "unset-loggedIn": {
      return false;
    }

    default: {
      return state;
    }
  }
}
