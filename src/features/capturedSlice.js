import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  amount: 0,
//   favoritePokemons: [{id: '1', name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/', isFavorite: true}, {id: '4', name: 'charmander',  url: 'https://pokeapi.co/api/v2/pokemon/4/', isFavorite: true}]
//   favoritePokemons: [{id: '', name: '', url: '', isFavorite: false}]
  caputuredPokemons: []
};




// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const caputuredSlice = createSlice({
  name: 'caputured',
  initialState,
  reducers: {
		addCaputuredPokemon: (state, action) => {
			state.amount += 1
			const addNewCaputuredPokemon = action.payload
			state.caputuredPokemons = [...state.caputuredPokemons,addNewCaputuredPokemon]
		},
		removeCaputuredPokemon: (state, action) => {
			state.amount -= 1
			state.caputuredPokemons = state.caputuredPokemons.filter((pokemon) => pokemon.id !== action.payload)
	
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

export const { addCaputuredPokemon, removeCaputuredPokemon } = caputuredSlice.actions;

export const selectCaputured = (state) => state.caputured.caputuredPokemons;
export const selectCaputuredAmount = (state) => state.caputured.amount;



// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default caputuredSlice.reducer;
