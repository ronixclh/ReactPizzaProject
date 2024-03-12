import React from 'react'
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'

type CategoriesProps = {
  value: number
  onClickCategory: (i: number) => void //tipizacija funkcii
} //tipizacija propsov

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
    const categories = [
      'Все',
      'Мясные',
      'Вегетарианская',
      'Гриль',
      'Острые',
      'Закрытые',
    ]

    useWhyDidYouUpdate('Categories', { value, onClickCategory })

    const renderedCategories = categories.map((category, index) => {
      return (
        <li
          className={value === index ? 'active' : ''}
          onClick={() => onClickCategory(index)}
          key={index}
        >
          {category}
        </li>
      )
    })

    return (
      <div className="categories">
        <ul>{renderedCategories}</ul>
      </div>
    )
  }
)

export default Categories
