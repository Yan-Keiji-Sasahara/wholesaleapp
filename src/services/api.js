import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.2.152:3000",
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    console.log("[API - REQUEST]");
    console.log("Método:", config.method?.toUpperCase());
    console.log("URL:", config.baseURL + config.url);
    console.log("Headers:", config.headers);
    console.log("Params:", config.params || "Nenhum");
    console.log("Body/Data:", config.data || "Nenhum");
    console.log("------------------------------------------------------");
    return config;
  },
  (error) => {
    console.error("[API - REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

export default api;
