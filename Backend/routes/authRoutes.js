const express = require("express"); // Importa o framework Express
const router = express.Router();    // Cria um "mini aplicativo" de rotas, isolado

const authController = require("../controllers/authController"); 
// Importa o controlador de autenticação, que contém as funções register e login
router.post("/register", authController.register);
// Define a rota POST /register
// Quando essa rota for chamada, ela executa a função register do authController
// Exemplo de uso: POST http://localhost:3000/auth/register
// Espera-se um corpo (body) como:
// {
//   "nome": "João",
//   "email": "joao@email.com",
//   "senha": "123456",
//   "tipo": "usuario"
// }
router.post("/login", authController.login);
// Define a rota POST /login
// Quando essa rota for chamada, executa a função login do authController
// Exemplo de uso: POST http://localhost:3000/auth/login
// Espera-se um corpo como:
// {
//   "email": "joao@email.com",
//   "senha": "123456"
// }
// Se a autenticação for bem-sucedida, retorna um token JWT
module.exports = router;
// Exporta esse conjunto de rotas para ser usado no app principal (geralmente app.js ou server.js)
// No app principal, elas podem ser montadas assim:
// app.use('/auth', require('./routes/authRoutes'));
