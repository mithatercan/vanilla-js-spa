import router from '../services/Router.js'
import Layout from './components/Layout.js'
import Cart from './views/Cart.js'
import Home from './views/Home.js'
import Products from './views/Products.js'
import Product from './views/Product.js'
import globalState from '../services/GlobalState.js'

globalState.initStates({
  user: null,
  cart: []
})

// private route methods
const authPrivateRoute = {
  condition: () => {
    const { user } = globalState.getStates(this)
    return user
  },
  redirect: '/'
}

// routes
router.addRoutes(
  {
    parentComponent: Layout,
    myApp: '#app'
  },
  {
    '/': {
      view: Home
    },
    '/cart': {
      view: Cart,
      privateRoute: authPrivateRoute
    },
    '/products': {
      view: Products,
      privateRoute: authPrivateRoute
    },
    '/products/product': {
      view: Product,
      privateRoute: authPrivateRoute
    },
    '/error': {
      view: Error
    }
  }
)
