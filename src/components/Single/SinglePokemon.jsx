import './SinglePokemon.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Modal from 'react-modal';
import { selectCollected, selectCollectedAmount, addCollectedPokemon, removeCollectedPokemon } from "../../features/collectedSlice";
import Animation from '../Animation/Animation'
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";


const SinglePokemon = () => {

	const [ selectedPokemon, setSelectedPokemon] = useState([])
	const [ selectedPokemonsJapaneseName, setSelectedPokemonsJapaneseName ] = useState('')
	const [ pokemonStatsData, setPokemonStatsData ] = useState([])
	const [ backgroundColor, setBackgroundColor ] =  useState('')
	const [ evolutionChainUrl, setEvolutionChainUrl ] = useState('')
	const [ evolutionFirst, setEvolutionFirst ] =useState('')
	const [ evolutionSecond, setEvolutionSecond ] =useState([])
	const [ evolutionThird, setEvolutionThird ] =useState([])
	const [ collected, setCollected ] = useState(false)
	const [ isAlreadyCollected, setIsAlreadyCollected ] = useState(false)
	const collectedPokemonAmount = useSelector(selectCollectedAmount)
	const selectcollectedPokemons = useSelector(selectCollected)
	const [ catching, setCatching ] = useState(false)
	const [ isCollectedShowModal, setIsCollectedShowModal ] = useState(false);
	const [ isFailedShowModal, setIsFailedShowModal ] = useState(false);
	const params = useParams()
	const pokemonId = params.id
	const navigate = useNavigate()
	const dispatch = useDispatch()
	


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

	

	
	// get pokemon information
	useEffect (() => {

		try {
			const getSelectedPokemon = async () => {
				const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
				console.log('response',response);
				setSelectedPokemon(response.data)
			

				const pokemonStatsDataArray = [];
				let len = response.data.stats.length;
				for (let i = 0; i < len; i++) {
					pokemonStatsDataArray.push({
						name: response.data.stats[i].stat.name,
						point: response.data.stats[i].base_stat
					});
				}
				setPokemonStatsData(pokemonStatsDataArray)


				// set background color 
				switch(response.data.types[0].type.name) {
					case 'normal':
						setBackgroundColor('#fbe095')
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
						setBackgroundColor('#9ed6e4')
						break;
					case 'electric':
						setBackgroundColor('#F9BE00')
						break;	
					case 'dragon':
						setBackgroundColor('#20ca83')
						break;
					case 'ghost':
						setBackgroundColor('#cad4d1')
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

	
				// check if pokemon är already in collection
				if(selectcollectedPokemons) {
					const collectedPokemonNames = selectcollectedPokemons.map((collectedPokemons) => {
						return collectedPokemons.name
					})
					
					console.log(collectedPokemonNames.includes(response.data.name));
					setIsAlreadyCollected(collectedPokemonNames.includes(response.data.name))
				}

			}
			getSelectedPokemon()

		} catch(error) {
				console.log(error);
		}

	},[pokemonId, collectedPokemonAmount])

	// get pokemon japanese name
	useEffect(() => {
		try {
			const getSelectedPokemonJapaneseName = async () => {
				
				const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
				setSelectedPokemonsJapaneseName(response.data.names[0].name);
				setEvolutionChainUrl(response.data.evolution_chain.url)
			
			}
			getSelectedPokemonJapaneseName()
			
		} catch(error) {
				console.log(error);
		}

	},[pokemonId, collectedPokemonAmount])



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
	},[evolutionChainUrl, pokemonId, collectedPokemonAmount])


	const handleClick = (newPokemonId) => {
		navigate(`/${newPokemonId}`)
	}


	const catchPokemon = (id, name, url) => {
		
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
		}  else if(total > 20) {
			probability = 60
		}

		let result = Math.random() < probability / 100

		setCollected(result)
		setCatching(true)
	
		setTimeout(() => {
			setCatching(false)
			if(collected) {
				setIsCollectedShowModal(true)
			} else {
				setIsFailedShowModal(true)
			}
		}, 1 * 1000)

		if(collected) {
			dispatch(addCollectedPokemon({id, name, url}))
		}
	}

	const releasePokemon = (id) => {
		dispatch(removeCollectedPokemon(id))
	}
	

	return (
		<>
		{selectedPokemon && !catching
		?
		<div className="singlePokemonWrapper">
			<div className='singlePokemonCard' S
			style={{  background: backgroundColor}}>
			
				<h1 className='singlePokemonName'>{selectedPokemon.name}</h1>
				{selectedPokemonsJapaneseName && <h2 className='singlePokemonJapaneseName'>{selectedPokemonsJapaneseName}</h2>}
				
				<div className='singlePokemonImgButton'>

					<img
					className="singlePokemonImg"
					alt={selectedPokemon.name}
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
					onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/image/no-image.png`}
					/>

					{isAlreadyCollected ?

					<Button
					className='releasePokemonButton'
					variant="outlined"
					color="secondary"
					startIcon={<img className="pokeballIcon" src={`${process.env.PUBLIC_URL}/image/pokeball.png`} />}
					onClick={() => releasePokemon(pokemonId)}
					>
						Release this Pokémon
					</Button>
					:
					<Button
					className='catchPokemonButton'
					variant="outlined"
					color="secondary"
					startIcon={<img className="pokeballIcon" src={`${process.env.PUBLIC_URL}/image/pokeball.png`} />}
					onClick={() => catchPokemon(pokemonId, selectedPokemon.name, selectedPokemon.location_area_encounters.substring(34,selectedPokemon.length - 11))}
					>
						Catch this Pokémon
					</Button>
					}
					
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
					onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/image/no-image.png`} 
					/>

					{evolutionSecond &&
					evolutionSecond.map((pokemon) => (
						<img
						className="evolutionImage"
						alt="pokemon"
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.substring(42,pokemon.length - 1)}.png`}
						onClick={()=>handleClick(pokemon.substring(42,pokemon.length - 1))}
						onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/image/no-image.png`} 
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
						onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/image/no-image.png`} 
						/>
					))
					}
					</TabPanel>
				</div>
			</div>
		</div>

	    :  catching ? <Animation />
		
		: <LoadingAnimation />
		}

		< Modal
		isOpen={isCollectedShowModal}
				onRequestClose={() => setIsCollectedShowModal(false)}
				overlayClassName={{
					base: "overlay-base",
					afterOpen: "overlay-after",
					beforeClose: "overlay-before"
					}}
					className={{
					base: "content-base",
					afterOpen: "content-after",
					beforeClose: "content-before"
					}}
					closeTimeoutMS={500}>
			<p className='modalTitle'>You've caught the Pokémon!</p>
			
			<Button
			className='modalBackButton'
			variant="outlined"
			color="secondary"
			onClick={() => setIsCollectedShowModal(false)} >
				Back to the Pokémon details
			</Button>

			<Button
			className='modalToCollectedButton'
			variant="outlined"
			color="secondary"
			onClick={() => {navigate('/collected'); setIsCollectedShowModal(false) }} >
				Go to Collection
			</Button>	
		</Modal>


		< Modal isOpen={isFailedShowModal}
				onRequestClose={() => setIsFailedShowModal(false)}
				overlayClassName={{
					base: "overlay-base",
					afterOpen: "overlay-after",
					beforeClose: "overlay-before"
					}}
					className={{
					base: "content-base",
					afterOpen: "content-after-run-away",
					beforeClose: "content-before"
					}}
					closeTimeoutMS={500}>
			<p className='modalTitle'>The Pokémon ran away...</p>
			
			<Button
			className='modalBackButton'
			variant="outlined"
			color="secondary"
			onClick={() => setIsFailedShowModal(false) }>
				Back to the Pokémon details
			</Button>
		</Modal>
		
		</>
	)
}

export default SinglePokemon