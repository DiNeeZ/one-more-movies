import ContentLoader from 'react-content-loader'

const SearchItemSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={1100}
    height={153}
    viewBox="0 0 1100 153"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="0" y="7" rx="2" ry="2" width="92" height="138" />
    <rect x="119" y="31" rx="2" ry="2" width="300" height="20" />
    <rect x="120" y="73" rx="2" ry="2" width="75" height="12" />
    <rect x="121" y="108" rx="2" ry="2" width="650" height="16" />
  </ContentLoader>
)

export default SearchItemSkeleton

