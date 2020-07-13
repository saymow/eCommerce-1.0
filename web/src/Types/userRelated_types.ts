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

export interface UserLogin {
  email: string;
  password: string;
}

export type Action =
  | { type: "signIn"; payload: UserLogin }
  | { type: "signUp"; payload: UserRegister };
