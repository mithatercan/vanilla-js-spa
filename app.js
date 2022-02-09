import router from './src/services/Router.js'
import Layout from './src/components/Layout.js'
import Cart from './src/views/Cart.js'
import Home from './src/views/Home.js'
import Products from './src/views/Products.js'
import Product from './src/views/Product.js'
import globalState from './src/services/GlobalState.js'

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
