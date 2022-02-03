import { customElement, Component } from '../services/Component.js'

const ErrorPage = customElement(
  'error-page',
  class extends Component {
    constructor() {
      super()
    }

    render() {
      return `
        Error page here
      `
    }
  }
)

export default ErrorPage
