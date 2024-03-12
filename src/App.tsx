import './App.css'
import './scss/app.scss'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// import NotFound from './pages/NotFound'
// import Cart from './pages/Cart'
// import FullzPizza from './pages/FullzPizza'
import MainLayout from './layouts/MainLayout'
import React, { Suspense } from 'react'

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ './pages/Cart')
) //react budet podgruzhatj etot fajl tolko esli Cart otrenderitsja - eto LAZY LOADING
const FullzPizza = React.lazy(
  () => import(/* webpackChunkName: "FullzPizza" */ './pages/FullzPizza')
)
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
)
// export const SearchContext = React.createContext() //sozdaem context i SearchContext.Provider daet znatj komponentam vnutri nego pro ego context

const App = () => {
  // const [searchValue, setSearchValue] = useState('')
  {
    /* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */
  }
  {
    /* </SearchContext.Provider> */
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <FullzPizza />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
