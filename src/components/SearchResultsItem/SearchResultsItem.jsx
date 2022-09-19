import { Link } from 'react-router-dom'
import CustomImage from '../CustomImage/CustomImage'
import noImage from '../../images/no-image.jpg'
import './search-results-item.scss'

const SearchResultsItem = ({ item }) => {
    console.log(item)

    const image = (item.profilePath || item.posterPath)
    const title = (item.title || item.name)

    const renderInfo = () => {
        if (item.mediaType === 'person') return (<>
            <p className='result-info__title'>{title}</p>
            <p className="result-info__job">{item.knownForDepartment}</p>
            <ul className="result-info__known-for">{item.knownFor.map(movie => (
                <li key={movie.id}>
                    <span>{movie.title || movie.name}</span>
                    <span>{(movie.release_date || movie.first_air_date)}</span>
                </li>
            ))}</ul>
        </>)

        if (item.mediaType === 'movie') return (
            <p>{title} {item.mediaType}</p>
        )

        if (item.mediaType === 'tv') return (
            <p>{title} {item.mediaType}</p>
        )

    }

    return (
        <Link to='/' className="search-results-item">
            {
                !image ?
                    <img className='search-results-item__image' src={noImage} alt='not found' /> :
                    <CustomImage className='search-results-item__image' src={image.image} placeholder={image.preview} alt={title} />
            }
            <div className='search-results-item__info result-info'>{renderInfo()}</div>
        </Link>
    )
}

export default SearchResultsItem