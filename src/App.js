import './App.css';
import FrontPage from './components/FrontPage';
import PokemonLogo from './pokemon-logo.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="logo" src={PokemonLogo} alt='pokemon-logo' /> 
		<FrontPage />
      </header>
    </div>
  );
}

export default App;
