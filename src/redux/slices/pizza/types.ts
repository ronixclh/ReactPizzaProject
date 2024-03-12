export type FetchPizzasArgs = Record<string, string> //tipizacija celogo objekta -> key: string, value: string, vmesto togo chtobi pisatj chto kazhdij params eto string

export type SearchPizzaParams = {
  order: string
  sortBy: string
  category: string
  search: string
  currentPage: number
}

export type Pizza = {
  id: string
  title: string
  price: number
  imageUrl: string
  types: number[]
  sizes: number[]
  count: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[]
  status: Status
}
