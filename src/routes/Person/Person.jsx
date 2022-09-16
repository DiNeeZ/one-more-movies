import { useGetPersonCreditsQuery } from '../../features/api/tmdbSlice'
import { useParams } from 'react-router-dom'
import PersonDetails from '../../components/PersonDetails/PersonDetails'
import Filmography from '../../components/Filmography/Filmography'
import './person.scss'

const Person = () => {
  const { personId } = useParams()
  const { data, isSuccess, isLoading } = useGetPersonCreditsQuery(personId)
  if (isLoading) return <h2>Loading...</h2>
  if (isSuccess) return (
    <section className='person'>
      <div className='container person__container'>
        <div className='person__header'>
          <h1 className='person__title'>{data.name}</h1>
        </div>
        <PersonDetails details={data} />
        <Filmography data={data} />
      </div>
    </section>
  )
}

export default Person