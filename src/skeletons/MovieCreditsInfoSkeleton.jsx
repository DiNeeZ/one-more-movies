import ContentLoader from 'react-content-loader'

const MovieCreditsInfoSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={516}
    height={252}
    viewBox="0 0 516 252"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="22" y="237" rx="0" ry="0" width="75" height="0" />
    <rect x="0" y="0" rx="5" ry="5" width="168" height="252" />
    <rect x="196" y="104" rx="2" ry="2" width="180" height="32" />
    <rect x="196" y="200" rx="2" ry="2" width="320" height="48" />
    <rect x="390" y="104" rx="2" ry="2" width="80" height="32" />
  </ContentLoader>
)

export default MovieCreditsInfoSkeleton