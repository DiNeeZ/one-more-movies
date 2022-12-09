import { useGetPersonCreditsQuery } from '../../features/api/tmdbSlice'
import { useParams } from 'react-router-dom'
import PersonDetails from '../../components/PersonDetails/PersonDetails'
import Filmography from '../../components/Filmography/Filmography'
import ErrorIndicator from '../../components/ErrorIndicator/ErrorIndicator'
import PhotoSkeleton from '../../skeletons/PhotoSkeleton'
import TitleSkeleton from '../../skeletons/TitleSkeleton'
import ParagraphSkeleton from '../../skeletons/ParagraphSkeleton'
import ListSkeleton from '../../skeletons/ListSkeleton'
import { useMedia } from '../../hooks'
import './person.scss'

const Person = () => {
  const { personId } = useParams()
  const { data, error, isLoading, isError, isSuccess } = useGetPersonCreditsQuery(personId)
  const mediaQuery = useMedia()

  const isMobile = mediaQuery === 'mobile' || mediaQuery === 'small-mobile'

  const renderSkeleton = () => (
    <>
      <TitleSkeleton style={{ marginBottom: '2rem' }} />
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          flexDirection: `${isMobile ? 'column' : 'row'}`,
          marginBottom: `5rem`
        }}>
        <PhotoSkeleton />
        <div>
          <ParagraphSkeleton />
          <ParagraphSkeleton />
          <ParagraphSkeleton />
        </div>
      </div>
      <ListSkeleton />
    </>
  )

  const content = (
    <>
      <div className='person__header'>
        <h1 className='person__title'>{isSuccess && data.name}</h1>
      </div>
      <PersonDetails details={data} />
      <Filmography data={data} />
    </>
  )

  if (!isLoading && isError)
    return <ErrorIndicator errorMsg={`${error.status} ${error.data.status_message}`} />

  return (
    <section className='person'>
      <div className='container person__container'>
        {isLoading ? renderSkeleton() : content}
      </div>
    </section>
  )
}

export default Person