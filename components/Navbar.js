import { Component, customElement } from '../services/Component.js'
import globalState from '../services/GlobalState.js'
const Navbar = customElement(
  'navbar-component',
  class extends Component {
    constructor() {
      super()
      this.state = {}
    }

    render() {
      return /*html*/ `


          ${setTimeout(() => {
            globalState
              .getState('categories', this)
              .map((category) => {
                return /*html*/ `
              <a href="/${category}">${category}</a>
            `
              })
              .join('')
          }, 3000)}
          
      `
    }
  }
)

export default Navbar
