import { useLocalStorage } from '../../hooks'
import MediaCard from '../MediaCard/MediaCard'
import './recently-viewed.scss'

const RecentlyViewed = () => {
  const [viewed] = useLocalStorage('recentlyViewed', [])
  // console.log(viewed)
  if (!viewed.length) return null
  return (
    <div className='recently-viewed'>
      <h2 className='recently-viewed__title'><span>Recently</span> Viewed</h2>
      <div className='recently-viewed__list'>
        {
          viewed.map(item => <MediaCard key={`viewed-${item.id}`} media={item} />)
        }
      </div>
    </div>
  )
}

export default RecentlyViewed