import { Link } from 'react-router-dom'
import CustomImage from '../CustomImage/CustomImage'
import imagePlaceholder from '../../images/person-placeholder.jpg'
import './person-thumbnail.scss'

const PersonThumbnail = ({ person }) => {

return (
    <Link to={`/person/${person.id}`} className='person-thumbnail'>
      {
        person.profilePath.image ? (
          <CustomImage
            className='person-thumbnail__image'
            src={person.profilePath.image}
            placeholder={imagePlaceholder}
            alt={person.name} />
        ) : (
          <img
            className='person-thumbnail__image person-thumbnail__image--placeholder'
            src={imagePlaceholder}
            alt={person.name} />
        )
      }
      <span className='person-thumbnail__name'>{person.name}</span>
    </Link>
  )
}

export default PersonThumbnail