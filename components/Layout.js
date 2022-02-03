import { Component, customElement } from '../services/Component.js'
import Navbar from './Navbar.js'

const Layout = customElement(
  'layout-component',
  class extends Component {
    constructor() {
      super()
      this.state = {}
    }

    render() {
      const { children } = this.props
      return `
        <div>
          <${Navbar}></${Navbar}>
          ${children}
        </div>
      `
    }
  }
)

export default Layout
