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
        // if the attribute starts with '@' example => @click , @submit ...etc
        if (attribute.startsWith('@')) {
          const event = attribute.split('@')[1]
          const callback = element.getAttribute(attribute).split('(')[0]
          const argument = element
            .getAttribute(attribute)
            .split('(')[1]
            .split(')')[0]
          // get callbacks
          if (this[callback]) {
            element.addEventListener(event, (e) => {
              this[callback].bind(this)(argument ? argument : e)
            })
          }
        }
      })
    })
  }

  callLifeCycles() {
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
    this.innerHTML = /*html*/ `
      ${this.render()}
      <style>
       ${this.customStyle}
      </style>
    `
    this.style.display = 'relative'
    this.addEvents()
    this.callLifeCycles()
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
