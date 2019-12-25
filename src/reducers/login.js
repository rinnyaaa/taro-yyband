import { LOGIN,LOGOUT } from '@constants/login'
const INITIAL_STATE = {
  isLogined: false
}

export default function isLogined (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogined: true
      }
     case LOGOUT:
       return {
         ...state,
         isLogined: false
       }
     default:
       return state
  }
}
