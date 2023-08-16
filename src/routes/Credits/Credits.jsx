import { useParams } from 'react-router-dom'
import { useGetMovieCreditsQuery } from '../../features/api/tmdbSlice'
import MovieCreditsList from '../../components/MovieCreditsList/MovieCreditsList'
import MovieCreditsInfo from '../../components/MovieCreditsInfo/MovieCreditsInfo'
import TitleSkeleton from '../../skeletons/TitleSkeleton'
import PersonItemSkeleton from '../../skeletons/PersonItemSkeleton'
import './credits.scss'

const Credits = () => {
  const { movieId, mediaType } = useParams()
  const { data: credits, isSuccess, isLoading } = useGetMovieCreditsQuery({ id: movieId, mediaType })

  const renderCredits = credits => Object.entries(credits).map(([key, value]) => (
    <MovieCreditsList key={key} title={key} list={value} />
  ))
  const renderCreditsSkeleton = (
    <>
      <TitleSkeleton />
      {
        Array.from(Array(5).keys()).map(item => <PersonItemSkeleton key={item} />)
      }
    </>
  )

  return (
    <section className='credits'>
      <div className='container credits__container'>
        <MovieCreditsInfo />
        <div className='credits__content'>
          <h2 className='visually-hidden'>{isSuccess && credits.title} credits</h2>
          {isLoading ? renderCreditsSkeleton : renderCredits(credits)}
        </div>
      </div>
    </section>
  )
}

export default Credits