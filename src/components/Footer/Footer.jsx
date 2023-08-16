import Logo from '../Logo/Logo'
import TMDBlogo from '../../images/tmdb.svg'
import './footer.scss'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container footer__container'>
        <div className='footer__left'>
          <Logo />
        </div>
        <div className='footer__center'>
          One More Movie App &copy; 2022
        </div>
        <div className='footer__right'>
          <span>Powered By The Movie Database (TMDB)</span>
          <a
            href='https://www.themoviedb.org/'
            aria-label='go to TMDB - The Movie Database'
            target='_blank'
            rel='noreferrer'
          >
            <img src={TMDBlogo} alt='TMDB logo' />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer