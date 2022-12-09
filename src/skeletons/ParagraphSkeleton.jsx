import ContentLoader from 'react-content-loader'

const ParagraphSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={'100%'}
    height={60}
    viewBox="0 0 670 60"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="0" y="3" rx="2" ry="2" width="80%" height="14" /> 
    <rect x="0" y="22" rx="2" ry="2" width="90%" height="14" /> 
    <rect x="0" y="41" rx="2" ry="2" width="70%" height="14" />
  </ContentLoader>
)

export default ParagraphSkeleton