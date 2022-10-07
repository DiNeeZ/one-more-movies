import { useGetPersonCreditsQuery } from '../../features/api/tmdbSlice'
import { useParams } from 'react-router-dom'
import PersonDetails from '../../components/PersonDetails/PersonDetails'
import Filmography from '../../components/Filmography/Filmography'
import ErrorIndicator from '../../components/ErrorIndicator/ErrorIndicator'
import PersonSkeleton from '../../skeletons/PersonSkeleton'
import './person.scss'

const Person = () => {
  const { personId } = useParams()
  const { data, error, isLoading, isError, isSuccess } = useGetPersonCreditsQuery(personId)

  const content = (
    <>
      <div className='person__header'>
        <h1 className='person__title'>{isSuccess && data.name}</h1>
      </div>
      <PersonDetails details={data} />
      <Filmography data={data} />
    </>
  )

  if (!isLoading && isError) return <ErrorIndicator errorMsg={`${error.status} ${error.data.status_message}`} />

  return (
    <section className='person'>
      <div className='container person__container'>
        {isLoading ? <PersonSkeleton /> : content}
      </div>
    </section>
  )
}

export default Person