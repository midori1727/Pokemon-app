import './SinglePokemon.css'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useEffect, useState } from "react";
import Animation from '../Animation/Animation'
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation'

import { useDispatch, useSelector } from "react-redux";
import { selectCaputured, selectCaputuredAmount, addCaputuredPokemon, removeCaputuredPokemon } from "../../features/capturedSlice";


import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
  } from "recharts";
import { useListbox } from '@mui/material/node_modules/@mui/base';



const SinglePokemon = () => {

	const [selectedPokemon, setSelectedPokemon] = useState([])
	const [selectedPokemonId, setSelectedPokemonId] = useState('')
	const [selectedPokemonsJapaneseName, setSelectedPokemonsJapaneseName] = useState('')
	const [pokemonStatsData, setPokemonStatsData] = useState([])
	// const [evolution, setEvolution] =useState([])
	const [ backgroundColor, setBackgroundColor] =  useState('')
	const [evolutionChainUrl, setEvolutionChainUrl] = useState('')
	const [evolutionFirst, setEvolutionFirst] =useState('')
	const [evolutionSecond, setEvolutionSecond] =useState([])
	const [evolutionThird, setEvolutionThird] =useState([])

	// テスト
	const [ captured, setCaptured ] = useState(false)
	const [ isAlreadyCaptured, setIsAlreadyCaptured ] = useState(false)
	// const [ totalAverage, setTotalAverage ] = useState(false)
	const dispatch = useDispatch()
	const capturedPokemonAmount = useSelector(selectCaputuredAmount)
	const selectcapturedPokemons = useSelector(selectCaputured)
  // テスト
	

	const params = useParams()
	const navigate = useNavigate()
	const pokemonId = params.id


	 // テスト
	// console.log(capturedPokemonAmount);
	// console.log(selectcapturedPokemons);
	console.log(isAlreadyCaptured);
	// console.log('selectedPokemon',selectedPokemon);
	// console.log('selectedPokemonId',selectedPokemonId);
	// console.log('selectedPokemon.name',selectedPokemon.name);
	// console.log('selectedPokemon.species.url',selectedPokemon.species.url);
	console.log(selectcapturedPokemons);
	console.log(selectcapturedPokemons.map((caputuredPokemons) => {
		return caputuredPokemons.name.includes(selectedPokemon)
	}));
	console.log(selectedPokemon.name);
	// capturedPokemonNames.includes(selectedPokemon)
	 // テスト

	// grid template
	const Item = styled(Paper)(({ theme }) => ({
		padding: theme.spacing(1),
		textAlign: 'center',
	  }));
	// grid template

	 

	// MUI tab component
	function TabPanel(props) {
		const { children, value, index, ...other } = props;
	  
		return (
		  <div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		  >
			{value === index && (
			  <Box sx={{ p: 3 }}>
				<Typography>{children}</Typography>
			  </Box>
			)}
		  </div>
		);
	}
	  
	TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	};
	  
	function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
	}

	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	// MUI tab component

	console.log('selectedPokemonId',selectedPokemonId);
	console.log('selectedPokemonId',typeof(selectedPokemonId));
	console.log('pokemonId',pokemonId);
	console.log('pokemonId',typeof(pokemonId));

	
	// get pokemon information
	useEffect (() => {

		try {
			const getSelectedPokemon = async () => {
				const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
				// const response3 = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}/`)
				console.log('response',response);
				// console.log('evolution',response3);
				setSelectedPokemon(response.data)
				setSelectedPokemonId(response.data.id)

				
				const pokemonStatsDataArray = [];
				let len = response.data.stats.length;
				for (let i = 0; i < len; i++) {
					pokemonStatsDataArray.push({
						name: response.data.stats[i].stat.name,
						// pv: response.data.stats[i].base_stat
						point: response.data.stats[i].base_stat
					});
				}
				setPokemonStatsData(pokemonStatsDataArray)


				// set background color 
				switch(response.data.types[0].type.name) {
					case 'normal':
						// setBackgroundColor('rgb(238, 183, 80)')
						// setBackgroundColor('rgb(255, 223, 133)')
						setBackgroundColor('rgb(255, 209, 83)')
						
						break;
					case 'water':
						setBackgroundColor('#609FB5')
						break;
					case 'fire':
						setBackgroundColor('#FB6C6C')
						break;
					case 'grass':
						setBackgroundColor('#48D0B0')
						break;
					case 'ground':
						setBackgroundColor('#B1736C')
						break;
					case 'rock':
						setBackgroundColor('#D7D9DE')
						break;
					case 'steel':
						setBackgroundColor('#CCCCDE')
						break;
					case 'ice':
						// setBackgroundColor('#7FCCEC')
						setBackgroundColor('rgb(158, 214, 228)')
						break;
					case 'electric':
						setBackgroundColor('#F9BE00')
						break;	
					case 'dragon':
						// setBackgroundColor('#48D0B0')
						setBackgroundColor('rgb(32, 202, 131)')
						
						break;
					case 'ghost':
						setBackgroundColor('rgb(202, 212, 209)')
						break;
					case 'psychic':
						setBackgroundColor('#9B7FA6')
						break;
					case 'fighting':
						setBackgroundColor('#D6B591')
						break;
					case 'poison':
						setBackgroundColor('#7C538C')
						break;
					case 'bug':
						setBackgroundColor('#C3CE75')
						break;
					case 'flying':
						setBackgroundColor('#BAB0D5')
						break;
					case 'dark':
						setBackgroundColor('#333333')
						break;
					case 'fairy':
						setBackgroundColor('#FCD8E8')
						break;

				}


	
				// check and set true if selected pokemon is already in captured pokemon useList.
				// if(selectcapturedPokemons) {
				// 	const capturedPokemonIds = selectcapturedPokemons.map((caputuredPokemons) => {
				// 		return caputuredPokemons.id
				// 	})
				// 	let newId = Number(pokemonId)
				// 	setIsAlreadyCaptured(capturedPokemonIds.includes(newId))
				// }
				
				if(selectcapturedPokemons) {
					const capturedPokemonNames = selectcapturedPokemons.map((caputuredPokemons) => {
						return caputuredPokemons.name
					})
					// let newName = Number(pokemonId)
					console.log(capturedPokemonNames.includes(response.data.name));
					setIsAlreadyCaptured(capturedPokemonNames.includes(response.data.name))
				}
				
				



			}
			getSelectedPokemon()

		} catch(error) {
				console.log(error);
		}

	},[pokemonId, capturedPokemonAmount])

	// get pokemon japanese name
	useEffect(() => {
		try {
			const getSelectedPokemonJapaneseName = async () => {
				
				const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
				// console.log('japan', response.data.evolution_chain.url);
				setSelectedPokemonsJapaneseName(response.data.names[0].name);
				setEvolutionChainUrl(response.data.evolution_chain.url)
			
			}
			getSelectedPokemonJapaneseName()
			
		} catch(error) {
				console.log(error);
		}

	},[pokemonId, capturedPokemonAmount])



	useEffect(() => {
		try {
			const getEvolutionChain = async () => {
				
				const response = await axios.get(evolutionChainUrl);
				const pokemonChain = response.data.chain
				console.log('evolution', pokemonChain);
				
				
				// デフォルトのポケモンをセット
				setEvolutionFirst(pokemonChain.species.url)


				let evolutionSecondArray = []
				let evolutionThirddArray = []
				// ２つ目の進化の数に対してもし複数なら,複数をevolutionSecondに、１つなら１つをevolutionSecondに
				for(let i = 0; i < pokemonChain.evolves_to.length; i++ ) {
						evolutionSecondArray.push(pokemonChain.evolves_to[i].species.url)
						if(pokemonChain.evolves_to.length > 0 && pokemonChain.evolves_to[i].evolves_to.length) {
							for(let j = 0; j < pokemonChain.evolves_to[i].evolves_to.length; j++){
								evolutionThirddArray.push(pokemonChain.evolves_to[i].evolves_to[j].species.url)
							}
						}
				}

				setEvolutionSecond(evolutionSecondArray)
				setEvolutionThird(evolutionThirddArray)

			}
			getEvolutionChain()
			
		} catch(error) {
				console.log(error);
		}
	},[evolutionChainUrl,pokemonId, capturedPokemonAmount])

	const handleClick = (newPokemonId) => {
		navigate(`/${newPokemonId}`)
	}

	


	const getPokemon = (id,name,url) => {
		
		let total = 0
		let probability

		pokemonStatsData.map((data) => {
			total =+ data.point
		})

		if(total > 80){
			probability = 10
		} else if(total > 50) {
			probability = 20
		}  else if(total > 30) {
			probability = 40
		}  else if(total > 10) {
			probability = 60
		}

		let result = Math.random() < probability / 100

		setCaptured(result)

		if(captured) {
			dispatch(addCaputuredPokemon({id,name,url}))
		}

		if(captured) {
			alert('ポケモンゲット！')
		} else {
			alert('ポケモンは逃げた・・・')
		}

	}


	const releasePokemon = (id) => {
		dispatch(removeCaputuredPokemon(id))
	}
	

	// テスト
	// const newFavoritePokemon = favoritePokemonList.filter(favoritePokemon => 
	// 	allPokemonList.filter(allPokemon =>  allPokemon.name === favoritePokemon.name).length > 0);

		// selectcapturedPokemons.filter((caputuredPokemons) => {
		// 	// console.log(caputuredPokemons.id === selectedPokemonId);
		// 	setIsAlreadyCaptured(caputuredPokemons.id === selectedPokemonId)
		// })

	

	return (
		<>
		{selectedPokemon  
		?
		<div className="singlePokemonWrapper">
			<div className='singlePokemonCard' S
			style={{  background: backgroundColor}}>
			
				
				{/* <img
				className="goBackIcon"
				src={`${process.env.PUBLIC_URL}/image/arrow_back.svg`}
				onClick={() => navigate(-1)}
				/> */}

				<h1 className='singlePokemonName'>{selectedPokemon.name}</h1>
				{selectedPokemonsJapaneseName && <h2 className='singlePokemonJapaneseName'>{selectedPokemonsJapaneseName}</h2>}
				

				<div className='singlePokemonImgButton'>

					<img className="singlePokemonImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemonId}.png`}/>


					{isAlreadyCaptured ?

					<Button
					className='releasePokemonButton'
					variant="outlined"
					color="secondary"
					startIcon={<img className="pokeballIcon"
					src={`${process.env.PUBLIC_URL}/image/pokeball.png`} />}
					// onClick={() => releasePokemon(selectedPokemonId)}
					onClick={() => releasePokemon(pokemonId)}
					>
						Release this Pokémon
					</Button>
					:
					<Button
					className='getPokemonButton'
					variant="outlined"
					color="secondary"
					startIcon={<img className="pokeballIcon"
					src={`${process.env.PUBLIC_URL}/image/pokeball.png`} />}
					onClick={() => getPokemon(pokemonId, selectedPokemon.name,
						//  selectedPokemon.species.url
						selectedPokemon.location_area_encounters.substring(34,selectedPokemon.length - 11)
						 )}
					>
						Get this Pokémon
					</Button>

					}
					{/* <Button
					className='getPokemonButton'
					variant="outlined"
					color="secondary"
					startIcon={<img className="pokeballIcon"
					src={`${process.env.PUBLIC_URL}/image/pokeball.png`} />}
					onClick={() => getPokemon(selectedPokemonId, selectedPokemon.name, selectedPokemon.species.url)}
					>
						Get this Pokémon
					</Button> */}

				</div>

				<div className='singlePokemonInformationTab'>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
						<Tab label="About" {...a11yProps(0)} />
						<Tab label="Base stats" {...a11yProps(1)} />
						<Tab label="Evolution" {...a11yProps(2)} />
					</Tabs>
				</Box>

				<TabPanel value={value} index={0}>
					<Box sx={{ flexGrow: 1 }}>
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<Item>Type:</Item>
							</Grid>
							<Grid item xs={9}>
								<Item>{selectedPokemon.types?.length === 1 ? <span className='singlepokemonDescription'>{selectedPokemon.types[0].type.name}</span> : selectedPokemon.types?.map((obj) => (<span className='space singlepokemonDescription'>{obj.type.name}</span>))}</Item>
							</Grid>
							<Grid item xs={3}>
								<Item>Abilities:</Item>
							</Grid>
							<Grid item xs={9}>
								<Item>{selectedPokemon.abilities?.length === 1 ? <span className='singlepokemonDescription'>{selectedPokemon.abilities[0].ability.name}</span> : selectedPokemon.abilities?.map((obj) => (<span className='space singlepokemonDescription'>{obj.ability.name}</span>))}</Item>
							</Grid>
							<Grid item xs={3}>
								<Item>Weight:</Item>
							</Grid>
							<Grid item xs={9}>
								<Item><span className='singlepokemonDescription'>{selectedPokemon.weight/10} kg</span></Item>
							</Grid>
							<Grid item xs={3}>
								<Item>Height:</Item>
							</Grid>
							<Grid item xs={9}>
								<Item><span className='singlepokemonDescription'>{selectedPokemon.height*10} cm</span></Item>
							</Grid>
						</Grid>
					</Box>
				</TabPanel>

				<TabPanel value={value} index={1}>
					<ResponsiveContainer width="95%" height={400}>
						<BarChart
						data={pokemonStatsData}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5
						}}
						barSize={20}
						>
						<XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
						<YAxis  type="number" domain={[0, 100]}/>
						<Tooltip />
						<Legend />
						<CartesianGrid strokeDasharray="3 3" />
						<Bar dataKey="point" fill="#8884d8" background={{ fill: "#eee" }} />
						</BarChart>
					</ResponsiveContainer>

				</TabPanel>

				<TabPanel value={value} index={2}>

				
				<img
				className="evolutionImage"
				alt="pokemon" 
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionFirst.substring(42,evolutionFirst.length - 1)}.png`}
				onClick={()=>handleClick(evolutionFirst.substring(42,evolutionFirst.length - 1))}
				/>


				{evolutionSecond &&
				evolutionSecond.map((pokemon) => (
					<img
					className="evolutionImage"
					alt="pokemon"
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.substring(42,pokemon.length - 1)}.png`}
					onClick={()=>handleClick(pokemon.substring(42,pokemon.length - 1))}
					/>
				))
				}


				{evolutionThird && 
				evolutionThird.map((pokemon) => (
					<img
					className="evolutionImage"
					alt="pokemon"
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.substring(42,pokemon.length - 1)}.png`}
					onClick={()=>handleClick(pokemon.substring(42,pokemon.length - 1))}
					/>
				))
				}
				
					
				</TabPanel>

				</div>
				
			</div>
		</div>
		
		: <LoadingAnimation />
		}
		
		</>
	)
}

export default SinglePokemon