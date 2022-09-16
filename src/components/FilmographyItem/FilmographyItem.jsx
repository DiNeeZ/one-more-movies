import { Link } from 'react-router-dom'
import Genres from '../Genres/Genres'
import CustomImage from '../CustomImage/CustomImage'
import imagePlaceholder from '../../images/movie-item-placeholder.png'
import './filmography-item.scss'

const FilmographyItem = ({ item }) => {
 
  const title = item.title || item.name
  const date = item.releaseDate || item.firstAirDate
  return (
    <Link className='filmography-item' to={`/${item.mediaType}/${item.id}`}>
      <CustomImage
        className='filmography-item__image'
        src={item.posterPath.image}
        placeholder={imagePlaceholder}
        alt={title}
      />
      <div className='filmography-item__info'>
        <div className='filmography-item__descr'>
          <h4 className='filmography-item__title'>{title}</h4>
          <Genres genres={item.genres} />
        </div>
        <span className='filmography-item__release-date'>
          {date?.split('-')[0]}
        </span>
      </div>
    </Link>
  )
}

export default FilmographyItem