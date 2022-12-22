import Logo from '../Logo/Logo'
import Search from '../Search/Search'
import User from '../User/User'
import './header.scss'

const Header = () => {
  return (
    <header className='header'>
      <div className='header__container container'>
        <Logo />
        <Search />
        <nav className='header__nav'>
          <User />
        </nav>
      </div>
    </header>
  )
}

export default Header