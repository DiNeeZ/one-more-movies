import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSearchResultsQuery } from '../../features/api/tmdbSlice'
import { Scrollbars } from 'react-custom-scrollbars'
import { useMedia } from '../../hooks'

import SearchResultsItem from '../../components/SearchResultsItem/SearchResultsItem'
import Pagination from '../../components/Pagination/Pagination'
import SearchItemSkeleton from '../../skeletons/SearchItemSkeleton'
import nothing from '../../images/nothing-found.png'

import './search-results.scss'

const SearchResults = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { query } = useParams()
  const {
    data,
    isLoading,
    isFetching,
    isSuccess } = useGetSearchResultsQuery({ searchQuery: query, page: currentPage })
  const mediaQuery = useMedia()

  useEffect(() => {
    return () => setCurrentPage(1)
  }, [query])

  const changePage = (num) => {
    window.scrollTo(0, 0)
    setCurrentPage(num)
  }

  const renderSkeleton = Array.from({ length: 5 }, (_, index) => index + 1)
    .map(item => <SearchItemSkeleton key={item} />)

  const renderResults = (isLoading || isFetching) ? renderSkeleton :
    !data.results.length ? (
      <div className='search-results__nothing'>
        <h3>Nothing Found</h3>
        <img src={nothing} alt='nothing found' />
      </div>
    ) : data.results.map(item => {
      return (
        <li className='search-results__result' key={item.id}>
          <SearchResultsItem item={item} />
        </li>
      )
    })

  return (
    <section className='search-results'>
      <div className='container search-results__container'>
        <ul className='search-results__results'>
          {
            mediaQuery === 'desktop' ? (
              <Scrollbars style={{ width: '100%', height: '100%' }} >
                {renderResults}
              </Scrollbars>
            ) : renderResults
          }
        </ul>
        {
          isSuccess && (
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