export const initialState = {
  mainPosts: [{
    id:1,
    User: {
      id:1,
      nickName: '찜이'
    },
    content: '첫 번째 게시글 #해시태그 #익스프레스',
    Images:[
     { src:"https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726"},
     
     { src:"https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg"},
     
     { src:"https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg'"}
     
    ],
    Comments:[{
      User:{
        nickName: '쿠키',
      },
      content:"이거 계속 연습하랬떠여~"
    },{
      User:{
        nickName: '아하',
      },
      content:"또 왔네요~"
    }]
  }],
  imagesPaths:[],
  postAdded:false
}

const ADD_POST = 'ADD_POST'
export const addPost = {
  type: ADD_POST
}

const dummyPost= {
  id: 2,
  content: '더미데이터 입니다.',
  User:{
    id:1,
    nickName: '모니'
  },
  Images: [],
  Comments: [],
}

const reducer = (state= initialState, action) => {
  switch (action.type) {
		case ADD_POST:
		  return {
				...state,
				mainPosts:[...state.mainPosts, dummyPost],
				postAdded:true
			}
	  default:
		 return {...state}
	  break;
  }

}
export default reducer