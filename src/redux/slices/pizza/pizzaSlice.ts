import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { CartItem } from '../cart/types'
import { fetchPizzas } from './asyncActions'
import { PizzaSliceState, Status } from './types'

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = Status.SUCCESS
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR
        state.items = []
      }) //extrareducers otnositsja bolwe k asinhronnim actionam i ego nado pisatj vot tak
  },
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
