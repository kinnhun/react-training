import axios from 'axios'

const BASE_URL = 'https://dummyjson.com/products'

export const fetchProducts = async () => {
  const { data } = await axios.get(`${BASE_URL}?limit=100`)
  return data.products
}

export const addProduct = async (payload: { title: string }) => {
  const { data } = await axios.post(`${BASE_URL}/add`, payload)
  console.log("data", data)
  return data
}

export const updateProduct = async (id: number, payload: { title: string }) => {
  const { data } = await axios.put(`${BASE_URL}/${id}`, payload)
  return data
}

export const deleteProduct = async (id: number) => {
  const { data } = await axios.delete(`${BASE_URL}/${id}`)
  return data
}
