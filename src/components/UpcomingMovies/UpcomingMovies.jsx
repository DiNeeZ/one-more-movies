import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGetUpcomingQuery } from '../../features/api/tmdbSlice'
import { shuffleArray } from '../../utils'

import Carousel from '../Carousel/Carousel'
import CustomImage from '../CustomImage/CustomImage'
import Genres from '../Genres/Genres'
import WatchTrailer from '../WatchTrailer/WatchTrailer'
import Aspect16on9Skeleton from '../../skeletons/Aspect16on9Skeleton'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'
import imagePlaceholder from '../../images/placeholder-16x9.jpg'

import './upcoming-movies.scss'


const UpcomingMovies = () => {
  const [movies, setMovies] = useState([])
  const { data, error, isLoading, isError } = useGetUpcomingQuery()

  useEffect(() => {
    data && setMovies(shuffleArray(data).slice(0, 5))
  }, [data])

  const carouselSettings = {
    numOfItems: 1,
    arrows: false,
    dots: true,
    autoplay: 20000
  }

  const rednderUpcomingMovies = movies => movies.map(movie => (
    <div
      className='upcoming-movies__item upcoming-movie'
      key={movie.id}
    >
      <div className='upcoming-movie__image-wrapper'>
        {movie.backdropPath.image ?
          <CustomImage
            className='upcoming-movie__image'
            src={movie.backdropPath.image}
            placeholder={movie.backdropPath.preview}
            alt={movie.title} /> :
          <img src={imagePlaceholder} alt={movie.title} />
        }
      </div>
      <div className='upcoming-movie__info'>
        <div className='upcoming-movie__descr'>
          <Link className='upcoming-movie__link' to={`/movie/${movie.id}`}>
            {movie.title}
          </Link>
          <Genres genres={movie.genres} />
        </div>
        <WatchTrailer movie={movie} />
      </div>
    </div>
  ))

  const renderSkeleton = Array.from(Array(5).keys()).map(item => <Aspect16on9Skeleton key={item} />)

  if (!isLoading && isError) return <ErrorIndicator errorMsg={`${error.status} ${error.data.status_message}`} />

  return (
    <div className='upcoming-movies'>
      <h2 className='visually-hidden'>Upcoming Movies</h2>
      <Carousel settings={carouselSettings}>
        {isLoading ? renderSkeleton : rednderUpcomingMovies(movies)}
      </Carousel>
    </div>
  )
}

export default UpcomingMovies