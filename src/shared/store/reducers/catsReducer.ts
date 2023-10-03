import { createSlice } from '@reduxjs/toolkit';

import { CatsBreed, CatsBreedImage } from './types';

interface IInitialState {
  breeds: CatsBreed[];
  images: {
    [key: string]: CatsBreedImage[];
  };
  activeSlide: CatsBreed | null;
}

const initialState: IInitialState = {
  breeds: [],
  images: {},
  activeSlide: null,
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    setBreeds(state, { payload }) {
      state.breeds = payload;
    },
    setImages(state, { payload }) {
      state.images = {
        ...state.images,
        ...payload,
      };
    },
    setActiveSlide(state, { payload }) {
      state.activeSlide = payload;
    },
  },
});

export default catsSlice.reducer;
export const { setBreeds, setImages, setActiveSlide } = catsSlice.actions;
