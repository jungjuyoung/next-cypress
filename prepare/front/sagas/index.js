import { all, fork } from "redux-saga/effects";
import axios from "axios";

import userSaga from "./user";
import postSaga from "./post";

// 중복 url 글로벌 기본설정 (defaults) 설정
axios.defaults.baseURL = "http://localhost:5000";

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
