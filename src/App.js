import './App.css';
import { Route, Routes  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FrontPage from './components/FrontPage/FrontPage';
import SinglePokemon from './components/Single/SinglePokemon'
import FavoritePokemonList from './components/FavoritePokemonList/FavoritePokemonList';
import CapturedPokemonList from './components/CapturedPokemonList/CapturedPokemonList';



function App() {

	const navigate = useNavigate()

	const navigateToHome = () => {
		navigate('/')
	}

  return (
		<div className="App">
		<img className="pokemonLogo" src={`${process.env.PUBLIC_URL}/image/pokemon-logo.png`} onClick={navigateToHome}/>
		<Routes >
			<Route exact path="/:id" element={<SinglePokemon />} />
			<Route exact path="/" element={<FrontPage />} />
			<Route exact path="/favorite" element={<FavoritePokemonList />} />
			<Route exact path="/captured" element={<CapturedPokemonList />} />
		</Routes >
		</div>
  );
}

export default App;
