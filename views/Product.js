import { Component, customElement } from '../services/Component.js'
import Spinner from '../components/Spinner.js'
import ProductDetail from '../components/ProductDetail.js'
import { getSingleProduct } from '../requests/products.js'
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
      const { id } = router.getQueries()
      const item = await getSingleProduct(id)
      this.setState({ loading: false, item })
    }

    render() {
      const { loading, item } = this.state
      return /*html*/ `
          ${
            loading
              ? `<${Spinner}></${Spinner}>`
              : `
              <${ProductDetail}
                id="${item.id}"
                price="${item.price}"
                description="${item.description}"
                image="${item.image}"
                title="${item.title}"
                rating="${item.rating.rate}"
              >
              </${ProductDetail}>
          `
          }
      `
    }
  }
)

export default ProductView
