import { combineReducers } from 'redux'
import states from './state'

const testReducers = (state = states, action) => {
    console.log('555555555')
    switch(action.type) {
        case 'ADD':
            console.log('666666666')
            return {
                sum: state.a + state.b
            }
        case 'MINI':
            return {
                sum: state.a - state.b
            }
        default:
            return state
    }
}

const fromReducers = (state = states, action) => {
    if (!state) return state
    switch(action.type) {
        case 'ADD':
            return {
                ...state,
                sum: state.a + state.b
            }
        case 'MINI':
            return {
                ...state,
                sum: state.a - state.b
            }
        default:
            return state
    }
}

export default testReducers