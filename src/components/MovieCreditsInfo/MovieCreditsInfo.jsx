import { Link, useParams } from 'react-router-dom'
import CustomImage from '../CustomImage/CustomImage'
import movieImagePlaceholder from '../../images/movie-item-placeholder.png'
import MovieCreditsInfoSkeleton from '../../skeletons/MovieCreditsInfoSkeleton'
import MovieCreditsInfoSkeletonCol from '../../skeletons/MovieCreditsInfoSkeletonCol'
import { useGetMovieQuery } from '../../features/api/tmdbSlice'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'
import { useMedia } from '../../hooks'
import './movie-credits-info.scss'


const MovieCreditsInfo = () => {
  const { movieId, mediaType } = useParams()
  const { data: movie, error, isLoading, isError } = useGetMovieQuery({ id: movieId, mediaType })
  const mediaQuery = useMedia()

  const renderSkeleton = mediaQuery === 'mobile' || mediaQuery === 'small-mobile' ?
    <MovieCreditsInfoSkeletonCol /> : <MovieCreditsInfoSkeleton />

  if (!isLoading && isError) return <ErrorIndicator errorMsg={`${error.status} ${error.data.status_message}`} />

  return (
    <div className='movie-credits-info'>
      {isLoading ? renderSkeleton : (
        <>
          <CustomImage
            className='movie-credits-info__image'
            src={movie.posterPath.image}
            placeholder={movieImagePlaceholder}
            alt={movie.title || movie.name}
          />
          <div className='movie-credits-info__descr'>
            <div className='movie-credits-info__name'>
              <Link to={`/${movie.mediaType}/${movie.id}`} className='movie-credits-info__name-link'>
                {movie.title || movie.name}
              </Link>
              <span className='movie-credits-info__name-year'>
                ({(movie.releaseDate || movie.firstAirDate).split('-')[0]})
              </span>
            </div>
            <h1 className='movie-credits-info__title'>Full Cast and Crew</h1>
          </div>
        </>
      )}
    </div>
  )
}

export default MovieCreditsInfo