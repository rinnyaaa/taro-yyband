import { combineReducers } from 'redux'
import counter from './counter'
import login from './login'
import home from './home'

export default combineReducers({
  counter,login,home
})