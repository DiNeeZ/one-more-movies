import Logo from '../Logo/Logo'
import Search from '../Search/Search'
import Navigation from '../Navigation/Navigation'
import './header.scss'

const Header = () => {
  return (
    <header className='header'>
      <div className='header__container container'>
        <Logo />
        <Search />
        <Navigation />
      </div>
    </header>
  )
}

export default Header