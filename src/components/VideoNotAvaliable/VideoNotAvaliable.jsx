import { MdNotInterested } from 'react-icons/md'
import { ImFilm } from 'react-icons/im'
import { FaSadTear } from 'react-icons/fa'
import './not-avaliable.scss'

const VideoNotAvaliable = () => {
  return (
    <div className='not-avaliable'>
      <div className='not-avaliable__wrapper'>
        <div className='not-avaliable__content'>
          <div className='not-avaliable__icon'>
            <ImFilm className='icon-film' />
            <MdNotInterested className='icon-not' />
          </div>
          <div className='not-avaliable__text'>Video Not Avaliable</div>
          <FaSadTear className='not-avaliable__sad' />
        </div>
      </div>
    </div>
  )
}

export default VideoNotAvaliable