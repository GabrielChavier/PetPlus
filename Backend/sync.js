const sequelize = require('./config/db');
const User = require('./models/User');
const Pet = require('./models/Pet');
const Vaccine = require('./models/Vaccine');

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // ou alter: true para manter os dados existentes
    console.log('Banco de dados sincronizado com sucesso!');

    // Criar um usuário de teste
    await User.create({
      nome: 'Usuário Teste',
      email: 'usuario@teste.com',
      senha: '123456', // Troque por hash se necessário
      tipo: 'usuario' // lembre de definir o tipo se for ENUM
    });

    console.log('Usuário de teste criado!');
  } catch (error) {
    console.error('Erro ao sincronizar o banco:', error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();
