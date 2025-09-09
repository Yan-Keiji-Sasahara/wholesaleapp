const cloudinary = require("cloudinary").v2;

console.log("Tentando carregar dotenv...");
const dotenvResult = require("dotenv").config();
console.log("Resultado do dotenv:", dotenvResult);

console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("CLOUD_API_KEY:", process.env.CLOUD_API_KEY);
console.log(
  "CLOUD_API_SECRET:",
  process.env.CLOUD_API_SECRET ? "***DEFINIDA***" : "UNDEFINED"
);

console.log("Diretório atual:", process.cwd());
console.log("__dirname:", __dirname);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

console.log("Cloud Name configurado:", cloudinary.config().cloud_name);
console.log("API Key configurado:", cloudinary.config().api_key);

module.exports = cloudinary;
