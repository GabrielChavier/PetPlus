// src/App.jsx

// Importa o BrowserRouter para controlar as rotas com HTML5 History API
import { BrowserRouter } from 'react-router-dom'

// Importa o componente de rotas que você criou
import AppRoutes from './routes/AppRoutes' // ou './routes/Routes' se o nome for diferente

// Componente principal da aplicação
function App() {
  return (
    // Define o provedor de rotas que permite navegação entre páginas
    <BrowserRouter>
      {/* Renderiza o conjunto de rotas definidas no arquivo de rotas */}
      <AppRoutes />
    </BrowserRouter>
  )
}

// Exporta o componente para ser usado no main.jsx
export default App
