import { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useDebounce } from '../../hooks'
import './search.scss'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const debouncedSearchQuery = useDebounce(searchQuery, 1000)
  // const { data } = useGetSearchResultsQuery(debouncedSearchQuery)

  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)
  const handleChangeQuery = (e) => setSearchQuery(e.target.value)
  const handleClick = () => {
    const find = async () => {
      console.log(debouncedSearchQuery)
    }
    if (debouncedSearchQuery) {
      find()
    }
  }

  useEffect(() => {
    if (debouncedSearchQuery) {
    }
  }, [debouncedSearchQuery])

  const showDropdown = focused && debouncedSearchQuery

  return (
    <div className='search'>
      <div className='search__bar search-bar'>
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={handleChangeQuery}
          value={searchQuery}
          type='text'
          name='search'
          placeholder='Search...'
          className='search-bar__input' />
        <button
          className='search-bar__btn'
          onClick={handleClick}>
          <AiOutlineSearch className='search-bar__icon' />
        </button>
      </div>
      {showDropdown && (
        <div className='search__dropdown'>
          {debouncedSearchQuery}
        </div>
      )}
    </div>
  )
}

export default SearchBar