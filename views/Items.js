import { Component, customElement } from '../lib/Component.js'
import Navbar from '../components/Navbar.js'

const ItemsPage = customElement(
  'items-page',
  class extends Component {
    constructor() {
      super()
      this.state = {
        loading: true
      }
    }

    async atTheFirstRender() {
      const link = `https://jsonplaceholder.typicode.com/users/${this.props.id}`
      const response = await fetch(link)
      const items = await response.json()
      this.setState({ loading: false, item: items })
    }

    render() {
      return `
        <${Navbar}></${Navbar}>
          items 
          ${
            this.state.loading
              ? 'loading...'
              : `<div>${this.state.item.name}</div>`
          }


      `
    }
  }
)

export default ItemsPage
