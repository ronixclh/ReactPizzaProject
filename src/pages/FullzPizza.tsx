import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const FullzPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
  }>() //tipizacija objecta v useState
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://65c4e05ddae2304e92e38ff9.mockapi.io/pizzas/' + id
        )
        setPizza(data)
      } catch (err) {
        alert('Ошибка при получении питсы')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  if (!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="pizza_img" />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} eur</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullzPizza
