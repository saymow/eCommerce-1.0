import api, { ApiType } from "./api";

export default class ApiManager {
  api: ApiType;
  loggedIn: boolean;
  constructor(loggedIn: boolean) {
    this.loggedIn = loggedIn;
    this.api = api;

    if (this.loggedIn) this.retrieveToken();
  }

  retrieveToken() {
    const token = localStorage.getItem("@Auth:");

    if (!token) return;

    this.api.defaults.headers["Authorization"] = JSON.stringify(token);
  }

  async signIn(email: string, password: string) {
    const response = await this.api.post("/login", {
      email,
      password,
    });

    console.log(response);
  }
}
