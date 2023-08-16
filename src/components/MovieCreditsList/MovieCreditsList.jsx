import { Link } from 'react-router-dom'
import CustomImage from '../CustomImage/CustomImage'
import imagePlaceholder from '../../images/person-placeholder.jpg'
import './movie-credits-list.scss'

const MovieCreditsList = ({ title, list }) => {

  const titles = {
    director: 'Directed by',
    writer: `Writer${(list.length > 1) ? 's' : ''}`,
    producer: 'Produced by',
    directorOfPhotography: `Director${(list.length > 1) ? 's' : ''} of Photography`,
    composer: 'Music by',
    stunts: 'Stunts by',
    cast: 'Cast'
  }

  const renderList = list.map(item => {
    const keySuffix = `${(item.job || item.character).toLowerCase().replace(/[^a-z]/gi, '')}`
    const itemKey = `${item.id}-${keySuffix}`

    return (
      <li key={itemKey} className='credits-list__item credits-item'>
        <Link to={`/person/${item.id}`} className='credits-item__link'>
          <div className='credits-item__image-wrapper'>
            {
              item.profilePath.image ? (
                <CustomImage
                  className='credits-item__image'
                  src={item.profilePath.image}
                  placeholder={imagePlaceholder}
                  alt={item.name} />
              ) : (
                <img
                  className='credits-item__image credits-item__image--placeholder'
                  src={imagePlaceholder}
                  alt={item.name} />
              )
            }
          </div>
          <div className='credits-item__descr'>
            <div className='credits-item__title-wrapper'>
              <h3 className='credits-item__title'>{item.name}</h3>
              {titles[title] === 'Cast' && <small className='credits-item__character'>{item.character}</small>}
            </div>
            <p className='credits-item__job'>{item?.job}</p>
          </div>
        </Link>
      </li>
    )
  })

  if (!list.length) return null

  return (
    <div className='credits-list'>
      <div className='credits-list__header'>
        <h3 className='credits-list__title'>{titles[title]}</h3>
      </div>
      <ul className='credits-list__list'>
        {renderList}
      </ul>
    </div>
  )
}

export default MovieCreditsList