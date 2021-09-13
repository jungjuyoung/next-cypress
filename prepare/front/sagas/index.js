import axios from "axios";
import { all, fork, take, call, put, delay } from "redux-saga";

function loginAPI(data) {
  // data: login 함수 1)에서 전달한
  return axios.post("/api/login", data);
}
function* login(action) {
  // LOG_IN_REWUEST에서 login을 호출할때 매개변수로 action이 전달됨.
  // action.type : 'LOG_IN_REQUEST'
  // action.data: 로그인 데이터
  try {
    const result = yield call(loginAPI, action.data); // 1)
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: error.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}
function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: error.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/api/post", data);
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: error.response.data,
    });
  }
}

function* watchLogin() {
  yield take("LOG_IN_REQUEST", login);
}
function* watchLogOut() {
  yield take("LOG_OUT_REQUEST", logout);
}
function* watchPost() {
  yield take("ADD_POST_REQUEST", addPost);
}

export default function* rootSata() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchPost)]);
}
