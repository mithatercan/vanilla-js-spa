import { customElement, Component } from '../services/Component.js'

const Spinner = customElement(
  'spinner-component',
  class extends Component {
    constructor() {
      super()
    }

    render() {
      return /*html*/ `
        <div class="spinner"></div>
      `
    }
  }
)

export default Spinner
