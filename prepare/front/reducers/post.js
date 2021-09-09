export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickName: '찌미',
    },
    content: '첫 번째 게시글',
    Images: [{
      src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    }],
    Comments: [{
      User: {
        nickName: '쿠키',
      },
      content: '이거 계속 공부하랬떠여',
    }, {
      User: {
        nickName: '모니',
      },
      content: '얼른 사고싶어요~',
    }]
  }],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST'
export const addPost = {
  type: ADD_POST
}

const dummyPost= {
  id: 2,
  content: '더미데이터 입니다.',
  User:{
    id:1,
    nickName: '징징이짱'
  },
  Images: [],
  Comments: [],
}

const reducer = (state= initialState, action) => {
  switch (action.type) {
		case ADD_POST:
		  return {
				...state,
				mainPosts:[dummyPost, ...state.mainPosts],
				postAdded:true
			}
	  default:
		 return state
	  break;
  }

}
export default reducer