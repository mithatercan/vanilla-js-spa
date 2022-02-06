import { customElement, Component } from '../services/Component.js'
import globalState from '../services/GlobalState.js'
import router from '../services/Router.js'
const ProductItem = customElement(
  'product-item',
  class extends Component {
    constructor() {
      super()
      this.state = {
        count: 0
      }
    }

    handleAddCart(id) {
      const { cart } = globalState.getStates(this)
      globalState.setState({ cart: [...cart, this.props] })

      // !  FETCH PRODUCT BY ID AND ADD TO CART
    }

    goToDetails(id) {
      router.navigate(`/products/product?id=${id}`)
    }

    render() {
      const { title, price, id, image } = this.props

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
        <button class="add-to-cart" 
          @click="handleAddCart(${id})">
            Add to cart
        </button>

        <button @click="goToDetails(${id})">
          Details
        </button>
       </div>
    `
    }
  }
)

export default ProductItem
