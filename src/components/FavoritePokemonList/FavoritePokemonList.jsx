import './FavoritePokemonList.css'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectFavorite } from '../../features/favoriteSlice'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { removeFavoritePokemon } from '../../features/favoriteSlice'


const FavoritePokemonList = () => {

	const [newFavoritePokemonList, setNewFavoritePokemonList] = useState([])
	const favoritePokemonList = useSelector(selectFavorite)
	console.log(favoritePokemonList);
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		const getFavoritePokemonList = async () => {
			const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
			console.log(response.data.results)
			const allPokemonList = response.data.results

			const newFavoritePokemon = favoritePokemonList.filter(favoritePokemon => 
				allPokemonList.filter(allPokemon => allPokemon.name === favoritePokemon.name).length > 0);

			console.log(newFavoritePokemon);
			setNewFavoritePokemonList(newFavoritePokemon)
			
		}
		getFavoritePokemonList()

	},[favoritePokemonList])

	const handleClick = (pokemonId) => {
		navigate(`/${pokemonId}`)
	}

	const removeFavorite = (e,id) => {
		e.stopPropagation()
		dispatch(removeFavoritePokemon(id))
	}



	return (
		<>
		<h1>Favorite pokemon list</h1>
		<div className="pokemonListWrapper">
			

		{newFavoritePokemonList ?
		<>
		{newFavoritePokemonList.map((pokemon)=> (
			<>
			
			<div className="pokemonList" key={pokemon.name} onClick={()=>handleClick(pokemon.url.substring(34,pokemon.url.length - 1))}>
				<div className="pokemonListImgCard" >
					
					<FavoriteIcon   className='pokemonListFavoriteIcon'  style={{ color: '#F44336' }} onClick={(e) => removeFavorite(e,pokemon.id)}/>
					
					{ < img className="pokemonListImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.substring(34,pokemon.url.length - 1)}.png`}/>
					?
						< img className="pokemonListImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.substring(34,pokemon.url.length - 1)}.png`}/>
					:
					<p>no image</p>
					}
					
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

export default FavoritePokemonList