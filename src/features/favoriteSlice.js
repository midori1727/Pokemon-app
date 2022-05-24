import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

const initialState = {
  amount: 0,
//   favoritePokemons: [{id: '1', name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/', isFavorite: true}, {id: '4', name: 'charmander',  url: 'https://pokeapi.co/api/v2/pokemon/4/', isFavorite: true}]
//   favoritePokemons: [{id: '', name: '', url: '', isFavorite: false}]
  favoritePokemons: []
};




// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

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

		
	
  },
 
//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(incrementAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.value += action.payload;
//       });
//   },
});

export const { addFavoritePokemon, removeFavoritePokemon } = favoriteSlice.actions;

export const selectFavorite = (state) => state.favorite.favoritePokemons;
export const selectFavoriteAmount = (state) => state.favorite.amount;



// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default favoriteSlice.reducer;
