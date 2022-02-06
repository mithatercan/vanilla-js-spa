import { Component, customElement } from '../services/Component.js'
import ProductItem from '../components/ProductItem.js'
import router from '../services/Router.js'

const ProductView = customElement(
  'product-view',
  class extends Component {
    constructor() {
      super()
      this.state = {
        loading: true
      }
    }

    async atTheFirstRender() {
      const getSingleProduct = async () => {
        const { id } = router.getQueries()
        const link = `https://fakestoreapi.com/products/${id}`
        const response = await fetch(link)
        const item = await response.json()
        this.setState({ loading: false, item })
      }
      getSingleProduct()
    }

    render() {
      const { loading, item } = this.state
      return /*html*/ `
          ${
            loading
              ? 'loading...'
              : /*html*/ `
              <${ProductItem} 
                title="${item.title}"
                price="${item.price}"
                id="${item.id}"
                category="${item.category}"
                description="${item.description}"
                image="${item.image}">
                type="single"
              >
              </${ProductItem}>
          `
          }
      `
    }
  }
)

export default ProductView
