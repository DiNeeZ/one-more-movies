import { usePagination } from '../../hooks/usePagination'
import { BsThreeDots } from 'react-icons/bs'
import './pagination.scss'

const Pagination = ({ totalPageCount, handleChange, currentPage }) => {
  const paginationRange = usePagination({ totalPageCount, currentPage })

  return (
    <div className='pagination'>
      {
        paginationRange.map((item, idx) => {
          const isCurrent = currentPage === item
          const isDots = item === 'dots'
          return (<button
            className={`pagination__btn ${(isCurrent || isDots) && `pagination__btn__${isCurrent ? 'current' : 'dots'}`}`}
            key={`${item}${isDots && idx}`}
            disabled={isCurrent || isDots}
            onClick={() => handleChange(item)}>
            {isDots ? <BsThreeDots /> : item}
          </button>)
        })
      }
    </div>
  )
}

export default Pagination