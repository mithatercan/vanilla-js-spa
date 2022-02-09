# JavaScript SPA

This is a simple try for single page application. Routing and rendering views. This application is not pixel perfect.

[Check live demo here](https://javascript-spa.netlify.app/)

## Features

- Routing
- Global state
- Reusable custom elements

## Overview

```javascript
import { customElement, Component } from 'services/Component.js'

const Component = customElement(
  'custom-component',
  class extends Component {
    constructor() {
      super()
      this.state = {
        count: 0
      }
    }
    handleClick() {
      this.setState({ count: this.state.count++ })
    }

    render() {
      return /*HTML*/ `
            <div>
               <button @click="handleClick()">Increase</button>
            </div>
          `
    }
  }
)
```

```javascript
import router from 'services/Router.js'

router.addRoutes(
  {
    parentComponent: null,
    myApp: '#app'
  },
  {
    '/': {
      view: Component
    }
  }
)
```

## Usage

HTML custom elements allow us to create reusable elements. In this application, we create custom elements and render them.

```javascript
import { customElement, Component } from 'services/Component.js'

const Component = customElement(
  'custom-component',
  class extends Component {
    constructor() {
      super()
    }

    render() {
      return /*HTML*/ `
          custom element
          `
    }
  }
)
```

```javascript
// first method

myApp.innerHTML = `
    <custom-element></custom-element>
  `
// second method

myApp.innerHTML = `
    <${Component}><${Component}>
  `
```

## Manage local states

In the class component, `setState()` method allow us to set a state and when the state changes the component re-renders.

```javascript
const Component = customElement(
  'custom-component',
  class extends Component {
    constructor() {
      super()
      this.state = {
        count: 0
      }
    }
    handleClick() {
      this.setState({ count: this.state.count++ })
      // this method will increase the count state.
    }

    render() {
      return /*HTML*/ `
            <div>
               <button @click="handleClick()">Increase</button>
            </div>
          `
    }
  }
)
```

## Child element selector

If you are having child elements in your component then you can easily select and manipulate them with `$()` method.

```javascript
const Component = customElement(
  'custom-component',
  class extends Component {
    constructor() {
      super()
    }

    changeHeading() {
      this.$("h1").innerText = 'Heading is changed'
    }

    render() {
      return /*HTML*/ `
            <div>
               <h1>Heading</h1>
               <button @click="changeHeading()">Change</button>
            </div>
          `
    }
  }
)
```

## Life cycle methods

```javascript
  atTheFirstRender(){
   // runs at the first render
  }

  isComponentUpdated(){
    // runs at the every update
  }

  atTheRemoved(){
    // runs after element's been removed
  }

```

## Events

Add events as an attribute to element. You must start "@" symbol to call the method in class.

```javascript

<form-component @submit="handleSubmit()"></form-component>
```

## Routing

If you have a parent component, then when route changes the child component will render into a parent component. And main root view must be declared.

```javascript
router.addRoutes(
  {
    parentComponent: Layout, // parent
    myApp: '#app' // root view
  },
  {
    '/': {
      view: Home
    },
    '/items': {
      view: Items
    }
  }
)
```

### - Private Route

If we want to have a private route then we must declare an private route object like down below. And add it to our routes that we want to protect. If the condition is false then it will redirect us the redirect path.

```javascript
const privateRoute = {
  condition: () => {
    return false
  },
  redirect: '/'
}

router.addRoutes(
  {
    parentComponent: null,
    myApp: '#app'
  },
  {
    '/items': {
      view: Items,
      privateRoute: privateRoute
    }
  }
)
```

### - Queries

The `getQueries()` method will return the queries in url.

```javascript
router.addRoutes(
  {
    parentComponent: Layout, // parent
    myApp: '#app' // root view
  },
  {
    '/': {
      view: Home
    },
    '/items': {
      view: Items
    }
  }
)

// url = xxx/item?id=1

import router from 'services/Router.js/'
const Component = customElement(
  'custom-component',
  class extends Component {
    constructor() {
      super()
    }
    render() {
      const { id } = router.getQueries()
      // id will be 1
      return /*HTML*/ `
              <span>${id}</span>
          `
    }
  }
)
```

### - Navigate

The `navigate()` method allow us to navigate the route.

```javascript
import router from 'services/Router.js/'
const Component = customElement(
  'custom-component',
  class extends Component {
    constructor() {
      super()
    }

    handleClick() {
      router.navigate('/')
    }

    render() {
      const { id } = router.getQueries()
      // id will be 1
      return /*HTML*/ `
            <button @click="handleClick()"></button>
          `
    }
  }
)
```

## Global State

Global state allows us to create the states globally and we can access and manipulate them anywhere in our application. There are only 3 methods for global state.

```javascript
globalState.initStates() // initialize the global states
globalState.getStates() // returns all the states
globalStatea.setState() // update the the state or set a new state.
```

First we need to initialize our states

```javascript
globalState.initState({
  user: null,
  cart: [],
  loading: false
})
```

To listen every change in global state, we must pass the component as a prop to `getStates(component)` method. Then every state updates, the components will re-render.

```javascript
const { user } = globalState.getStates(this)
```

To update the state or set a new state we use `setState()` method

```javascript
globalState.setState({
  user: {
    status: 'admin',
    username: 'mithatercan'
  }
})
```

## Run this locally

First clone [this repository](https://github.com/mithatercann/vanilla-js-spa.git) and follow the guide below.

### install the dependencies

```bash
npm install
```

### Run the app on http-server

```bash
npm start
```

Server will run at http://localhost:8080

## LICENSE

[MIT](https://choosealicense.com/licenses/mit/)
