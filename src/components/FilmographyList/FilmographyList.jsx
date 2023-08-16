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

  const getMovieYear = (movie) => {
    const date = (movie.releaseDate || movie.firstAirDate)
    if (!date) return 'Date is Unknown'
    return Number(date.split('-')[0])
  }

  const handleClick = () => setIsOpen(!isOpen)
  const handleChange = (choice) => setSortValue(choice.value)
  const sortListByParameter = (list, param) => {
    switch (param) {
      case 'title':
        return [...list].sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name))
      case 'year':
        const withYear = list.filter(movie => getMovieYear(movie) !== 'Date is Unknown')
        const withoutYear = list.filter(movie => getMovieYear(movie) === 'Date is Unknown')
        const sortedWithYear = [...withYear].sort((a, b) => getMovieYear(b) - getMovieYear(a))
        return [...sortedWithYear, ...withoutYear]
      default:
        return
    }
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
                <li className='filmography-list__item' key={`${item.id}-${title}`}>
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