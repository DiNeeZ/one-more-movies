import ContentLoader from 'react-content-loader'

const ListSkeleton = (props) => (
  <ContentLoader
    speed={2}
    viewBox="0 0 1100 650"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="38" />
    <rect x="0" y="46" rx="10" ry="10" width="100%" height="38" />
  </ContentLoader>
)

export default ListSkeleton