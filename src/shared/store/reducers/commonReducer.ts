import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  isLoadingPercentage: boolean;
  isShowContentPercentage: boolean;
}

const initialState: IInitialState = {
  isLoadingPercentage: true,
  isShowContentPercentage: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsLoadingPercentage(state, { payload }) {
      if (state.isLoadingPercentage) {
        state.isLoadingPercentage = payload;
      }
    },
    setIsShowContentPercentage(state, { payload }) {
      state.isShowContentPercentage = payload;
    },
  },
});

export default commonSlice.reducer;
export const { setIsLoadingPercentage, setIsShowContentPercentage } = commonSlice.actions;
