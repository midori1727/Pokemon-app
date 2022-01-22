import axios from "axios";
import { useEffect, useState } from "react";
import './FrontPage.css';

const FrontPage = () => {

	const url = "https://pokeapi.co/api/v2";
	const [data, setData] = useState('')

	useEffect(() => {
		const getPokemon = async () => {
			const response = await axios.get(`${url}/pokemon`);
			setData(response.data)
		}
		getPokemon();
	},[])


	console.log(data);
	
	console.log(data.results);

	// data.results.map((pokemon)=> {
	// 	console.log(pokemon.name);
	// })



	return (
		<div className="pokemonListWrapper">
		{data &&
		<>
		{data.results.map((pokemon)=> (
			<>
			<div className="pokemonList" key={pokemon.name}>
				<img className="pokemonListImg" alt="pokemon" src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}/>
				<p className="pokemonListName" >{pokemon.name}</p>
			</div>
			</>
			
		))}
		</>
		}

		</div>
	)
};

export default FrontPage;