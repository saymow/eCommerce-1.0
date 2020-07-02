export interface User {
  name: string;
  email: string;
}

export interface UserController {
  loggedIn: boolean; 
  user: User | undefined;
}