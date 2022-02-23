import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { AdminLoginReducer } from './reducers/adminReducers'
import { NotifReducer } from './reducers/notifReducers'

const reducer = combineReducers({
  
  adminLogin: AdminLoginReducer,
  Notif:NotifReducer
})


const adminInfoFromStorage = localStorage.getItem('adminInfo')
  ? JSON.parse(localStorage.getItem('adminInfo'))
  : null
  const notifdataFromStorage = localStorage.getItem('notifdata')
  ? JSON.parse(localStorage.getItem('notifdata'))
  : null

const initialState = {
    adminLogin: { adminInfo: adminInfoFromStorage },
    Notif: { notifcationdata:notifdataFromStorage },

}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store