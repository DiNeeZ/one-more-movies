import { AiOutlineSearch } from 'react-icons/ai'
import './search-bar.scss'

const SearchBar = ({ onFocus, onBlur, onChange, value, clearInput }) => {

  const handleClick = () => {
    clearInput()
  }
  
  return (
    <div className='search__bar search-bar'>
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          type='text'
          name='search'
          placeholder='Search...'
          className='search-bar__input' />
        <button
          className='search-bar__btn'
          onClick={handleClick}
          aria-label='go to search results page'>
          <AiOutlineSearch className='search-bar__icon' />
        </button>
      </div>
  )
}

export default SearchBar