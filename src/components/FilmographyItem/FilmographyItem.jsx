import { Link } from 'react-router-dom'
import Genres from '../Genres/Genres'
import CustomImage from '../CustomImage/CustomImage'
import imagePlaceholder from '../../images/movie-item-placeholder.png'
import './filmography-item.scss'

const FilmographyItem = ({ item }) => {

  return (
    <Link className='filmography-item' to={`/${item.mediaType}/${item.id}`}>
      <CustomImage
        className='filmography-item__image'
        src={item.posterPath.image}
        placeholder={imagePlaceholder}
        alt={item.title}
      />
      <div className='filmography-item__info'>
        <div className='filmography-item__descr'>
          <h4 className='filmography-item__title'>{item.title}</h4>
          <Genres genres={item.genres} />
        </div>
        <span className='filmography-item__release-date'>
          {item.releaseDate?.split('-')[0]}
        </span>
      </div>
    </Link>
  )
}

export default FilmographyItem