import { User, Action } from "../Types/userRelated_types";

export async function userAction(state: User | false, action: Action) {
  switch (action.type) {
    case "signIn": {
      const { email, password } = action.payload;

      console.log(action);

      return { email, name: "dsadasdsadas" };
    }

    case "signUp": {
      const { name, email, password, cpf, birthDate } = action.payload;

      return { email, name: "dsadasdasdsa" };
    }

    default: {
      return state;
    }
  }
}
