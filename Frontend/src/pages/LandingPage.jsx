import './LandingPage.css';
import { Link } from 'react-router-dom';
import pets from '../assets/Pet_LandingPage.png'; 

export default function LandingPage() {
  return (
    <div className="landing-container">

      <main className="landing-content">
        <div className="text-area">
          <h1>PetPlus seu<br />aplicativo completo<br />para cuidar da<br />saúde e bem-estar<br />do seu pet.</h1>
          <div className="button-area">
            <Link to="/login" className="btn">Entrar</Link>
            <Link to="/cadastro" className="btn secondary">cadastro</Link>
          </div>
        </div>
        <div className="image-area">
          <img src={pets} alt="Cachorro e Gato" className="pets-img" />
        </div>
      </main>
    </div>
  );
}
