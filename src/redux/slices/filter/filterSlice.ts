import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { FilterSliceState, SortPropertyEnum, Sort } from './types'

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности (Desc)',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    onChangeSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },

    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage)
      state.sort.sortProperty = action.payload.sort.sortProperty
      state.categoryId = Number(action.payload.categoryId)
    },
  },
})

export const {
  setCategoryId,
  onChangeSort,
  setPageCount,
  setFilters,
  setSearchValue,
} = filterSlice.actions
export default filterSlice.reducer
