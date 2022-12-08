import { useState } from 'react'
import { Collapse } from 'react-collapse'
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs'
import { useGetTrendingQuery } from '../../features/api/tmdbSlice'

import MediaCard from '../MediaCard/MediaCard'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'
import CardSkeleton from '../../skeletons/CardSkeleton'

import './listing-other.scss'


const Listing = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data, error, isLoading, isSuccess, isError } = useGetTrendingQuery(type)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const renderList = data => data.map((mediaItem, idx) => {
    if (idx >= 5) return null
    return (
      <li key={mediaItem.id}>
        <MediaCard media={mediaItem} descr />
      </li>
    )
  })

  const renderSkeletons = Array.from(Array(5).keys()).map(item => (
    <li key={item}>
      <CardSkeleton />
    </li>
  ))

  if (!isLoading && isError) return <ErrorIndicator errorMsg={`${error.status} ${error.data.status_message}`} />

  return (
    <section className='listing'>
      <h2 className='listing__title'>
        <span>Popular </span>
        {type === 'movie' ? 'Movies' : 'TV Shows'}
      </h2>
      <ul className='listing__list listing__list--visible'>
        {isLoading ? renderSkeletons : renderList(data)}
      </ul>
      <Collapse isOpened={isOpen}>
        <ul className='listing__list'>
          {isSuccess &&
            data.map((mediaItem, idx) => {
              if (idx < 5) return null
              return (
                <li key={mediaItem.id}>
                  <MediaCard media={mediaItem} descr />
                </li>)
            })
          }
        </ul>
      </Collapse>
      <button className={`listing__btn`} onClick={handleClick}>
        <div className='listing__btn-inner'>
          {!isOpen ? 'See more' : 'See less'}
          {!isOpen ?
            <BsChevronCompactDown className='listing__btn-icon listing__btn-icon--down' />
            :
            <BsChevronCompactUp className='listing__btn-icon listing__btn-icon--up' />}
        </div>
      </button>
    </section>

  )
}

export default Listing