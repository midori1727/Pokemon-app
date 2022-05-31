import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  amount: 0,
//   favoritePokemons: [{id: '1', name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/', isFavorite: true}, {id: '4', name: 'charmander',  url: 'https://pokeapi.co/api/v2/pokemon/4/', isFavorite: true}]
//   favoritePokemons: [{id: '', name: '', url: '', isFavorite: false}]
	collectedPokemons: [],
};



export const collectedSlice = createSlice({
  name: 'collected',
  initialState,
  reducers: {
		addCollectedPokemon: (state, action) => {
			state.amount += 1
			const addNewCollectedPokemon = action.payload
			state.collectedPokemons = [...state.collectedPokemons,addNewCollectedPokemon]
		},
		removeCollectedPokemon: (state, action) => {
			state.amount -= 1
			state.collectedPokemons = state.collectedPokemons.filter((pokemon) => pokemon.id !== action.payload)
		}

  },

});

export const { addCollectedPokemon, removeCollectedPokemon } = collectedSlice.actions;

export const selectCollected = (state) => state.collected.collectedPokemons;
export const selectCollectedAmount = (state) => state.collected.amount;

export default collectedSlice.reducer;
