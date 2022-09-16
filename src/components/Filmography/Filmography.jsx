import { capitalizeFirstLetter } from '../../utils'
import FilmographyList from '../FilmographyList/FilmographyList'
import './filmography.scss'

const Filmography = ({ data }) => {
  const actorOrActress = ['Actor (possibly Actress)', 'Actress', 'Actor']

  return (
    <div className='filmography'>
      <h2 className='filmography__title'>Filmography</h2>
      <div className='filmography__container'>
        {
          Object.entries(data.combinedCredits).map(([key, value]) => {
            if (key === 'cast') key = actorOrActress[data.gender]
            
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