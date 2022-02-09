import { getSingleProduct } from '../requests/products.js'
import { customElement, Component } from '../services/Component.js'
import globalState from '../services/GlobalState.js'
import router from '../services/Router.js'

const ProductItem = customElement(
  'product-item',
  class extends Component {
    constructor() {
      super()
      this.state = {}
    }

    async handleAdd(id) {
      const { cart } = globalState.getStates(this)
      const item = await getSingleProduct(id)
      globalState.setState({ cart: [...cart, item] })
    }

    handleRemove(id) {
      const { cart } = globalState.getStates(this)
      const newCart = cart.filter((item) => item.id !== id)
      globalState.setState({ cart: newCart })
    }

    goToDetails(id) {
      router.navigate(`/products/product?id=${id}`)
    }

    render() {
      const { title, price, id, image, type } = this.props

      return /*html*/ `
       <div class="left-side">
        <div>${title}</div>
        <div class="left-side-bottom">
          <p>${price}$</p>
        </div>
       </div> 
       
       <div class="right-side">
        <img src="${image}" alt="${title}">
       </div>

       <div class="buttons">
        ${
          type === 'cart'
            ? /*html*/ `
        <button class="remove-from-cart" 
          @click="handleRemove(${id})">
            Remove from cart
        </button>
        `
            : /*html*/ `
          <button class="add-to-cart" 
          @click="handleAdd(${id})">
            Add to cart
        </button>
        `
        }

        <button @click="goToDetails(${id})">
          Details
        </button>
       </div>
    `
    }
  }
)

export default ProductItem
