import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetImagesQuery } from '../../features/api/tmdbSlice'
import { useMedia } from '../../hooks'

import Carousel from '../Carousel/Carousel'
import Modal from '../Modal/Modal'
import CustomImage from '../CustomImage/CustomImage'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'
import Aspect16on9Skeleton from '../../skeletons/Aspect16on9Skeleton'
import placeholder from '../../images/placeholder.jpg'

import './image-gallery.scss'

const ImageGallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageUrl, setCurrentImageUrl] = useState({})
  const { id, mediaType } = useParams()
  const { data: images, error, isSuccess, isLoading, isFetching, isError } = useGetImagesQuery({ id, mediaType })
  const mediaQuery = useMedia()
  const getImageUrlById = (id) => {
    if (id && images) {
      return images.find(image => image.id === id).imageUrl
    }
  }

  const handleClick = (id) => {
    setCurrentImageUrl(getImageUrlById(id))
    setIsModalOpen(true)
  }

  const renderImages = images => images.map(image => (
    <CustomImage
      key={image.id}
      src={image.imageUrl.preview}
      placeholder={placeholder}
      onClick={() => handleClick(image.id)}
      alt='backdrop'
    />
  ))

  const renderSkeleton = Array.from(Array(4).keys()).map(item => <Aspect16on9Skeleton key={item} />)

  const getCarouselItemsNumber = () => {
    switch (mediaQuery) {
      case 'small-mobile':
        return 1

      case 'mobile':
        return 1

      case 'small-tablet':
        return 2

      default:
        return 3
    }
  }

  const carouselSettings = {
    numOfItems: getCarouselItemsNumber(),
    arrows: true
  }

  if (!isLoading && isError) return <ErrorIndicator errorMsg={`${error.status} ${error.data.status_message}`} />

  if (isSuccess && !images.length) return null

  return (
    <div className='image-gallery'>
      <h2 className='image-gallery__title'>Images</h2>
      <Carousel settings={carouselSettings}>
        {(isLoading || isFetching) ? renderSkeleton : renderImages(images)}
      </Carousel>
      <Modal
        handleClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen} >
        <div className='image-gallery__current'>
          <CustomImage
            className='image-gallery__current-image'
            src={currentImageUrl.image}
            placeholder={currentImageUrl.preview}
            alt='modal'
          />
        </div>
      </Modal>
    </div>
  )
}

export default ImageGallery