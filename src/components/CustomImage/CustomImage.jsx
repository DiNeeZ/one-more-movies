import ProgressiveImage from 'react-progressive-graceful-image'
import './custom-image.scss'

const CustomImage = ({ src, placeholder, ...props }) => {

  return (
    <ProgressiveImage
      src={src}
      placeholder={placeholder}>
      {(src) => {
        
        return (<img
          className={props.className || null}
          src={src}
          alt={props.alt || ''}
          {...props}
        />)
      }}
    </ProgressiveImage>
  )
}

export default CustomImage