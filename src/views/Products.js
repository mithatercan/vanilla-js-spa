import { Component, customElement } from '../services/Component.js'
import router from '../services/Router.js'
import globalState from '../services/GlobalState.js'
import ProductItem from '../components/ProductItem.js'
import { fetchProducts } from '../requests/products.js'
import Spinner from '../components/Spinner.js'

const ProductsView = customElement(
  'products-view',
  class extends Component {
    constructor() {
      super()
      this.state = {
        loading: true
      }
    }

    async atTheFirstRender() {
      const { category } = router.getQueries()
      const { categories } = globalState.getStates(this)
      const items = await fetchProducts({ category, categories })
      this.setState({ loading: false, items })
    }

    render() {
      const { items, loading } = this.state
      return /*html*/ `
          ${
            loading
              ? `<${Spinner}></${Spinner}>`
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
