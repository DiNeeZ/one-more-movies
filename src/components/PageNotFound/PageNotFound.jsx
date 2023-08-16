import { Link } from 'react-router-dom'
import { SiProbot } from 'react-icons/si'
import './page-not-found.scss'

const PageNotFound = () => {
  return (
    <section className='page-not-found'>
      <div className='container page-not-found__container'>
        <h1 className='page-not-found__title'>404</h1>
        <SiProbot className='page-not-found__icon' />
        <p className='page-not-found__subtitle'>
          The page you were looking for does not exist
        </p>
        <Link to='/' className='page-not-found__btn'>
          Go Home
        </Link>
      </div>

    </section>
  )
}

export default PageNotFound