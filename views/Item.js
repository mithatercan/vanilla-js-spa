import { Component, customElement } from '../services/Component.js'
import router from '../services/Router.js'

const ItemPage = customElement(
  'item-page',
  class extends Component {
    constructor() {
      super()
      this.state = {
        loading: true
      }
    }

    async atTheFirstRender() {
      const { id } = router.getQueries()
      const link = `https://jsonplaceholder.typicode.com/users/${id}`
      const response = await fetch(link)
      const items = await response.json()
      this.setState({ loading: false, item: items })
    }

    render() {
      return `
          ${this.state.loading ? 'loading...' : this.state.item.name}
      `
    }
  }
)

export default ItemPage
