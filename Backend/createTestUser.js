// Backend/createTestUser.js

const db = require('./models/database'); // Importa conexão do banco
const User = require('./models/User');   // Importa o modelo User
const bcrypt = require('bcrypt');

async function createTestUser() {
  try {
    // Sincroniza banco (opcional se você já fez isso em outro lugar)
    await db.sync();

    // Cria hash da senha para não salvar texto puro
    const senhaHash = await bcrypt.hash('123456', 10);

    // Cria usuário
    const user = await User.create({
      nome: 'eu',
      email: 'gabrielfranco848@gmail.com',
      senha: 123,
      tipo: 'normal'  // ou o que sua aplicação usa
    });

    console.log('Usuário teste criado:', user.toJSON());
    process.exit(0);  // encerra script com sucesso
  } catch (error) {
    console.error('Erro ao criar usuário teste:', error);
    process.exit(1);  // encerra script com erro
  }
}

createTestUser();
