import { useSelector } from 'react-redux'
import { getPerson } from '../../features/persons/personSlice'
import PersonDetails from '../PersonDetails/PersonDetails'
import Filmography from '../Filmography/Filmography'
import './person.scss'
import { useGetPersonCreditsQuery } from '../../features/api/tmdbSlice'
import { useParams } from 'react-router-dom'

const Person = () => {
  const person = useSelector(getPerson)
  const { personId } = useParams()
  // console.log(personId)
  const { data, isSuccess } = useGetPersonCreditsQuery(personId)

  // if (isSuccess) console.log(data)

  return (
    <section className='person'>
      <div className='container person__container'>
        <div className='person__header'>
          <h1 className='person__title'>{person.details.name}</h1>
        </div>
        <PersonDetails details={person.details} />
        <Filmography credits={person.credits} />
      </div>
    </section>
  )
}

export default Person