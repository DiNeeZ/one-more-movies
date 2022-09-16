import ContentLoader from 'react-content-loader'

const MovieDescrSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="22" y="237" rx="0" ry="0" width="75" height="0" /> 
    <rect x="0" y="0" rx="0" ry="0" width="196" height="294" /> 
    <rect x="0" y="322" rx="2" ry="2" width="196" height="11" /> 
    <rect x="0" y="340" rx="2" ry="2" width="196" height="11" /> 
    <rect x="0" y="357" rx="2" ry="2" width="196" height="11" /> 
    <rect x="0" y="374" rx="2" ry="2" width="196" height="11" /> 
    <rect x="0" y="391" rx="2" ry="2" width="196" height="11" /> 
    <rect x="3" y="430" rx="5" ry="5" width="147" height="49" />
  </ContentLoader>
)

export default MovieDescrSkeleton