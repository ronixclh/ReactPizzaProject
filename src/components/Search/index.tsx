import React, { useCallback, useContext, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import { setSearchValue } from '../../redux/slices/filter/filterSlice'

import styles from './Search.module.scss'
import { useDispatch } from 'react-redux'

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>('')
  // const { searchValue, setSearchValue } = useContext(SearchContext) //destrukturiruem iz contexta nawi stejti

  const inputRef = useRef<HTMLInputElement>(null) //useRef delaet ssilku na input ili na ljuboj drugoj element

  //debounce delaetsja dlja togo chtobi otpravltj zapros posle togo kak polzovatelj zakonchil vvod v poisk polnostju cherez 1000ms
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 1000),
    []
  ) //useCallback rabotaet takzhe kak useEffect, tolko ono vozvrashaet funkciju, a useEffect tolko ejo vizivaet. UseCllback sozdajet funckiju tolko odin raz i pomeshaet v dannom sluchae v permennuju i potom on ee ne peresozdaet
  //eta funkcija sozdalasj odin raz pri pervom rendere s pomoshju useCallback i potom ona ne peresozdajetsja

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  } //tipizacija eventa

  const onClickClear = () => {
    setValue('')
    dispatch(setSearchValue(''))
    inputRef.current?.focus()
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
      <input
        ref={inputRef}
        value={value} //dlja kontroliruemogo  inputa dobavljaem value
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск питсы..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  )
}

export default Search
