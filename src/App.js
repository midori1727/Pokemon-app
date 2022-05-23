import './App.css';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FrontPage from './components/FrontPage/FrontPage';
import SinglePokemon from './components/Single/SinglePokemon'
// import Header from './components/Header/Header';



function App() {

	const navigate = useNavigate()

	const navigateToHome = () => {
		navigate('/')
	}

  return (
	// <Router>
		<div className="App">
		<img className="pokemonLogo" src={`${process.env.PUBLIC_URL}/image/pokemon-logo.png`} onClick={navigateToHome}/>
		<Routes >
			{/* <Header /> */}
			{/* <FrontPage /> */}
			<Route exact path="/:id" element={<SinglePokemon />} />
			<Route exact path="/" element={<FrontPage />} />
		</Routes >
		</div>
	// </Router>
  );
}

export default App;
