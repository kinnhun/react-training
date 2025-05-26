import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addProduct, updateProduct, deleteProduct } from './api'
import { toast } from 'react-hot-toast'

interface Product {
  id: number
  title: string
  description?: string
  category?: string
  price?: number
  discountPercentage?: number
  rating?: number
  stock?: number
  tags?: string[]
  brand?: string
  sku?: string
  weight?: number
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation?: string
  shippingInformation?: string
  availabilityStatus?: string
}

export const useAddProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      const existingProducts = queryClient.getQueryData<Product[]>(['products']) || []
      queryClient.setQueryData(['products'], [...existingProducts, newProduct])
      toast.success('Thêm sản phẩm thành công')
    },
    onError: () => {
      toast.error('Thêm sản phẩm thất bại')
    }
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      updateProduct(id, { title }),
    onSuccess: (updatedProduct) => {
      const existingProducts = queryClient.getQueryData<Product[]>(['products']) || []
      queryClient.setQueryData(
        ['products'],
        existingProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      )
      toast.success('Cập nhật sản phẩm thành công')
    },
    onError: () => {
      toast.error('Cập nhật sản phẩm thất bại')
    }
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (_, deletedId) => {
      const existingProducts = queryClient.getQueryData<Product[]>(['products']) || []
      queryClient.setQueryData(
        ['products'],
        existingProducts.filter((product) => product.id !== deletedId)
      )
      toast.success('Xóa sản phẩm thành công')
    },
    onError: () => {
      toast.error('Xóa sản phẩm thất bại')
    }
  })
}
