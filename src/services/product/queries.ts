import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from './api'

export const useProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
