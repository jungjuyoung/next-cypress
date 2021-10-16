import { all, fork } from "redux-saga/effects";
import axios from "axios";

import userSaga from "./user";
import postSaga from "./post";

// 중복 url 글로벌 기본설정 (defaults) 설정
// 백엔드로 전달될 데이터들에 widthCredentials:true 객체 글로벌 기본설정으로 설정.ㄴ
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
