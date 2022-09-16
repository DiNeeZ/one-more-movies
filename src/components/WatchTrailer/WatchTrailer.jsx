import { useState } from 'react'
import { MdOutlinePlayCircle } from 'react-icons/md'
import Video from '../Video/Video'
import Modal from '../Modal/Modal'
import './watch-trailer.scss'

const WatchTrailer = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        className='trailer-btn'
        onClick={() => setIsModalOpen(true)}>
        <span className='trailer-btn__text'>Watch Trailer</span>
        <MdOutlinePlayCircle className='trailer-btn__icon' />
      </button>
      <Modal handleClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <Video id={movie.id} mediaType={movie.mediaType} />
      </Modal>
    </>
  )
}

export default WatchTrailer