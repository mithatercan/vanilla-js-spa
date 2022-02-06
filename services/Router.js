class Router {
  constructor() {
    this.init()
  }

  currentPath() {
    return window.location.pathname
  }

  init() {
    // handle hyperlinks clicks
    window.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault()
        const path = e.target.getAttribute('href')
        if (path !== this.currentPath()) {
          const checkedPath = this.checkPrivateRoute(path)
          this.navigate(checkedPath)
        }
      }
    })

    // handle pathname change
    window.addEventListener('popstate', (e) => {
      this.render()
    })
  }

  addRoutes(elements, routes) {
    this.routes = routes
    this.parentComponent = elements.parentComponent
    this.myApp = document.querySelector(elements.myApp)
    this.render()
  }

  getQueries() {
    const queries = {}
    const search = window.location.search
    if (search) {
      const queryStr = search.slice(1)
      const queryArr = queryStr.split('&')
      queryArr.forEach((item) => {
        const [key, value] = item.split('=')
        queries[key] = value
      })
    }
    return queries
  }

  navigate(path) {
    const checkedPath = this.checkPrivateRoute(path)
    window.history.pushState('', '', checkedPath)
    this.render()
  }

  checkPrivateRoute(path) {
    const splitPath = path.split('?')[0]
    const { privateRoute } = this.routes[splitPath]
    if (!privateRoute) return path
    const { condition, redirect, message } = privateRoute

    if (condition()) {
      return path
    } else {
      return redirect
    }
  }

  render() {
    const currentPath = this.currentPath()
    const { view } = this.routes[currentPath]
    if (this.parentComponent) {
      this.myApp.innerHTML = `<${this.parentComponent} children="<${view}></${view}>"/>`
    } else if (view) {
      this.myApp.innerHTML = `<${view}/>`
    } else {
      this.navigate('/error')
    }
  }
}

const router = new Router()
export default router
