import { logOut } from '../requests/auth.js'
import { fetchCategories } from '../requests/products.js'
import { Component, customElement } from '../services/Component.js'
import globalState from '../services/GlobalState.js'

const Navbar = customElement(
  'navbar-component',
  class extends Component {
    constructor() {
      super()
      this.state = {}
    }

    async atTheFirstRender() {
      const categories = await fetchCategories()
      globalState.setState({ categories: categories })
    }

    handleLogout() {
      logOut()
    }

    render() {
      const { categories, user, cart } = globalState.getStates(this)
      return /*html*/ `
          ${
            categories && user
              ? categories
                  .map(
                    (category, idx) => /*html*/ `
                  <a href="/products?category=${idx}">${category.toUpperCase()}</a>
                `
                  )
                  .join('')
              : ''
          }
          ${
            user
              ? /*html*/ `
            <a href="/cart">
                <i class="material-icons">shopping_cart</i>
              CART 
              <small>${cart?.length !== 0 ? cart?.length : ''}</small>
            </a>
            <button @click="handleLogout()">LOGOUT</button>
          `
              : `
            <a href="/">LOGIN</a>
          `
          }
         
      `
    }
  }
)

export default Navbar
