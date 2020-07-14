import api, { ApiType } from "./api";

export default class ApiManager {
  api: ApiType;
  loggedIn: boolean;
  constructor(loggedIn: boolean) {
    this.loggedIn = loggedIn;
    this.api = api;

    if (this.loggedIn) this._retrieveToken();
  }

  async signIn(email: string, password: string) {
    const response = await this.api.post("/login", {
      email,
      password,
    });

    if (response.data.error) return response.data;

    this._storeToken(response.data.token);

    return response.data.userData;
  }

  async signUp(
    name: string,
    email: string,
    password: string,
    cpf: string,
    birthDate: string
  ) {
    const response = await this.api.post("/register", {
      name,
      email,
      password,
      cpf,
      birthDate,
    });

    if (response.data.error) return response.data;

    this._storeToken(response.data.token);

    return response.data.userData;
  }

  _retrieveToken() {
    const token = localStorage.getItem("@Auth:");

    if (!token) return;

    this.api.defaults.headers["Authorization"] = `Bearer ${JSON.stringify(
      token
    )}`;
  }

  _storeToken(token: string) {
    this.api.defaults.headers["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("@Auth:", token);
  }
}
