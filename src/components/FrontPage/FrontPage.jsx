import axios from "axios";
import { useEffect, useState } from "react";
import { useLinkClickHandler, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './FrontPage.css';
// import Heiader from '../Header/Header'
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {addFavoritePokemon} from '../../features/favoriteSlice'
import { selectFavoriteAmount,selectFavorite } from "../../features/favoriteSlice";

import _array from 'lodash/array'
import { CandlestickChartRounded, ContentCutOutlined } from "@mui/icons-material";


const FrontPage = () => {

	const [currentPokemonPage, setCurrentPokemonPage] = useState('https://pokeapi.co/api/v2/pokemon/')
	const [previousPokemonPage, setpreviousPokemonPage] = useState('')
	const [nextPokemonPage, setNextPokemonPage] = useState('')
	const [pokemonList, setPokemonList] = useState('')
	const navigate = useNavigate ();

	const [selectType, setSelectType] = useState('');
	const [inputPokemon, setInputPokemon] = useState('')
	const dispatch = useDispatch()
	const favoritePokemonAmount = useSelector(selectFavoriteAmount)
	const selectFavoritePokemons = useSelector(selectFavorite)

	const [favColor, setFavColor] = useState("gray");
	const [isFavorite, setIsFavorite] = useState(false);




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
					console.log(response);
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
				console.log('error');
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

	const handleChange = async (select) => {
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
	
	const addFavorite = (e,id, name, url, boolean) => {
		e.stopPropagation()
		// if same pokemon is clicked, return index Number(which are over 0)
		const  findSamePokemon  = selectFavoritePokemons.findIndex(function(element){
			return element.name === name;
		});
		
		if(findSamePokemon >= 0) {
			return
			// (ここに後ほどremoveポケモンを記入)
		} else {
			dispatch(addFavoritePokemon({id,name,url,boolean}))
		}
	}

	

	  
	
	
	return (

		<>
		{/* <Header /> */}
		<div className='headerWrapper'>

			<TextField id="outlined-search" label="Sök Pokemon" type="search" onChange={handleInputChange} value={inputPokemon}/>	
			
			<FormControl sx={{ width: '10rem' }}>
				<InputLabel id="demo-simple-select-label">Typ</InputLabel>
				<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={selectType}
				label="Typ"
				onChange={(e) => handleChange(e.target.value)}
				>
				<MenuItem value={'normal'}>Normal</MenuItem>
				<MenuItem value={'water'}>Vatten</MenuItem>
				<MenuItem value={'fire'}>Eld</MenuItem>
				<MenuItem value={'grass'}>Gräs</MenuItem>
				<MenuItem value={'ground'}>Mark</MenuItem>
				<MenuItem value={'rock'}>Sten</MenuItem>
				<MenuItem value={'steel'}>Stål</MenuItem>
				<MenuItem value={'ice'}>Is</MenuItem>
				<MenuItem value={'electric'}>Elektrisk</MenuItem>
				<MenuItem value={'dragon'}>Drake</MenuItem>
				<MenuItem value={'ghost'}>Spöke</MenuItem>
				<MenuItem value={'psychic'}>Psykisk</MenuItem>
				<MenuItem value={'fighting'}>Strid</MenuItem>
				<MenuItem value={'poison'}>Gift</MenuItem>
				<MenuItem value={'bug'}>Kryp</MenuItem>
				<MenuItem value={'flying'}>Flygande</MenuItem>
				<MenuItem value={'dark'}>Mörk</MenuItem>
				<MenuItem value={'fairy'}>Fe</MenuItem>
				</Select>
			</FormControl>
			<Tooltip title="favorite" arrow>
				<Badge badgeContent={favoritePokemonAmount} color="secondary">
					<FavoriteIcon  sx={{ fontSize: '3rem' }} className='favoriteIcon' onClick={navigateToFavorite}/>
				</Badge>
			</Tooltip>
			<Tooltip title="Fångat" arrow>
				<Badge badgeContent={4} color="secondary">
					<img className="pokeballIcon" src={`${process.env.PUBLIC_URL}/image/pokeball.png`} />
				</Badge>
			</Tooltip>
		</div>
		<div className="pokemonListWrapper">
			

		{pokemonList ?
		<>
		{pokemonList.map((pokemon)=> (
			<>
			{/* send pokemon id */}
			<div className="pokemonList" key={pokemon.name} onClick={()=>handleClick(pokemon.url.substring(34,pokemon.url.length - 1))}>
				<div className="pokemonListImgCard" >
					{/* {<img src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}/> ?
					<img className="pokemonListImg" alt="pokemon" src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}/>
					:
					<p>NO IMAGE</p>
				} */}
					{/* <img className="pokemonListImg" alt="pokemon" src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}/> */}
					{/* <img className="pokemonListImg" alt="pokemon" src={`https://img.pokemondb.net/artwork/${pokemon.url.substring(34,pokemon.url.length - 1)}.jpg`}/> */}
					
					<FavoriteIcon   className='pokemonListFavoriteIcon'
					onClick={(e)=> addFavorite(e,pokemon.url.substring(34,pokemon.url.length - 1), pokemon.name, pokemon.url, true)}
					style={{ color: favColor }}
					 />
					
					{ < img className="pokemonListImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.substring(34,pokemon.url.length - 1)}.png`}/>
					?
						< img className="pokemonListImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.substring(34,pokemon.url.length - 1)}.png`}/>
					:
					<p>no image</p>
					}
					{/* < img className="pokemonListImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.substring(34,pokemon.url.length - 1)}.png`}/> */}


					{/* < img className="pokemonListImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.substring(34,pokemon.url.length - 1)}.png`}/> */}
			
					
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
		<Button variant="outlined" onClick={goToPreviousPage}>Previous</Button>
		</>
		}
		{nextPokemonPage &&
		<>
		<Button variant="outlined" onClick={goToNextPage}>Next</Button>
		</>
		}
		</>
	)
};

export default FrontPage;