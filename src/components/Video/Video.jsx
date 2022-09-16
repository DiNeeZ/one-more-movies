import { useState } from 'react'
import { useGetTrailersQuery } from '../../features/api/tmdbSlice'
import VideoNavigation from './VideoNavigation/VideoNavigation'
import VideoNotAvaliable from '../VideoNotAvaliable/VideoNotAvaliable'
import SpinnerBounce from '../SpinnerBounce/SpinnerBounce'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'

import './video.scss'

const Video = ({ id, mediaType }) => {
  const [currentVideo, setCurrentVideo] = useState(0)
  const { data: trailers, error, isSuccess, isLoading, isError } = useGetTrailersQuery({ id, mediaType })

  const handleLeftClick = () => {
    if (currentVideo > 0) {
      setCurrentVideo(prevState => prevState - 1)
    }
  }

  const handleRightClick = () => {
    if (currentVideo < trailers.length - 1) {
      setCurrentVideo(prevState => prevState + 1)
    }
  }

  const handleDotClick = (index) => setCurrentVideo(index)

  if (isLoading) return <SpinnerBounce />
  if (isError) return <ErrorIndicator errorMsg={`${error.status} ${error.data.status_message}`} />
  if (isSuccess && !trailers.length) return <VideoNotAvaliable />

  if (isSuccess) return (
    <div className='video'>
      <iframe
        className='video__frame'
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${trailers[currentVideo].key}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen />
      {trailers.length > 1 && (
        <VideoNavigation
          trailers={trailers}
          currentVideo={currentVideo}
          length={trailers.length}
          handleLeftClick={handleLeftClick}
          handleRightClick={handleRightClick}
          handleDotClick={handleDotClick}
        />
      )}
    </div>
  )
}

export default Video