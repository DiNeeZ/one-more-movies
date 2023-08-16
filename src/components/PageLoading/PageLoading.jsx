import ReactPortal from '../ReactPortal/ReactPortal'
import SpinnerBounce from '../SpinnerBounce/SpinnerBounce'
import './page-loading.scss'

const PageLoading = () => {
  return (
    <ReactPortal wrapperId='root-loader'>
      <div className='page-loading'>
        <SpinnerBounce />
      </div>
    </ReactPortal>
  )
}

export default PageLoading