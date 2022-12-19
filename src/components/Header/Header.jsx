import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import Search from '../Search/Search'
import './header.scss'

const Header = () => {
  return (
    <header className='header'>
      <div className='header__container container'>
        <Logo />
        <Search />
        <nav className='header__nav'>
          <Link
            className='header__nav-link header__nav-link--login'
            to='/auth'>Login</Link>
          <span>/</span>
          <Link
            className='header__nav-link header__nav-link--signin'
            to='/auth'>Sign In</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header