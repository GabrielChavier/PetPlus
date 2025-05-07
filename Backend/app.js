// Importa as dependências do Express, Path e outros módulos necessários
const express = require('express');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/db'); // Conexão com o banco de dados via Sequelize (SQLite)

// Importa as rotas específicas do sistema
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const vaccineRoutes = require('./routes/vaccineRoutes');
const ownerRoutes = require('./routes/ownerRoutes');

// Cria o aplicativo Express
const app = express();

// Configuração do Swagger para gerar documentação da API
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PetPlus API',
      version: '1.0.0',
      description: 'Documentação da API PetPlus',
    },
  },
  apis: ['./routes/*.js'], // Define onde o Swagger buscará as rotas documentadas
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Middleware para interpretar requisições com corpo JSON
app.use(express.json());

// Middleware para servir arquivos estáticos, como imagens
// Exemplo: http://localhost:3000/uploads/foto.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rota de documentação da API gerada pelo Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Definição das rotas da API, organizadas por domínio
app.use('/api/auth', authRoutes);         // Rota para autenticação de usuários
app.use('/api/pets', petRoutes);          // Rota para gestão de pets
app.use('/api/vaccines', vaccineRoutes);  // Rota para controle de vacinas
app.use('/api/owners', ownerRoutes);      // Rota para informações dos donos

// Sincroniza os modelos Sequelize com o banco de dados
sequelize.sync({ force: false }) // force: false → não força a recriação das tabelas, preservando dados existentes
  .then(() => {
    console.log('✅ Banco de dados sincronizado com sucesso!');
    
    // Inicia o servidor na porta 3000 após a sincronização com o banco de dados
    app.listen(3000, () => {
      console.log('🚀 Servidor rodando em http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ Erro ao sincronizar com o banco:', err);
  });

// Exporta o app para ser utilizado em outros módulos, como em testes ou se necessário em outro lugar
module.exports = app;
