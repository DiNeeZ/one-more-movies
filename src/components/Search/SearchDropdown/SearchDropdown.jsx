import { Link } from 'react-router-dom'
import { useGetSearchResultsQuery } from '../../../features/api/tmdbSlice'
import SearchDropdownItem from './SearchDropdownItem/SearchDropdownItem'
import SpinnerBounce from '../../SpinnerBounce/SpinnerBounce'
import nothing from '../../../images/nothing-found.png'
import './search-dropdown.scss'

const SearchDropdown = ({ searchQuery, clearInput }) => {
  const { data, isLoading } = useGetSearchResultsQuery({searchQuery})
  const renderItems = results => results.map((item, idx) =>
    <SearchDropdownItem key={item.id} item={item} large={[0, 1].includes(idx)} />
  )

  const nothigFound = (
    <div className='search-dropdown__nothing'>
      <h3>Nothing Found</h3>
      <img src={nothing} alt='nothing found' />
    </div>
  )

  return (
    <div className='search-dropdown'>
      {
        isLoading ?
          <SpinnerBounce />
          :
          !data.results.length ? nothigFound : (
            <>
              <ul className='search-dropdown__list'>
                {renderItems(data.results.slice(0, 10))}
              </ul>
              <Link
                className='search-dropdown__btn'
                to={`/search-results/${searchQuery}`}
                onClick={clearInput}
                >
                See all results for "{searchQuery}"
              </Link>
            </>
          )
      }
    </div>
  )
}

export default SearchDropdown