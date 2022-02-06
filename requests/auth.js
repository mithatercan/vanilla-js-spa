import globalState from '../services/GlobalState.js'
import router from '../services/Router.js'
const logIn = async (dummyInfo) => {
  try {
    const response = await fetch(
      'https://run.mocky.io/v3/b2b6b5e3-e323-47ae-9fdb-ef3d90721921'
    )
    const json = await response.json()
    globalState.setState({ user: json })
    router.navigate('/products')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const logOut = async () => {
  console.log(globalState.getStates())
  globalState.setState({})
  router.navigate('/')
}

export { logIn, logOut }
