import { Link } from 'react-router-dom'
import CustomImage from '../CustomImage/CustomImage'
import noImage from '../../images/no-image.jpg'
import './search-results-item.scss'

const SearchResultsItem = ({ item }) => {
	const image = (item.profilePath || item.posterPath)
	const title = (item.title || item.name)
	const getYear = (movie) => (movie.releaseDate || movie.firstAirDate)?.split('-')[0]

	const renderInfo = () => {
		if (item.mediaType === 'person') return (<>
			<Link className='result-info__link' to={`/person/${item.id}`}>
				<p className='result-info__title'>{title}</p>
			</Link>
			<p className="result-info__job">{item.knownForDepartment}</p>
			<ul className="result-info__known-for known-for">{item.knownFor.map(movie => (
				<li className='known-for__item' key={movie.id}>
					<Link className='known-for__link' to={`/${movie.mediaType}/${movie.id}`}>
						<span className='known-for__title'>{movie.title || movie.name}</span>
						<span className='known-for__year'>({getYear(movie)})</span>
					</Link>
				</li>
			))}</ul>
		</>)

		if (item.mediaType === 'movie' || item.mediaType === 'tv') return (<>
			<Link className='result-info__link' to={`/${item.mediaType}/${item.id}`}>
				<p className='result-info__title'>{title}</p>
			</Link>
			<p className='result-info__type'>{item.mediaType}</p>
			<p className='result-info__year'>{getYear(item)}</p>
		</>)
	}

	return (
		<div className="search-results-item">
			{
				!image ?
					<img className='search-results-item__image' src={noImage} alt='not found' /> :
					<CustomImage className='search-results-item__image' src={image.image} placeholder={image.preview} alt={title} />
			}
			<div className='search-results-item__info result-info'>{renderInfo()}</div>
		</div>
	)
}

export default SearchResultsItem