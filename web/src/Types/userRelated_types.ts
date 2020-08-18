export interface User {
  name: string;
  email: string;
}

export interface UserController {
  loggedIn: boolean;
  user: User | undefined;
  dispatch: (arg0: Action) => void;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birthDate: string;
}

export interface User {
  email: string;
  name: string;
}

export type Action =
  | { type: "set-loggedIn"; payload: User }
  | { type: "unset-loggedIn"}
