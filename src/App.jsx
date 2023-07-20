import Navbar from './Components/Navbar';
import MainRoutes from './routes/routes';
import './style/App.css';

function App() {

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <MainRoutes />
      </div>
    </div>
  )
}

export default App
