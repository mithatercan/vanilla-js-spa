import { Component, customElement } from '../services/Component.js'

import router from '../services/Router.js'

const ItemsPage = customElement(
  'items-page',
  class extends Component {
    constructor() {
      super()
      this.state = {
        loading: true
      }
    }

    handleClick(id) {
      router.navigate(`/items/item?id=${id}`)
    }

    render() {
      const items = [1, 2, 3, 5]

      return items
        .map((item) => {
          return `
          <button @click="handleClick(${item})">${item}</button>
          `
        })
        .join('')
    }
  }
)

export default ItemsPage
