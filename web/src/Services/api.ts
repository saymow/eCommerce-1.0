import axios, { AxiosInstance } from "axios";

const Api = axios.create({
  baseURL: process.env.NODE_ENV
    ? "http://localhost:3333"
    : "https://ecommerce1-api.herokuapp.com",
});

export default Api;
export type ApiType = AxiosInstance;
