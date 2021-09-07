import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user'
import post from './post'

// (이전상태를 액션에 따라 다음상태로 만들어냄)
// HYDRATE는 액션임.
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
		  case HYDRATE : 
		    return {...state, ...action.payload}
    
      default:
        return state;
        break;
    }
  },
  user,
  post
})

export default rootReducer
