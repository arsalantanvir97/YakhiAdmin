import {
    NOTIFICATION_SUCCESS
    } from '../constants/adminConstants'
    
    export const NotifReducer = (state = {}, action) => {
      switch (action.type) {
         case NOTIFICATION_SUCCESS:
             console.log('action.payload',action.payload)
             return { loading: false, notifcationdata:action.payload }
        default:
          return state
      }
    }
 
 