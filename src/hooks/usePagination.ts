import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const usePagination = (totalRecords: number, defaultPageSize = 10) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get('size') || `${defaultPageSize}`)
  )
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || `1`)
  )

  const totalPages = Math.ceil(totalRecords / pageSize)

  const updateUrl = (page: number, size: number) => {
    setSearchParams({ page: String(page), size: String(size) })
  }

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page)
    setPageSize(size)
    updateUrl(page, size)
  }

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || `1`)
    const size = parseInt(searchParams.get('size') || `${defaultPageSize}`)
    setCurrentPage(page)
    setPageSize(size)
  }, [searchParams])

  return {
    currentPage,
    pageSize,
    totalPages,
    handlePageChange,
  }
}
