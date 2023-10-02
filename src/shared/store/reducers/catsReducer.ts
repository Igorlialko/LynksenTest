import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  breeds: any[];
  isLoadingBreeds: boolean;
}

const initialState: IInitialState = {
  breeds: [],
  isLoadingBreeds: true,
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    setBreeds(state, { payload }) {
      state.breeds = payload;
    },
    setIsLoadingBreeds(state, { payload }) {
      state.isLoadingBreeds = payload;
    },
  },
});

export default catsSlice.reducer;
export const { setBreeds, setIsLoadingBreeds } = catsSlice.actions;
