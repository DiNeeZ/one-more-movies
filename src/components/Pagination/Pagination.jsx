import './pagination.scss'

const Pagination = ({ pages, handleChange, currentPage  }) => {
  return (
    <div className='pagination'>
      {
        Array.from(Array(pages).keys()).map(number => {
          const isCurrent = currentPage === number + 1

          return (
            <button
              className={`pagination__btn`}
              key={number + 1}
              disabled={isCurrent}
              onClick={() => handleChange(number + 1)}
            >
              {number + 1}
            </button>
          )
        })
      }
    </div>
  )
}

export default Pagination