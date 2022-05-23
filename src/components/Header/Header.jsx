import { useState } from 'react';
import './Header.css'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Header = () => {


	const [type, setType] = useState('');

	const handleChange = (input) => {
		setType(input);
		console.log(input);
	};

	console.log(type);


	return (
		<>
		<div className='headerWrapper'>
			<TextField id="outlined-basic" label="Sök Pokemon" variant="outlined" onChange={(e) => handleChange(e.target.value)} />
			<FormControl sx={{ width: '10rem' }}>
				<InputLabel id="demo-simple-select-label">Typ</InputLabel>
				<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={type}
				label="Typ"
				>
				<MenuItem value={'normal'}>Normal</MenuItem>
				<MenuItem value={'water'}>Vatten</MenuItem>
				<MenuItem value={'fire'}>Eld</MenuItem>
				<MenuItem value={'grass'}>Gräs</MenuItem>
				<MenuItem value={'ground'}>Mark</MenuItem>
				<MenuItem value={'pock'}>Sten</MenuItem>
				<MenuItem value={'steel'}>Stål</MenuItem>
				<MenuItem value={'ice'}>Is</MenuItem>
				<MenuItem value={'electric'}>Elektrisk</MenuItem>
				<MenuItem value={'dragon'}>Drake</MenuItem>
				<MenuItem value={'ghost'}>Spöke</MenuItem>
				<MenuItem value={'psychic'}>Psykisk</MenuItem>
				<MenuItem value={'fighting'}>Strid</MenuItem>
				<MenuItem value={'poisen'}>Gift</MenuItem>
				<MenuItem value={'bug'}>Kryp</MenuItem>
				<MenuItem value={'flying'}>Flygande</MenuItem>
				<MenuItem value={'dark'}>Mörk</MenuItem>
				<MenuItem value={'fairy'}>Fe</MenuItem>
				</Select>
			</FormControl>
			<FavoriteIcon  sx={{ fontSize: '3rem' }} className='favoriteIcon'/>
			<img className="pokeballIcon" src={`${process.env.PUBLIC_URL}/image/pokeball.png`} />
		</div>
		</>
	)
}

export default Header