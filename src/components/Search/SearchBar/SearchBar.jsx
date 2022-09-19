import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import './search-bar.scss'

const SearchBar = ({ onFocus, onBlur, onChange, value, clearInput }) => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    if (value.length >= 3) {
      navigate(`/search-results/${value}`)
      clearInput()
    }
  }

  useEffect(() => {
    const keyDownHandler = e => {
      if (e.key === 'Enter' && value.length >= 3) {
        e.preventDefault()
        navigate(`/search-results/${value}`)
        clearInput()
      }
    }

    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  }, [value, navigate, clearInput])



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
        onClick={handleRedirect}
        aria-label='go to search results page'>
        <AiOutlineSearch className='search-bar__icon' />
      </button>
    </div>
  )
}

export default SearchBar