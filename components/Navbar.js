import { logOut } from '../requests/auth.js'
import { Component, customElement } from '../services/Component.js'
import globalState from '../services/GlobalState.js'
const Navbar = customElement(
  'navbar-component',
  class extends Component {
    constructor() {
      super()
      this.state = {}
    }

    atTheFirstRender() {
      const fetchData = async () => {
        const categoriesUrl = 'https://fakestoreapi.com/products/categories'
        const categories = await fetch(categoriesUrl)
        const categoriesJson = await categories.json()
        globalState.setState({ categories: categoriesJson })
      }
      fetchData()
    }

    isComponentUpdated() {
      const el = this.$('button')
      console.log(el)
      el.addEventListener('click', (e) => {
        this.testClick()
      })
    }

    testClick() {
      console.log('hey')
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
            <a href="/cart">CART 
              <small>${cart.length !== 0 ? cart.length : ''}</small>
            </a>
            
            <button @click='testClick'>LOGOUT</button>
          `
              : `
            <a  href="/">LOGIN</a>
          `
          }
         
      `
    }
  }
)

export default Navbar
