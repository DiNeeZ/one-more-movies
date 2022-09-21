import { useParams } from 'react-router-dom'
import { useGetSimilarQuery } from '../../features/api/tmdbSlice'

import MediaCard from '../MediaCard/MediaCard'
import CardSkeleton from '../../skeletons/CardSkeleton'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'

import './similar.scss'

const SimilarMoviesAndShows = () => {
  const { id, mediaType } = useParams()
  const { data: similar, error, isSuccess, isLoading, isFetching, isError } = useGetSimilarQuery({ id, mediaType })

  const renderSimilar = (similar) =>
    similar.map(item => <MediaCard key={item.id} media={item} />)
  const renderSkeleton = Array.from(Array(10).keys()).map(item => <CardSkeleton key={item} />)

  if (isError) return <ErrorIndicator errorMsg={`${error.status} ${error.data.status_message}`} />

  if (isSuccess && !similar.length) return null

  return (
    <div className='similar'>
      <h3 className='similar__title'>More like this (kinda)...</h3>
      <div className='similar__inner'>
        {(isLoading || isFetching) ? renderSkeleton : renderSimilar(similar)}
      </div>
    </div>
  )
}

export default SimilarMoviesAndShows