import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'

const Pagination = ({ offset, setOffset, limit, setLimit, currentPage, setCurrentPage, totalProducts }) => {
  const NON_ACTIVE_PAGE = 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
  const ACTIVE_PAGE = 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

  const [pageNumbers, setPageNumbers] = useState([])

  const IS_FIRST_PAGE = currentPage === pageNumbers.at(0)
  const IS_LAST_PAGE = currentPage === pageNumbers.at(-1)

  const handlePagination = (pageNumber) => {
    setOffset((pageNumber - 1) * limit)
    setCurrentPage(pageNumber)
  }
  useEffect(() => {
    const totalPages = Math.ceil(totalProducts / limit)
    setPageNumbers(Array.from({ length: totalPages }, (_, index) => index + 1))
  }, [limit, offset, totalProducts])

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          disabled={IS_FIRST_PAGE}
          onClick={() => {
            handlePagination(currentPage - 1)
          }}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${IS_FIRST_PAGE ? `` : `hover:bg-gray-50`}`}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={IS_LAST_PAGE}
          onClick={() => {
            handlePagination(currentPage + 1)
          }}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${IS_LAST_PAGE ? `` : `hover:bg-gray-50`}`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{offset}</span> to <span className="font-medium">{limit * currentPage}</span> of <span className="font-medium">{totalProducts}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              disabled={IS_FIRST_PAGE}
              onClick={() => {
                handlePagination(currentPage - 1)
              }}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                IS_FIRST_PAGE ? `` : `hover:bg-gray-50`
              } focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {pageNumbers.map((page, index) => (
              <button
                type="button"
                aria-current="page"
                onClick={() => {
                  handlePagination(page)
                }}
                key={`page-number-${page}-position-${index}`}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${page === currentPage ? ACTIVE_PAGE : NON_ACTIVE_PAGE}`}
              >
                {' '}
                {page}{' '}
              </button>
            ))}
            <button
              type="button"
              disabled={IS_LAST_PAGE}
              onClick={() => {
                handlePagination(currentPage + 1)
              }}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                IS_LAST_PAGE ? `` : `hover:bg-gray-50`
              } focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
