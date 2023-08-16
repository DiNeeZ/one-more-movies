import { useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import ReactPortal from '../ReactPortal/ReactPortal'
import { IoMdClose } from 'react-icons/io'
import './modal.scss'

const Modal = ({ children, isOpen, handleClose }) => {
  const nodeRef = useRef(null)

  useEffect(() => {
    const closeOnEscapeKey = e => e.key === 'Escape' ? handleClose() : null
    const closeOnModalBgClick = e => {
      if (e.target.classList.contains('modal-close')) {
        handleClose()
      }
    }
    document.body.addEventListener('keydown', closeOnEscapeKey)
    document.body.addEventListener('click', closeOnModalBgClick)

    return () => {
      document.removeEventListener('keydown', closeOnEscapeKey)
      document.removeEventListener('click', closeOnModalBgClick)
    }
  }, [handleClose])

  return (
    <CSSTransition
      in={isOpen}
      timeout={{ entry: 0, exit: 300 }}
      unmountOnExit
      classNames='modal'
      nodeRef={nodeRef}
    >
      <ReactPortal wrapperId='root-modal'>
        <div className='modal modal-close' ref={nodeRef}>
          <div className='modal__content'>
            <button className='modal__close-btn' onClick={handleClose}>
              <IoMdClose />
            </button>
            {children}
          </div>
        </div>
      </ReactPortal>
    </CSSTransition>
  )
}

export default Modal