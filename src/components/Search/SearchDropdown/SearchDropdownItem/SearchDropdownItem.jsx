import { Link } from 'react-router-dom'
import placeholder from '../../../../images/no-image.jpg'
import './search-dropdown-item.scss'

const SearchDropdownItem = ({ item, large }) => {
  const title = item.title || item.name
  const image = item.posterPath?.preview || item.profilePath?.preview
  const info = item.mediaType === 'person' ?
    (item.knownForDepartment ? item.knownForDepartment : 'unknown')
    :
    (
      (item.releaseDate || item.firstAirDate) ?
        (item.releaseDate || item.firstAirDate).split('-')[0] :
        'Release date is unknown'
    )

  const largeContent = (
    <>
      <img
        className='search-dropdown-item__image'
        src={image || placeholder}
        alt={image ? title : 'not found'} />
      <div className='search-dropdown-item__info'>
        <p className='search-dropdown-item__title'>{title}</p>
        <p>{info}</p>
      </div>
    </>
  )

  const content = (
    <div className='search-dropdown-item__info small'>
      <p className='search-dropdown-item__title'>{title}</p>
      <p>{item.mediaType}</p>
    </div>
  )

  return (
    <Link
      to={`/${item.mediaType}/${item.id}`}
      className={`search-dropdown-item ${large && 'big'}`}>
      {large ? largeContent : content}
    </Link>
  )
}

export default SearchDropdownItem