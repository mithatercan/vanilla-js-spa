import { Component, customElement } from '../services/Component.js'
import router from '../services/Router.js'
import globalState from '../services/GlobalState.js'
import ProductItem from '../components/ProductItem.js'

const ProductsView = customElement(
  'products-view',
  class extends Component {
    constructor() {
      super()
      this.state = {
        loading: true
      }
    }

    atTheFirstRender() {
      const fetchProducts = async () => {
        const { category } = router.getQueries()
        const { categories } = globalState.getStates(this)
        const link = `https://fakestoreapi.com/products${
          category ? `/category/${categories[category]}` : ''
        }`
        const response = await fetch(link)
        const items = await response.json()
        this.setState({ loading: false, items })
      }
      fetchProducts()
    }

    handleClick(id) {
      // router.navigate(`/products/product?id=${id}`)
    }

    render() {
      const { items, loading } = this.state
      return /*html*/ `
          ${
            loading
              ? 'loading...'
              : items.map(
                  (item) => /*html*/ `
            <${ProductItem}
              @click="handleClick(${item.id})"
              title="${item.title}" 
              price="${item.price}"
              id="${item.id}"
              category="${item.category}"
              description="${item.description}" 
              image="${item.image}">
            </${ProductItem}>
          `
                ).join``
          }
      `
    }
  }
)

export default ProductsView
