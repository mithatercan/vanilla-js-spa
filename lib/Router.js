class Router {
  constructor() {
    this.init()
  }

  currentPath() {
    return `/${window.location.pathname.split('/')[1]}`
  }

  init() {
    // handle pathname change

    window.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault()
        const path = e.target.getAttribute('href')
        this.navigate(path)
      }
    })
  }

  addRoutes(routes) {
    this.routes = routes
    this.render()
  }

  navigate(path) {
    window.history.pushState('', '', path)
    this.render()
  }

  getParams() {
    // get params with param name
    const params = {}
    const currentPath = this.currentPath()
    const route = this.routes[currentPath]
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

  render() {
    const app = document.querySelector('#app')
    const currentPath = this.currentPath()
    const { component } = this.routes[currentPath]
    if (component) {
      app.innerHTML = component
    } else {
      app.innerHTML = '404'
    }
  }
}

const router = new Router()

export default router
