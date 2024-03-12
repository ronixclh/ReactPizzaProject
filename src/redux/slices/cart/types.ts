export type CartItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
} //type tipiziruet chto ugodno, interface tipiziruet tolko object

export interface CartSliceState {
  totalPrice: number
  items: CartItem[]
}
