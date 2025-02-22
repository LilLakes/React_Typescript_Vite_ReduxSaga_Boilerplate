import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    //Saga actions
    incrementAsync: (state) => state,
    decrementAsync: (state) => state,
  },
});

export const { increment, decrement, incrementAsync, decrementAsync } = counterSlice.actions;
export default counterSlice.reducer;