import axios, { AxiosInstance } from "axios";

const Api = axios.create({
  baseURL: "https://ecommerce1-api.herokuapp.com",
});

export default Api;
export type ApiType = AxiosInstance;
