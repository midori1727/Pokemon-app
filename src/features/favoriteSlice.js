import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  amount: 0,
// this form
// favoritePokemons: [{id: '', name: '', url: '', isFavorite: false}]
  favoritePokemons: []
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
		addFavoritePokemon: (state, action) => {
			state.amount += 1
			const addNewFavoritePokemon = action.payload
			state.favoritePokemons = [...state.favoritePokemons,addNewFavoritePokemon]
		},
		removeFavoritePokemon: (state, action) => {
			state.amount -= 1
			state.favoritePokemons = state.favoritePokemons.filter((pokemon) => pokemon.id !== action.payload)
	
		}
  }
});

export const { addFavoritePokemon, removeFavoritePokemon } = favoriteSlice.actions;

export const selectFavorite = (state) => state.favorite.favoritePokemons;
export const selectFavoriteAmount = (state) => state.favorite.amount;

export default favoriteSlice.reducer;
