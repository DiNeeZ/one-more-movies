import { useState } from 'react'
import { Collapse } from 'react-collapse'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import FilmographyItem from '../FilmographyItem/FilmographyItem'
import SortListSelect from '../SortListSelect/SortListSelect'
import './filmography-list.scss'

const FilmographyList = ({ list, title }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [sortValue, setSortValue] = useState('year')
  const [listRef] = useAutoAnimate()

  const handleClick = () => setIsOpen(!isOpen)
  const handleChange = (choice) => setSortValue(choice.value)

  const sortListByParameter = (list, param) => {
    if (param === 'title') {
      return [...list].sort((a, b) => a.title.localeCompare(b.title))
    }

    if (param === 'year') {
      return list.filter(listItem => listItem.releaseDate)
        .sort((a, b) => Number(b.releaseDate?.split('-')[0]) - Number(a.releaseDate?.split('-')[0]))
    }

    return null
  }
  
  if (!list.length) return null

  return (
    <div className='filmography-list'>
      <div
        tabIndex={0}
        className={`filmography-list__header list-header ${isOpen ? 'half-bordered' : ''}`}>
        <div className='list-header__heading' onClick={handleClick}>
          {isOpen ?
            <FaMinus className='list-header__icon' /> :
            <FaPlus className='list-header__icon' />}
          <h3 className='list-header__title'>
            {title}
          </h3>
        </div>
        <div className='list-header__sort' >
          <SortListSelect values={['year', 'title']} handleChange={handleChange} />
        </div>
      </div>
      <Collapse isOpened={isOpen}>
        <ul className={`filmography-list__list`} ref={listRef}>
          {
            sortListByParameter(list, sortValue)
              .map(item => (
                <li className='filmography-list__item' key={item.id}>
                  <FilmographyItem item={item} />
                </li>
              ))
          }
        </ul>
      </Collapse>
    </div >
  )
}

export default FilmographyList