import { Link, useParams } from 'react-router-dom'
import { useGetMovieCreditsQuery } from '../../features/api/tmdbSlice'
import PersonThumbnail from '../PersonThumbnail/PersonThumbnail'
import ActorThumbnailSkeleton from '../../skeletons/ActorThumbnailSkeleton'
import './details-cast.scss'

const DetailsCast = () => {
  const { id, mediaType } = useParams()
  const { data, isLoading, isFetching } = useGetMovieCreditsQuery({ id, mediaType })

  const renderActors = cast => cast.map(actor => (
    <li key={actor.id} className='details-cast__item'>
      <PersonThumbnail person={actor} />
    </li>
  ))

  const renderSkeleton = Array.from(Array(5).keys()).map(item => <ActorThumbnailSkeleton key={item} />)

  return (
    <div className='details-cast'>
      <h3 className='details-cast__title'>Actors</h3>
      <ul className='details-cast__list'>
        {(isLoading || isFetching) ? renderSkeleton : renderActors(data.cast.slice(0, 5))}
        <li className='details-cast__item'>
          <Link to={`/credits/${mediaType}/${id}`} className='details-cast__btn'>View All</Link>
        </li>
      </ul>
    </div>

  )
}

export default DetailsCast