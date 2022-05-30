import './CollectedPokemonList.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { selectCollected } from '../../features/collectedSlice'
import { selectFavorite, addFavoritePokemon, removeFavoritePokemon } from '../../features/favoriteSlice'
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation'

import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';



const CollectedPokemonList = () => {

	const [ newCollectedPokemonList, setNewColledcedPokemonList ] = useState([])
	const collectedPokemonList = useSelector(selectCollected)
	const selectFavoritePokemons = useSelector(selectFavorite)
	const navigate = useNavigate()
	const dispatch = useDispatch()



	useEffect(() => {

		try {
			const getCollectedPokemonList = async () => {
				const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
				console.log(response.data.results)
				const allPokemonList = response.data.results
	
				const newCollectedPokemon = collectedPokemonList.filter(collectedPokemon => 
					allPokemonList.filter(allPokemon => allPokemon.name === collectedPokemon.name).length > 0);
	
				console.log(newCollectedPokemon);
				setNewColledcedPokemonList(newCollectedPokemon)
			}
			getCollectedPokemonList()

		} catch (error) {
			console.log(error);
		}

	},[collectedPokemonList])

	const handleClick = (pokemonId) => {
		navigate(`/${pokemonId}`)
	}


	const toggleFavorite = (e,id, name, url) => {
		e.stopPropagation()
		// if same pokemon is clicked, return index Number(which are over 0)
		const  findSamePokemon  = selectFavoritePokemons.findIndex(function(element){
			return element.name === name;
		});

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


	return (
		<>
		<h1>Your collection</h1>
		<div className="pokemonListWrapper">
			

		{newCollectedPokemonList ?
		<>
		{newCollectedPokemonList.map((pokemon)=> (
			<>
			
			<div
			className="pokemonList"
			key={pokemon.name} 
			onClick = {() => handleClick(pokemon.id)}
			>
				<div className="pokemonListImgCard" >
					
					<IconButton
					aria-label="favorite"
					className='pokemonListFavoriteIcon' 
					onClick={(e)=> toggleFavorite(e, pokemon.id, pokemon.name, pokemon.url)}
					>
						<FavoriteIcon
						className='pokemonListFavoriteIcon'  
						style={{ color: favoritePokemonList.includes(pokemon.name) ? '#F44336' : 'gray' }}
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

export default CollectedPokemonList

