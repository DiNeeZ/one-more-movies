import Genres from '../Genres/Genres'
import { GoPrimitiveDot } from 'react-icons/go'
import { FaStar, FaUser } from 'react-icons/fa'
import { transformDate } from '../../utils'
import './movie-descr.scss'
import CustomImage from '../CustomImage/CustomImage'
import WatchTrailer from '../WatchTrailer/WatchTrailer'

const MovieTime = ({ details }) => {
  const hours = Math.ceil(details.runtime / 60)
  const minutes = details.runtime % 60

  return (
    <>
      {transformDate(details.releaseDate)}
      <GoPrimitiveDot />
      {`${hours}h ${minutes}m`}
    </>
  )
}

const TvTime = ({ details }) => {
  const start = details.firstAirDate.split('-')[0]
  const finishYear = details.lastAirDate ? details.lastAirDate.split('-')[0] : ''
  const finish = details.status === 'Ended' ? finishYear + ' (finished)' : '...'

  return (
    <>
      TV Siries
      <GoPrimitiveDot />
      {`${start} - ${finish}`}
      <GoPrimitiveDot />
      ep. ~ {`${details.episodeRunTime}m`}
    </>
  )
}

const MovieDescr = ({ movie }) => {
  return (
    <div className='movie-descr'>
      <CustomImage
        className='movie-descr__image'
        src={movie.posterPath.image}
        placeholder={movie.posterPath.preview}
        alt={movie.title} />
      <div className='movie-descr__info'>
        <p className='movie-descr__rating'>
          <span className='movie-descr__rating-item'>
            <FaStar className='movie-descr__icon movie-descr__icon--star' />
            {movie.voteAverage.toFixed(1)} / 10
          </span>
          <span className='movie-descr__rating-item'>
            <FaUser className='movie-descr__icon movie-descr__icon--user' />
            {movie.voteCount}
          </span>
        </p>
        <Genres genres={movie.genres} />
        <p className='movie-descr__time'>
          {movie.mediaType === 'tv' ?
            <TvTime details={movie} /> :
            <MovieTime details={movie} />}
        </p>
        {movie.mediaType === 'tv' && (
          <p className='movie-descr__episodes'>
            <span>Seasons: {movie.numberOfSeasons}</span>
            <GoPrimitiveDot />
            <span>Episodes: {movie.numberOfEpisodes}</span>
          </p>
        )}
        {(movie.budget > 0 && movie.revenue > 0) && (
          <p className='movie-descr__money'>
            <span><b>Budget:</b> {movie.budget.toLocaleString()} $</span>
            <GoPrimitiveDot />
            <span><b>Revenue:</b> {movie.revenue.toLocaleString()} $</span>
          </p>
        )}
        {movie.tagline && (
          <p className='movie-descr__tagline'>"{movie.tagline}"</p>
        )}
      </div>
      <WatchTrailer movie={movie} />
    </div>
  )
}

export default MovieDescr