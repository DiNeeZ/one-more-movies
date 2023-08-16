import ContentLoader from 'react-content-loader'

const PersonItemSkeleton = (props) => (
  <ContentLoader
    speed={2}
    viewBox="0 0 1100 143"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="22" y="237" rx="0" ry="0" width="75" height="0" />
    <rect x="7" y="7" rx="15" ry="15" width="84" height="126" />
    <rect x="120" y="42" rx="2" ry="2" width="80%" height="32" />
    <rect x="120" y="81" rx="2" ry="2" width="43%" height="19" />
  </ContentLoader>
)

export default PersonItemSkeleton