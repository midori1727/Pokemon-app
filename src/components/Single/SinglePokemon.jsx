import './SinglePokemon.css'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation'
import { type } from '@testing-library/user-event/dist/type';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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





const SinglePokemon = () => {

	const [selectedPokemon, setSelectedPokemon] = useState([])
	const [selectedPokemonId, setSelectedPokemonId] = useState('')
	const [selectedPokemonsJapaneseName, setSelectedPokemonsJapaneseName] = useState('')
	const [pokemonStatsData, setPokemonStatsData] = useState([])
	// const [evolution, setEvolution] =useState([])

	const params = useParams()
	const pokemonId = params.id

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

	
	useEffect (() => {

		try {
			const getSelectedPokemon = async () => {
				const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
				// const response2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
				// const response3 = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}/`)
				console.log('response',response);
				// console.log('evolution',response3);
				// console.log('response2',response2);
				setSelectedPokemon(response.data)
				setSelectedPokemonId(response.data.id)
				// setSelectedPokemonId(response2.data.id)
				// setSelectedPokemonsJapaneseName(response2.data.names[0].name)
				console.log(response.data.types.length);
				
				const pokemonStatsDataArray = [];
				let len = response.data.stats.length;
				for (let i = 0; i < len; i++) {
					pokemonStatsDataArray.push({
						name: response.data.stats[i].stat.name,
						pv: response.data.stats[i].base_stat
					});
				}
				setPokemonStatsData(pokemonStatsDataArray)
			}
			getSelectedPokemon()
		} catch(error) {
				console.log(error);
			
		}
		
		// getSelectedPokemon()
	},[])


	

	return (
		<>
		{selectedPokemon  
		// selectedPokemonsJapaneseName
		 ?
		<div className='singlePokemonCard'>
			<h1 className='singlePokemonName'>{selectedPokemon.name}</h1>
			{/* <h2>{selectedPokemonsJapaneseName}</h2> */}

			<img className="singlePokemonImg" alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemonId}.png`}/>


			<div className='singlePokemonInformationTab'>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="About" {...a11yProps(0)} />
					<Tab label="Base stats" {...a11yProps(1)} />
					<Tab label="Item Three" {...a11yProps(2)} />
				</Tabs>
			</Box>

			<TabPanel value={value} index={0}>
				{/* <div className='discriptionSection'><div className='descriptionTitle'>Type: </div>
				<div className='discriptionItem'>{selectedPokemon.types?.length === 1 ? <p>{selectedPokemon.types[0].type.name}</p> : selectedPokemon.types?.map((obj) => (<p>{obj.type.name}</p>))}</div></div>
				<div className='discriptionSection'><div className='descriptionTitle'>Abilities:</div>
				<div className='discriptionItem'>{selectedPokemon.abilities?.length === 1 ? <p>{selectedPokemon.abilities[0].ability.name}</p> : selectedPokemon.abilities?.map((obj) => (<p >{obj.ability.name}</p>))}</div></div>
				<div className='discriptionSection'><div className='descriptionTitle'>Weight:</div><p>{selectedPokemon.weight/10} kg</p> </div>
				<div className='discriptionSection'><div className='descriptionTitle'>Height:</div><p>{selectedPokemon.height*10} cm</p> </div> */}
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={3}>
							<Item>Type:</Item>
						</Grid>
						<Grid item xs={9}>
							<Item>{selectedPokemon.types?.length === 1 ?selectedPokemon.types[0].type.name : selectedPokemon.types?.map((obj) => (<span className='space'>{obj.type.name}</span>))}</Item>
						</Grid>
						<Grid item xs={3}>
							<Item>Abilities:</Item>
						</Grid>
						<Grid item xs={9}>
							<Item>{selectedPokemon.abilities?.length === 1 ? selectedPokemon.abilities[0].ability.name : selectedPokemon.abilities?.map((obj) => (<span className='space'>{obj.ability.name}</span>))}</Item>
						</Grid>
						<Grid item xs={3}>
							<Item>Weight:</Item>
						</Grid>
						<Grid item xs={9}>
							<Item>{selectedPokemon.weight/10} kg</Item>
						</Grid>
						<Grid item xs={3}>
							<Item>Height:</Item>
						</Grid>
						<Grid item xs={9}>
							<Item>{selectedPokemon.height*10} cm</Item>
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
					<Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
					</BarChart>
				</ResponsiveContainer>

			</TabPanel>

			<TabPanel value={value} index={2}>
				{/* <Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={3}>
							<Item>Type:</Item>
						</Grid>
						<Grid item xs={9}>
							<Item>{selectedPokemon.types?.length === 1 ?selectedPokemon.types[0].type.name : selectedPokemon.types?.map((obj) => (<span className='space'>{obj.type.name}</span>))}</Item>
						</Grid>
						<Grid item xs={3}>
							<Item>Abilities:</Item>
						</Grid>
						<Grid item xs={9}>
							<Item>{selectedPokemon.abilities?.length === 1 ? selectedPokemon.abilities[0].ability.name : selectedPokemon.abilities?.map((obj) => (<span className='space'>{obj.ability.name}</span>))}</Item>
						</Grid>
						<Grid item xs={3}>
							<Item>Weight:</Item>
						</Grid>
						<Grid item xs={9}>
							<Item>{selectedPokemon.weight/10} kg</Item>
						</Grid>
						<Grid item xs={3}>
							<Item>Height:</Item>
						</Grid>
						<Grid item xs={9}>
							<Item>{selectedPokemon.height*10} cm</Item>
						</Grid>
					</Grid>
				</Box> */}
			</TabPanel>

			</div>
			
		</div>
		
		: <LoadingAnimation />
		}
		
		</>
	)
}

export default SinglePokemon