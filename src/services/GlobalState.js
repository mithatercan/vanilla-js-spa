class GlobalState {
  constructor() {
    this.states = {}
  }

  // get components connected to the global state and update them
  updateComponents() {
    this.states = { ...this.states }
    const components = document.querySelectorAll('[global-state]')
    components.forEach((component) => {
      component.connectedCallback()
    })
  }

  getStates(component) {
    if (component) component.setAttribute('global-state', '')
    return this.states
  }

  setState(state) {
    this.states = { ...this.states, ...state }
    this.updateComponents(state)
  }

  initStates(states) {
    this.states = states
  }
}

const globalState = new GlobalState()
export default globalState
