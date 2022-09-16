import CustomImage from '../CustomImage/CustomImage'
import noImage from '../../images/no-image.jpg'
import './person-details.scss'


const PersonDetails = ({ details }) => {

  return (
    <div className='person-details'>
      <h2 className='visually-hidden'>{details.name} details</h2>
      <div className='person-details__info'>
        <div className='person-details__image-wrapper'>
          {
            details.profilePath.image ?
              <CustomImage
                className='person-details__image'
                src={details.profilePath.image}
                placeholder={details.profilePath.preview}
                alt={details.name} />
              :
              <img
                className='person-details__image'
                src={noImage}
                alt={`${details.name} not found`} />
          }
        </div>
        <div className='person-details__bio bio'>
          <h3 className='bio__title'>Biography</h3>
          <p className='bio__text'>{details.biography}</p>
          <div className='bio__born'>
            <span>Born: </span>{details.birthday} in {details.placeOfBirth}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonDetails