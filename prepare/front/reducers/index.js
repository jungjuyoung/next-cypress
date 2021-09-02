import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

const initialState = {
  user: {
    isLogin: false,
    user: null,
    signupDate: {},
    loginData: {},
  },
  posts: [{}, {}, {}],
};

// action creator
export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  }
};
export const logoutAction = () => {
  return {
    type: 'LOG_OUT'
  }
};
// loginAction('juyoung') // 액션을 동적으로 만들어낸다.
// store.dispatch(loginAction('juyoung')) 스토어에 디스패치로 만들어진 액션을 실어서 보내면 스토어에 저장된 데이터가 리듀서에 정의한대로 바뀜.

// (이전상태를 이용해서 액션에 따라 다음상태를 만들어냄)
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
		case HYDRATE : 
		  console.log('HYDRATE: ', action);
		  return {...state, ...action.payload}
    case 'LOG_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isLogin: true,
          user: action.data,
        },
      };
      break;
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isLogin: false,
          user: null,
        },
      };
      break;
    default:
      return state;
      break;
  }
}

export default rootReducer
