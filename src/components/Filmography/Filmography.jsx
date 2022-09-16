import { useSelector } from 'react-redux'
import { getPerson } from '../../features/persons/personSlice'
import { capitalizeFirstLetter } from '../../utils'
import FilmographyList from '../FilmographyList/FilmographyList'
import './filmography.scss'

const Filmography = ({ credits }) => {
  const { details: { gender } } = useSelector(getPerson)
  const actorOrActress = ['Actor (possibly Actress)', 'Actress', 'Actor']

  return (
    <div className='filmography'>
      <h2 className='filmography__title'>Filmography</h2>
      <div className='filmography__container'>
        {
          Object.entries(credits).map(([key, value]) => {
            if (key === 'cast') {
              key = actorOrActress[gender]
            }
            return (<FilmographyList
              key={key}
              list={value}
              title={capitalizeFirstLetter(key)} />)
          })
        }
      </div>
    </div>
  )
}

export default Filmography