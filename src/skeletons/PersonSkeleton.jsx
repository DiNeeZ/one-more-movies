import ContentLoader from 'react-content-loader'

const PersonSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={1100}
    height={650}
    viewBox="0 0 1100 650"
    backgroundColor="#a7a7a7"
    foregroundColor="#5f5f5f"
    {...props}
  >
    <rect x="22" y="237" rx="0" ry="0" width="75" height="0" />
    <rect x="0" y="54" rx="5" ry="5" width="257" height="386" />
    <rect x="327" y="54" rx="2" ry="2" width="200" height="24" />
    <rect x="327" y="92" rx="2" ry="2" width="620" height="14" />
    <rect x="327" y="113" rx="2" ry="2" width="650" height="14" />
    <rect x="327" y="134" rx="2" ry="2" width="630" height="14" />
    <rect x="327" y="155" rx="2" ry="2" width="640" height="14" />
    <rect x="327" y="176" rx="2" ry="2" width="630" height="14" />
    <rect x="327" y="197" rx="2" ry="2" width="600" height="14" />
    <rect x="327" y="422" rx="2" ry="2" width="400" height="18" />
    <rect x="0" y="496" rx="2" ry="2" width="218" height="28" />
    <rect x="0" y="545" rx="10" ry="10" width="1099" height="38" />
    <rect x="0" y="597" rx="10" ry="10" width="1066" height="38" />
    <rect x="0" y="0" rx="2" ry="2" width="200" height="28" />
  </ContentLoader>
)

export default PersonSkeleton