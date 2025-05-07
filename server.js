const app = require('./Backend/App');
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});