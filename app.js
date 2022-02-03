import router from '../services/Router.js'
import Layout from './components/Layout.js'
import Home from '../views/Home.js'
import Items from '../views/Items.js'
import Item from '../views/Item.js'
import Error from '../views/Error.js'
import globalState from '../services/GlobalState.js'

globalState.initStates({
  user: null,
  products: [],
  categories: [],
  cart: []
})

// fetch for data
const fetchData = async () => {
  const productsUrl = 'https://fakestoreapi.com/products'
  const categoriesUrl = 'https://fakestoreapi.com/products/categories'

  const [products, categories] = await Promise.all([
    fetch(productsUrl).then((res) => res.json()),
    fetch(categoriesUrl).then((res) => res.json())
  ])

  globalState.setState({
    products,
    categories
  })
}

fetchData()

// routes
const authPrivateRoute = {
  condition: () => {
    return globalState.getState('user')
  },
  redirect: '/'
}

router.addRoutes(
  {
    parentComponent: Layout,
    myApp: '#app'
  },
  {
    '/': {
      view: Home
    },
    '/items': {
      view: Items
    },
    '/items/item': {
      view: Item,
      privateRoute: authPrivateRoute
    },
    '/error': {
      view: Error
    }
  }
)
