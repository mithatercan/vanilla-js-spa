import { Component, customElement } from '../services/Component.js'
import router from '../services/Router.js'
const HomePage = customElement(
  'home-page',
  class extends Component {
    constructor() {
      super()
      this.state = {
        count: 0
      }
    }

    handleSubmit(e) {
      e.preventDefault()
      router.navigate('/items/item')
    }

    render() {
      return `
        <form @submit="handleSubmit()">
          <input type="text" placeholder="username"/>
          <input type="password" placeholder="password"/>
          <button type="submit">Login</button>
        </form> 
      `
    }
  }
)

export default HomePage
