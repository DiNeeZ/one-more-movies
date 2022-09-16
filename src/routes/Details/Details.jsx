import CustomImage from '../../components/CustomImage/CustomImage'
import ImageGallery from '../../components/ImageGallery/ImageGallery'
import MovieDescr from '../../components/MovieDescr/MovieDescr'
import DetailsCast from '../../components/DetailsCast/DetailsCast'
import SimilarMoviesAndShows from '../../components/SimilarMoviesAndShows/SimilarMoviesAndSows'
import TitleSkeleton from '../../skeletons/TitleSkeleton'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetMovieQuery } from '../../features/api/tmdbSlice'
import { useLocalStorage } from '../../hooks'

import ParagraphSkeleton from '../../skeletons/ParagraphSkeleton'
import MovieDescrSkeleton from '../../skeletons/MovieDescrSkeleton'

import './details.scss'


const Details = () => {
  const [viewedList, setViewedList] = useLocalStorage('recentlyViewed', [])
  const { id, mediaType } = useParams()
  const { data, isSuccess, isLoading } = useGetMovieQuery({ id, mediaType })

  useEffect(() => {
    if (data) {
      const isInStorage = viewedList.some(item => item.id === data.id)
      !isInStorage && setViewedList([data, ...viewedList].slice(0, 6))
    }
  }, [data, viewedList, setViewedList])

  return (
    <section
      className='details-page'>
      <div className='details-page__bg'>
        {isSuccess && (
          <CustomImage
            className='details-page__bg-image'
            src={data.backdropPath.image}
            placeholder={data.backdropPath.preview}
            alt={data.title || data.name}
            aria-hidden={true}
          />
        )}
      </div>
      <div className='container details-page__container details'>
        <div className='details__left'>
          {isLoading ? <MovieDescrSkeleton /> : <MovieDescr movie={data} />}
        </div>
        <div className='details__right'>
          <h1 className='details__title'>{isLoading ? <TitleSkeleton /> : (data.title || data.name)}</h1>
          <div>
            <h2 className='visually-hidden'>{isSuccess && (data.title || data.name)} description</h2>
            <div className='details__descr'>
              <div className='details__descr-left'>
                <p className='details__overview'>{isLoading ? <ParagraphSkeleton /> : data.overview}</p>
                <ImageGallery className='details__image-gallery' />
                <SimilarMoviesAndShows />
              </div>
              <DetailsCast />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Details