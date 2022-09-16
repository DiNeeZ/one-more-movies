import Listing from '../../components/Listing/Listing'
import PopularPersons from '../../components/PopularPersons/PopularPersons'
import RecentlyViewed from '../../components/RecentlyViewed/RecentlyViewed'
import UpcomingMovies from '../../components/UpcomingMovies/UpcomingMovies'
import './home.scss'

const Home = () => (
  <section className='home' role='main'>
    <div className='home__container container'>
      <div className='home__content'>
        <UpcomingMovies />
        <Listing type='movie' />
        <Listing type='tv' />
        <RecentlyViewed />
      </div>
      <aside className='home__sidebar'>
        <PopularPersons />
      </aside>
    </div>
  </section>
)

export default Home