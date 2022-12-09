import ContentLoader from 'react-content-loader'

const MovieDescrSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 550"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="22" y="237" rx="0" ry="0" width="75" height="0" /> 
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="344" /> 
    <rect x="0" y="372" rx="2" ry="2" width="196" height="11" /> 
    <rect x="0" y="390" rx="2" ry="2" width="196" height="11" /> 
    <rect x="0" y="407" rx="2" ry="2" width="196" height="11" /> 
    <rect x="0" y="424" rx="2" ry="2" width="196" height="11" /> 
    <rect x="0" y="441" rx="2" ry="2" width="196" height="11" /> 
    <rect x="3" y="480" rx="5" ry="5" width="147" height="49" />
  </ContentLoader>
)

export default MovieDescrSkeleton