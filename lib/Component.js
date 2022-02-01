class Component extends HTMLElement {
  constructor() {
    super()
    this.state = {}
    this.props = {}
    this.customStyle = ``
    this.firstRender = true
  }

  isComponentUpdated() {}

  atTheFirstRender() {}

  atTheRemoved() {}

  //set state update the component
  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.connectedCallback()
  }

  addEvents() {
    this.querySelectorAll('*').forEach((element) => {
      element.getAttributeNames().forEach((attribute) => {
        if (attribute.startsWith('@')) {
          const event = attribute.replace('@', '')
          const callback = element.getAttribute(attribute)
          if (this[callback]) {
            element.addEventListener(event, this[callback].bind(this))
          } else {
            console.error(`${callback} not found`)
          }
        }
      })
    })
  }

  bindEvents() {
    if (this.firstRender) {
      this.atTheFirstRender()
      this.firstRender = false
    }
    this.isComponentUpdated()
  }

  setProps() {
    this.getAttributeNames().forEach((attribute) => {
      this.props[attribute] = this.getAttribute(attribute)
    })
  }

  connectedCallback() {
    this.setProps()
    this.innerHTML = `
     ${this.render()}
      <style>
        ${this.customStyle}
      </style>
    `
    this.addEvents()
    this.bindEvents()
  }

  disconnectedCallback() {
    this.atTheRemoved()
  }
}

// Define custom element
const customElement = (name, component) => {
  customElements.define(name, component)
  return name
}

export { Component, customElement }
