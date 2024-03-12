import React, { useRef } from 'react'
import qs from 'qs'
import { Link, useNavigate } from 'react-router-dom'

import { sortingCategories } from '../components/Sort'
import {
  PizzaBlock,
  Skeleton,
  Pagination,
  Sort,
  Categories,
} from '../components'

import { useEffect, useContext } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
  setCategoryId,
  setPageCount,
  setFilters,
} from '../redux/slices/filter/filterSlice'

import { RootState, useAppDispatch } from '../redux/store'
import { fetchPizzas } from '../redux/slices/pizza/asyncActions'
import { SearchPizzaParams } from '../redux/slices/pizza/types'

const Home: React.FC = () => {
  // const { searchValue } = useContext(SearchContext)

  const categoryId = useSelector(
    (state: RootState) => state.filterSlice.categoryId
  )

  const searchValue = useSelector(
    (state: RootState) => state.filterSlice.searchValue
  )

  const sortProperty = useSelector(
    (state: RootState) => state.filterSlice.sort.sortProperty
  )

  const currentPage = useSelector(
    (state: RootState) => state.filterSlice.currentPage
  )

  const pizzas = useSelector((state: RootState) => state.pizzaSlice.items)

  const status = useSelector((state: RootState) => state.pizzaSlice.status)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const onChangePage = (number: number) => {
    dispatch(setPageCount(number))
  }

  const itemsPizzas = pizzas
    // .filter((obj) => {
    //   return obj.title.toLowerCase().includes(searchValue)
    // })
    .map((pizza: any, index: number) => <PizzaBlock {...pizza} key={index} />)
  //filtracija po vvedennim dannim inputa

  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  )) //fejkovij massiv iz 10  i v nego zakidivaem 10 skeletonov

  const getPizzas = async () => {
    const order = sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : '' //filtracija s pomoshju mockapi

    // await axios
    //   .get(
    //     `https://165c4e05ddae2304e92e38ff9.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    //   )
    //   .then((res) => {
    //     setPizzas(res.data)
    //     setIsLoading(false)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    )
  }

  //esli bil pervij render to zaprawivaem picci
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }

    window.scrollTo(0, 0) //scroll vverh pri useEffect

    isSearch.current = false
  }, [categoryId, sortProperty, searchValue, currentPage])

  //Esli  bil pervij render, to proverjaem parametri i sohranjaem v reduxe
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams

      const sort = sortingCategories.find(
        (obj) => obj.sortProperty === params.sortBy
      )

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortingCategories[0],
        })
      )
      isSearch.current = true
    }
  }, [])

  //Esli izmenili parametri i bil pervij render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortProperty,
        categoryId,
        currentPage,
      })

      navigate(`?${queryString}`) //vwivanije parametrov v ssilku
    }

    isMounted.current = true
  }, [categoryId, sortProperty, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i: number) => dispatch(setCategoryId(i))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все питсы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : itemsPizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home
