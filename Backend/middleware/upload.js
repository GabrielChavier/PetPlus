const multer = require('multer');
const path = require('path');

// Configuração do armazenamento de arquivos (armazenamento local)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  }
});

// Filtro para aceitar só arquivos de imagem
function fileFilter (req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mimeType)) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos de imagem são permitidos!'));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limite de 5MB
  fileFilter
});

module.exports = upload;
