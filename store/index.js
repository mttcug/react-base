import { createStore } from 'redux'
import states from './state.js'
import reducers from './reducer'

const store = createStore(reducers, states)

export default store
