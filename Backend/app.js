// Importa as dependências do Express, Path e outros módulos necessários
const express = require('express');
const path = require('path');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/db'); // Conexão com o banco de dados via Sequelize (SQLite)

// Importa as rotas específicas do sistema
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const vaccineRoutes = require('./routes/vaccineRoutes');

// Importa middleware de autenticação (authMiddleware)
const auth = require('./authMiddleware');

// Importa multer para upload de arquivo
const upload = require('./upload');

// Cria o aplicativo Express
const app = express();

// Define a porta do servidor (permite sobrescrever via variável de ambiente)
const PORT = process.env.PORT || 3000;

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
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Middleware para interpretar requisições com corpo JSON
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173' // coloque aqui a URL que seu frontend roda
}));

// Middleware para servir arquivos estáticos, como imagens
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rota de documentação da API gerada pelo Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Definição das rotas da API, organizadas por domínio
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/vaccines', vaccineRoutes);

/**
 * Exemplo de rota protegida que retorna dados do usuário autenticado
 */
app.get('/rota-protegida', auth, (req, res) => {
  res.json({ mensagem: 'Você está autenticado!', usuario: req.user });
});

/**
 * Exemplo de rota para upload protegida
 * Aqui usamos o auth para garantir que só usuários autenticados façam upload
 * E multer para processar o upload do arquivo enviado no campo 'arquivo'
 */
app.post('/upload', auth, upload.single('arquivo'), (req, res) => {
  res.json({ message: 'Upload realizado com sucesso!', file: req.file });
});

// Sincroniza os modelos Sequelize com o banco de dados e inicia o servidor
sequelize.sync({ force: false })
  .then(() => {
    console.log('✅ Banco de dados sincronizado com sucesso!');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro ao sincronizar com o banco:', err);
  });

module.exports = app;
