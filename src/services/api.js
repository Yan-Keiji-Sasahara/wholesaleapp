import axios from "axios";

console.log(
  "[API] Criando instância Axios com baseURL:",
  "http://192.168.45.119:3000"
);

const api = axios.create({
  baseURL: "http://192.168.45.119:3000",
  timeout: 5000,
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    console.log("🕵️‍♂️ [API - REQUEST]");
    console.log("➡️ Método:", config.method?.toUpperCase());
    console.log("➡️ URL:", config.baseURL + config.url);
    console.log("➡️ Headers:", config.headers);
    console.log("➡️ Params:", config.params || "Nenhum");
    console.log("➡️ Body/Data:", config.data || "Nenhum");
    console.log("------------------------------------------------------");
    return config;
  },
  (error) => {
    console.error("🚨 [API - REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  (response) => {
    console.log("🛬 [API - RESPONSE]");
    console.log("✅ Status:", response.status);
    console.log("✅ URL:", response.config.baseURL + response.config.url);
    console.log("✅ Dados:", response.data);
    console.log("------------------------------------------------------");
    return response;
  },
  (error) => {
    console.error("💥 [API - RESPONSE ERROR]");
    if (error.response) {
      console.error("❌ Status:", error.response.status);
      console.error("❌ Dados:", error.response.data);
      console.error("❌ URL:", error.config.baseURL + error.config.url);
    } else if (error.request) {
      console.error("📭 Nenhuma resposta recebida");
    } else {
      console.error("⚠️ Erro na configuração da requisição:", error.message);
    }
    console.log("------------------------------------------------------");
    return Promise.reject(error);
  }
);

export default api;
