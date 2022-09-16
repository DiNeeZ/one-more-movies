import ContentLoader from 'react-content-loader'

const TitleSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={150}
    height={40}
    viewBox="0 0 150 40"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="22" y="237" rx="0" ry="0" width="75" height="0" />
    <rect x="0" y="0" rx="2" ry="2" width="150" height="40" />
  </ContentLoader>
)

export default TitleSkeleton