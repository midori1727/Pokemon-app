import './CapturedPokemonList.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectCaputured } from '../../features/capturedSlice'
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation'
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { selectFavorite, addFavoritePokemon, removeFavoritePokemon } from '../../features/favoriteSlice'


const CapturedPokemonList = () => {

	const [newCapturedPokemonList, setNewCapturedPokemonList] = useState([])
	const caputuredPokemonList = useSelector(selectCaputured)
	const selectFavoritePokemons = useSelector(selectFavorite)
	
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		const getCapturedPokemonList = async () => {
			const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
			console.log(response.data.results)
			const allPokemonList = response.data.results

			const newCapturedPokemon = caputuredPokemonList.filter(caputuredPokemon => 
				allPokemonList.filter(allPokemon => allPokemon.name === caputuredPokemon.name).length > 0);

			console.log(newCapturedPokemon);
			setNewCapturedPokemonList(newCapturedPokemon)
			
		}
		getCapturedPokemonList()

	},[caputuredPokemonList])

	const handleClick = (pokemonId) => {
		navigate(`/${pokemonId}`)
	}

	// const removeFavorite = (e,id) => {
	// 	e.stopPropagation()
	// 	dispatch(removeFavoritePokemon(id))
	// }
	console.log(newCapturedPokemonList);
	console.log(newCapturedPokemonList.map((p) => {
		return p.id
	}))


	const toggleFavorite = (e,id, name, url) => {
		e.stopPropagation()
		// if same pokemon is clicked, return index Number(which are over 0)
		const  findSamePokemon  = selectFavoritePokemons.findIndex(function(element){
			return element.name === name;
		});

		console.log(findSamePokemon);
		console.log(id);
		console.log(name);
		console.log(url);

		
		// if same pokemon is already in selectFavoritePokemons
		if(findSamePokemon >= 0) {
			dispatch(removeFavoritePokemon(id))
		// if new pokemon is clicked
		} else {
			dispatch(addFavoritePokemon({id,name,url}))
		}
	}

	
	const favoritePokemonList = selectFavoritePokemons.map((p) => {
		return p.name
	})


	console.log('favoritePokemonList',favoritePokemonList);

	return (
		<>
		<h1>Captured pokemon list</h1>
		<div className="pokemonListWrapper">
			

		{newCapturedPokemonList ?
		<>
		{newCapturedPokemonList.map((pokemon)=> (
			<>
			
			<div className="pokemonList" key={pokemon.name} 
			// onClick={()=>handleClick(pokemon.url.substring(42,pokemon.url.length - 1))}
			onClick = {() => handleClick(pokemon.id)}
			>
				<div className="pokemonListImgCard" >
					
					<IconButton aria-label="favorite" className='pokemonListFavoriteIcon' 
					// onClick={(e) => removeFavorite(e,pokemon.id)}
					// onClick={(e)=> toggleFavorite(e,pokemon.url.substring(34,pokemon.url.length - 1), pokemon.name, pokemon.url)}
					onClick={(e)=> toggleFavorite(e,
						pokemon.id,
						// pokemon.url.substring(42,pokemon.length - 1),
						 pokemon.name, pokemon.url)}
					>
						<FavoriteIcon   className='pokemonListFavoriteIcon'  
						// style={{ color: '#F44336' }}
						style={{ color: favoritePokemonList.includes(pokemon.name) ? '#F44336' : 'gray' }}
						 />
					</IconButton>
					
					{/* { < img className="pokemonListImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.substring(42,pokemon.url.length - 1)}.png`}/> */}
					{/* {  */}
					< img className="pokemonListImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}/>
					{/* ?
						< img className="pokemonListImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.substring(42,pokemon.url.length - 1)}.png`}/>
					:
					<p>no image</p>
					} */}
					
					<p className="pokemonListName" >{pokemon.name}</p>
				</div>
			</div>
			</>

		))}
		</>
		: <LoadingAnimation />
		}
		</div>
		</>
		
	)
}

export default CapturedPokemonList

