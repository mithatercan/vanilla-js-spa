import { Component, customElement } from '../services/Component.js'
import { logIn } from '../requests/auth.js'

const HomePage = customElement(
  'home-view',
  class extends Component {
    constructor() {
      super()
      this.state = {
        isLoggingIn: false
      }
    }

    async handleSubmit(e) {
      e.preventDefault()
      this.setState({ isLoggingIn: true })
      const { username, password } = e.target.elements
      const status = await logIn({
        username: username.value,
        password: password.value
      })
      
      if (status) {
        this.setState({ isLoggingIn: false })
      }
    }

    render() {
      const { isLoggingIn } = this.state
      return `
        <form @submit="handleSubmit">
          <h1>Welcome to the store!</h1>
          <p>Please login to continue</p>
          <input type="text" name="username" placeholder="username" required/>
          <input type="password" name="password" placeholder="password" required/>
          <button type="submit" ${isLoggingIn && 'disabled'}>
            ${isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form> 
      `
    }
  }
)

export default HomePage
