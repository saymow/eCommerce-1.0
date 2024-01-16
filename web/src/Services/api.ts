import axios, { AxiosInstance } from "axios";

console.log(process.env)

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3333/"
    : "https://ecommerce1-api.herokuapp.com/";

const Api = axios.create({
  baseURL: baseURL + "api",
});

const Proxy = axios.create({
  baseURL: baseURL + "proxy",
});

export default Api;
export { Proxy };
export type ApiType = AxiosInstance;
