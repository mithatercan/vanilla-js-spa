import { customElement, Component } from '../services/Component.js'
import globalState from '../services/GlobalState.js'
import ProductItem from '../components/ProductItem.js'
const CartView = customElement(
  'cart-view',
  class extends Component {
    constructor() {
      super()
      this.state = {}
    }

    render() {
      const { cart } = globalState.getStates(this)

      return /*html*/ `
        ${
          cart.length
            ? cart
                .map(
                  (item) => /*html*/ `
                  <${ProductItem} 
                    title="${item.title}"
                    price="${item.price}"
                    id="${item.id}"
                    category="${item.category}"
                    description="${item.description}"
                    image="${item.image}"
                    type="cart"
                  >                  
                  </${ProductItem}>
        `
                )
                .join('')
            : /*html*/ `
          <div class="cart-empty">
            <img src="../../public/images/empty-cart.png"/>
          </div>
        `
        }
      
    
    `
    }
  }
)

export default CartView
