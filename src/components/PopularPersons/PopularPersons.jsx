import { Link } from 'react-router-dom'
import { useGetPopularPersonsQuery } from '../../features/api/tmdbSlice'

import CustomImage from '../CustomImage/CustomImage'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'
import PopularPersonSkeleton from '../../skeletons/PopularPersonSkeleton'
import imagePlaceholder from '../../images/person-placeholder.jpg'

import './popular-persons.scss'

const PopularPersons = () => {
  const { data, error, isLoading, isError } = useGetPopularPersonsQuery()

  if (isError) return <ErrorIndicator errorMsg={`${error.status} ${error.data.status_message}`} />

  return (
    <div className='popular-persons'>
      <h2 className='popular-persons__title'><span>Popular</span> People</h2>
      <ul className='popular-persons__list'>
        {isLoading ?
          Array.from(Array(10).keys()).map(item => (
            <li className='popular-persons__item' key={item}>
              <PopularPersonSkeleton />
            </li>
          ))
          :
          data.slice(0, 10).map(person => (
            <li key={person.id} className='popular-persons__item'>
              <Link to={`/person/${person.id}`} className='popular-person'>
                {
                  person.profilePath.image ? (
                    <CustomImage
                      className='popular-person__image'
                      src={person.profilePath.image}
                      placeholder={imagePlaceholder}
                      alt={person.name} />
                  ) : (
                    <img
                      className='popular-person__image popular-person__image--placeholder'
                      src={imagePlaceholder}
                      alt={person.name} />
                  )
                }
                <div className='popular-person__info person-info'>
                  <div className='person-info__name'>{person.name}</div>
                  <div className='person-info__role'>{person.knownForDepartment}</div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default PopularPersons