import ContentLoader from "react-content-loader"

const ActorThumbnailSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={58}
    height={78}
    viewBox="0 0 58 78"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="22" y="237" rx="0" ry="0" width="75" height="0" /> 
    <circle cx="28" cy="28" r="28" /> 
    <rect x="0" y="63" rx="2" ry="2" width="58" height="12" />
  </ContentLoader>
)

export default ActorThumbnailSkeleton