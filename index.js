import React from 'react'
import { render } from 'react-dom'
import App from './App.jsx'
import store from './store/index'

console.log('888888888:', store.dispatch({
        type: 'ADD'
    }))

render(<App />, document.getElementById('app'))