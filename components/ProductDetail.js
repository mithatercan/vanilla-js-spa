import { customElement, Component } from '../services/Component.js'
import createStars from '../utils/createStars.js'
import globalState from '../services/GlobalState.js'
import { getSingleProduct } from '../requests/products.js'
const ProductDetail = customElement(
  'product-detail',
  class extends Component {
    constructor() {
      super()
    }

    async handleClick(id) {
      const { cart } = globalState.getStates(this)
      const item = await getSingleProduct(id)
      globalState.setState({ cart: [...cart, item] })
    }

    render() {
      const { price, description, image, title, rating, id } = this.props
      return /*html*/ `
          <div class="left-side">
            <img src="${image}" alt="${title}">
          </div>
          <div class="right-side">
           <h1>${title}</h1>
           <p>${description}</p>
           <div class="stars">${createStars(rating).join(' ')}</div>
           <p>${price}$</p>
           <button @click="handleClick(${id})">Add to cart</button>
          </div>
    `
    }
  }
)

export default ProductDetail
