import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSearchResultsQuery } from '../../features/api/tmdbSlice'

import SearchResultsItem from '../../components/SearchResultsItem/SearchResultsItem'
import Pagination from '../../components/Pagination/Pagination'
import SpinnerBounce from '../../components/SpinnerBounce/SpinnerBounce'

import './search-results.scss'

const SearchResults = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { query } = useParams()
  const { data, isLoading, isFetching } = useGetSearchResultsQuery({ searchQuery: query, page: currentPage })

  const changePage = (num) => setCurrentPage(num)

  return (
    <section className='search-results'>
      <div className='container search-results__container'>
        <ul className='search-results__results'>
          {(isLoading || isFetching) ? <SpinnerBounce /> : data.results.map(item => {
            return (
              <li key={item.id}>
                <SearchResultsItem item={item} />
              </li>
            )
          })}
      </ul>

      {
        isLoading ? <SpinnerBounce /> : (
          <Pagination
            handleChange={changePage}
            totalPageCount={data.totalPages}
            currentPage={currentPage}
          />
        )
      }
    </div>
    </section >
  )
}

export default SearchResults