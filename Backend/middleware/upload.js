const multer = require('multer');
const path = require('path');

// Configuração do armazenamento de arquivos (armazenamento local)
const storage = multer.diskStorage({
  // Definição do destino do arquivo (onde os arquivos serão salvos)
  destination: (req, file, cb) => {
    // A pasta 'uploads/' onde as imagens serão armazenadas
    cb(null, 'uploads/');
  },

  // Definição do nome do arquivo ao ser salvo
  filename: (req, file, cb) => {
    // Gera um nome único para o arquivo, baseado no timestamp atual e na extensão original do arquivo
    const filename = Date.now() + path.extname(file.originalname); // usa path.extname() para garantir que a extensão seja mantida corretamente
    cb(null, filename); // Define o nome final do arquivo
  }
});

// Criação do middleware de upload com a configuração do armazenamento
const upload = multer({ storage });

// Exporta o middleware para ser usado em outras partes do código
module.exports = upload;
