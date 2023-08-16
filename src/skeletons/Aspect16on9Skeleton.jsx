import ContentLoader from "react-content-loader"

const Aspect16on9Skeleton = (props) => (
  <ContentLoader
    speed={2}
    viewBox="0 0 792 445"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="0" y="0" width="792" height="445" />
  </ContentLoader>
)

export default Aspect16on9Skeleton