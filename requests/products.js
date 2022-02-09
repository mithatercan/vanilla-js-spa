const BASE_URL = 'https://fakestoreapi.com/'

const fetchProducts = async ({ category, categories }) => {
  const link = `${BASE_URL}/products${
    category ? `/category/${categories[category]}` : ''
  }`
  const response = await fetch(link)
  const items = await response.json()
  return items
}

const fetchCategories = async () => {
  const categoriesUrl = `${BASE_URL}/products/categories`
  const categories = await fetch(categoriesUrl)
  const categoriesJson = await categories.json()
  return categoriesJson
}

const getSingleProduct = async (id) => {
  const link = `${BASE_URL}/products/${id}`
  const response = await fetch(link)
  const item = await response.json()
  return item
}

export { fetchProducts, fetchCategories, getSingleProduct }
