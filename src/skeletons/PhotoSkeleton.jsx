import ContentLoader from 'react-content-loader'

const PhotoSkeleton = (props) => (
  <ContentLoader
    speed={2}
    viewBox="0 0 1100 1650"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect rx="15" ry="15" width="100%" height="100%" />
  </ContentLoader>
)

export default PhotoSkeleton