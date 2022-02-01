import { Component, customElement } from '../lib/Component.js'
import Navbar from '../components/Navbar.js'

const HomePage = customElement(
  'home-page',
  class extends Component {
    constructor() {
      super()
      this.state = {}
    }

    render() {
      return `
          <${Navbar}></${Navbar}>
          Home page
      `
    }
  }
)

export default HomePage
