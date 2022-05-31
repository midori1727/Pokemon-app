import './FrontPage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectFavoriteAmount, selectFavorite, removeFavoritePokemon, addFavoritePokemon } from "../../features/favoriteSlice";
import { selectCollectedAmount} from "../../features/collectedSlice";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';


const FrontPage = () => {

	const [ currentPokemonPage, setCurrentPokemonPage ] = useState('https://pokeapi.co/api/v2/pokemon/')
	const [ previousPokemonPage, setpreviousPokemonPage ] = useState('')
	const [ nextPokemonPage, setNextPokemonPage ] = useState('')
	const [ pokemonList, setPokemonList ] = useState('')
	const [ selectType, setSelectType ] = useState('');
	const [ inputPokemon, setInputPokemon ] = useState('')
	const navigate = useNavigate ();
	const dispatch = useDispatch()
	const favoritePokemonAmount = useSelector(selectFavoriteAmount)
	const selectFavoritePokemons = useSelector(selectFavorite)
	const collectedPokemonAmount = useSelector(selectCollectedAmount)



	useEffect(() => {

		try {
			const getPokemonData = async () => {

				if(inputPokemon) {
					const response = await axios.get((`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`))
					const fileteredPokemons = response.data.results.filter(pokemon => pokemon.name.toLowerCase().includes(inputPokemon.toLowerCase()));
					setPokemonList(fileteredPokemons)
					setpreviousPokemonPage('')
					setNextPokemonPage('')
					
				} else {
					const response = await axios.get((currentPokemonPage))
					if(response.data.results){
						setPokemonList(response.data.results)
					}else {
						const newPokemonList = response.data.pokemon.map((pokemon) => {
							return pokemon.pokemon
						})
						setPokemonList(newPokemonList)
					}
		
					if(response.data.previous){
						setpreviousPokemonPage(response.data.previous)
					} else {
						setpreviousPokemonPage('')
					}
		
					if(response.data.next){
						setNextPokemonPage(response.data.next)
					} else {
						setNextPokemonPage('')
					}

				}
			}
			getPokemonData()
		} catch(error) {
			if(error.response.status === 404) {
				console.log(error)
			}
			console.log(error)
		}
	
	},[currentPokemonPage,inputPokemon,selectFavoritePokemons])
	
	const handleClick = (pokemonId) => {
		navigate(`/${pokemonId}`)
	}

	const goToPreviousPage = () => {
		setCurrentPokemonPage(previousPokemonPage)
	}

	const goToNextPage = () => {
		setCurrentPokemonPage(nextPokemonPage)
	}

	const handleSelectChange = async (select) => {
		setCurrentPokemonPage(`https://pokeapi.co/api/v2/type/${select}`)
		setSelectType(select)
		setInputPokemon('')
	}


	const handleInputChange =  (e) => {
		setInputPokemon(e.target.value)
		setSelectType('')
	}

	const navigateToFavorite = () => {
		navigate('/favorite')
	}

	const navigateToCollected = () => {
		navigate('/collected')
	}
	
	const toggleFavorite = (e,id, name, url) => {
		e.stopPropagation()
		// if same pokemon in selectFavoritePokemons is clicked, return index Number(which are over 0)
		const  findSamePokemon  = selectFavoritePokemons.findIndex((pokemon) => {
			return pokemon.name === name;
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
		<div className='headerWrapper'>

			<TextField id="outlined-search" label="Search Pokémon" type="search" onChange={handleInputChange} value={inputPokemon}/>	
			
			<FormControl sx={{ width: '10rem' }}>
				<InputLabel id="demo-simple-select-label">Type</InputLabel>
				<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={selectType}
				label="Typ"
				onChange={(e) => handleSelectChange(e.target.value)}
				>
				<MenuItem value={'normal'}>Normal</MenuItem>
				<MenuItem value={'water'}>Water</MenuItem>
				<MenuItem value={'fire'}>Fire</MenuItem>
				<MenuItem value={'grass'}>Grass</MenuItem>
				<MenuItem value={'ground'}>Ground</MenuItem>
				<MenuItem value={'rock'}>Rock</MenuItem>
				<MenuItem value={'steel'}>Steel</MenuItem>
				<MenuItem value={'ice'}>Ice</MenuItem>
				<MenuItem value={'electric'}>Electric</MenuItem>
				<MenuItem value={'dragon'}>Dragon</MenuItem>
				<MenuItem value={'ghost'}>Ghost</MenuItem>
				<MenuItem value={'psychic'}>Psychic</MenuItem>
				<MenuItem value={'fighting'}>Fighting</MenuItem>
				<MenuItem value={'poison'}>Poison</MenuItem>
				<MenuItem value={'bug'}>Bug</MenuItem>
				<MenuItem value={'flying'}>Flying</MenuItem>
				<MenuItem value={'dark'}>Dark</MenuItem>
				<MenuItem value={'fairy'}>Fairy</MenuItem>
				</Select>
			</FormControl>
			<Tooltip
			title={<h1 style={{ fontSize: "1rem"}}>favorite list</h1>}
			arrow
			>
				<Badge badgeContent={favoritePokemonAmount} color="secondary">
					<FavoriteIcon  sx={{ fontSize: '3rem' }} className='favoriteIcon' onClick={navigateToFavorite}/>
				</Badge>
			</Tooltip>

			<Tooltip 
			title={<h1 style={{ fontSize: "1rem" }}>Collection</h1>}
			arrow
			>
				<Badge badgeContent={collectedPokemonAmount} color="secondary">
					<img className="pokeballIcon" src={`${process.env.PUBLIC_URL}/image/pokeball.png`} onClick={navigateToCollected}/>
				</Badge>
			</Tooltip>
		</div>
		<div className="pokemonListWrapper">
			

		{pokemonList ?
		<>
		{pokemonList.map((pokemon)=> (
			<>
			<div className="pokemonList" key={pokemon.name} onClick={()=>handleClick(pokemon.url.substring(34,pokemon.url.length - 1))}>
				<div className="pokemonListImgCard" >
					<IconButton 
					aria-label="favorite"
					className='pokemonListFavoriteIcon' 
					onClick={(e)=> toggleFavorite(e, pokemon.url.substring(34,pokemon.url.length - 1), pokemon.name, pokemon.url)}
					>
						<FavoriteIcon
						className='pokemonListFavoriteIcon'
						style={{ color: favoritePokemonList.includes(pokemon.name) ? '#F44336' : 'gray' }}
						/>
					</IconButton>
					
					{/* { < img className="pokemonListImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.substring(34,pokemon.url.length - 1)}.png`}/>
					?
						< img className="pokemonListImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.substring(34,pokemon.url.length - 1)}.png`}/>
					:
					<p>no image</p>
					} */}

					<img
					className="pokemonListImg"
					alt={pokemon.name}
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.substring(34,pokemon.url.length - 1)}.png`}
					// onError={(e) => e.target.src = noimage} 
					onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/image/no-image.png`} 
					/>
					
					
					<p className="pokemonListName" >{pokemon.name}</p>
				</div>
			</div>
			</>

		))}
		</>
		: <LoadingAnimation />
		}
		</div>

		{previousPokemonPage &&
		<>
		<Button
		variant="outlined"
		className='previousButton'
		sx={"border-color:rgba(0, 0, 0, 0.87);; color: rgba(0, 0, 0, 0.87);"}
		onClick={goToPreviousPage}>
			Previous
		</Button>
		</>
		}
		{nextPokemonPage &&
		<>
		<Button
		variant="outlined"
		className='nextButton'
		sx={"border-color:rgba(0, 0, 0, 0.87);; color: rgba(0, 0, 0, 0.87);"}
		onClick={goToNextPage}>
			Next
		</Button>
		</>
		}
		</>
	)
};

export default FrontPage;