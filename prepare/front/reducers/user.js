const dummyUser = {
  id: 1,
  nickName: '나디아',
  Posts: [],
  Followings: [],
  Followers: [],
};

export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
};

// action creator (데이터를 동적으로 바꿔주는 액션)
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


const reducer = (state= initialState, action) => {
	switch (action.type) {
		case 'LOG_IN':
      return {
        ...state,
        isLogin: true,
        user: dummyUser,
      }
      break;
    case 'LOG_OUT':
      return {
        ...state,
        isLogin: false,
        user: null,
        
      };
      break;
	
		default:
		  return state
			break;
	}

}
export default reducer