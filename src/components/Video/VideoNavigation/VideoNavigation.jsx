import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import './video-navigation.scss'

const VideoNavigation = (props) => {
  const {
    trailers,
    currentVideo,
    handleLeftClick,
    handleRightClick,
    handleDotClick } = props

  return (
    <div className='video-nav'>
      <button
        className='video-nav__btn video-nav__btn--left'
        onClick={handleLeftClick}
        disabled={currentVideo <= 0}>
        <FaCaretLeft className='video-nav__btn-icon' />
      </button>
      <button
        className='video-nav__btn video-nav__btn--right'
        onClick={handleRightClick}
        disabled={currentVideo >= trailers.length - 1}>
        <FaCaretRight className='video-nav__btn-icon' />
      </button>
      <div className='video-nav__dots'>
        {
          trailers.map((trailer, idx) => (
            <span
              className={`video-nav__dot ${currentVideo === idx ? 'video-nav__dot--current' : ''}`}
              key={trailer.id}
              onClick={() => handleDotClick(idx)}></span>
          ))
        }
      </div>
    </div>
  )
}

export default VideoNavigation