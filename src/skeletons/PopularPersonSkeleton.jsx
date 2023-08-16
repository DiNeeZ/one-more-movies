import ContentLoader from 'react-content-loader'

const PopularPersonSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={200}
    height={84}
    viewBox="0 0 200 84"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="22" y="237" rx="0" ry="0" width="75" height="0" /> 
    <rect x="0" y="0" rx="14" ry="14" width="70" height="84" /> 
    <rect x="84" y="60" rx="2" ry="2" width="70" height="10" /> 
    <rect x="84" y="74" rx="2" ry="2" width="50" height="8" />
  </ContentLoader>
)

export default PopularPersonSkeleton