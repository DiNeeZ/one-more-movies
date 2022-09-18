import { useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import SearchDropdown from './SearchDropdown/SearchDropdown'
import './search.scss'
import { useDebounce } from '../../hooks'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 1000)


  const handleFocus = () => setFocused(true)
  const handleBlur = () => setTimeout(() => setFocused(false), 100)
  const handleChangeQuery = (e) => setSearchQuery(e.target.value)
  const clearInput = () => setSearchQuery('')

  const showDropdown = focused && (debouncedSearchQuery.length >= 3)

  return (
    <div className='search'>
      <SearchBar
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChangeQuery}
        value={searchQuery}
        clearInput={clearInput}
      />
      {showDropdown && <SearchDropdown clearInput={clearInput} searchQuery={debouncedSearchQuery} />}
    </div>
  )
}

export default Search