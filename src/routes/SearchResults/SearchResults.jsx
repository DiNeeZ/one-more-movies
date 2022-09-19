import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSearchResultsQuery } from '../../features/api/tmdbSlice'

import Pagination from '../../components/Pagination/Pagination'
import SpinnerBounce from '../../components/SpinnerBounce/SpinnerBounce'

import './search-results.scss'

const SearchResults = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { query } = useParams()
  const { data, isLoading } = useGetSearchResultsQuery({ searchQuery: query, page: currentPage })

  const changePage = (num) => setCurrentPage(num)

  return (
    <section className='search-results'>
      <div className='container search-results__container'>
        {isLoading ? <SpinnerBounce /> : (
          <div className='search-results__results'>
            {data.results.map(item => {
              return <div key={item.id}>{item.title || item.name}</div>
            })}
          </div>
        )}
        {
          isLoading ? <SpinnerBounce /> : (
            <Pagination
              handleChange={changePage}
              pages={data.totalPages}
              currentPage={currentPage}
            />
          )
        }
      </div>
    </section>
  )
}

export default SearchResults