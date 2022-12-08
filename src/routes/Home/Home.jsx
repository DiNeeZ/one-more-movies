import Listing from '../../components/Listing/Listing'
import ListingOther from '../../components/ListingOther/ListingOther'
import PopularPersons from '../../components/PopularPersons/PopularPersons'
import RecentlyViewed from '../../components/RecentlyViewed/RecentlyViewed'
import UpcomingMovies from '../../components/UpcomingMovies/UpcomingMovies'
import './home.scss'

const Home = () => (
  <section className='home' role='main'>
    <div className='home__container container'>
      <div className='home__content'>
        <div className='home__content-main'>
          <UpcomingMovies />
          <ListingOther />
          <Listing type='movie' />
          <Listing type='tv' />
        </div>
        <aside className='home__sidebar'>
          <PopularPersons />
        </aside>
      </div>
      <RecentlyViewed />
    </div>
  </section>
)

export default Home