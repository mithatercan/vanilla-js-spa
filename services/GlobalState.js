class GlobalState {
  constructor() {
    this.states = {}
  }

  getState(state, component) {
    return this.states[state]
    if (component) component.connectedCallback()
  }

  setState(state, component) {
    this.states = { ...this.states, ...state }
    if (component) component.connectedCallback()
  }

  initStates(states) {
    this.states = states
  }
}

const globalState = new GlobalState()

export default globalState
