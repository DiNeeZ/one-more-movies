import { useEffect, useState } from 'react'
import './carousel.scss'

const Carousel = ({ children, settings }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(children.length)
  const [touchPosition, setTouchPosition] = useState(null)

  const { numOfItems, arrows, dots, autoplay } = settings

  useEffect(() => {
    setLength(children.length)
  }, [children])

  useEffect(() => {
    let changeSlide

    if (autoplay) {
      changeSlide = setTimeout(() => {
        if (currentIndex < (length - numOfItems)) {
          setCurrentIndex(prevState => prevState + 1)
        }

        if (currentIndex === (length - numOfItems)) {
          setCurrentIndex(0)
        }

      }, autoplay)
    }

    return () => {
      if (autoplay) {
        clearTimeout(changeSlide)
      }
    }
  }, [autoplay, currentIndex, length, numOfItems])

  const next = () => {
    if (currentIndex < (length - numOfItems)) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  const handleTouchMove = (e) => {
    const touchDown = touchPosition

    if (touchDown === null) {
      return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
      next()
    }

    if (diff < -5) {
      prev()
    }

    setTouchPosition(null)
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  const translateWidth = `calc(-${currentIndex * (100 / numOfItems)}%)`
  const isLeftBtnDisabled = currentIndex <= 0
  const isRightBtnDisabled = currentIndex >= (length - numOfItems)

  return (
    <div className='carousel'>

      <div className='coaousel__wrapper'>
        <div
          className='carousel__content-wrapper'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`carousel__content items-${numOfItems}`}
            style={{ transform: `translateX(${translateWidth})` }}>
            {children}
          </div>
        </div>
      </div>
      {arrows && (
        <div className='arrows'>
          <button
            className="arrow arrow--left"
            onClick={prev}
            disabled={isLeftBtnDisabled}
            aria-label='click to previous slide'>❰</button>
          <button
            className="arrow arrow--right"
            onClick={next}
            disabled={isRightBtnDisabled}
            aria-label='click to next slide'>❱</button>
        </div>
      )}
      {dots && (
        <div className='dots'>
          {children.map((_, idx) => (
            <span
              key={idx}
              className={`dots__item ${idx === currentIndex && 'dots__item--current'}`}
              onClick={() => handleDotClick(idx)}>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel