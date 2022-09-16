import ContentLoader from 'react-content-loader'

const ParagraphSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={670}
    height={60}
    viewBox="0 0 670 60"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="22" y="237" rx="0" ry="0" width="75" height="0" /> 
    <rect x="0" y="3" rx="2" ry="2" width="620" height="14" /> 
    <rect x="0" y="22" rx="2" ry="2" width="650" height="14" /> 
    <rect x="0" y="41" rx="2" ry="2" width="600" height="14" />
  </ContentLoader>
)

export default ParagraphSkeleton