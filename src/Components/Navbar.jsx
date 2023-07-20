import { BrowserRouter as Router } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = () => { //Aba de navegação 
  return (
    <nav className="navbar">

      <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"> Menu </button>

        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header"> 
        
                <button type="button" class="btn btn-outline-light"  href="/home"> 
                    <a className="nav-link" href="/home">Home  </a>
                </button>
                <button type="button" class="btn btn-outline-light"  href="/operacao"> 
                    <a className="nav-link" href="/operacao">Operação  </a>
                </button>
                <button type="button" class="btn btn-outline-light"  href="/supervizao"> 
                    <a className="nav-link" href="/supervizao">Supervisão  </a>
                </button>
                <button type="button" class="btn btn-outline-light"  href="/grafico"> 
                    <a className="nav-link" href="/grafico">Grafico  </a>
                  </button>
                  
            </div>
        <div class="offcanvas-body">
        </div>
      </div>

    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      {/* Outros componentes e rotas aqui */}
    </Router>
  );
};

export default App;
