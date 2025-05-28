const sequelize = require('./database'); // ou './index' se for aqui mesmo que criou sequelize
const User = require('./User');
const Pet = require('./Pet');
const Vaccine = require('./Vaccine');

// Associações
User.hasMany(Pet, { foreignKey: 'userId' });
Pet.belongsTo(User, { foreignKey: 'userId' });

Pet.hasMany(Vaccine, { foreignKey: 'petId', onDelete: 'CASCADE' });
Vaccine.belongsTo(Pet, { foreignKey: 'petId' });

// Função para criar usuário de teste
async function criarUsuarioTeste() {
  try {
    await sequelize.sync();

    const usuario = await User.create({
      usuario_email: 'eu',
      senha: '123456'
    });

    const pet = await Pet.create({
      nome: 'Rex',
      especie: 'Cachorro',
      raca: 'Labrador',
      sexo: 'Macho',
      idade: 4,
      userId: usuario.id
    });


    console.log('Usuário de teste criado:', usuario.toJSON());
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}

// Chama a função para criar o usuário
criarUsuarioTeste();
