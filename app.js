import router from '../lib/Router.js'
import Home from '../views/Home.js'
import Items from '../views/Items.js'

const routes = router.addRoutes({
  '/': {
    component: `<${Home}/>`
  },
  '/items': {
    component: `<${Items} id="1"/>`,
    params: {
      id: '1'
    }
  }
})

export default routes
