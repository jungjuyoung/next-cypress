export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickName: "찌미",
      },
      content: "오늘은 보람찬 하루였다. #오늘하루 #잘살았다.",
      Images: [
        {
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickName: "쿠키",
          },
          content: "이거 계속 공부하랬떠여",
        },
        {
          User: {
            nickName: "모니",
          },
          content: "얼른 사고싶어요~",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미데이터 입니다.",
  User: {
    id: 1,
    nickName: "징징이짱",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
      break;
  }
};
export default reducer;
