import { Link } from 'react-router-dom'
import CustomImage from '../CustomImage/CustomImage'
import Genres from '../Genres/Genres'
import imagePlaceholder from '../../images/movie-item-placeholder.png'
import './media-card.scss'

const MediaCard = ({ media, descr }) => {
  return (
    <Link to={`/${media.mediaType}/${media.id}`}>
      <article className='media-card'>
        <div className='media-card__card card'>
          <div className='card__image-wrapper'>
            {media.posterPath.image ?
              <CustomImage
                src={media.posterPath.image}
                placeholder={media.posterPath.preview}
                alt={media.title}
              /> :
              <img
                className='card__image card__image--placeholder'
                src={imagePlaceholder}
                alt={media.title} />
            }

          </div>
          {descr && (
            <div className='card__descr card-descr'>
              <p className='card-descr__item card-descr__item--year'>
                {media.releaseDate || media.firstAirDate}
              </p>
              <Genres genres={media.genres} />
            </div>
          )}
        </div>
        <span className='media-card__title'>{media.title || media.name}</span>
      </article>
    </Link>
  )
}

export default MediaCard