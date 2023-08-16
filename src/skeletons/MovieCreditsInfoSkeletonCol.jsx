import ContentLoader from 'react-content-loader'

const MovieCreditsInfoSkeletonCol = (props) => (
  <ContentLoader
    speed={2}
    // width={516}
    // height={252}
    viewBox="0 0 252 200"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="22" y="237" rx="0" ry="0" width="75" height="0" />
    <rect x="0" y="0" rx="5" ry="5" width="30%" height="105" />
    <rect x="0" y="120" rx="2" ry="2" width="180" height="16" />
    <rect x="0" y="145" rx="2" ry="2" width="320" height="24" />
    <rect x="0" y="175" rx="2" ry="2" width="80" height="16" />
  </ContentLoader>
)

export default MovieCreditsInfoSkeletonCol