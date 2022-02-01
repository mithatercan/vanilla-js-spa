import { Component, customElement } from '../lib/Component.js'

const Navbar = customElement(
  'navbar-component',
  class extends Component {
    constructor() {
      super()
      this.state = {}
    }

    render() {
      return `
         <nav>
           <a href="/">Home</a>
           <a href="/items">Items</a>
         </nav>
      `
    }
  }
)

export default Navbar
