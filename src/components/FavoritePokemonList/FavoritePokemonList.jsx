import './FavoritePokemonList.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { selectFavorite } from '../../features/favoriteSlice'
import { removeFavoritePokemon } from '../../features/favoriteSlice'
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation'
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';


const FavoritePokemonList = () => {

	const [ newFavoritePokemonList, setNewFavoritePokemonList ] = useState([])
	const favoritePokemonList = useSelector(selectFavorite)
	const navigate = useNavigate()
	const dispatch = useDispatch()


	useEffect(() => {

		try {
			const getFavoritePokemonList = async () => {
				const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
				const allPokemonList = response.data.results
	
				// find pokemons that is in favorite list
				const newFavoritePokemon = favoritePokemonList.filter(favoritePokemon => 
					allPokemonList.filter(allPokemon => allPokemon.name === favoritePokemon.name).length > 0);
	
				setNewFavoritePokemonList(newFavoritePokemon)
				
			}

			getFavoritePokemonList()

		} catch (error) {
			console.log(error);
		}

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
		<h1 className='favoriteTitle'>My favorites</h1>
		<div className="pokemonListWrapper">
			

		{newFavoritePokemonList ?
		<>
		{newFavoritePokemonList.map((pokemon)=> (
			<>
			
			<div
			className="pokemonList"
			key={pokemon.name}
			onClick={()=>handleClick(pokemon.id)}
			>
				<div className="pokemonListImgCard" >
					
					<IconButton
					aria-label="favorite"
					className='pokemonListFavoriteIcon'
					onClick={(e) => removeFavorite(e,pokemon.id)}>
						<FavoriteIcon
						className='pokemonListFavoriteIcon'
						style={{ color: '#F44336' }}
						/>
					</IconButton>
					
					< img className="pokemonListImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}/>
					
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