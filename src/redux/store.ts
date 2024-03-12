import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filter/filterSlice'
import cartSlice from './slices/cart/cartSlice'
import pizzaSlice from './slices/pizza/pizzaSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: { filterSlice, cartSlice, pizzaSlice },
}) //sozdanije hraniliwja redux

export type RootState = ReturnType<typeof store.getState> //vse stejti kotorije tipizirovani budut hranitsja tut

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
